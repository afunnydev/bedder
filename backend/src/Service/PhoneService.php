<?php

namespace App\Service;

use App\Entity\Phone;
use App\Repository\PhoneRepository;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;

class PhoneService
{
    // Every time a code is sent or validated badly, it counts has a try. This is to prevent somebody from spamming the SMS sending feature.
    const TRIES_LIMIT = 10;

    public function __construct(EntityManagerInterface $entityManager,
                                SmsService $smsService,
                                PhoneRepository $phoneRepository,
                                LoggerInterface $logger
    )
    {
        $this->entityManager = $entityManager;
        $this->smsService = $smsService;
        $this->phoneRepository = $phoneRepository;
        $this->logger = $logger;
    }

    public function cleanNumber($number) {
        $number = preg_replace("/[^a-z0-9_\s-]/", "", $number);
        $number = preg_replace("/[\s-]+/", " ", $number);
        $number = preg_replace("/[\s_]/", "", $number);
        return $number;
    }

    public function sendValidationCode(Phone $phone) {
        $tries = $phone->getTries();

        if ($tries > self::TRIES_LIMIT) { return "You failed the validation too many times for this number. Please contact our support team at info@beddertravel.com."; }

        $phone->setTries($tries + 1);
        $this->smsService->sendValidationCode($phone);

        $this->entityManager->persist($phone);
        $this->entityManager->flush();

        return true;
    }

    public function getByNumber($number) {
        return $this->phoneRepository->findOneBy(['number' => $number]);
    }

    // Returns the phone object if it was added succesfully. Returns a string if something unexpected happen. Returns false if the number already exists.
    public function addNumber($number)
    {
        $phone = $this->phoneRepository->findOneBy(['number' => $number]);

        if (!$phone instanceof Phone) {
            $phone = new Phone();
            $phone->setNumber($number);
            $phone->setVerificationCode();
            $phone->setCountry('CA');
        } else {
            // TODO: If the phone is already associated with another user, we can't add it again to this user.
            if ($phone->getVerified()) {
                return false;
            }
            return $phone;
        }

        try {
            $this->entityManager->persist($phone);
            $this->entityManager->flush();
        } catch(\Exception $e) {
            return "An error occured while adding this phone number. Please contact our support team at info@beddertravel.com.";
        }

        return $phone;
    }

    public function verifyNumber($code, $number)
    {
        $phone = $this->phoneRepository->findOneBy(['number' => $number]);

        if (empty($phone)) { return "This number is not in our database."; }
        if ($phone->getVerified()) { return true; }

        $tries = $phone->getTries();

        if ($tries > self::TRIES_LIMIT) { return "You failed the validation too many times for this number. Please contact our support team at info@beddertravel.com."; }

        $valid = "The validation code provided doesn't match the one we sent you";

        if($phone->getVerificationCode() == $code) {
            $phone->setVerified(true);
            $valid = true;
        } else {
            $phone->setTries($tries + 1);
        }

        $this->entityManager->persist($phone);
        $this->entityManager->flush();
        
        return $valid;
    }

}