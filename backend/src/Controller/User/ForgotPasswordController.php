<?php

namespace App\Controller\User;

use App\Controller\BaseRestController;
use App\Entity\PasswordReset;
use App\Repository\PasswordResetRepository;
use App\Entity\User;
use App\Utils\PasswordGenerator;
use App\Event\EmailForgotPasswordEvent;
use App\Form\ForgotPasswordForm;
use App\Service\NotificationService;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * Forgot Password Controller
 * @Route(path="/api/user", name="user_")
 */

class ForgotPasswordController extends BaseRestController
{
    /**
     * Valid the code sent.
     * @Rest\Post(path="/forgotPassword", name="forgot_password_validate")
     */
    public function postForgotPasswordAction(Request $request, PasswordResetRepository $passwordResetRepository)
    {
        $params = $this->getRequestContentAsArray($request);

        if(isset($params['code']) && strlen($params['code']) > 0
            && isset($params['email']) && strlen($params['email']) > 0
            && isset($params['password']) && strlen($params['password']) > 0) {


            $em = $this->getDoctrine()->getManager();
            $resetUser = $em->getRepository(User::class)->findOneBy(['email' => $params['email']]);
            if($resetUser instanceof User && $resetUser->getPasswordReset() && $resetUser->getPasswordReset()->getCode()) {

//                if($resetUser->getPasswordReset()->getTries() >= PasswordReset::MAX_TRIES) {
//                    return $this->renderErrors(['Unexpected error.']);
//                }

                $created = $resetUser->getPasswordReset()->getCreatedAt();
                $now = new \DateTime();
                $elapsed = $now->format('U') - $created->format('U');

                if($resetUser->getPasswordReset()->getCode() == $params['code'] && $elapsed <= PasswordReset::PASSWORD_RESET_ALIVE) {

                    $resetUser->setPassword($this->get('security.password_encoder')
                        ->encodePassword($resetUser, $params['password']));
                    
                    $em->remove($resetUser->getPasswordReset());
                    $resetUser->setPasswordReset(NULL);
                    $em->persist($resetUser);
                    $em->flush();

                    return $this->renderResult($resetUser);

                } else {
                    $resetUser->getPasswordReset()->setTries($resetUser->getPasswordReset()->getTries()+1);
                    $em->persist($resetUser);
                    $em->flush();
                    return $this->renderErrors(['Wrong credentials.']);
                }
            }
        }

        return $this->renderErrors(['Unexpected error.']);
    }

    /**
     * @Rest\Post(path="/forgotPasswordRequest", name="forgot_password_request")
     */
    public function postForgotPasswordRequestAction(Request $request, PasswordResetRepository $passwordResetRepository, NotificationService $notificationService)
    {
        $user = new User();
        $form = $this->createForm(ForgotPasswordForm::class, $user);
        $form->handleRequest($request);

        if ($form->isValid()) {

            $email = $request->request->get('email');
            $em = $this->getDoctrine()->getManager();
            $resetUser = $em->getRepository(User::class)->findOneBy(['email' => $email]);

            if(!$resetUser instanceof User) {
                return $this->renderErrors(['No such user found.']);
            }

            $pr = $resetUser->getPasswordReset();
            $ok = false;

            if($pr instanceof PasswordReset) {
                $notificationService->notifyPasswordRequest($resetUser, $pr->getCode());
                return $this->renderErrors(['CODE_SENT_AGAIN']);
            }

            if(!$pr || $ok) {
                $code = rand(0,9).rand(0,9).rand(0,9).rand(0,9).rand(0,9);

                $pr = new PasswordReset();
                $pr->setUser($resetUser);
                $pr->setCode($code);

                $em->persist($pr);
                $em->flush();

                $resetUser->setPasswordReset($pr);

                $em->persist($resetUser);
                $em->flush();

                $notificationService->notifyPasswordRequest($resetUser, $code);
                return $this->handleView(new View(['result' => $pr]));
            }

            return $this->renderErrors(['Unexpected error.']);
        }
    }
}
