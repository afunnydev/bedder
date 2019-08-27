<?php

namespace App\Repository;

use App\Entity\BusinessUnit;
use App\Entity\Business;
use App\Service\StatusService;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Symfony\Component\Form\Form;

class BusinessUnitRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, BusinessUnit::class);
    }

    public function search($bIds, $lat, $lon, $minPersons, $numBeds, $pageNum = 1, $pp = 10, $price = false, $form = null)
    {
        if(!$pageNum) {
            $pageNum = 1;
        }
        $ret = [];
        $qb = $this->createQueryBuilder('bu')
            ->select('bu as businessUnit')
            ->leftJoin('bu.business', 'b')//, 'ON', 'bu.business_id = b.id') //
            ->leftJoin('b.address', 'ba')
            ->addSelect('b as business')

            ->addSelect('GEO_DISTANCE(:lat, :lon, ba.lat, ba.lon) as distance')

            ->addSelect('b.id as businessId')

            ->andWhere('bu.id IN (:bIds)')
            ->andWhere('bu.maxPersons >= '.$minPersons)
            ->andWhere('(bu.bedsKing+bu.bedsQueen+bu.bedsSimple) >= '.$numBeds)
            ->groupBy('businessId')
            ->setParameter('bIds', $bIds)
            ->setParameter('lat', $lat)
            ->setParameter('lon', $lon);

        if($price) {
            $qb->andWhere('bu.rate >= :priceFrom');
            $qb->andWhere('bu.rate <= :priceTo');
            $qb->setParameter('priceFrom', $price[0]);
            $qb->setParameter('priceTo', $price[1]);
        }

        $stars_q = '';

        for ($i=1; $i <= 5; $i++) {
            if($form instanceof Form && $form->has('filter'.$i.'Star')) {
                $val = $form->get('filter'.$i.'Star')->getData();
                if($val) {
                    if($stars_q == '') {
                        $stars_q .= 'b.stars = '.$i;
                    } else {
                        $stars_q .= ' OR b.stars = '.$i;
                    }
                }
            }
        }

        if($stars_q != '') {
            $qb->andWhere($stars_q);
        }
        // propertyType
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
                        $qb->orderBy('b.reviewsAvg','DESC');
                    break;
                    case 'ratingUp':
                        $qb->orderBy('b.reviewsAvg','ASC');
                    break;
                    case 'priceDown':
                        $qb->orderBy('bu.rate','DESC');
                    break;
                    case 'priceUp':
                        $qb->orderBy('bu.rate','ASC');
                    break;
                    default:
                    break;
                }
            }
        }

        $sql = $qb->getQuery()->getSQL();

        $cnt_qb = clone $qb;

        $cntRes = $cnt_qb->getQuery()->execute();

        $res = $qb->setMaxResults($pp)->setFirstResult(($pageNum == 1 ? 0 : (($pageNum-1)*$pp)))->getQuery()->execute();

        $ret['count'] = count($cntRes);
        $ret['res'] = $res;

        return $ret;
    }
}
