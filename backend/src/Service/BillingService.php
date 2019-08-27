<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use Flosch\Bundle\StripeBundle\Stripe\StripeClient;

class BillingService
{
    // Don't forget that percentage is multiplied by 100 cents because Stripe takes integer.
    const DEFAULT_DEPOSIT = 15;

    public function __construct(StripeClient $stripeClient)
    {
      $this->stripeClient = $stripeClient;
    }

    public function chargeDeposit($deposit, $paymentToken) {
      $this->stripeClient->createCharge($deposit , 'USD' , $paymentToken);
    }

}