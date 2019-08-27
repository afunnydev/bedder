<?php

namespace App\Service;

use App\Entity\Phone;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Twilio\Rest\Client;
use Twilio\TwiML\MessagingResponse;

class SmsService
{
    private $twilio;

    public function __construct(
        Client $twilio
    )
    {
        $this->twilio = $twilio;
        $this->twilio_number = "+14387963079";
    }


    public function process(Request $request)
    {

        $content = $request->getContent();
        $data = json_decode($content);

        return $data;

    }

    public function sendValidationCode(Phone $phone)
    {
        $number = $phone->getNumber();
        $verificationCode = $phone->getVerificationCode();
        $this->twilio->messages->create(
            '+'.$number,
            array(
                'from' => $this->twilio_number,
                'body' => 'Your verification code is: '.$verificationCode
            )
        );
    }


}