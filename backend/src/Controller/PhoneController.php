<?php

namespace App\Controller;

use App\Entity\Phone;
use App\Service\Notification\NotificationSMSService;
use App\Service\PhoneService;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

/**
 * Phone controller.
 * @Route("/api/phone",name="phone_")
 */

class PhoneController extends BaseRestController
{

    /**
     * @Rest\Post("", name="create")
     */
    public function phoneAddAction(Request $request, PhoneService $phoneService)
    {
        $number = $request->get('number');
        if (!is_string($number)) {
            throw new BadRequestHttpException('The number provided isn\'t in the expected format. We can\'t validate it.');
        }
        $number = $phoneService->cleanNumber($number);
        $phone = $phoneService->addNumber($number);

        if ($phone instanceof Phone) {
            $phoneService->sendValidationCode($phone);
            return $this->renderResult(['message' => 'Message sent.']);
        } else if ($phone === false) {
            return $this->renderResult(['message' => 'Phone already validated.']);
        }
        
        throw new HttpException($phone);
    }

    /**
     * @Rest\Post("/verify", name="verify")
     */
    public function phoneVerifyAction(Request $request, PhoneService $phoneService)
    {
        $code = $request->get('code');
        $number = $request->get('number');
        if (!is_string($number) || !is_string($code)) {
            throw new BadRequestHttpException('The phone number and the validation code are both required in the appropriate format.');
        }
        $number = $phoneService->cleanNumber($number);
        $validated = $phoneService->verifyNumber($code, $number); 

        if ($validated !== true) {
            throw new AccessDeniedHttpException($validated);
        } 
        return $this->renderResult(['message' => 'Phone validated.']);
    }

}
