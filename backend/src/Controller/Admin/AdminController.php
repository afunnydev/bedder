<?php

namespace App\Controller\Admin;

use App\Service\UserService;
use App\Service\BusinessService;
use App\Service\BookingService;
use App\Entity\User;
use App\Controller\BaseRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\View\View;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * Admin Controller
 * @Route(path="/api/admin", name="admin_")
 */

class AdminController extends BaseRestController
{

    /**
     * @Rest\Get(path="/users/list", name="users_list")
     */
    public function getUsersListAction(Request $request, UserService $userService)
    {
        if ( $this->isGranted('ROLE_ADMIN') === false ) {
          throw new AccessDeniedException();
        }

        $list = $this->resultOr404($userService->getList());
        return new Response($list);
    }

    /**
     * @Rest\Get(path="/businesses/list", name="businesses_list")
     */
    public function getBusinessesListAction(Request $request, BusinessService $businessService)
    {
        if ( $this->isGranted('ROLE_ADMIN') === false ) {
          throw new AccessDeniedException();
        }

        $all = $this->resultOr404($businessService->getListAdmin());
        return new Response($all);
    }

    /**
     * @Rest\Get(path="/bookings/list", name="bookings_list")
     */
    public function getBookingsListAction(Request $request, BookingService $bookingService)
    {
        if ( $this->isGranted('ROLE_ADMIN') === false ) {
          throw new AccessDeniedException();
        }
        
        $all = $this->resultOr404($bookingService->getListAdmin());
        return new Response($all);
    }
}
