<?php

namespace App\Repository;

use App\Entity\User;
use App\Entity\Gain;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

class GainRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Gain::class);
    }

    public function lastMonth(User $user)
    {
        $to =  1;
        $created = new \DateTime('first day of this month midnight');
        $qb = $this->createQueryBuilder('g')
            ->select('SUM(g.amount)')
            ->where('g.created_at >= :created')
            ->setParameter('created', $created);
        $res = $qb->getQuery()->execute();
        if($res && $res[0] && $res[0][1]) {
            return $res[0][1];
        }

        return 0;
    }

    public function lastYear(User $user)
    {
        $created = new \DateTime('first day of this year midnight');
        $qb = $this->createQueryBuilder('g')
            ->select('SUM(g.amount)')
            ->where('g.created_at >= :created')
            ->setParameter('created', $created);
        $res = $qb->getQuery()->execute();
        if($res && $res[0] && $res[0][1]) {
            return $res[0][1];
        }

        return 0;
    }

    public function allTime(User $user)
    {
        $qb = $this->createQueryBuilder('g')
            ->select('SUM(g.amount)');
        $res = $qb->getQuery()->execute();
        if($res && $res[0] && $res[0][1]) {
            return $res[0][1];
        }

        return 0;
    }
}
