<?php

namespace App\Controller\Admin;

use App\Service\UserService;
use App\Controller\BaseRestController;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * Admin User Controller
 * @Route(path="/api/admin/user", name="admin_user_")
 */

class AdminUserController extends BaseRestController
{
    /**
     * @Rest\Get(path="/{id}", name="get")
     */
    public function getUserAction($id, Request $request, UserService $userService, SerializerInterface $serializer)
    {
        if ( $this->isGranted('ROLE_ADMIN') === false ) {
          throw new AccessDeniedException();
        }
          
        $user = $this->resultOr404($userService->get($id));
        $rawBookings = $user->getBookings();
        $bookings = [];
        if($rawBookings) {
            foreach ($rawBookings as $booking) {
                $bookings[] = $booking;
            }
        }

        $rawBusinesses = $user->getManageBusinesses();
        $businesses = [];
        if($rawBusinesses) {
            foreach ($rawBusinesses as $business) {
                $businesses[] = $business;
            }
        }

        $rawSupportTickets = $user->getSupportTickets();
        $supportTickets = [];
        if($rawSupportTickets) {
            foreach ($rawSupportTickets as $supportTicket) {
                $supportTickets[] = $supportTicket;
            }
        }
        $explorerEarning = $user->getExplorerEarning();
      
        return new JsonResponse([
            'user' => json_decode($serializer->serialize($user, 'json')),
            'bookings' => $bookings,
            'businesses' => $businesses,
            'support' => $supportTickets,
            'explorerEarning' => $explorerEarning
        ]);
    }

    /**
     * This route acts like a toggle for the blocked state.
     * @Rest\Post(path="/{id}/block", name="block")
     */
    public function blockUserAction($id, Request $request, UserService $userService)
    {
        if ( $this->isGranted('ROLE_ADMIN') === false ) {
          throw new AccessDeniedException();
        }

        $user = $this->resultOr404($userService->get($id));

        $response = $this->resultOrError($userService->handleBlockState($user), "You can't block or unblock this user.", 403);

        return new JsonResponse([
            'message' => $response,
        ]);
    }

}
