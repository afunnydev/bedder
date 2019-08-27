<?php

namespace App\Controller;

use App\Service\SmsService;
use App\Service\NotificationService;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use FOS\RestBundle\View\View;
use Twilio\TwiML\MessagingResponse;

/**
 * Default controller.
 * @Route("/api",name="default_")
 */

class DefaultController extends BaseRestController
{
    /**
     * @Rest\Get("", name="hello")
     */
    public function indexAction(Request $request)
    {
        return [
            'text' => 'Welcome to Bedder Travel!'
        ];
    }

    /**
     * @Rest\Post("/notification/test", name="notification_test")
     */
    public function notificationTestAction(Request $request, NotificationService $notificationService)
    {
        // $notificationService->inviteNewOwner($this->getUser(), "Test Business", "the2deux@gmail.com");
        return [
            "result" => "Test"
        ];
    }
}
