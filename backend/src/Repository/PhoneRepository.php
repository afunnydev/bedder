<?php

namespace App\Repository;

use App\Entity\Phone;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

class PhoneRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Phone::class);
    }

    public function getByNumber($number)
    {
      $qb = $this->createQueryBuilder("tc");
      $qb->setMaxResults( 1 );
      $qb->orderBy("tc.id", "DESC");

      return $qb->getQuery()->getSingleResult();
    }
}