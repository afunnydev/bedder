<?php
namespace App\EventListener;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Mailer\Event\MessageEvent;
use Symfony\Component\Mime\Email;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mime\NamedAddress;

/* This is the file if you need to add something to ALL emails. */
class MailerFromListener implements EventSubscriberInterface
{
    public function onMessageSend(MessageEvent $event)
    {
        $message = $event->getMessage();

        // make sure it's an Email object
        if (!$message instanceof Email && !$message instanceof TemplatedEmail) {
            return;
        }

        // always set the from address
        // $message->from(new NamedAddress('info@mg.beddertravel.com', 'Antoine'));
    }

    public static function getSubscribedEvents()
    {
        return [MessageEvent::class => 'onMessageSend'];
    }
}