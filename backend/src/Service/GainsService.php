<?php

namespace App\Service;

use App\Entity\Booking;
use App\Entity\Gain;
use App\Entity\User;
use App\Repository\GainRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;

class GainsService
{

    public function __construct(
        EntityManagerInterface $entityManager,
        GainRepository $gainRepository
    )
    {
        $this->em = $entityManager;
        $this->gainRepository = $gainRepository;
    }

    public function calcMargin(Booking $booking, User $user)
    {
        $explorerEarning = $user->getExplorerEarning();
        $amount = $booking->getAmount();
        return ($amount/100) * $explorerEarning;
    }

    public function getList(User $user)
    {
        return $this->gainRepository->findBy(['user' => $user]);
    }

    public function getStats(User $user)
    {
//        return [];
        $month = $this->gainRepository->lastMonth($user);
        $year = $this->gainRepository->lastYear($user);
        $all = $this->gainRepository->allTime($user);
        return [
            'debit' => $user->getDebit(),
            'month' => $month,
            'year' => $year,
            'all' => $all
        ];
    }

    public function gainBookingBook(Booking $booking)
    {
        $gain = new Gain();
        $user = $booking->getBusinessUnit()->getBusiness()->getManageUser();
        $margin = $this->calcMargin($booking, $user);
        $gain->setBooking($booking);
        $gain->setUser($user);
        $gain->setAmount($margin);

        $this->em->persist($gain);
        $this->em->flush();

        if($gain) {
            $user->setDebit($user->getDebit() + $margin);
            $this->em->persist($user);
            $this->em->flush();
        }
    }
}