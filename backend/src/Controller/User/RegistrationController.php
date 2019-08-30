<?php

namespace App\Controller\User;

use App\Entity\User;
use App\Entity\Business;
use App\Controller\BaseRestController;
use App\Service\BusinessService;
use App\Service\NotificationService;
use App\Service\StatusService;
use App\Service\UserService;
use App\Form\UserRegister;
use App\Event\EmailRegistrationUserEvent;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * User Registration Controller
 * @Route(path="/api/user", name="user_")
 */

class RegistrationController extends BaseRestController
{
    /**
     * @Rest\Post(path="/activate", name="activate")
     */
    public function postActivateAction(Request $request, UserService $userService, NotificationService $notificationService, StatusService $statusService, BusinessService $businessService)
    {
        if($request->get('email') && $request->get('code')) {
            $email = $request->get('email');
            $code = $request->get('code');

            $aUser = $userService->getUserByEmail($email);

            if (!$aUser instanceof User) {
               return $this->renderError(['code' => 404, 'error' => 'No user associated with this email address.']); 
            }

            if ($aUser->getIsActive() != 0) {
               return $this->renderError(['code' => 403, 'error' => 'This user account has already been activated.']);  
            }

            if($aUser->getActivationCode() === $code) {
                $token = $this->get('lexik_jwt_authentication.encoder')
                    ->encode([
                        'email' => $aUser->getEmail(),
                        // 'exp' => time() + 3600 // 1 hour expiration
                    ]);

                $userService->transferTemporaryUserProperties($aUser);

                $notificationService->notifyUserRegisterSuccess($aUser);

                $aUser->setIsActive(1);

                $em = $this->getDoctrine()->getManager();
                $em->persist($aUser);
                $em->flush();
                
                return new JsonResponse(['result' => $aUser, 'token' => $token]);
            } else {
                return $this->renderError(['code' => 403, 'error' => 'Invalid code.']);
            }
        }

        return $this->renderError(['code' => 400, 'error' => 'You need to provide an email and an activation code.']);

    }

    /**
     * @Rest\Post(path="/registerFacebook", name="facebook_registration")
     */
    public function postRegisterFacebookAction(Request $request, NotificationService $notificationService, UserService $userService, BusinessService $businessService)
    {
        $stringPayload = $request->get('facebookPayload');
        $fPayload = json_decode($stringPayload, true);

        $accessToken = $fPayload['accessToken'];
        $fRes = json_decode(file_get_contents('https://graph.facebook.com/me?access_token='.$accessToken), true);

        if(isset($fRes['id']) && $fRes['id'] > 0)  {

            $isUser = $this->getDoctrine()->getRepository(User::class)->findOneBy(['facebookId'=> $fRes['id']]);
            $isUserByEmail = $this->getDoctrine()->getRepository(User::class)->findOneBy(['email'=> $fPayload['email']]);

            if($isUser instanceof User || $isUserByEmail instanceof User) {
                $yoUser = $isUser ? $isUser : $isUserByEmail;
                $yoUser->setFacebookId($fRes['id']);

                $this->getDoctrine()->getManager()->persist($yoUser);
                $this->getDoctrine()->getManager()->flush();

                $token = $this->get('lexik_jwt_authentication.encoder')
                    ->encode([
                        'email' => $yoUser->getEmail(),
                    ]);

                return new JsonResponse(['result' => $yoUser, 'token' => $token]);
            }

            $user = new User();

            $user->setEmail($fPayload['email']);
            $user->setFirstname($fRes['name']);

            $user->setLastname('');
            $user->setPassword('');
            $user->setRoles(['ROLE_USER', 'ROLE_EXPLORER']);

            $user->setFacebookId($fRes['id']);

            $this->getDoctrine()->getManager()->persist($user);
            $this->getDoctrine()->getManager()->flush();

            $userService->transferTemporaryUserProperties($user);

            $token = $this->get('lexik_jwt_authentication.encoder')
                ->encode([
                    'email' => $user->getEmail(),
                ]);

            $notificationService->notifyUserRegisterSuccess($user);

            return new JsonResponse(['result' => $user, 'token' => $token]);
        }

        return $this->renderError(['code' => 500, 'error' => 'Unexpected error.']);
    }

    /**
     * @Rest\Post(path="/register", name="registration")
     */
    public function postRegisterAction(Request $request, UserService $userService, BusinessService $businessService, NotificationService $notificationService)
    {

        $user = new User();
        $form = $this->createForm(UserRegister::class, $user);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $roles = ['ROLE_USER', 'ROLE_EXPLORER'];

            $userByEmail = $userService->getUserByEmail($user->getEmail());
            if($userByEmail) {
                return $this->renderError(['code' => 403, 'error' => 'User with that email is already registered.']);
            }

            // TODO: Add ROLE OWNER to owners.

            $user->setActivationCode($userService->generateRandomString(5));
            $user->setIsActive(0);

            $password = $this->get('security.password_encoder')
                ->encodePassword($user, $user->getPassword());
            $user->setPassword($password);
            $user->setRoles($roles);

            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            $notificationService->notifyValidateEmail($user);

            return new JsonResponse(['result' => $user]);
        }

        return $this->renderError(['code' => 500, 'error' => 'Unexpected error.']);
    }
}
