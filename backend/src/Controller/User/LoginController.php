<?php

namespace App\Controller\User;

use App\Controller\BaseRestController;
use App\Entity\User;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\Routing\Annotation\Route;

/**
 * User Login Controller
 * @Route(path="/api/user", name="user_")
 */

class LoginController extends BaseRestController
{
    /**
     * @Rest\Post("/facebook", name="facebook_login")
     */
    public function newFacebookAction(Request $request)
    {
        $fPayload = $request->get('facebookPayload');
        $accessToken = $fPayload['accessToken'];
        $fRes = json_decode(file_get_contents('https://graph.facebook.com/me?access_token='.$accessToken), true);

        if(isset($fRes['id']) && $fRes['id'] > 0)  {
            $user = $this->getDoctrine()->getRepository(User::class)->findOneBy(['facebookId'=> $fRes['id']]);
            if($user instanceof User) {
                if ($user->getIsBlocked()) {
                    return $this->renderErrors(['Your user has been blocked by an admin. Please contact info@beddertravel.com for more information.']);
                }
                $token = $this->get('lexik_jwt_authentication.encoder')
                    ->encode([
                        'email' => $user->getEmail(),
                    ]);
                return new JsonResponse([
                    'token' => $token,
                    'user' => $user
                ]);
            } else {
                return new JsonResponse([
                    'result' => 'not_registered'
                ]);
            }
        }

        return new JsonResponse([
            'result' => false
        ]);
    }


    /**
     * @Rest\Post("/token", name="token_login")
     */
    public function newTokenAction(Request $request)
    {
        $email = $request->get('email');
        $user = $this->getDoctrine()->getRepository(User::class)->findOneBy(['email'=> $email]);

        if (!$user) {
            return $this->renderError(['code' => 401, 'error' => 'There\'s no user associated with '.$email.'.  Please create an account first.']);
        }

        $isValid = $this->get('security.password_encoder')
            ->isPasswordValid($user, $request->get('password'));

        if (!$isValid) {
            return $this->renderErrors(['This email isn\'t associated with this password. Please try again.']);
        }

        if($user->getIsActive() === 0) {
            return $this->renderErrors(['Your email still needs to be validated. Please follow instruction on the email we sent you when you created your account.']);
        } else if ($user->getIsBlocked()) {
            return $this->renderErrors(['Your user has been blocked by an admin. Please contact info@beddertravel.com for more information.']);
        }

        $token = $this->get('lexik_jwt_authentication.encoder')
            ->encode([
                'email' => $user->getEmail(),
//                'exp' => time() + 3600 // 1 hour expiration
        ]);

        return new JsonResponse([
            'token' => $token,
            'user' => $user
        ]);
    }
}
