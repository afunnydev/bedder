<?php

namespace App\Service;

use App\Entity\Address;
use App\Entity\Business;
use App\Entity\BusinessReview;
use App\Entity\BusinessUnit;
use App\Entity\File;
use App\Entity\User;
use App\Entity\TemporaryUser;
use App\Entity\Phone;
use App\Repository\AddressRepository;
use App\Repository\BusinessRepository;
use App\Repository\BusinessUnitRepository;
use App\Repository\FileRepository;
use App\Repository\TemporaryUserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Cache\Adapter\RedisAdapter;
use Psr\Log\LoggerInterface;
use \Swap\Swap;
use Symfony\Component\Serializer\SerializerInterface;

class BusinessService
{
    /**
     * @var BusinessRepository
     */
    private $businessRepository;

    public function __construct(BusinessRepository $businessRepository,
                                BusinessUnitRepository $businessUnitRepository,
                                FileRepository $fileRepository,
                                EntityManagerInterface $entityManager,
                                AddressRepository $addressRepository,
                                TemporaryUserRepository $temporaryUserRepository,
                                StatusService $statusService,
                                PhoneService $phoneService,
                                NotificationService $notificationService,
                                UserService $userService,
                                LoggerInterface $logger,
                                Swap $swap,
                                SerializerInterface $serializer
    )
    {
        $this->businessRepository = $businessRepository;
        $this->businessUnitRepository = $businessUnitRepository;
        $this->fileRepository = $fileRepository;
        $this->entityManager = $entityManager;
        $this->statusService = $statusService;
        $this->phoneService = $phoneService;
        $this->addressRepository = $addressRepository;
        $this->temporaryUserRepository = $temporaryUserRepository;
        $this->notificationService = $notificationService;
        $this->userService = $userService;
        $this->logger = $logger;
        $this->swap = $swap;
        $this->serializer = $serializer;
    }

    public function get($id)
    {
        return $this->businessRepository->find($id);
    }

    public function getListAdmin()
    {
        $businesses = $this->businessRepository->findBy([], ['status' => 'DESC']);
        return $this->serializer->serialize($businesses, 'json');
    }

    public function getListPending()
    {
        return $this->businessRepository->findBy(['status' => StatusService::STATUS_PENDING]);
    }

    public function getListExplorer(User $user)
    {
        return $this->businessRepository->findBy(['manageUser' => $user], ['status' => 'ASC']);
    }

    public function getListOwner(User $user)
    {
        return $this->businessRepository->findBy(['ownerUser' => $user, 'status' => StatusService::STATUS_READY_VISIBLE]);
    }

    public function getBusinessUnit($id)
    {
        return $this->businessUnitRepository->find($id);
    }

    public function getFile($id)
    {
        return $this->fileRepository->find($id);
    }

    public function calcReviews(Business &$business, BusinessReview $businessReview)
    {
        $business->setReviewsNum($business->getReviewsNum()+1);
        $business->setReviewsSum($business->getReviewsSum() + $businessReview->getRating());
        $business->setReviewsAvg(round($business->getReviewsSum() / $business->getReviewsNum(), 1));
    }

    public function acceptOffAutomatically(BusinessUnit $businessUnit)
    {
        $businessUnit->setAcceptAutomatically(0);
        $this->entityManager->persist($businessUnit);
        $this->entityManager->flush();
    }

    public function acceptAutomatically(BusinessUnit $businessUnit)
    {
        $businessUnit->setAcceptAutomatically(1);
        $this->entityManager->persist($businessUnit);
        $this->entityManager->flush();
    }

    public function postReview($id, $unitId, $params)
    {
        $business = $this->get($id);
        $businessUnit = $this->getBusinessUnit($unitId);

        if($business instanceof Business && $businessUnit instanceof BusinessUnit) {

            $newReview = new BusinessReview();

            if(isset($params['body']) && !empty($params['body'])) {
                $newReview->setBody($params['body']);
            }

            if(isset($params['rating']) && !empty($params['rating'])) {
                $newReview->setRating($params['rating']);
            }

            $newReview->setBusinessUnit($businessUnit);
            $newReview->setBusiness($business);
            $businessUnit->addReview($newReview);
            $business->addReview($newReview);

            $this->calcReviews($business, $newReview);

            $this->entityManager->persist($newReview);

            $this->entityManager->persist($businessUnit);

            $this->entityManager->persist($business);
            $this->entityManager->flush();

            return $business;
        }

    }

