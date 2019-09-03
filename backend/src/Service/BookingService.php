<?php

namespace App\Service;

use App\Entity\Booking;
use App\Entity\Business;
use App\Entity\BusinessReview;
use App\Entity\BusinessUnit;
use App\Entity\User;
use App\Repository\BookingRepository;
use App\Repository\BusinessRepository;
use App\Repository\BusinessUnitRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Cache\Adapter\RedisAdapter;
use Symfony\Component\Serializer\SerializerInterface;

class BookingService
{

    public function __construct(BookingRepository $bookingRepository,
                                EntityManagerInterface $entityManager,
                                BusinessService $businessService,
                                StatusService $statusService,
                                NotificationService $notificationService,
                                BusinessUnitRepository $businessUnitRepository,
                                BusinessRepository $businessRepository,
                                GainsService $gainsService,
                                BillingService $billingService,
                                SerializerInterface $serializer
    )
    {
        $this->bookingRepository = $bookingRepository;
        $this->entityManager = $entityManager;
        $this->businessService = $businessService;
        $this->statusService = $statusService;
        $this->notificationService = $notificationService;
        $this->businessUnitRepository = $businessUnitRepository;
        $this->businessRepository = $businessRepository;
        $this->gainsService = $gainsService;
        $this->billingService = $billingService;
        $this->serializer = $serializer;

      //   $this->redisClient = RedisAdapter::createConnection(
      //     'redis://localhost'
      // );
    }

    public function getDaysByDate(\DateTime $from, \DateTime $to)
    {
        $days = $from->diff($to);
        return $days->days;
    }

    public function getDays(Booking $booking)
    {
        $days = $booking->getBookingFrom()->diff($booking->getBookingTo());
        return $days->days;
    }

    protected function _calcMargin(Booking $booking)
    {
        $rate = $booking->getBusinessUnit()->getFullRate();
        return (($rate/100)*$this->gainsService->getBM());
    }

    protected function _calcAmount(Booking $booking)
    {
        return $booking->getBusinessUnit()->getFullRate() * $this->getDays($booking);
    }

    protected function _calcToPayThere(Booking $booking)
    {
        return $booking->getBusinessUnit()->getRate() * $this->getDays($booking);
    }

    protected function _calcDeposit($total)
    {
        // To retrieve the deposit, it's $amount - $amount / 1.15, or $amount * 0.1304
        return round($total * 0.1304 + 100);
    }

    public function calcQuote(BusinessUnit $businessUnit, \DateTime $from, \DateTime $to)
    {
        $dummyBooking = new Booking();
        $dummyBooking->setBusiness($businessUnit->getBusiness());
        $dummyBooking->setBusinessUnit($businessUnit);
        $dummyBooking->setBookingFrom($from);
        $dummyBooking->setBookingTo($to);
        $amount = $this->_calcAmount($dummyBooking);
        return [
            'amount' => $amount + 100,
            'deposit' => $this->_calcDeposit($amount),
            'toPayThere' => $this->_calcToPayThere($dummyBooking)
        ];
    }

    public function get($id)
    {
        return $this->bookingRepository->find($id);
    }

    public function getListOwner(User $user)
    {
        return $this->bookingRepository->findBy(['owner' => $user]);
    }

    public function getListAdmin()
    {
        $bookings = $this->bookingRepository->findAll();
        return $this->serializer->serialize($bookings, 'json');
    }

    public function getList(User $user)
    {
        return $this->bookingRepository->findBy(['user' => $user], ['bookingFrom' => 'ASC']);
    }

    public function buildAvailabilityMap()
    {
//        $availabilityMap = $this->redisClient->get('availabilityMap');
//        if($availabilityMap) {
//            $this->out = unserialize($availabilityMap);
//            return true;
//        } else {
            $this->out = [];
//        }


        $startDate = new \DateTime();
        $startDate->modify('-1 day');
        $startDate->setTime(14, 0, 0);

        $endDate = clone $startDate;
        $endDate->setTime(10, 0, 0);
        $endDate->modify('+1 day');

        $bus = $this->businessUnitRepository->findBy([]);

        for($i = 1; $i < 31; $i++) {

            foreach ($bus as $bu) {
                $availability = $this->bookingRepository->checkAvailability($bu, $startDate, $endDate);
                $this->out[$startDate->format('Y-m-d')][$bu->getId()] = (empty($availability)) ? 1 : 0;
            }

            $startDate->modify('+1 day');
            $endDate->modify('+1 day');
        }

//        $this->redisClient->setex('availabilityMap', serialize($this->out), 600);

    }

