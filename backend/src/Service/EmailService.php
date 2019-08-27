<?php

namespace App\Service;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\NamedAddress;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;

class EmailService
{
    public function __construct(MailerInterface $mailer)
    {
      $this->mailer = $mailer;
    }

    public function send(User $toUser = null, $subject = 'Bedder Travel', $type = null, $params = [], $toEmail = '')
    {
        $email = '';
        if ($toUser !== null) {
            $email = $toUser->getEmail();
        } else if ($toEmail !== '') {
            $email = $toEmail;
        } else {
            return false;
        }

        $message = (new TemplatedEmail())
            ->from(new NamedAddress('info@mg.beddertravel.com', 'Antoine'))
            ->to($email)
            ->subject($subject)
            ->htmlTemplate($type)
            ->context($params);
        
        $this->mailer->send($message);
    }

}