    public function findSimilarAddress(Address $address)
    {
        $out = [];
        if(strlen($address->getGoogleAddressString()) > 0) {
            $res = $this->addressRepository->findBy(['googleAddressString' => $address->getGoogleAddressString()]);
            if($res) {
                foreach ($res as $result) {
                    $out[] = $result;
                }

                return $out;
            }
        }

        return false;
    }

    public function findSimilarNames(Business $business)
    {
        return $this->businessRepository->findLikeName($business->getName(), $business->getId());
    }

    public function createFromSimpleForm(Form $form, User $user)
    {

        if($form->isValid()) {

            $businessName = $form->get('name')->getData();
            $ownerEmail = $form->get('email')->getData();
            $business = new Business();

            $this->statusService->statusNew($business);

            $business->setName($businessName);
            $business->setManageUser($user);

            if($form->offsetExists('phone') && strlen($form->get('phone')->getData()) > 0) {
                $business->setSmsValidation(true);
            } else {
                $business->setSmsValidation(false);
            }

            $businessAddress = new Address();
            $business->setAddress($businessAddress);

            $this->entityManager->persist($business);
            $this->entityManager->persist($businessAddress);
            $this->entityManager->flush();

            $owner = $this->userService->getUserByEmail($ownerEmail);

            if ($owner) {
                $business->setOwnerUser($owner);
                $this->statusService->statusDraft($business);
                $this->notificationService->notifyNewBusiness($business);
            } else {
                $this->statusService->statusPendingOwner($business);

                $owner = $this->temporaryUserRepository->findOneBy(['email' => $ownerEmail]);

                // TODO: What if the temporary owner user already has a business? It will change the business...

                if (!$owner instanceof TemporaryUser) {
                    $owner = new TemporaryUser();
                    $owner->setEmail($ownerEmail);
                }

                $owner->setBusiness($business);

                $this->entityManager->persist($owner);
                $this->entityManager->flush();

                $this->notificationService->inviteNewOwner($user, $businessName, $ownerEmail);
            }

            $this->entityManager->persist($business);
            $this->entityManager->flush();

            if($form->offsetExists('phone')) {
                $ownerPhone = $form->get('phone')->getData();
                $phoneNumber = $this->phoneService->cleanNumber($ownerPhone);
                $phone = $this->phoneService->getByNumber($phoneNumber);

                if ($phone instanceof Phone) {
                    $owner->setPhone($phone);

                    try {
                        $this->entityManager->persist($owner);
                        $this->entityManager->flush();
                    } catch(\Exception $e) {
                        return ['errors' => 'This phone number is already associated with another user.'];
                    }
                }
            }

            return $business;
        }

        return false;

    }

