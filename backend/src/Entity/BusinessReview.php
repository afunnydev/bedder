<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity(repositoryClass="App\Repository\BusinessReviewRepository")
 * @ORM\Table(name="business_reviews")
 */
class BusinessReview implements \JsonSerializable
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="smallint")
     */
    private $rating = 1;

    /**
     * @ORM\Column(type="smallint")
     */
    private $ratingMoney = 1;

    /**
     * @ORM\Column(type="smallint")
     */
    private $ratingStaff = 1;

    /**
     * @ORM\Column(type="smallint")
     */
    private $ratingLocation = 1;

    /**
     * @ORM\Column(type="smallint")
     */
    private $ratingCleanliness = 1;

    /**
     * @ORM\Column(type="smallint")
     */
    private $ratingServices = 1;

    /**
     * @ORM\Column(type="string")
     */
    private $body = '';

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $payload;

    /**
     * @ORM\Column(type="datetime")
     */
    private $created_at;

    /**
     * @ORM\Column(type="datetime")
     */
    private $updated_at;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="business_comments")
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="Business", inversedBy="reviews")
     */
    private $business;

    /**
     * @ORM\ManyToOne(targetEntity="BusinessUnit", inversedBy="reviews")
     */
    private $businessUnit;


    public function __construct()
    {
        $this->setCreatedAt(new \DateTime());
        $this->setUpdatedAt(new \DateTime());
    }

    public function jsonSerialize()
    {
        return [
            'id'    => $this->getId(),
            'body'  => $this->getBody(),
            'user'  => $this->getUser(),
            'rating'=> $this->getRating(),
            'date'  => $this->getCreatedAt(),
            'room'  => $this->getBusinessUnit()
        ];
    }
   
    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set rating.
     *
     * @param int $rating
     *
     * @return BusinessReview
     */
    public function setRating($rating)
    {
        $this->rating = $rating;

        return $this;
    }

    /**
     * Set rating automatically.
     *
     * @param int $rating
     *
     * @return BusinessReview
     */
    public function setRatingAutomatically()
    {
        $rating = ($this->ratingMoney + $this->ratingStaff + $this->ratingLocation + $this->ratingCleanliness + $this->ratingServices) / 5;
        $this->rating = $rating;

        return $this;
    }

    /**
     * Get rating.
     *
     * @return int
     */
    public function getRating()
    {
        return $this->rating;
    }

    /**
     * Set ratingMoney.
     *
     * @param int $ratingMoney
     *
     * @return BusinessReview
     */
    public function setRatingMoney($ratingMoney)
    {
        $this->ratingMoney = $ratingMoney;

        return $this;
    }

    /**
     * Get ratingMoney.
     *
     * @return int
     */
    public function getRatingMoney()
    {
        return $this->ratingMoney;
    }

    /**
     * Set ratingStaff.
     *
     * @param int $ratingStaff
     *
     * @return BusinessReview
     */
    public function setRatingStaff($ratingStaff)
    {
        $this->ratingStaff = $ratingStaff;

        return $this;
    }

    /**
     * Get ratingStaff.
     *
     * @return int
     */
    public function getRatingStaff()
    {
        return $this->ratingStaff;
    }

    /**
     * Set ratingLocation.
     *
     * @param int $ratingLocation
     *
     * @return BusinessReview
     */
    public function setRatingLocation($ratingLocation)
    {
        $this->ratingLocation = $ratingLocation;

        return $this;
    }

    /**
     * Get ratingLocation.
     *
     * @return int
     */
    public function getRatingLocation()
    {
        return $this->ratingLocation;
    }

    /**
     * Set ratingCleanliness.
     *
     * @param int $ratingCleanliness
     *
     * @return BusinessReview
     */
    public function setRatingCleanliness($ratingCleanliness)
    {
        $this->ratingCleanliness = $ratingCleanliness;

        return $this;
    }

    /**
     * Get ratingCleanliness.
     *
     * @return int
     */
    public function getRatingCleanliness()
    {
        return $this->ratingCleanliness;
    }

    /**
     * Set ratingServices.
     *
     * @param int $ratingServices
     *
     * @return BusinessReview
     */
    public function setRatingServices($ratingServices)
    {
        $this->ratingServices = $ratingServices;

        return $this;
    }

    /**
     * Get ratingServices.
     *
     * @return int
     */
    public function getRatingServices()
    {
        return $this->ratingServices;
    }

    /**
     * Set body.
     *
     * @param string $body
     *
     * @return BusinessReview
     */
    public function setBody($body)
    {
        $this->body = $body;

        return $this;
    }

    /**
     * Get body.
     *
     * @return string
     */
    public function getBody()
    {
        return $this->body;
    }

    /**
     * Set createdAt.
     *
     * @param \DateTime $createdAt
     *
     * @return BusinessReview
     */
    public function setCreatedAt($createdAt)
    {
        $this->created_at = $createdAt;

        return $this;
    }

    /**
     * Get createdAt.
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * Set updatedAt.
     *
     * @param \DateTime $updatedAt
     *
     * @return BusinessReview
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updated_at = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt.
     *
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updated_at;
    }

    /**
     * Set user.
     *
     * @param \App\Entity\User|null $user
     *
     * @return BusinessReview
     */
    public function setUser(\App\Entity\User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user.
     *
     * @return \App\Entity\User|null
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set business.
     *
     * @param \App\Entity\Business|null $business
     *
     * @return BusinessReview
     */
    public function setBusiness(\App\Entity\Business $business = null)
    {
        $this->business = $business;

        return $this;
    }

    /**
     * Get business.
     *
     * @return \App\Entity\Business|null
     */
    public function getBusiness()
    {
        return $this->business;
    }

    /**
     * Set businessUnit.
     *
     * @param \App\Entity\BusinessUnit|null $businessUnit
     *
     * @return BusinessReview
     */
    public function setBusinessUnit(\App\Entity\BusinessUnit $businessUnit = null)
    {
        $this->businessUnit = $businessUnit;

        return $this;
    }

    /**
     * Get businessUnit.
     *
     * @return \App\Entity\BusinessUnit|null
     */
    public function getBusinessUnit()
    {
        return $this->businessUnit;
    }

    /**
     * Set payload.
     *
     * @param string|null $payload
     *
     * @return BusinessReview
     */
    public function setPayload($payload = null)
    {
        $this->payload = serialize($payload);

        return $this;
    }

    /**
     * Get payload.
     *
     * @return string|null
     */
    public function getPayload()
    {
        return unserialize($this->payload);
    }
}
