<?php

namespace App\Controller\Admin;

use App\Service\BusinessService;
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

/**
 * Admin Business Controller
 * @Route(path="/api/admin/business", name="admin_business_")
 */
class AdminBusinessController extends BaseRestController
{
    /**
     * This route acts like a toggle for the blocked state.
     * @Rest\Post(path="/{id}/status", name="edit_status")
     */
    public function editBusinessStatus($id, Request $request, BusinessService $businessService)
    {
        if ( $this->isGranted('ROLE_ADMIN') === false ) {
          throw new AccessDeniedException();
        }

        $params = $this->getRequestContentAsArray($request);
        if (isset($params['status'])) {
            $business = $this->resultOr404($businessService->get($id));

            $response = $this->resultOrError($businessService->updateBusinessStatusAdmin($params['status'], $business), "You can't change the status of this business.", 403);

            return new JsonResponse([
                'message' => $response,
            ]);
        }

        return $this->renderErrors(['You need to pass a new status.']);

    }

}