    public function updateFromForm($id, Form $form, User $user)
    {
        if($form->isValid()) {

            if(isset($form['errors'])) {
                return $form;
            }

            $business = $this->businessRepository->find($id);

            if($business instanceof Business) {

                // If the user has submitted the business, update its status. If not, it should stay the same.
                if ($form->offsetExists('status')) {
                    $status = $form->get('status')->getData();
                    if ($status == 'public') {
                        $this->statusService->statusPending($business);
                    }
                }

                // Updates and save the new business info and it's new address info.
                $business = $this->updateBusinessGeneralInfo($business, $form);
                
                if ($form->offsetExists('coverPhotos')) {
                    $business = $this->updateCoverPhotos($business, $form->get('coverPhotos')->getData());
                }


                if($form->offsetExists('businessUnits')) {

                    $rooms = json_decode($form->get('businessUnits')->getData(), true);
                    $existingRooms = $business->getBusinessUnitsOnlyParents();
                    $existingRoomsToRemoveIds = [];

                    foreach ($existingRooms as $room) {
                        $existingRoomsToRemoveIds[$room->getId()] = true;
                    }

                    foreach ($rooms as $room) {

                        $roomPrice = $room['rate'];
                        $roomFullPrice = round($roomPrice * 100 * 1.15);

                        $roomCurrency = $room['currency'];
                        if ($roomCurrency && $roomCurrency != 'USD') {
                            $rate = $this->swap->latest('USD/'.$roomCurrency);
                            $percentageRate = $rate->getValue();
                            $roomFullPrice = round($roomFullPrice / $percentageRate);
                        }

                        if(!$room['isNew']) {
                            // Update existing room.
                            $existing = $this->getBusinessUnit($room['id']);

                            if($existing instanceof BusinessUnit) {
                                $existingRoomsToRemoveIds[$room['id']] = false;

                                // Check if the number of rooms changed.
                                $originalNumRooms = $existing->getNumUnits();
                                $differenceInNumRooms = $originalNumRooms - $room['numUnits'];

                                if ($differenceInNumRooms < 0) {
                                    // Create the new child units.
                                    $childUnits = $existing->getChildBusinessUnit();
                                    for ($i = 0; $i < abs($differenceInNumRooms); $i++) {
                                        $clonedExistingUnit = clone $existing;
                                        $clonedExistingUnit->setParentBusinessUnit($existing);
                                        $childUnits->add($clonedExistingUnit);
                                        $this->entityManager->persist($clonedExistingUnit);
                                    }
                                } else if ($differenceInNumRooms > 0) {
                                    // Remove some child units
                                    $childUnits = $existing->getChildBusinessUnit();
                                    for ($i = 0; $i < $differenceInNumRooms; $i++) {
                                        $childUnit = $childUnits->last();
                                        $childUnits->removeElement($childUnit);
                                        $this->entityManager->remove($childUnit);
                                    }
                                }
                                $this->entityManager->flush();

                                foreach ($existing->getChildBusinessUnit() as $item) {
                                    $item->setRate($roomPrice);
                                    $item->setCurrency($roomCurrency);
                                    $item->setFullRate($roomFullPrice);
                                    $item->setMaxPersons($room['maxPersons']);
                                    $item->setName($room['name']);
                                    $item->setNumUnits($room['numUnits']);
                                    $item->setEquipment($room['equipment']);
                                    $item->setBedsKing($room['bedsKing']);
                                    $item->setBedsQueen($room['bedsQueen']);
                                    $item->setBedsSimple($room['bedsSimple']);
                                    $item->setAcceptAutomatically($room['acceptAutomatically']);
                                    $this->entityManager->persist($item);
                                }

                                $existing->setRate($roomPrice);
                                $existing->setCurrency($roomCurrency);
                                $existing->setFullRate($roomFullPrice);
                                $existing->setMaxPersons($room['maxPersons']);
                                $existing->setName($room['name']);
                                $existing->setNumUnits($room['numUnits']);
                                $existing->setEquipment($room['equipment']);
                                $existing->setBedsKing($room['bedsKing']);
                                $existing->setBedsQueen($room['bedsQueen']);
                                $existing->setBedsSimple($room['bedsSimple']);
                                $existing->setAcceptAutomatically($room['acceptAutomatically']);

                                $this->entityManager->persist($existing);
                                $this->entityManager->flush();

                                if($room['files']) {
                                    $this->updateBusinessUnitPhotos($existing, $room['files']);
                                }
                                $this->entityManager->flush();
                            }


                        } else {
                            // Make sure this room really doesn't exist
                            $existing = $existingRooms->filter(function(BusinessUnit $bu) use ($room) {
                               return $bu->getId() == $room['id'];
                            })->last();
                            if(!$existing instanceof BusinessUnit) {
                                // Create new parent room

                                $businessUnit = new BusinessUnit();
                                $businessUnit->setRate($roomPrice);
                                $businessUnit->setCurrency($roomCurrency);
                                $businessUnit->setFullRate($roomFullPrice);
                                $businessUnit->setMaxPersons($room['maxPersons']);
                                $businessUnit->setName($room['name']);
                                $businessUnit->setNumUnits($room['numUnits']);
                                $businessUnit->setEquipment($room['equipment']);
                                $businessUnit->setBedsKing($room['bedsKing']);
                                $businessUnit->setBedsQueen($room['bedsQueen']);
                                $businessUnit->setBedsSimple($room['bedsSimple']);
                                $businessUnit->setBusiness($business);
                                $businessUnit->setAcceptAutomatically($room['acceptAutomatically']);
                                $this->entityManager->persist($businessUnit);

                                if($room['files']) {
                                    $this->updateBusinessUnitPhotos($businessUnit, $room['files']);
                                } 

                                $this->entityManager->flush();


                                if($room['numUnits'] && $room['numUnits'] > 1) {

                                    for ($i = 0; $i < $room['numUnits']-1; $i++) {
                                        $clonedBusinessUnit = clone $businessUnit;
                                        $clonedBusinessUnit->setParentBusinessUnit($businessUnit);
                                        $this->entityManager->persist($clonedBusinessUnit);
                                    }

                                }
                            } 
                        }

                    }

                    foreach ($existingRoomsToRemoveIds as $roomRemoveId => $doRemove) {
                        if($doRemove) {
                            if($this->getBusinessUnit($roomRemoveId)) {
                                $childUnits = $this->getBusinessUnit($roomRemoveId)->getChildBusinessUnit();
                                foreach ($childUnits as $childUnit) {
                                    $this->entityManager->remove($childUnit);
                                }
                                $this->entityManager->remove($this->getBusinessUnit($roomRemoveId));
                            }
                        }
                    }

                }

                $business->setUpdatedAt(new \DateTime());

                $this->entityManager->persist($business);
                $this->entityManager->flush();

                return $business;
            }
        }

        return false;
    }