    public function getAvailableUnits(\DateTime $from, \DateTime $to)
    {
        $from->setTime(12, 0, 0);
        $step = clone $from;
        $to->setTime(12, 0, 0);

        $days = 0;
        $units = [];

        do {

            $days++;

            if(isset($this->out[$step->format('Y-m-d')])) {

                if(empty($units)) {
                    $units += $this->out[$step->format('Y-m-d')];
                } else {
                    array_walk_recursive($this->out[$step->format('Y-m-d')], function($item, $key) use (&$units){
                        $units[$key] = isset($units[$key]) ?  $item + $units[$key] : $item;
                    });
                }

            }

            $step->modify('+1 day');
        } while($step < $to);

        $final = [];

        array_walk_recursive($units, function($item, $key) use (&$final, $days){
            if($item == $days) {
                $final[] = $key;
            }
        });

        return $final;

    }

    public function search(Form $form)
    {
        $this->buildAvailabilityMap();

        $from = new \DateTime($form->get('from')->getData());
        $to = new \DateTime($form->get('to')->getData());

        $price = $form->has('filterPrice') ? $form->get('filterPrice')->getData() : false;

        $units = $this->getAvailableUnits($from, $to);
        $res = $this->businessRepository->search(
            $units,
            (float) $form->get('lat')->getData(),
            (float) $form->get('lon')->getData(),
            $form->get('minPersons')->getData(),
            $form->get('numBed')->getData(),
            $form->get('pageNum')->getData(),
            10,
            $price,
            $form
        );

        $ret = [];
        $ret['res'] = [];
        $ret['days'] = $this->getDaysByDate($from, $to);
        $ret['count'] = $res['count'];

        foreach ($res['res'] as $r) {
            if($r['businessUnitId'] > 0) {
                $r['businessUnit'] = $this->businessService->getBusinessUnit($r['businessUnitId']);
                $ret['res'][] = $r;
            }

        }
        return $ret;
    }

    public function accept(Booking $booking)
    {
        $this->statusService->statusAccepted($booking);
        $this->notificationService->notifyTravellerBookingAccepted($booking);
        return $booking;
    }

    public function decline(Booking $booking)
    {
        $this->statusService->statusDeclined($booking);
        $this->notificationService->notifyTravellerBookingDeclined($booking);
        return $booking;
    }

    public function cancel(Booking $booking)
    {
        $this->statusService->statusCancelled($booking);
        $this->notificationService->notifyBookingCancelled($booking);
        return $booking;
    }

    public function complete(Booking $booking)
    {
        $this->statusService->statusCompleted($booking);
        return $booking;
    }

    public function calcReviews(Business &$business, BusinessReview $businessReview)
    {
        $business->setReviewsNum($business->getReviewsNum()+1);
        $business->setReviewsSum($business->getReviewsSum() + $businessReview->getRating());
        $business->setReviewsAvg(round($business->getReviewsSum() / $business->getReviewsNum(), 1));
//        return $business;
    }

