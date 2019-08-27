<?php

namespace App\Service;

use App\Entity\SupportTicket;
use App\Entity\User;
use App\Repository\SupportTicketRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Freshdesk\Api as FreshdeskClient;

class SupportTicketService
{

    public function __construct( SupportTicketRepository $supportTicketRepository,
                                 HelperService $helperService,
                                 EntityManagerInterface $entityManager,
                                 StatusService $statusService,
                                 NotificationService $notificationService,
                                 FreshdeskClient $freshdeskClient
    )
    {
        $this->supportTicketRepository = $supportTicketRepository;
        $this->helperService = $helperService;
        $this->entityManager = $entityManager;
        $this->statusService = $statusService;
        $this->notificationService = $notificationService;
        $this->freshdeskClient = $freshdeskClient;
    }

    public function get($id)
    {
        return $this->supportTicketRepository->find($id);
    }

    public function resolve($id)
    {
        $st = $this->supportTicketRepository->find($id);

        if($st instanceof SupportTicket) {
            $st->setStatus(SupportTicket::STATUS_RESOLVED);

            $this->entityManager->persist($st);
            $this->entityManager->flush();

//            $this->notificationService->notifyResponseST($st);

            return $st;
        }
    }

    public function response($id, Request $request)
    {
        $st = $this->supportTicketRepository->find($id);

        if($st instanceof SupportTicket) {
            $st->setResponse($request->get('response'));

            $this->entityManager->persist($st);
            $this->entityManager->flush();

            $this->notificationService->notifyResponseST($st);

            return $st;
        }
    }

    public function getListFull()
    {
        return $this->supportTicketRepository->findAll();
    }

    public function getListNew()
    {
        return $this->supportTicketRepository->findBy(['status' => SupportTicket::STATUS_NEW]);
    }

    // @todo implement flood check for anon?
    public function createFromForm(Form $form, $user = null)
    {
        if($form->isValid()) {
            $data = [
                'name' => $user->getName(),
                'email' => $user->getEmail(),
                'subject' => ($form->has('subject')) ? $form->get('subject')->getData() : null,
                'description' => $form->get('message')->getData()
            ];

            // $this->freshdeskClient->tickets->create($data);

            $st = new SupportTicket();
            $st->setType(($form->get('type')->getData()) ? $form->get('type')->getData() : 0);
            
            $st->setMessage($data['description']);
            $st->setSubject($data['subject']);
            $st->setIp($this->helperService->getIp());

            $this->statusService->statusNew($st);

            if($user instanceof User) {
                $st->setFromUser($user);
            }

            $this->entityManager->persist($st);
            $this->entityManager->flush();

            $this->notificationService->notifyNewST($st);

            return $st;

        }
    }

    public function delete(SupportTicket $st)
    {
        $this->entityManager->remove($st);
        $this->entityManager->flush();
    }
}