<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Criteria;

/**
 * @ORM\Entity(repositoryClass="App\Repository\BusinessRepository")
 * @ORM\Table(name="businesses")
 * @ORM\HasLifecycleCallbacks
 */
class Business implements \JsonSerializable
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="boolean", options={"default":false})
     */
    private $smsValidation = false;

    /**
     * @ORM\Column(type="string")
     */
    private $name;

    /**
     * @ORM\Column(type="smallint")
     */
    private $status;

    /**
     * @ORM\Column(type="smallint", nullable=true)
     */
    private $stars;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    private $mood;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    private $activities;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    private $propertyType;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $amenities;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    private $around;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    private $opinionStrong;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    private $opinionWeak;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    private $howToFind;

    /**
     * @ORM\Column(type="integer", options={"default":0})
     */
    private $reviewsNum = 0;

    /**
     * @ORM\Column(type="integer", options={"default":0})
     */
    private $reviewsSum = 0;

    /**
     * @ORM\Column(type="integer", options={"default":0})
     */
    private $reviewsAvg = 0;

    /**
     * @ORM\Column(name="created_at", type="datetime", nullable=false)
     */
    private $created_at;

    /**
     * @ORM\Column(name="updated_at", type="datetime", nullable=false)
     */
    private $updated_at;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="manageBusinesses")
     */
    private $manageUser;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="ownerBusinesses")
     */
    private $ownerUser;

    /**
     * @ORM\OneToMany(targetEntity="BusinessUnit", mappedBy="business", cascade={"remove"}, orphanRemoval=true)
     */
    private $businessUnits;

    /**
     * @ORM\OneToMany(targetEntity="File", mappedBy="business", orphanRemoval=true)
     */
    private $coverPhotos;

    /**
     * @ORM\OneToMany(targetEntity="Booking", mappedBy="business")
     */
    private $bookings;

    /**
     * @ORM\OneToMany(targetEntity="BusinessReview", mappedBy="business", cascade={"remove"})
     */
    private $reviews;

    /**
     * @ORM\OneToOne(targetEntity="Address", inversedBy="business", cascade={"remove"})
     */
    private $address;

    /**
     * @ORM\PrePersist
     * @ORM\PreUpdate
     */
    public function updatedTimestamps(): void
    {
        $dateTimeNow = new \DateTime('now');
        $this->setUpdatedAt($dateTimeNow);
        if ($this->getCreatedAt() === null) {
            $this->setCreatedAt($dateTimeNow);
        }
    }

    public function __construct()
    {
        $this->businessUnits = new ArrayCollection();
        $this->coverPhotos = new ArrayCollection();
        $this->bookings = new ArrayCollection();
        $this->reviews = new ArrayCollection();
    }

    public function jsonSerialize()
    {
        return [
            'id'    => $this->getId(),
            'name' => $this->getName(),
            'status' => $this->getStatus(),
            'smsValidation' => $this->getSmsValidation(),
            'createdAt' => $this->getCreatedAt(),
            'updatedAt' => $this->getUpdatedAt(),
            'units' => $this->getBusinessUnitsOnlyParents(),
            'reviews' => $this->getReviews(),
            'address' => $this->getAddress(),
            'stars' => $this->getStars(),
            'mood' => $this->getMood(),
            'propertyType' => $this->getPropertyType(),
            'amenities' => $this->getAmenities(),
            'around' => $this->getAround(),
            'opinionStrong' => $this->getOpinionStrong(),
            'opinionWeak' => $this->getOpinionWeak(),
            'howToFind' => $this->getHowToFind(),
            'activities' => $this->getActivities(),
            'coverPhotos' => $this->getCoverPhotos(),
            'reviewsNum' => $this->getReviewsNum(),
            'reviewsAvg' => $this->getReviewsAvg(),
            'bookingsCount' => $this->getBookings() ? $this->getBookings()->count() : 0,
        ];
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Business
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set status
     *
     * @param integer $status
     *
     * @return Business
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status
     *
     * @return integer
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Business
     */
    public function setCreatedAt($createdAt)
    {
        $this->created_at = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * Set updatedAt
     *
     * @param \DateTime $updatedAt
     *
     * @return Business
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updated_at = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt
     *
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updated_at;
    }

    /**
     * Set manageUser
     *
     * @param \App\Entity\User $manageUser
     *
     * @return Business
     */
    public function setManageUser(\App\Entity\User $manageUser = null)
    {
        $this->manageUser = $manageUser;

        return $this;
    }

    /**
     * Get manageUser
     *
     * @return \App\Entity\User
     */
    public function getManageUser()
    {
        return $this->manageUser;
    }

    /**
     * Add businessUnit
     *
     * @param \App\Entity\BusinessUnit $businessUnit
     *
     * @return Business
     */
    public function addBusinessUnit(\App\Entity\BusinessUnit $businessUnit)
    {
        $this->businessUnits[] = $businessUnit;

        return $this;
    }

    /**
     * Remove businessUnit
     *
     * @param \App\Entity\BusinessUnit $businessUnit
     */
    public function removeBusinessUnit(\App\Entity\BusinessUnit $businessUnit)
    {
        $this->businessUnits->removeElement($businessUnit);
    }

    /**
     * Get businessUnits
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getBusinessUnits()
    {
        return $this->businessUnits;
    }

    /**
     * Get businessUnits that are parents
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getBusinessUnitsOnlyParents()
    {   
        $criteria = Criteria::create()
            ->where(Criteria::expr()->eq("parentBusinessUnit", null));
        return $this->businessUnits->matching($criteria);
    }

    /**
     * Add booking
     *
     * @param \App\Entity\Booking $booking
     *
     * @return Business
     */
    public function addBooking(\App\Entity\Booking $booking)
    {
        $this->bookings[] = $booking;

        return $this;
    }

    /**
     * Remove booking
     *
     * @param \App\Entity\Booking $booking
     */
    public function removeBooking(\App\Entity\Booking $booking)
    {
        $this->bookings->removeElement($booking);
    }

    /**
     * Get bookings
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getBookings()
    {
        return $this->bookings;
    }

    /**
     * Set address
     *
     * @param \App\Entity\Address $address
     *
     * @return Business
     */
    public function setAddress(\App\Entity\Address $address = null)
    {
        $this->address = $address;

        return $this;
    }

    /**
     * Get address
     *
     * @return \App\Entity\Address
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Set ownerUser.
     *
     * @param \App\Entity\User|null $ownerUser
     *
     * @return Business
     */
    public function setOwnerUser(\App\Entity\User $ownerUser = null)
    {
        $this->ownerUser = $ownerUser;

        return $this;
    }

    /**
     * Get ownerUser.
     *
     * @return \App\Entity\User|null
     */
    public function getOwnerUser()
    {
        return $this->ownerUser;
    }

    /**
     * Add review.
     *
     * @param \App\Entity\BusinessReview $review
     *
     * @return Business
     */
    public function addReview(\App\Entity\BusinessReview $review)
    {
        $this->reviews[] = $review;

        return $this;
    }

    /**
     * Remove review.
     *
     * @param \App\Entity\BusinessReview $review
     *
     * @return boolean TRUE if this collection contained the specified element, FALSE otherwise.
     */
    public function removeReview(\App\Entity\BusinessReview $review)
    {
        return $this->reviews->removeElement($review);
    }

    /**
     * Get reviews.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getReviews()
    {
        return $this->reviews;
    }

    /**
     * Set smsValidation.
     *
     * @param bool $smsValidation
     *
     * @return Business
     */
    public function setSmsValidation($smsValidation)
    {
        $this->smsValidation = $smsValidation;

        return $this;
    }

    /**
     * Get smsValidation.
     *
     * @return bool
     */
    public function getSmsValidation()
    {
        return $this->smsValidation;
    }

    /**
     * Set mood.
     *
     * @param int|null $mood
     *
     * @return Business
     */
    public function setMood($mood = null)
    {
        $this->mood = $mood;

        return $this;
    }

    /**
     * Get mood.
     *
     * @return int|null
     */
    public function getMood()
    {
        return $this->mood;
    }

    /**
     * Set amenities.
     *
     * @param string|null $amenities
     *
     * @return Business
     */
    public function setAmenities($amenities = null)
    {
        $this->amenities = $amenities;

        return $this;
    }

    /**
     * Get amenities.
     *
     * @return string|null
     */
    public function getAmenities()
    {
        return $this->amenities;
    }

    /**
     * Set propertyType.
     *
     * @param int|null $propertyType
     *
     * @return Business
     */
    public function setPropertyType($propertyType = null)
    {
        $this->propertyType = $propertyType;

        return $this;
    }

    /**
     * Get propertyType.
     *
     * @return int|null
     */
    public function getPropertyType()
    {
        return $this->propertyType;
    }

    /**
     * Set stars.
     *
     * @param int $stars
     *
     * @return Business
     */
    public function setStars($stars)
    {
        $this->stars = $stars;

        return $this;
    }

    /**
     * Get stars.
     *
     * @return int
     */
    public function getStars()
    {
        return $this->stars;
    }

    /**
     * Set around.
     *
     * @param string|null $around
     *
     * @return Business
     */
    public function setAround($around = null)
    {
        $this->around = $around;

        return $this;
    }

    /**
     * Get around.
     *
     * @return string|null
     */
    public function getAround()
    {
        return $this->around;
    }

    /**
     * Set opinionStrong.
     *
     * @param string|null $opinionStrong
     *
     * @return Business
     */
    public function setOpinionStrong($opinionStrong = null)
    {
        $this->opinionStrong = $opinionStrong;

        return $this;
    }

    /**
     * Get opinionStrong.
     *
     * @return string|null
     */
    public function getOpinionStrong()
    {
        return $this->opinionStrong;
    }

    /**
     * Set opinionWeak.
     *
     * @param string|null $opinionWeak
     *
     * @return Business
     */
    public function setOpinionWeak($opinionWeak = null)
    {
        $this->opinionWeak = $opinionWeak;

        return $this;
    }

    /**
     * Get opinionWeak.
     *
     * @return string|null
     */
    public function getOpinionWeak()
    {
        return $this->opinionWeak;
    }

    /**
     * Set howToFind.
     *
     * @param string|null $howToFind
     *
     * @return Business
     */
    public function setHowToFind($howToFind = null)
    {
        $this->howToFind = $howToFind;

        return $this;
    }

    /**
     * Get howToFind.
     *
     * @return string|null
     */
    public function getHowToFind()
    {
        return $this->howToFind;
    }

    /**
     * Set activities.
     *
     * @param string|null $activities
     *
     * @return Business
     */
    public function setActivities($activities = null)
    {
        $this->activities = $activities;

        return $this;
    }

    /**
     * Get activities.
     *
     * @return string|null
     */
    public function getActivities()
    {
        return $this->activities;
    }

    /**
     * Get coverPhotos.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getCoverPhotos()
    {
        return $this->coverPhotos;
    }

    /**
     * Set reviewsNum.
     *
     * @param int $reviewsNum
     *
     * @return Business
     */
    public function setReviewsNum($reviewsNum)
    {
        $this->reviewsNum = $reviewsNum;

        return $this;
    }

    /**
     * Get reviewsNum.
     *
     * @return int
     */
    public function getReviewsNum()
    {
        return $this->reviewsNum;
    }

    /**
     * Set reviewsAvg.
     *
     * @param int $reviewsAvg
     *
     * @return Business
     */
    public function setReviewsAvg($reviewsAvg)
    {
        $this->reviewsAvg = $reviewsAvg;

        return $this;
    }

    /**
     * Get reviewsAvg.
     *
     * @return int
     */
    public function getReviewsAvg()
    {
        return $this->reviewsAvg;
    }

    /**
     * Set reviewsSum.
     *
     * @param int $reviewsSum
     *
     * @return Business
     */
    public function setReviewsSum($reviewsSum)
    {
        $this->reviewsSum = $reviewsSum;

        return $this;
    }

    /**
     * Get reviewsSum.
     *
     * @return int
     */
    public function getReviewsSum()
    {
        return $this->reviewsSum;
    }
}
