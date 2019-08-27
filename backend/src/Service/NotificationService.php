<?php

namespace App\Service;

use App\Entity\Booking;
use App\Entity\Business;
use App\Entity\Notification;
use App\Entity\SupportTicket;
use App\Entity\User;
use App\Repository\NotificationRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;

class NotificationService
{
    const BOOKING_REQUEST_EMAIL = 'email/booking/booking-request.html.twig';
    const BOOKING_ACCEPTED_EMAIL = 'email/booking/booking-accepted.html.twig';
    const BOOKING_DECLINED_EMAIL = 'email/booking/booking-declined.html.twig';

    const BUSINESS_CREATED_EMAIL = 'email/business/business-created.html.twig';
    const BUSINESS_ASSIGNED_EMAIL = 'email/business/business-assigned.html.twig';

    const NEW_SUPPORT_TICKET_EMAIL = 'email/support/new-support-ticket.html.twig';

    const USER_REGISTER_SUCCESS_EMAIL = 'email/user/registration-success.html.twig';
    const USER_INVITE_EMAIL = 'email/user/invitation.html.twig';
    const USER_REGISTRATION_EMAIL = 'email/user/registration.html.twig';
    const USER_PASSWORD_RESET_EMAIL= 'email/user/forgot-password.html.twig';

    public function __construct(
                                EntityManagerInterface $entityManager,
                                NotificationRepository $notificationRepository,
                                EmailService $emailService
    )
    {
        $this->entityManager = $entityManager;
        $this->notificationRepository = $notificationRepository;
        $this->emailService = $emailService;
    }

    public function get($id)
    {
        return $this->notificationRepository->find($id);
    }

    public function getMyList(User $user)
    {
        return $this->notificationRepository->findBy(['toUser' => $user], ['updated_at' => 'DESC']);
    }

    public function saveAndSend(User $toUser, $subject, $type = null, $params = [], $toEmail = '')
    {
        $this->save($toUser, $subject);
        $this->emailService->send($toUser, $subject, $type, $params, $toEmail);
    }

    public function save(User $toUser, $subject)
    {
        $n = new Notification();
        $n->setType(Notification::TYPE_DEFAULT);
        $n->setToUser($toUser);
        $n->setMessage($subject);

        $this->entityManager->persist($n);
        $this->entityManager->flush();

        return true;
    }

    public function sendEmail(User $toUser, $subject = '', $type = null, $params = [])
    {
        $this->emailService->send($toUser, $subject, $type, $params, $toEmail);
    }

    public function notifyNewBusiness(Business $business)
    {
       if($business->getOwnerUser() instanceof User) {
            $manageUser = $business->getManageUser();
            $ownerUser = $business->getOwnerUser();
            $businessId = $business->getId();

            $params = [];
            $params['businessId'] = $businessId;

            $this->saveAndSend($ownerUser, "You've been assigned a new business", self::BUSINESS_ASSIGNED_EMAIL , $params);
            $this->saveAndSend($manageUser, "New business created", self::BUSINESS_CREATED_EMAIL , $params);
       }
    }

    public function notifyOfNewBooking(Booking $booking)
    {
        if($booking->getBusiness()->getOwnerUser() instanceof User) {
            $subj = 'Reservation Request #'.$booking->getId();

            $params = [];
            $params['name'] = $booking->getUser()->getName();
            $params['businessName'] = $booking->getBusiness()->getName();
            $params['businessAddress'] = $booking->getBusiness()->getAddress()->getAddress();
            $params['dateFrom'] = $booking->getBookingFrom()->format('jS F y');
            $params['dateTo'] = $booking->getBookingTo()->format('jS F y');
            $params['numPeople'] = $booking->getNumPeople();

            $coverPhoto = $booking->getBusiness()->getCoverPhotos()->first();
            $params['businessImage'] = 'https://ucarecdn.com/'.$coverPhoto->getUUID().'/-/scale_crop/100x200/center/';

            $this->saveAndSend($booking->getUser(), $subj, self::BOOKING_REQUEST_EMAIL, $params);
            // TODO: The owner should receive an email on which he can accept or not the booking. It should depend on the status of the booking, because it can be accepted automatically.
            // $this->sendEmail($booking->getBusiness()->getOwnerUser(), $subj, self::T_USER_BOOKING_REQUEST, $params);
        }
    }

