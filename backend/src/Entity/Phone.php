<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;
use App\Validator\Constraints as AppAssert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PhoneRepository")
 * @ORM\Table(name="phone")
 * @ORM\HasLifecycleCallbacks
 */
class Phone implements \JsonSerializable
{
    const PASSWORD_RESET_ALIVE = 300000;
    const CODE_LENGTH = 6;
    const MAX_TRIES = 4;

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=20, unique=true)
     */
    private $number;

    /**
     * @ORM\Column(type="string", length=2)
     */
    private $country;

    /**
     * @ORM\Column(name="verified", type="boolean")
     */
    private $verified = false;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $verificationCode;

    /**
     * @ORM\Column(type="smallint")
     */
    private $tries = 0;

    /**
     * @ORM\OneToOne(targetEntity="User", mappedBy="phone")
     */
    private $user;

    /**
     * @ORM\Column(name="created_at", type="datetime", nullable=false)
     */
    private $created_at;

    /**
     * @ORM\Column(name="updated_at", type="datetime", nullable=false)
     */
    private $updated_at;

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
            'number' => $this->getNumber(),
            'country' => $this->getCountry(),
            'createdAt' => $this->getCreatedAt()
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
     * Set verification code
     *
     * @return Phone
     */
    public function setVerificationCode()
    {
        // generate a fixed-length verification code that's zero-padded, e.g. 007828, 936504, 150222
        $this->verificationCode = sprintf('%0'.self::CODE_LENGTH.'d', mt_rand(1, str_repeat(9, self::CODE_LENGTH)));

        return $this;
    }

    /**
     * Get verification code
     *
     * @return string
     */
    public function getVerificationCode()
    {
        return $this->verificationCode;
    }

    /**
     * Set verified
     *
     * @param bool $verified
     *
     * @return Phone
     */
    public function setVerified($verified)
    {
        $this->verified = $verified;

        return $this;
    }

    /**
     * Get verified
     *
     * @return integer
     */
    public function getVerified()
    {
        return $this->verified;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Phone
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
     * @return Phone
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
     * Set user
     *
     * @param \App\Entity\User $user
     *
     * @return Phone
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
     * Set tries
     *
     * @param integer $tries
     *
     * @return Phone
     */
    public function setTries($tries)
    {
        $this->tries = $tries;

        return $this;
    }

    /**
     * Get tries
     *
     * @return integer
     */
    public function getTries()
    {
        return $this->tries;
    }

    /**
     * Set number
     *
     * @param string $number
     *
     * @return Phone
     */
    public function setNumber($number)
    {
        $this->number = $number;

        return $this;
    }

    /**
     * Get number
     *
     * @return integer
     */
    public function getNumber()
    {
        return $this->number;
    }

    /**
     * Set country
     *
     * @param string $country
     *
     * @return Phone
     */
    public function setCountry($country)
    {
        $this->country = $country;

        return $this;
    }

    /**
     * Get country
     *
     * @return integer
     */
    public function getCountry()
    {
        return $this->country;
    }
}