    public function postReview(Booking $booking, Form $form)
    {
        $businessUnit = $booking->getBusinessUnit()->getParentBusinessUnit() ? $booking->getBusinessUnit()->getParentBusinessUnit() : $booking->getBusinessUnit();
        $business = $businessUnit->getBusiness();
        $user = $booking->getUser();

        if($business instanceof Business && $businessUnit instanceof BusinessUnit) {

            $newReview = new BusinessReview();

            if( $form->has('description') ) {
                $newReview->setBody($form->get('description')->getData());
            }

            $newReview->setRatingMoney($form->get('ratingMoney')->getData());
            $newReview->setRatingStaff($form->get('ratingStaff')->getData());
            $newReview->setRatingLocation($form->get('ratingLocation')->getData());
            $newReview->setRatingCleanliness($form->get('ratingCleanliness')->getData());
            $newReview->setRatingServices($form->get('ratingServices')->getData());
            $newReview->setRatingAutomatically();

            $newReview->setBusinessUnit($businessUnit);
            $newReview->setBusiness($business);
            $newReview->setUser($user);
            // $newReview->setPayload($params);
            $businessUnit->addReview($newReview);
            $business->addReview($newReview);
            $booking->setIsReviewed(true);

            $this->calcReviews($business, $newReview);

            $this->entityManager->persist($newReview);
//            $this->entityManager->flush();

            $this->entityManager->persist($businessUnit);
//            $this->entityManager->flush();

            $this->entityManager->persist($business);
            $this->entityManager->flush();

            return $business;
        }

    }

    public function makeFromForm(Form $form, User $user)
    {
        // TODO: Check if start date not past according to place timezone
        if($form->isValid()) {

            $businessUnit = $this->businessService->getBusinessUnit($form->get('businessUnitId')->getData());

            if(!$businessUnit instanceof BusinessUnit) {
                return ['notFound' => 'Room not found'];
            }

            $parentBusinessUnit = $businessUnit->getParentBusinessUnit() ? $businessUnit->getParentBusinessUnit() : $businessUnit;

            if(!$parentBusinessUnit->getBusiness()->getOwnerUser() instanceof User) {
                return ['notFound' => 'Room not ready for bookings.'];
            }

            $from = new \DateTime($form->get('from')->getData());
            $to = new \DateTime($form->get('to')->getData());

            $fromCmp = $from->format('U');
            $toCmp = $to->format('U');

            if($toCmp < $fromCmp || $toCmp == $fromCmp) { // || ($toCmp - $fromCmp) < 86400
                return ['error' => 'These dates are not valid.'];
            }

            $numUnits = $form->get('numUnitsToBook')->getData();
            $availableRooms = [];

            $childRooms = $parentBusinessUnit->getChildBusinessUnit();
            foreach ($childRooms as $childRoom) {
                if (count($availableRooms) == $numUnits) {
                    break;
                }
                $currentBookings = $this->bookingRepository->checkAvailability($childRoom, clone $from, clone $to);
                if(!$currentBookings) {
                    $availableRooms[] = $childRoom;
                }
            }

            if(count($availableRooms) < $numUnits) {
                $buAvail = $this->bookingRepository->checkAvailability($parentBusinessUnit, clone $from, clone $to);
                if(!$buAvail) {
                    $availableRooms[] = $parentBusinessUnit;
                }
            }

            if(count($availableRooms) < $numUnits) {
                return ['error' => 'Not enough room available.'];
            }

            // This is the total amount for all the bookings.
            $roomsTotal = 0;
            $bookings = [];
            $business = $parentBusinessUnit->getBusiness();
            $rate = $parentBusinessUnit->getRate();
            $acceptAutomatically = $parentBusinessUnit->getAcceptAutomatically();

            for($i = 1; $i <= $numUnits ; $i++) {
                $bu = array_shift($availableRooms);

                $booking = new Booking();

                if($acceptAutomatically) {
                    $this->accept($booking);
                } else {
                    $this->statusService->statusNew($booking);
                }

                $booking->setBookingFrom($from);
                $booking->setBookingTo($to);
                // TODO: Set the number of people, or rework this..
                $booking->setNumPeople(2);
                $booking->setBusiness($business);
                $booking->setBusinessUnit($bu);
                $booking->setRate($rate);

                $amount = $this->_calcAmount($booking);
                $roomsTotal += $amount;
                $booking->setAmount($amount + 100);

                $booking->setUser($user);
                $booking->setOwner($businessUnit->getBusiness()->getOwnerUser());

                $this->entityManager->persist($booking);
                $this->entityManager->flush();

                $this->notificationService->notifyOfNewBooking($booking);
                $this->gainsService->gainBookingBook($booking);

                $bookings[] = $booking;
            }

            if(count($bookings) >= 1) {
                $deposit = $this->_calcDeposit($amount);

                $paymentToken = $form->get('stripeToken')->getData();
                $this->billingService->chargeDeposit($deposit, $paymentToken);

                return $bookings;
            }
        }

        return false;
    }