    public function inviteNewOwner($fromUser = null, $businessName = '', $email)
    {   
        $params = [];
        $params['inviterName'] = "Felix";
        $params['inviterEmail'] = "Felix@akia.ca";
        $params['businessName'] = $businessName;
        $this->emailService->send(null, 'Invitation to Bedder Travel', self::USER_INVITE_EMAIL, $params, $email);
    }

    public function notifyTravellerBookingAccepted(Booking $booking)
    {
        if($booking->getUser() instanceof User) {
            $subj = 'Booking #'.$booking->getId().' accepted.';
            $params = [];
            $params['name'] = $booking->getUser()->getName();
            $params['businessName'] = $booking->getBusiness()->getName();
            $params['businessAddress'] = $booking->getBusiness()->getAddress()->getAddress();
            $params['dateFrom'] = $booking->getBookingFrom()->format('jS F y');
            $params['dateTo'] = $booking->getBookingTo()->format('jS F y');
            $params['numPeople'] = $booking->getPayload()['numPeople'];

            $coverPhoto = $booking->getBusiness()->getCoverPhotos()->first();
            $params['businessImage'] = 'https://ucarecdn.com/'.$coverPhoto->getUUID().'/-/scale_crop/100x200/center/';

            $this->saveAndSend($booking->getUser(), $subj, self::BOOKING_ACCEPTED_EMAIL, $params);
        }
    }

    public function notifyTravellerBookingDeclined(Booking $booking)
    {
        if($booking->getUser() instanceof User) {
           $subj = 'Booking #'.$booking->getId().' declined.';
            $params = [];
            $params['name'] = $booking->getUser()->getName();
            $params['businessName'] = $booking->getBusiness()->getName();
            $params['businessAddress'] = $booking->getBusiness()->getAddress()->getAddress();
            $params['dateFrom'] = $booking->getBookingFrom()->format('jS F y');
            $params['dateTo'] = $booking->getBookingTo()->format('jS F y');
            $params['numPeople'] = $booking->getPayload()['numPeople'];

            $coverPhoto = $booking->getBusiness()->getCoverPhotos()->first();
            $params['businessImage'] = 'https://ucarecdn.com/'.$coverPhoto->getUUID().'/-/scale_crop/100x200/center/';

            $this->saveAndSend($booking->getUser(), $subj, self::BOOKING_DECLINED_EMAIL, $params);
        }
    }

    public function notifyNewST(SupportTicket $supportTicket)
    {
        if ($supportTicket && $supportTicket->getFromUser()) {
            $params = [
                'name' => $supportTicket->getFromUser()->getName(),
                'number' => $supportTicket->getId()
            ];

            $this->saveAndSend($supportTicket->getFromUser(), 'New Support Ticket', self::NEW_SUPPORT_TICKET_EMAIL, $params);
        }
    }

    public function notifyUserRegisterSuccess(User $user)
    {
        $params = [
            'name' => $user->getName()
        ];

        $this->saveAndSend($user, 'Successful Registration', self::USER_REGISTER_SUCCESS_EMAIL, $params);
    }

    public function notifyPasswordRequest(User $user, $code)
    {
        $params = [
            'code' => $code,
            'name' => $user->getName()
        ];
        $this->saveAndSend($user, 'Password Reset', self::USER_PASSWORD_RESET_EMAIL, $params);
    }

    public function notifyValidateEmail(User $user)
    {
        $email = $user->getEmail();
        $params = [
            'name' => $user->getName(),
            'email' => $email,
            'code' => $user->getActivationCode(),
            'link' => 'https://www.beddertravel.com/auth/signUp/'.base64_encode($email)
        ];
        $this->saveAndSend($user, 'Confirm Your Email', self::USER_REGISTRATION_EMAIL, $params);
    }
}