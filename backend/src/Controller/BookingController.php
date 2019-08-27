<?php

namespace App\Controller;

use App\Entity\Booking;
use App\Entity\User;
use App\Entity\Business;
use App\Form\Booking\PostBookingForm;
use App\Form\Booking\PostBookingAvailabilityForm;
use App\Form\SearchForm;
use App\Service\BookingService;
use App\Service\BusinessService;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * Booking controller.
 * @Route("/api/booking",name="booking_")
 */

class BookingController extends BaseRestController
{
    /**
     * Search for availability.
     * @Rest\Post("/search", name="search")
     * @return Response
     * @throws HttpException on application failure
     */
    public function bookingSearchAction(Request $request, BookingService $bookingService)
    {
        $form =  $this->proceedForm($request, SearchForm::class, null);

        if($form instanceof Form) {
            $res = $bookingService->search($form);

            if(isset($res['errors'])) {
                return $this->renderErrors($res);
            }

            return $this->renderApi([
                'result' => $res['res'], 
                'count' => $res['count'], 
                'days' => $res['days']
            ]);

        } else if(isset($form['errors'])) {
            return $this->renderFormErrors($form);
        }

    }

    /**
     * Accept the booking of :id
     * @Rest\Post(path="/{id}/accept", name="accept")
     * @return Response
     * @throws AccessDeniedException if it's not the owner of the accomodation.
     */
    public function bookingAcceptAction($id, Request $request, BookingService $bookingService)
    {
        $booking = $bookingService->get($id);
        $this->resultOrAccessDenied(($booking->getBusiness()->getOwnerUser() instanceof User
            && $this->getUser() == $booking->getBusiness()->getOwnerUser()));
        $booking = $bookingService->accept($booking);
        return $this->handleView( new View(['result' => $this->resultOr404($booking)]) );
    }

    /**
     * Decline the booking of :id
     * @Rest\Post(path="/{id}/decline", name="decline")
     * @return Response
     * @throws AccessDeniedException if it's not the owner of the accomodation.
     */
    public function bookingDeclineAction($id, Request $request, BookingService $bookingService)
    {
        $booking = $bookingService->get($id);
        $this->resultOrAccessDenied(($booking->getBusiness()->getOwnerUser() instanceof User
            && $this->getUser() == $booking->getBusiness()->getOwnerUser()));
        $booking = $bookingService->decline($booking);
        return $this->handleView( new View(['result' => $this->resultOr404($booking)]) );
    }

    /**
     * 
     * @Rest\Get(path="/list", name="list")
     * @return Response
     */
    public function bookingGetListAction(Request $request, BookingService $bookingService)
    {
        $res = $bookingService->getList($this->getUser());

        return $this->handleView( new View(['result' => $res]) );
    }

    /**
     * 
     * @Rest\Get(path="/listOwner", name="list_owner")
     * @return Response
     */
    public function bookingGetListOwnerAction(Request $request, BookingService $bookingService)
    {
        $res = $bookingService->getListOwner($this->getUser());
        return $this->handleView( new View(['result' => $res]) );
    }

    /**
     * @Rest\Get(path="/{id}", name="get")
     */
    public function bookingGetAction($id, Request $request, BookingService $bookingService, SerializerInterface $serializer)
    {
        $booking = $this->resultOr404($bookingService->get($id));

        $this->accessCheck($this->getUser(), self::class, $booking);

        return new Response($serializer->serialize($booking, 'json'));
    }

    /**
     * @Rest\Post(path="", name="create")
     */
    public function bookingPostAction(Request $request, BookingService $bookingService, BusinessService $businessService)
    {

        $form =  $this->proceedForm($request, PostBookingAvailabilityForm::class, null);

        if($form instanceof Form) {

            $this->resultOr404($businessService->getBusinessUnit($form->get('businessUnitId')->getData()));

            $booking = $bookingService->makeFromForm($form, $this->getUser());

            if($booking instanceof Booking) {
                return $this->handleView(
                    new View( ['result' => $bookingService->get($booking->getId())] )
                );
            }

            if(isset($booking['notFound'])) {
                throw new NotFoundHttpException($booking['error']);
            }

            if(isset($booking['error'])) {
                throw new HttpException(403, $booking['error']);
            }

            return $this->handleView(
                new View( ['result' => $booking] )
            );

        } else if(isset($form['errors'])) {
            throw new HttpException(400, $form['errors'][0]);
        }

    }

    /**
     * @Rest\Delete(path="/{id}", name="delete")
     */
    public function bookingDeleteAction($id, Request $request, BookingService $bookingService)
    {
        $this->resultOr404($booking = $bookingService->get($id));

        $this->accessCheck($this->getUser(), self::class, $booking);

        $bookingService->delete($booking);

        return $this->handleView(new View( ['result' => 'success'] ));

    }

    /**
     * @Rest\Post(path="/{id}/reviews", name="create_review")
     */
    public function businessReviewPostAction($id, Request $request, BusinessService $businessService, BookingService $bookingService)
    {
        $this->resultOr404($booking = $bookingService->get($id));

        $endDate = $booking->getBookingTo();
        $now = new \DateTime();

        if ( $booking->getUser() !== $this->getUser() ) {
            throw new AccessDeniedException();
        }

        if ( $endDate > $now ) {
            return $this->renderErrors(['This reservation is still ongoing, or hasn\'t started yet.']);
        }

        if ( $booking->getIsReviewed() ) {
            return $this->renderErrors(['This reservation has already been reviewed. Thanks for your help!']);
        }

        $form = $this->proceedForm($request, BusinessReviewForm::class, null);

        if ($form instanceof Form) {

            $business = $this->resultOrError($bookingService->postReview($booking, $form));

            if($business instanceof Business) {
                return $this->handleView(new View( ['result' => $businessService->get($business->getId())] ));
            } else {
                return $this->resultOrError(false);
            }
        } else if (isset($form['errors'])) {
            return $this->renderFormErrors($form);
        }

    }

}
