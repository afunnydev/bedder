<?php

namespace App\Utils;

use Flosch\Bundle\StripeBundle\Stripe\StripeClient as BaseStripeClient;
use Stripe\Stripe,
    Stripe\Charge,
    Stripe\Customer,
    Stripe\Coupon,
    Stripe\Plan,
    Stripe\Subscription,
    Stripe\Refund;

class StripeClient extends BaseStripeClient
{

    private $stripeApiKey;

    public function __construct($stripeApiKey)
    {
        parent::__construct($stripeApiKey);

        return $this;
    }

    public function myOwnMethod()
    {
        // Do what you want here...
    }
}