    public function getAvailabilityListFromForm(Form $form)
    {
        if($form->isValid()) {

            $businessUnit = $this->businessService->getBusinessUnit($form->get('businessUnitId')->getData());
            $from = new \DateTime($form->get('from')->getData());
            $to = new \DateTime($form->get('to')->getData());

            if( ($to->format('U')-$from->format('U')) > (Booking::BOOKING_AVAILABILITY_LIST_MAX_RANGE) ) {
                return ['errors' => ['Range should not exceed '.Booking::BOOKING_AVAILABILITY_LIST_MAX_RANGE_IN_DAYS.' days.']];
            }

            if(!$businessUnit->getBusiness()->getOwnerUser() instanceof User) {
                return ['errors' => ['Room not ready for bookings.']];
            }

            $availability = $this->getAvailability($businessUnit, $from, $to);

            return $availability;
        }
    }

    public function checkAvailabilityFromForm(Form $form)
    {
        if($form->isValid()) {
            $businessUnit = $this->businessService->getBusinessUnit($form->get('businessUnitId')->getData());
            $from = new \DateTime($form->get('from')->getData());
            $to = new \DateTime($form->get('to')->getData());

            if(!$businessUnit->getBusiness()->getOwnerUser() instanceof User) {
                return ['errors' => ['Room not ready for bookings.']];
            }

            $availability = $this->checkAvailability($businessUnit, $from, $to);

            return $availability;
        }

    }

    public function getAvailability(BusinessUnit $businessUnit, \DateTime $from, \DateTime $to)
    {
        $res = [];

        $toOriginal = $to;

        $fromCheck = clone $from;
        $toCheck = clone $from;

        $fromCheck->modify('+1 second');
        $toCheck->modify('+1 day');
        $toCheck->modify('-1 second');

        do {
            $availability = $this->bookingRepository->checkAvailability($businessUnit, $fromCheck, $toCheck);

            if($availability) {
                $res[$fromCheck->format('Y-m-d')] = false;
            } else {
                $res[$fromCheck->format('Y-m-d')] = true;
            }

            $fromCheck = $fromCheck->modify('+1 day');
            $toCheck = $toCheck->modify('+1 day');
        } while($fromCheck < $to);


        return $res;
    }

    public function checkAvailability(BusinessUnit $businessUnit, \DateTime $from, \DateTime $to, $numUnits = 1, $numPeople = 2, $numBeds = 1)
    {
        // todo strict to days
        $fromCheck = clone $from;
        $toCheck = clone $to;
        $days = $this->getDaysByDate($from, $to);
        $fromCheck->modify('+1 second');
        $toCheck->modify('-1 second');

//        if($numUnits == 1) {
//
//            $availability = $this->bookingRepository->checkAvailability($businessUnit, $fromCheck, $toCheck);
//            if(!$availability) {
//                return [
//                    'quote' => $this->calcQuote($businessUnit, $from, $to),
//                    'discount' => $this->_getDiscountAmount($businessUnit, $days)
////                    'discount' => $businessUnit->getDiscount()*$days,
//                ];
//            } elseif ($availability) {
//                return false;
//            }
//
//        } else if($numUnits > 1) {

            $available = 0;

        $availability = $this->bookingRepository->checkAvailability($businessUnit, $fromCheck, $toCheck);

        if(!$availability) {
            $available++;
        }

            $childs = $businessUnit->getChildBusinessUnit();
            foreach ($childs as $child) {
                $availability = $this->bookingRepository->checkAvailability($child, $fromCheck, $toCheck);
                if(!$availability) {
                    $available++;
                }
            }

            // -1 for parent business unit
            if($available >= ($numUnits-1)) {
                return [
                    'quote' => ($this->calcQuote($businessUnit, $from, $to)*$numUnits),
                    'numUnits' => $numUnits,
                    'discount' => ($businessUnit->getRate()/100) * $days,//*$days,
                ];
            }

//        }

        return false;

    }

    public function delete(Booking $booking)
    {
        $this->entityManager->remove($booking);
        $this->entityManager->flush();
    }

}
