<?php

namespace App\Service;

use App\Entity\Booking;
use Doctrine\ORM\EntityManagerInterface;

class StatusService
{
    const STATUS_NEW = 0;
    const STATUS_PENDING_OWNER = 1;
    const STATUS_DRAFT = 2;
    const STATUS_PENDING = 3;
    const STATUS_CANCELLED = 4;
    const STATUS_DECLINED = 5;
    const STATUS_ACCEPTED = 6;
    const STATUS_PAUSED = 7;
    const STATUS_TO_MODIFY = 8;
    const STATUS_LIVE = 9;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function statusNew($obj)
    {
        $this->status(StatusService::STATUS_NEW, $obj);
    }

    public function statusPendingOwner($obj)
    {
        $this->status(StatusService::STATUS_PENDING_OWNER, $obj);
    }

    public function statusDraft($obj)
    {
        $this->status(StatusService::STATUS_DRAFT, $obj);
    }

    public function statusPending($obj)
    {
        $this->status(StatusService::STATUS_PENDING, $obj);
    }

    public function statusCancelled($obj)
    {
        $this->status(StatusService::STATUS_CANCELLED, $obj);
    }

    public function statusDeclined($obj)
    {
        $this->status(StatusService::STATUS_DECLINED, $obj);
    }

    public function statusAccepted($obj)
    {
        $this->status(StatusService::STATUS_ACCEPTED, $obj);
    }

    public function statusPaused($obj)
    {
        $this->status(StatusService::STATUS_PAUSED, $obj);
    }

    public function statusToModify($obj)
    {
        $this->status(StatusService::STATUS_TO_MODIFY, $obj);
    }

    public function statusLive($obj)
    {
        $this->status(StatusService::STATUS_LIVE, $obj);
    }

    public function status($status, $obj)
    {
        if(method_exists($obj, 'setStatus')) {
            $obj->setStatus($status);
            if(method_exists($obj, 'getId') && $obj->getId() > 0) {
                $this->entityManager->persist($obj);
                $this->entityManager->flush();
            }

        }

    }


}