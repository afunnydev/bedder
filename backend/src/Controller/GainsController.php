<?php

namespace App\Controller;

use App\Service\GainsService;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Gains controller.
 * @Route("/api/gains",name="gains_")
 */

class GainsController extends BaseRestController
{
    /**
     * @Rest\Get(path="/list", name="list")
     */
    public function getGainsAction(GainsService $gainsService)
    {

        $gains = $gainsService->getList($this->getUser());
        $stats = $gainsService->getStats($this->getUser());
        
        if($gains && $stats) {
            return [
                'gains' => $gains,
                'stats' => $stats 
            ];
        } else {
            throw new NotFoundHttpException("There's no gains yet for this user.");
        }

    }
}