    public function updateBusinessGeneralInfo(Business $business, Form $form)
    {
        // TODO: If the offset doesn't exist, why do we set to null? We should just leave the value.
        $business->setName((($form->offsetExists('name')) ? $form->get('name')->getData() : null));
        $business->setSmsValidation((($form->get('smsValidation')->getData())));
        $business->setAmenities((($form->offsetExists('amenities')) ? $form->get('amenities')->getData() : null));
        $business->setPropertyType((($form->offsetExists('propertyType')) ? $form->get('propertyType')->getData() : null));
        $business->setMood((($form->offsetExists('mood')) ? $form->get('mood')->getData() : null));
        $business->setStars((($form->offsetExists('stars')) ? $form->get('stars')->getData() : null));
        $business->setOpinionStrong((($form->offsetExists('opinionStrong')) ? $form->get('opinionStrong')->getData() : null));
        $business->setOpinionWeak((($form->offsetExists('opinionWeak')) ? $form->get('opinionWeak')->getData() : null));
        $business->setAround((($form->offsetExists('around')) ? $form->get('around')->getData() : null));
        $business->setHowToFind((($form->offsetExists('howToFind')) ? $form->get('howToFind')->getData() : null));
        $business->setActivities((($form->offsetExists('activities')) ? $form->get('activities')->getData() : null));

        $address = $business->getAddress();
        $address->setZip((($form->offsetExists('zip')) ? $form->get('zip')->getData() : null));
        $address->setCountry((($form->offsetExists('country')) ? $form->get('country')->getData() : null));
        $address->setCity((($form->offsetExists('city')) ? $form->get('city')->getData() : null));
        $address->setAddress((($form->offsetExists('address')) ? $form->get('address')->getData() : null));
        $address->setAddress2((($form->offsetExists('address2')) ? $form->get('address2')->getData() : null));
        $address->setLat((($form->offsetExists('lat')) ? $form->get('lat')->getData() : null));
        $address->setLon((($form->offsetExists('lon')) ? $form->get('lon')->getData() : null));

        $this->entityManager->persist($business);
        $this->entityManager->persist($address);
        $this->entityManager->flush();

        return $business;
    }

