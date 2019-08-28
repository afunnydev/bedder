<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity(repositoryClass="App\Repository\BusinessUnitRepository")
 * @ORM\Table(name="business_units")
 * @ORM\HasLifecycleCallbacks
 */
class BusinessUnit implements \JsonSerializable
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string")
     */
    private $name;

    /**
     * @ORM\Column(type="integer")
     */
    private $rate;

    /**
     * @ORM\Column(type="string")
     */
    private $currency;

    /**
     * @ORM\Column(type="integer")
     */
    private $fullRate;

    /**
     * @ORM\Column(type="integer")
     */
    private $maxPersons = 1;

    /**
     * @ORM\Column(type="integer")
     */
    private $numUnits = 1;

    /**
     * @ORM\Column(type="boolean")
     */
    private $acceptAutomatically = false;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $equipment;

    /**
     * @ORM\Column(type="string", nullable=true, length=64)
     */
    private $bedsKing;

    /**
     * @ORM\Column(type="string", nullable=true, length=64)
     */
    private $bedsQueen;

    /**
     * @ORM\Column(type="string", nullable=true, length=64)
     */
    private $bedsSimple;

    /**
     * @ORM\Column(name="created_at", type="datetime", nullable=false)
     */
    private $created_at;

    /**
     * @ORM\Column(name="updated_at", type="datetime", nullable=false)
     */
    private $updated_at;

    /**
     * @ORM\ManyToOne(targetEntity="Business", inversedBy="businessUnits")
     */
    private $business;

    /**
     * @ORM\OneToMany(targetEntity="File", mappedBy="businessUnit", cascade={"remove"})
     */
    private $files;

    /**
     * @ORM\OneToMany(targetEntity="BusinessReview", mappedBy="businessUnit")
     */
    private $reviews;

    /**
     * @ORM\OneToMany(targetEntity="Booking", mappedBy="businessUnit")
     */
    private $bookings;

    /**
     * @ORM\OneToMany(targetEntity="BusinessUnit", mappedBy="parentBusinessUnit")
     */
    private $childBusinessUnit;

    /**
     * @ORM\ManyToOne(targetEntity="BusinessUnit", inversedBy="childBusinessUnit")
     */
    private $parentBusinessUnit;

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
        $this->files = new ArrayCollection();
        $this->reviews = new ArrayCollection();
        $this->bookings = new ArrayCollection();
        $this->childBusinessUnit = new ArrayCollection();
    }

    public function jsonSerialize()
    {
        return [
            'id'    => $this->getId(),
            'parentId' => ($this->getParentBusinessUnit())
                ? $this->getParentBusinessUnit()->getId() : $this->getParentBusinessUnit(),
            'name' => $this->getName(),
            'rate' => $this->getRate(),
            'currency' => $this->getCurrency(),
            'fullRate' => $this->getFullRate(),
            'maxPersons' => $this->getMaxPersons(),
            'createdAt' => $this->getCreatedAt(),
            'updatedAt' => $this->getUpdatedAt(),
            'files' => $this->getFiles(),
            'numUnits' => $this->getNumUnits(),
            'bedsKing' => $this->getBedsKing(),
            'bedsQueen' => $this->getBedsQueen(),
            'bedsSimple' => $this->getBedsSimple(),
            'equipment' => $this->getEquipment(),
            'acceptAutomatically' => $this->getAcceptAutomatically(),
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
     * @return BusinessUnit
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
     * Set rate
     *
     * @param int $rate
     *
     * @return BusinessUnit
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
     * Set currency
     *
     * @param string $currency
     *
     * @return BusinessUnit
     */
    public function setCurrency($currency)
    {
        $this->currency = $currency;

        return $this;
    }

    /**
     * Get currency
     *
     * @return string
     */
    public function getCurrency()
    {
        return $this->currency;
    }

    /**
     * Set fullRate
     *
     * @param int $fullRate
     *
     * @return BusinessUnit
     */
    public function setFullRate($fullRate)
    {
        $this->fullRate = $fullRate;

        return $this;
    }

    /**
     * Get fullRate
     *
     * @return int
     */
    public function getFullRate()
    {
        return $this->fullRate;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return BusinessUnit
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
     * @return BusinessUnit
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
     * @return BusinessUnit
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
     * Set business
     *
     * @param \App\Entity\Business $business
     *
     * @return BusinessUnit
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
     * Get files
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getFiles()
    {
        return $this->files;
    }

    /**
     * Add booking
     *
     * @param \App\Entity\Booking $booking
     *
     * @return BusinessUnit
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
     * Add childBusinessUnit.
     *
     * @param \App\Entity\BusinessUnit $childBusinessUnit
     *
     * @return BusinessUnit
     */
    public function addChildBusinessUnit(\App\Entity\BusinessUnit $childBusinessUnit)
    {
        $this->childBusinessUnit[] = $childBusinessUnit;

        return $this;
    }

    /**
     * Remove childBusinessUnit.
     *
     * @param \App\Entity\BusinessUnit $childBusinessUnit
     *
     * @return boolean TRUE if this collection contained the specified element, FALSE otherwise.
     */
    public function removeChildBusinessUnit(\App\Entity\BusinessUnit $childBusinessUnit)
    {
        return $this->childBusinessUnit->removeElement($childBusinessUnit);
    }

    /**
     * Get childBusinessUnit.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getChildBusinessUnit()
    {
        return $this->childBusinessUnit;
    }

    /**
     * Set parentBusinessUnit.
     *
     * @param \App\Entity\BusinessUnit|null $parentBusinessUnit
     *
     * @return BusinessUnit
     */
    public function setParentBusinessUnit(\App\Entity\BusinessUnit $parentBusinessUnit = null)
    {
        $this->parentBusinessUnit = $parentBusinessUnit;

        return $this;
    }

    /**
     * Get parentBusinessUnit.
     *
     * @return \App\Entity\BusinessUnit|null
     */
    public function getParentBusinessUnit()
    {
        return $this->parentBusinessUnit;
    }

    /**
     * Set maxPersons.
     *
     * @param int $maxPersons
     *
     * @return BusinessUnit
     */
    public function setMaxPersons($maxPersons)
    {
        $this->maxPersons = $maxPersons;

        return $this;
    }

    /**
     * Get maxPersons.
     *
     * @return int
     */
    public function getMaxPersons()
    {
        return $this->maxPersons;
    }

    /**
     * Add review.
     *
     * @param \App\Entity\BusinessReview $review
     *
     * @return BusinessUnit
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
     * Set bedsQueen.
     *
     * @param string|null $bedsQueen
     *
     * @return BusinessUnit
     */
    public function setBedsQueen($bedsQueen = null)
    {
        $this->bedsQueen = $bedsQueen;

        return $this;
    }

    /**
     * Get bedsQueen.
     *
     * @return string|null
     */
    public function getBedsQueen()
    {
        return $this->bedsQueen;
    }

    /**
     * Set bedsSimple.
     *
     * @param string|null $bedsSimple
     *
     * @return BusinessUnit
     */
    public function setBedsSimple($bedsSimple = null)
    {
        $this->bedsSimple = $bedsSimple;

        return $this;
    }

    /**
     * Get bedsSimple.
     *
     * @return string|null
     */
    public function getBedsSimple()
    {
        return $this->bedsSimple;
    }

    /**
     * Set bedsKing.
     *
     * @param string|null $bedsKing
     *
     * @return BusinessUnit
     */
    public function setBedsKing($bedsKing = null)
    {
        $this->bedsKing = $bedsKing;

        return $this;
    }

    /**
     * Get bedsKing.
     *
     * @return string|null
     */
    public function getBedsKing()
    {
        return $this->bedsKing;
    }

    /**
     * Set equipment.
     *
     * @param string|null $equipment
     *
     * @return BusinessUnit
     */
    public function setEquipment($equipment = null)
    {
        $this->equipment = $equipment;

        return $this;
    }

    /**
     * Get equipment.
     *
     * @return string|null
     */
    public function getEquipment()
    {
        return $this->equipment;
    }

    /**
     * Set numUnits.
     *
     * @param int $numUnits
     *
     * @return BusinessUnit
     */
    public function setNumUnits($numUnits)
    {
        $this->numUnits = $numUnits;

        return $this;
    }

    /**
     * Get numUnits.
     *
     * @return int
     */
    public function getNumUnits()
    {
        return $this->numUnits;
    }

    /**
     * Set acceptAutomatically.
     *
     * @param bool $acceptAutomatically
     *
     * @return BusinessUnit
     */
    public function setAcceptAutomatically($acceptAutomatically)
    {
        $this->acceptAutomatically = $acceptAutomatically;

        return $this;
    }

    /**
     * Get acceptAutomatically.
     *
     * @return bool
     */
    public function getAcceptAutomatically()
    {
        return $this->acceptAutomatically;
    }
}
