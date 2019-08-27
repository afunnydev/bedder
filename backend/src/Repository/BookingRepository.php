<?php

namespace App\Repository;

use App\Entity\Booking;
use App\Entity\Business;
use App\Entity\BusinessUnit;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

class BookingRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Booking::class);
    }

    public function checkAvailability(BusinessUnit $businessUnit, \DateTime $from, \DateTime $to)
    {
//        SELECT * FROM `bookings` WHERE
//            '2018-05-12 11:00:08' BETWEEN booking_from AND booking_to
//            OR '2018-05-13 11:00:08' BETWEEN booking_from AND booking_to
//            OR booking_from BETWEEN '2018-05-12 11:00:08' AND '2018-05-13 11:00:08'
//            OR booking_to BETWEEN '2018-05-12 11:00:08' AND '2018-05-13 11:00:08'
        $qb = $this->createQueryBuilder('b')
                ->where(':booking_from BETWEEN b.bookingFrom AND b.bookingTo')
                ->orWhere(':booking_to BETWEEN b.bookingFrom AND b.bookingTo')
                ->orWhere('b.bookingFrom BETWEEN :booking_from AND :booking_to')
                ->orWhere('b.bookingTo BETWEEN :booking_from AND :booking_to')
                ->andWhere('b.businessUnit = :businessUnit')
                ->setParameter('booking_from', $from)
                ->setParameter('booking_to', $to)
                ->setParameter('businessUnit', $businessUnit)
                ->getQuery();

        return $qb->execute();
    }

}