    public function updateCoverPhotos(Business $business, $coverPhotos)
    {
        $submittedCoverPhotos = json_decode($coverPhotos);
        $actualCoverPhotos = $business->getCoverPhotos();
        if (sizeof($actualCoverPhotos) < 1) {
            foreach ($submittedCoverPhotos as $newkey => $newPhoto) {
                $file = new File();
                $file->setUUID($newPhoto->uuid);
                $file->setUrl($newPhoto->url);
                $file->setBusiness($business);

                $this->entityManager->persist($file);
                $this->entityManager->flush();
                unset($file);
            }
        } else {
            $toDelete = [];
            foreach ($actualCoverPhotos as $oldKey => $oldPhoto) {
                $toDelete[$oldKey] = true;
                foreach ($submittedCoverPhotos as $newKey => $newPhoto) {
                    if ($newPhoto->uuid == $oldPhoto->getUUID()) {
                        $toDelete[$oldKey] = false;
                        unset($submittedCoverPhotos[$newKey]);
                        break;
                    }
                }
            }
            foreach ($toDelete as $oldPhotoKey => $shouldIDelete) {
                if ($shouldIDelete) {
                    $oldPhoto = $actualCoverPhotos->get($oldPhotoKey);
                    $oldPhoto->setBusiness(null);
                    $this->entityManager->remove($oldPhoto);
                    $this->entityManager->flush();
                }
            }
            foreach ($submittedCoverPhotos as $newPhoto) {
                $file = new File();
                $file->setUUID($newPhoto->uuid);
                $file->setUrl($newPhoto->url);
                $file->setBusiness($business);
                
                $this->entityManager->persist($file);
                $this->entityManager->flush();
                unset($file);
            }
        }

        return $business;
    }

    public function updateBusinessUnitPhotos(BusinessUnit $businessUnit, $submittedPhotos)
    {
        $actualPhotos = $businessUnit->getFiles();
        if (sizeof($actualPhotos) < 1) {
            foreach ($submittedPhotos as $newkey => $newPhoto) {
                $file = new File();
                $file->setUUID($newPhoto['uuid']);
                $file->setUrl($newPhoto['url']);
                $file->setBusinessUnit($businessUnit);

                $this->entityManager->persist($file);
                $this->entityManager->flush();
                unset($file);
            }
        } else {
            $toDelete = [];
            foreach ($actualPhotos as $oldKey => $oldPhoto) {
                $toDelete[$oldKey] = true;
                foreach ($submittedPhotos as $newkey => $newPhoto) {
                    if ($newPhoto['uuid'] == $oldPhoto->getUUID()) {
                        $toDelete[$oldKey] = false;
                        unset($submittedPhotos[$newkey]);
                        break;
                    }
                }
            }
            foreach ($toDelete as $oldPhotoKey => $shouldIDelete) {
                if ($shouldIDelete) {
                    $oldPhoto = $actualPhotos->get($oldPhotoKey);
                    $oldPhoto->setBusinessUnit(null);
                    $this->entityManager->remove($oldPhoto);
                    $this->entityManager->flush();
                }
            }
            foreach ($submittedPhotos as $newPhoto) {
                $file = new File();
                $file->setUUID($newPhoto['uuid']);
                $file->setUrl($newPhoto['url']);
                $file->setBusinessUnit($businessUnit);
                
                $this->entityManager->persist($file);
                $this->entityManager->flush();
                unset($file);
            }
        }

        return $businessUnit;
    }

    public function updateBusinessStatusAdmin($status, Business $business)
    {
        $business->setStatus($status);
        $this->entityManager->persist($business);
        $this->entityManager->flush();
        return "Changed status of ".$business->getName();
    }

    public function delete(Business $business)
    {
        $this->entityManager->remove($business);
        $this->entityManager->flush();
    }

    public function deleteUnit(BusinessUnit $businessUnit)
    {
        $this->entityManager->remove($businessUnit);
        $this->entityManager->flush();
    }

    public function deleteFile(BusinessUnit $businessUnit, File $file)
    {
        $businessUnit->removeFile($file);
        $this->entityManager->remove($file);
        $this->entityManager->persist($businessUnit);
        $this->entityManager->flush();
    }
}
