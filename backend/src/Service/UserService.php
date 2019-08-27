<?php

namespace App\Service;


use App\Entity\User;
use App\Entity\Phone;
use App\Entity\TemporaryUser;
use App\Entity\Business;
use App\Repository\UserRepository;
use App\Repository\TemporaryUserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Form\Form;
use Symfony\Component\Security\Core\Encoder\PasswordEncoderInterface;
use Symfony\Component\Serializer\SerializerInterface;

class UserService
{

    const ROLE_OWNER = 'ROLE_OWNER';
    const ROLE_ADMIN = 'ROLE_ADMIN';
    const ROLE_SUPER_ADMIN = 'ROLE_SUPER_ADMIN';
    const ROLE_EXPLORER = 'ROLE_EXPLORER';

    public function __construct(EntityManagerInterface $entityManager, 
                                UserRepository $userRepository,
                                TemporaryUserRepository $temporaryUserRepository,
                                StatusService $statusService,
                                SerializerInterface $serializer
    )
    {
        $this->entityManager = $entityManager;
        $this->userRepository = $userRepository;
        $this->temporaryUserRepository = $temporaryUserRepository;
        $this->statusService = $statusService;
        $this->serializer = $serializer;
    }

    public function makeSureUserIsOwner(User $user)
    {
        $has = $this->hasRole(self::ROLE_OWNER, $user);

        if(!$has) {
            $this->addRole(self::ROLE_OWNER, $user);
        }
    }

    public function addRole($role, User $user)
    {
        $roles = $user->getRoles();
        $roles[] = $role;
        $user->setRoles($roles);
        $this->entityManager->persist($user);
        $this->entityManager->flush();
    }

    public function hasRole($role, User $user)
    {
        return in_array($role, $user->getRoles());
    }

    public function isAdmin(User $user)
    {
        return $this->hasRole(self::ROLE_ADMIN, $user);
    }

    public function isSuperAdmin(User $user)
    {
        return $this->hasRole(self::ROLE_SUPER_ADMIN, $user);
    }

    public function getUserByEmail($email)
    {
        return $this->userRepository->findOneBy(['email' => $email]);
    }

    public function getList()
    {
        $users = $this->userRepository->findAll();
        return $this->serializer->serialize($users, 'json');
    }

    public function get($id)
    {
        return $this->userRepository->find($id);
    }

    public function generateRandomString($length = 10) {
        return substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyz', ceil($length/strlen($x)) )),1,$length);
    }

    public function handleBlockState(User $user)
    {
         // If the user is another admin, it cannot be blocked through the API.
        if ($this->isAdmin($user)) {
            return false;
        }

        $isBlocked = $user->getIsBlocked();
        $email = $user->getEmail();
        $blockState = "blocked";

        if ($isBlocked === true) {
            $user->setIsBlocked(false);
            $blockState = "unblocked";
        } else {
            $user->setIsBlocked(true);
        }

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $email." has been ".$blockState.".";
    }

    public function update($userId, User $user, Form $form, $pass = false)
    {

        $updateUser = $this->get($userId);

        if($updateUser instanceof User) {
            $updateUser->setFirstname($user->getFirstname());
            $updateUser->setLastname($user->getLastname());
            $updateUser->setAbout($user->getAbout());
            $updateUser->setPhone($user->getPhone());
            $updateUser->setPhotos(json_decode($user->getPhotos(), true));

            if($pass) {
                $updateUser->setPassword( $pass );
            }

            if(!empty($user->getRoles())) {
                $updateUser->setRoles($user->getRoles());
            }

            $this->entityManager->persist($updateUser);
            $this->entityManager->flush();

            return $updateUser;
        }
    }
    public function transferTemporaryUserProperties(User $user)
    {
        $temporaryUser = $this->temporaryUserRepository->findOneBy(['email' => $user->getEmail()]);

        if ($temporaryUser instanceof TemporaryUser) {
            $business = $temporaryUser->getBusiness();
            if ($business instanceof Business) {
                $business->setOwnerUser($user);
                $this->statusService->statusDraft($business);
                $this->entityManager->persist($business);
            }

            $phone = $temporaryUser->getPhone();
            if ($phone instanceof Phone) {
                $user->setPhone($phone);
                $this->entityManager->persist($user);
            }

            $this->entityManager->remove($temporaryUser);
            $this->entityManager->flush();
        }
    }
}