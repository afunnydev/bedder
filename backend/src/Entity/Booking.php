<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity(repositoryClass="App\Repository\BookingRepository")
 * @ORM\Table(name="bookings")
 * @ORM\HasLifecycleCallbacks
 */
class Booking implements \JsonSerializable
{
    const BOOKING_AVAILABILITY_LIST_MAX_RANGE_IN_DAYS = 90;
    const BOOKING_AVAILABILITY_LIST_MAX_RANGE = 7776000; //90 days
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="smallint")
     */
    private $status;

    /**
     * @ORM\Column(type="datetime")
     */
    private $bookingFrom;

    /**
     * @ORM\Column(type="datetime")
     */
    private $bookingTo;

    /**
     * @ORM\Column(type="integer")
     */
    private $rate;

    /**
     * @ORM\Column(type="integer")
     */
    private $amount;

     /**
     * @ORM\Column(type="integer")
     */
    private $numPeople;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isReviewed = false;

    /**
     * @ORM\Column(name="created_at", type="datetime", nullable=false)
     */
    private $created_at;

    /**
     * @ORM\Column(name="updated_at", type="datetime", nullable=false)
     */
    private $updated_at;
    
    /**
     * @ORM\ManyToOne(targetEntity="Business", inversedBy="bookings")
     */
    private $business;

    /**
     * @ORM\ManyToOne(targetEntity="BusinessUnit", inversedBy="bookings")
     */
    private $businessUnit;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="bookings")
     */
    private $user;

    /**
     * @ORM\OneToOne(targetEntity="Gain", mappedBy="booking")
     */
    private $gain;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="ownerBookings")
     */
    private $owner;

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

    public function jsonSerialize()
    {
        return [
            'id'    => $this->getId(),
            'amount' => $this->getAmount(),
            'businessUnit' => $this->getBusinessUnit(),
            'businessUnitParent' => $this->getBusinessUnit()->getParentBusinessUnit(),
            'business' => $this->getBusiness(),
            'status' => $this->getStatus(),
            'from' => $this->getBookingFrom(),
            'to' => $this->getBookingTo(),
            'updatedAt' => $this->getUpdatedAt(),
            'user' => $this->getUser(),
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
     * Set status
     *
     * @param integer $status
     *
     * @return Booking
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
     * Set bookingFrom
     *
     * @param \DateTime $bookingFrom
     *
     * @return Booking
     */
    public function setBookingFrom($bookingFrom)
    {
        $this->bookingFrom = $bookingFrom;

        return $this;
    }

    /**
     * Get bookingFrom
     *
     * @return \DateTime
     */
    public function getBookingFrom()
    {
        return $this->bookingFrom;
    }

    /**
     * Set bookingTo
     *
     * @param \DateTime $bookingTo
     *
     * @return Booking
     */
    public function setBookingTo($bookingTo)
    {
        $this->bookingTo = $bookingTo;

        return $this;
    }

    /**
     * Get bookingTo
     *
     * @return \DateTime
     */
    public function getBookingTo()
    {
        return $this->bookingTo;
    }

    /**
     * Set rate
     *
     * @param int $rate
     *
     * @return Booking
     */
    public function setRate($rate)
    {
        $this->rate = $rate;

        return $this;
    }

    /**
     * Get rate
     *
     * @return int
     */
    public function getRate()
    {
        return $this->rate;
    }

    /**
     * Set amount
     *
     * @param int $amount
     *
     * @return Booking
     */
    public function setAmount($amount)
    {
        $this->amount = $amount;

        return $this;
    }

    /**
     * Get amount
     *
     * @return int
     */
    public function getAmount()
    {
        return $this->amount;
    }

    /**
     * Set numPeople
     *
     * @param int $numPeople
     *
     * @return Booking
     */
    public function setNumPeople($numPeople)
    {
        $this->numPeople = $numPeople;

        return $this;
    }

    /**
     * Get numPeople
     *
     * @return int
     */
    public function getNumPeople()
    {
        return $this->numPeople;
    }

    /**
     * Set isReviewed
     *
     * @param string $isReviewed
     *
     * @return Booking
     */
    public function setIsReviewed($isReviewed)
    {
        $this->isReviewed = $isReviewed;

        return $this;
    }

    /**
     * Get isReviewed
     *
     * @return string
     */
    public function getIsReviewed()
    {
        return $this->isReviewed;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Booking
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
     * @return Booking
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
     * Set business
     *
     * @param \App\Entity\Business $business
     *
     * @return Booking
     */
    public function setBusiness(\App\Entity\Business $business = null)
    {
        $this->business = $business;

        return $this;
    }

    /**
     * Get business
     *
     * @return \App\Entity\Business
     */
    public function getBusiness()
    {
        return $this->business;
    }

    /**
     * Set businessUnit
     *
     * @param \App\Entity\BusinessUnit $businessUnit
     *
     * @return Booking
     */
    public function setBusinessUnit(\App\Entity\BusinessUnit $businessUnit = null)
    {
        $this->businessUnit = $businessUnit;

        return $this;
    }

    /**
     * Get businessUnit
     *
     * @return \App\Entity\BusinessUnit
     */
    public function getBusinessUnit()
    {
        return $this->businessUnit;
    }

    /**
     * Set user
     *
     * @param \App\Entity\User $user
     *
     * @return Booking
     */
    public function setUser(\App\Entity\User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \App\Entity\User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set owner.
     *
     * @param \App\Entity\User|null $owner
     *
     * @return Booking
     */
    public function setOwner(\App\Entity\User $owner = null)
    {
        $this->owner = $owner;

        return $this;
    }

    /**
     * Get owner.
     *
     * @return \App\Entity\User|null
     */
    public function getOwner()
    {
        return $this->owner;
    }

    /**
     * Set gains.
     *
     * @param \App\Entity\Gain|null $gains
     *
     * @return Booking
     */
    public function setGain(\App\Entity\Gain $gain = null)
    {
        $this->gain = $gain;

        return $this;
    }

    /**
     * Get gains.
     *
     * @return \App\Entity\Gain|null
     */
    public function getGain()
    {
        return $this->gain;
    }
}
