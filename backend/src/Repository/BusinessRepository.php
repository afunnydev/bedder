<?php

namespace App\Repository;

use App\Entity\Business;
use App\Service\StatusService;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Symfony\Component\Form\Form;

class BusinessRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Business::class);
    }

    public function findLikeName($name, $except = [])
    {
        $qb = $this->createQueryBuilder('b');
        return $this->createQueryBuilder('b')
            ->select('b as business')
            ->andWhere($qb->expr()->like('b.name', ':name'))
            ->andWhere('b.id NOT IN (:except)')
            ->setParameter('name', '%'.$name.'%')
            ->setParameter('except', $except)
            ->getQuery()
            ->getResult();
    }

    // as of 7nov2018 this is search function used
    public function search($bIds, $lat, $lon, $minPersons, $numBeds, $pageNum = 1, $pp = 10, $price = false, $form = null)
    {
        if(!$pageNum) {
            $pageNum = 1;
        }

        $ret = [];

        $qb = $this->createQueryBuilder('b')
            ->select('b as business')
            ->innerJoin('b.businessUnits', 'bu')
            ->leftJoin('b.address', 'ba')

            ->addSelect('GEO_DISTANCE(:lat, :lon, ba.lat, ba.lon) as distance')

            ->addSelect('b.id as businessId')
            ->addSelect('bu.id as businessUnitId')

            ->andWhere('bu.id IN (:bIds)')
            ->andWhere('b.status >= :bStatus')
            ->andWhere('bu.maxPersons >= '.$minPersons)
            ->andWhere('(bu.bedsKing+bu.bedsQueen+bu.bedsSimple) >= '.$numBeds)
            ->groupBy('ba.id, bu.id')
            ->setParameter('bIds', $bIds)
            ->setParameter('lat', $lat)
            ->setParameter('bStatus', StatusService::STATUS_LIVE)
            ->setParameter('lon', $lon)
            // This orderBy is needed because the selected business unit is the last business unit. By ordering rows, we make sure that the cheapest available unit will be selected.
            ->orderBy('bu.fullRate','DESC');
            // I tried to do this another way. This leftJoin works to get the cheapest available unit, but if the unit doesn't meet the other requirements, it selects nothing (not the second cheapest unit) :'( BTW, this leftJoin is done "manually" because it was the only way to use 'WITH' and pass a condition. Manully meaning I used App\Entity\BusinessUnit instead of b.businessUnits (https://github.com/doctrine/orm/issues/7193)
            // ->leftJoin('App\Entity\BusinessUnit', 'bu2', 'WITH', '(b.id = bu2.business AND (bu.fullRate > bu2.fullRate OR bu.fullRate = bu2.fullRate AND bu.id < bu2.id))')
            // ->andWhere('bu2.id IS NULL');


        if($price) {
            $qb->andWhere('bu.fullRate >= :priceFrom');
            $qb->andWhere('bu.fullRate <= :priceTo');
            $qb->setParameter('priceFrom', $price[0]*100);
            $qb->setParameter('priceTo', $price[1]*100);
        }
        
        $types_q = '';

        if($form instanceof Form && $form->has('filterTypes')) {
            $types = $form->get('filterTypes')->getData();

            if($types) {
                foreach ($types as $pType) {
                    $test = $pType;
                    if($pType['isActive'] == true ) {
                        if($types_q == '') {
                            $types_q .= 'b.propertyType = '.(int)$pType['id'];
                        } else {
                            $types_q .= ' OR b.propertyType = '.(int)$pType['id'];
                        }
                    }
                }
            }
        }

        if($types_q != '') {
            $qb->andWhere($types_q);
        }

        if($form instanceof Form && $form->has('sortBy')) {
            $sortBy = $form->get('sortBy')->getData();
            if($sortBy) {
                switch ($sortBy) {
                    case 'distanceCityCenterDown':
                        $qb->orderBy('distance','DESC');
                        break;
                    case 'distanceCityCenterUp':
                        $qb->orderBy('distance','ASC');
                        break;
                    case 'ratingDown':
                        $qb->orderBy('b.reviewsAvg','ASC');
                        break;
                    case 'ratingUp':
                        $qb->orderBy('b.reviewsAvg','DESC');
                        break;
                    // We can't use these for now because the orderBy for fullRate needs to be DESC to get the cheapest available unit. TODO
                    // case 'priceDown':
                    //     $qb->orderBy('bu.fullRate','DESC');
                    //     break;
                    // case 'priceUp':
                    //     $qb->orderBy('bu.fullRate','ASC');
                    //     break;
                    default:
                        break;
                }
            }
        }

        $sql = $qb->getQuery()->getSQL();

        $cnt_qb = clone $qb;

        $cntRes = $cnt_qb->getQuery()->execute();

        if($pageNum > 1) {
            $qb->setMaxResults($pp)
                ->setFirstResult(
                    $pageNum == 1
                        ? 0
                        : (($pageNum-1)*$pp)
                );
        }

        $sql = $qb->getQuery()->getSQL();

        $res = $qb->getQuery()->execute();

        $ret['count'] = count($cntRes);
        $ret['res'] = $res;

        return $ret;

    }

}
