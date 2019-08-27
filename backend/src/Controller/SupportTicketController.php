<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\SupportTicket;
use App\Entity\File;
use App\Form\SupportTicketForm;
use App\Service\SupportTicketService;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * Support Ticket controller.
 * @Route("/api/support",name="support_")
 */

class SupportTicketController extends BaseRestController
{

    /**
     * @Rest\Post(path="", name="create")
     */
    public function supportTicketPostAction(Request $request, SupportTicketService $supportTicketService)
    {

        $form =  $this->proceedForm($request, SupportTicketForm::class, null);

        if($form instanceof Form) {

            $st = $this->resultOrError($supportTicketService->createFromForm($form, $this->getUser()));

            if($st instanceof SupportTicket) {
                return $this->handleView(new View( ['result' => $supportTicketService->get($st->getId())] ));
            }

            if(isset($st['errors'])) {
                return $this->handleView(
                    new View($st)
                );
            }

        } else {
            return $this->handleView(new View($form));
        }

    }
}
