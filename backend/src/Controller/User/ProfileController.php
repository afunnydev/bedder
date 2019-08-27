<?php

namespace App\Controller\User;

use App\Controller\BaseRestController;
use App\Entity\User;
use App\Form\UserProfileAdminForm;
use App\Form\UserProfileForm;
use App\Service\UserService;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * User Profile Controller
 * @Route(path="/api/user", name="user_")
 */

class ProfileController extends BaseRestController
{
    /**
     * @Rest\Put(path="", name="update")
     */
    public function userPutAction( Request $request, UserService $userService)
    {
        $updateUser = $this->getUser();

        $this->resultOrAccessDenied(($updateUser instanceof User && $updateUser->getId() == $this->getUser()->getId()));

        $user = new User();

        if($this->isGranted('ROLE_ADMIN')) {
            $form =  $this->proceedForm($request, UserProfileAdminForm::class, $user);
        } else {
            $form =  $this->proceedForm($request, UserProfileForm::class, $user);
        }

        if($form instanceof Form) {

            $encodedPass = false;

            if(strlen($form->get('oldPassword')->getData()) > 0) {
                $oldPass = $form->get('oldPassword')->getData();
                $isValid = $this->get('security.password_encoder')
                    ->isPasswordValid($updateUser, $form->get('oldPassword')->getData());
                if(!$isValid) {
//                    $not = 1;
                    return $this->renderError(['code' => 500, 'error' => 'Wrong password.']);
                } else {
                    $encodedPass = $this->get('security.password_encoder')->encodePassword($updateUser, $form->get('newPassword')->getData());
                }
            }

            $user = $userService->update($updateUser->getId(), $user, $form, $encodedPass);

            if($user instanceof User) {
                return $this->renderResult($user);
            }

        } else if(isset($form['errors'])) {
            return $this->handleView(new View($form));
        }


        return $this->renderResult('false');
    }

    /**
     * @Rest\Get(path="", name="get")
     */
    public function userGetAction(Request $request, UserService $userService)
    {
        return $this->renderResult($this->getUser());
    }
}
