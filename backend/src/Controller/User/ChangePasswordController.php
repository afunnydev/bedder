<?php

namespace App\Controller\User;

use App\Controller\BaseRestController;
use App\Form\ChangePasswordForm;
use App\Entity\User;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * Change Password Controller
 * @Route(path="/api/user", name="user_")
 */

class ChangePasswordController extends BaseRestController
{
    /**
     * @Rest\Post(path="/changePassword", name="change_password")
     */
    public function postChangePasswordAction(Request $request)
    {
        $form = $this->proceedForm($request, ChangePasswordForm::class, null);

        if ($form instanceof Form && $form->isValid()) {

            $newPassword = $form->get('newPassword')->getData();
            $oldPassword = $form->get('oldPassword')->getData();

            $em = $this->getDoctrine()->getManager();
            $userChangePass = $this->getUser();

            if($userChangePass instanceof User) {
                $isValid = $this->get('security.password_encoder')->isPasswordValid($userChangePass, $oldPassword);

                if($isValid) {
                    $userChangePass->setPassword($this->get('security.password_encoder')->encodePassword($userChangePass, $newPassword));

                    $em->persist($userChangePass);
                    $em->flush();
                }
            }

            return $this->renderResult(true);

        } elseif(isset($form['errors'])) {
            return $this->renderErrors($form['errors']);
        }

        throw new HttpException(400, "Invalid data");
    }
}
