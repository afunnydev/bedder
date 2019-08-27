<?php

namespace App\Controller;

use App\Entity\Booking;
use App\Entity\Business;
use App\Entity\SupportTicket;
use App\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\View\View;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class BaseRestController extends FOSRestController
{
    protected function accessCheck($user, $class = null, $obj = null)
    {
        if ( $this->isGranted('ROLE_ADMIN') === true ) {
            return true;
        }

        if(!$user instanceof User || $class === null) {
            throw new AccessDeniedException();
        }

        switch ($class) {
            case BusinessController::class:
                if(!$obj instanceof Business || $obj->getManageUser() != $user) {
                    throw new AccessDeniedException("You can't update this business. You're not the manager.");
                }
            break;

            case BookingController::class:
                if(!$obj instanceof Booking || $obj->getUser() != $user) {
                    throw new AccessDeniedException("You can't see this booking. It's not yours.");
                }
            break;
        }

        return true;
    }
    /**
     * @param $result
     * @return mixed
     */
    protected function resultOr404($result, $msg = 'Not Found')
    {
        if(!$result) {
            throw new NotFoundHttpException($msg);
        }
        return $result;
    }

    /**
     * @param $result
     * @param string $msg
     * @param int $code
     * @return mixed
     */
    protected function resultOrError($result, $msg = 'Error', $code = 500)
    {
        if(!$result) {
            throw new HttpException($code, $msg);
        }
        return $result;
    }

    protected function resultOrAccessDenied($result)
    {
        if($this->isGranted('ROLE_ADMIN')) {
            return $result;
        }

        if(!$result) {
            throw new AccessDeniedException();
        }

        return $result;
    }

    protected function renderFormErrors($form)
    {
        if(isset($form['errors'])) {
            return $this->renderApi(['error' => ['code' => 1001, 'error' => $form['errors']]]);
        }   
    }

    protected function renderError($res = ['code' => 500, 'error' => 'Unknown error.'])
    {
        if(is_array($res) && count($res) == 1 && isset($res[0])) {
            return $this->renderApi(['error' => ['code' => 500, 'error' => $res[0]]]);
        }

        if(!isset($res['code']) || !isset($res['error'])) {
            return $this->renderApi(['error' => ['code' => 500, 'error' => $res]]);
        }

        return $this->renderApi(['error' => $res]);
    }

    protected function renderErrors($res = ['code' => 500, 'error' => 'Unknown error.'])
    {
        return $this->renderError(array_values($res)[0]);
        // if(!is_array($res) && is_string($res)) {
        //     return $this->renderApi(['error' => ['code' => 500, 'error' => $res]]);    
        // }elseif(count($res) > 1) {
        //     $first = array_values($res)[0];
        //     $rest = array_shift($res);
        //     return $this->renderApi(['error' => $first, 'errors' => $rest]);    
        // }
        // $res = (isset($res['code']) && isset($res['error'])) ? $res : ['code' => 500, 'error' => ((is_array($res)) ? array_values($res)[0] : $res)];
        // return $this->renderApi(['error' => $res]);
    }

    protected function renderResult($res)
    {
        return $this->renderApi(['result' => $res]);
    }

    protected function renderApi($res)
    {
        return $this->handleView(
            new View($res)
        );
    }

    protected function getRequestContentAsArray(Request $request)
    {
        $content = $request->getContent();

        if(empty($content)){
            throw new BadRequestHttpException("Content is empty");
        }

//        if(!Validator::isValidJsonString($content)){
//            throw new BadRequestHttpException("Content is not a valid json");
//        }

        return json_decode($content, true);
//        return new ArrayCollection(json_decode($content, true));
    }

    protected function proceedForm(Request $request, $form_name, $entity)
    {
        $content = $request->getContent();
        if (!empty($content))
        {
            $params = $this->getRequestContentAsArray($request);
            $form = $this->createForm($form_name, $entity);
            $form->handleRequest($request);

            if(!$form->isSubmitted()) {
                $form->submit($params);
            }


            if ($form->isValid()) {
                return $form;
            } else {
                return ['errors' => $this->getErrorMessages($form)];
            }

        } else {
            return ['errors' => ['Invalid data.']];
        }
    }

    protected function getErrorMessages(Form $form)
    {
        $errors = array();

        foreach ($form->getErrors() as $key => $error) {
            if ($form->isRoot()) {
                $errors['#'][] = $error->getMessage();
            } else {
                $errors[] = $error->getMessage();
            }
        }

        foreach ($form->all() as $child) {
            if (!$child->isValid()) {
                $errors[$child->getName()] = $this->getErrorMessages($child);
            }
        }

        return $errors;
    }
}