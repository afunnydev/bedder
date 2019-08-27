<?php

namespace App\Controller;

use App\Entity\Business;
use App\Entity\BusinessComment;
use App\Entity\BusinessUnit;
use App\Entity\File;
use App\Entity\User;
use App\Repository\BookingRepository;
use App\Service\GainsService;
use App\Service\NotificationService;
use App\Service\StatusService;
use App\Service\BookingService;
use App\Service\BusinessService;
use App\Form\Business\PutBusinessForm;
use App\Form\Business\PostBusinessSimpleForm;
use App\Form\Business\BusinessReviewForm;
use App\Controller\BaseRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\View\View;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Psr\Log\LoggerInterface;

/**
 * Business controller.
 * @Route("/api/business",name="business_")
 */

class BusinessController extends BaseRestController
{

    /**
     * @Rest\Post(path="", name="create")
     */
    public function businessPostAction(Request $request, BusinessService $businessService)
    {
        $form =  $this->proceedForm($request, PostBusinessSimpleForm::class, null);

        if($form instanceof Form) {

            $business = $this->resultOrError($businessService->createFromSimpleForm($form, $this->getUser()));

            if($business instanceof Business) {
                $res = $business->jsonSerialize();
                $res['business'] = $res;

                $similarNames = $businessService->findSimilarNames($business);

                if($similarNames) {
                    $res['similarNames'] = $similarNames;
                }
                return $this->handleView(new View( ['result' => $res] ));
            } elseif(isset($business['errors'])) {
                return $this->handleView(new View($business));
            } else {
                return $this->handleView(new View(['errors' => 'An error occured while creating this business. Please try again later.']));
            }

        } else if(isset($form['errors'])) {
            return $this->handleView(new View($form));
        }
    }

    /**
     * @Rest\Get(path="/list", name="list")
     */
    public function businessGetListAction(Request $request, BusinessService $businessService)
    {
        $user = $this->getUser();

        $businesses = $businessService->getListExplorer($user);
        $draft = [];

        foreach ($businesses as $key => $business) {
            if ($business->getStatus() >= StatusService::STATUS_LIVE) {
                break;
            }
            $draft[] = $business;
            unset($businesses[$key]);
        }

        return $this->handleView( new View([
            'draft' => $draft,
            'live' => array_values($businesses)
        ]) );
    }

    /**
     * @Rest\Get(path="/{id}", name="get")
     */
    public function businessGetAction($id, Request $request, BusinessService $businessService)
    {
        $business = $this->resultOr404($businessService->get($id));
        return $this->handleView( new View([
            'result' => $business->jsonSerialize(),
        ]) );
    }

    /**
     * @Rest\Put(path="/{id}", name="update")
     */
    public function businessPutAction($id, Request $request, BusinessService $businessService)
    {

        $form =  $this->proceedForm($request, PutBusinessForm::class, null);

        if($form instanceof Form) {

            $this->resultOr404($business = $businessService->get($id));

            $this->accessCheck($this->getUser(), self::class, $business);

            $business = $this->resultOrError($businessService->updateFromForm($id, $form, $this->getUser()));
            $resBis = $business->jsonSerialize();
            $resBis['business'] = $resBis;

            if($business instanceof Business) {
                return $this->handleView(new View( ['result' => $resBis] ));
            } elseif(isset($business['errors'])) {
                return $this->renderErrors($business['errors']);
            }

        } else if(isset($form['errors'])) {
            return $this->handleView(new View($form));
        }

    }

    /**
     * @Rest\Delete(path="/{id}", name="delete")
     */
    public function businessDeleteAction($id, Request $request, BusinessService $businessService)
    {
        // $this->resultOr404($business = $businessService->get($id));

        // $this->accessCheck($this->getUser(), self::class, $business);

        // $businessService->delete($business);

        return $this->handleView(new View( ['result' => 'Not implemented.'] ));
    }

    /**
     * @Rest\Get(path="/{id}/quotes", name="get_quotes")
     */
    public function businessGetQuotesAction($id, Request $request, BookingRepository $bookingRepository, BusinessService $businessService, BookingService $bookingService)
    {
        $business = $this->resultOr404($businessService->get($id));
        $quotes = [];

        $from = new \DateTime($request->get('from'));
        $to = new \DateTime($request->get('to'));
        $numBeds = $request->get('numBeds');
        $minPersons = $request->get('minPersons');

        foreach ($business->getBusinessUnits() as $businessUnit) {
            if ($minPersons) {
                if ($minPersons > $businessUnit->getMaxPersons()) {
                    break;
                }
            }
            // TODO: Check nb of beds
            $hasParent = $businessUnit->getParentBusinessUnit() ? true : false;
            $buId = $hasParent ? $businessUnit->getParentBusinessUnit()->getId() : $businessUnit->getId();

            if(!isset($quotes[$buId])) {
               $quotes[$buId] = $businessUnit->jsonSerialize();
               $quotes[$buId]['available'] = 0;
            }

            $bookingMadeInDates = $bookingRepository->checkAvailability($businessUnit, $from, $to);

            if (!$bookingMadeInDates) {
                $quotes[$buId]['available']++;
                if(!isset($quotes[$buId]['quote'])) {
                    $quote = $bookingService->calcQuote($businessUnit, $from, $to);
                    $quotes[$buId]['quote'] = $quote['amount'];
                    $quotes[$buId]['deposit'] = $quote['deposit'];
                    $quotes[$buId]['toPayThere'] = $quote['toPayThere'];
                }
            }
        }

        return $this->handleView( new View([
            'result' => array_values($quotes),
        ]) );
    }

    /**
     * @Rest\Get(path="/{id}/reviews", name="get_reviews")
     */
    public function businessGetReviewsAction($id, Request $request, BusinessService $businessService)
    {
        $this->resultOr404($business = $businessService->get($id));

        if($business instanceof Business) {
            $rawReviews = $business->getReviews();
            $reviews = [];
            if($rawReviews) {
                foreach ($rawReviews as $review) {
                    array_unshift($reviews, $review);
                }
            }
            return new JsonResponse(['reviews' => $reviews]);
        } else {
            return $this->resultOrError(false);
        }

    }
}
