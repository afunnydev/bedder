<?php

namespace App\Controller;

use App\Service\SmsService;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Twilio\TwiML\MessagingResponse;

/**
 * Sms controller.
 * @Route("/api/sms",name="sms_")
 */

class SmsController extends BaseRestController
{
    /**
     * @Rest\Post("/receive", defaults={"_format"="xml"}, name="receive")
     */
    public function smsAction(Request $request, SmsService $smsService)
    {
        $res = $smsService->process($request);

        $response = new Response($this->renderView(
            'sms/accept.xml.twig'
        ));
        $response->headers->set('Content-Type', 'text/xml');

        return $response;
    }
}