<?php

namespace App\Entity;

use Symfony\Component\Security\Core\User\UserInterface;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @ORM\Table(name="users")
 * @ORM\HasLifecycleCallbacks
 */
class User implements UserInterface, \JsonSerializable
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     *
     * @ORM\Column(type="integer")
     */
    private $debit = 0;

    /**
     *
     * @ORM\Column(type="integer")
     */
    private $credit = 0;

    /**
     *
     * @ORM\Column(type="integer")
     */
    private $explorerEarning = 10;

    /**
     *
     * @ORM\Column(type="integer")
     */
    private $isActive = 0;

     /**
     *
     * @ORM\Column(type="boolean")
     */
    private $isBlocked = 0;

    /**
     *
     * @ORM\Column(type="string", length=16, nullable=true)
     */
    private $activationCode;

    /**
     *
     * @ORM\Column(type="string", length=50)
     */
    private $firstname;

    /**
     *
     * @ORM\Column(type="string", length=50)
     */
    private $lastname;

    /**
     *
     * @ORM\Column(type="string", length=1000, nullable=true)
     */
    private $about;

    /**
     * @ORM\Column(type="string", length=100, unique=true)
     */
    private $email;

    /**
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @ORM\Column(type="string", length=1000, nullable=true)
     */
    private $facebookPayload = null;

    /**
     * @ORM\Column(type="bigint", nullable=true, unique=true)
     */
    private $facebookId;

    /**
     * @ORM\Column(name="created_at", type="datetime", nullable=false)
     */
    private $created_at;

    /**
     * @ORM\Column(name="updated_at", type="datetime", nullable=false)
     */
    private $updated_at;

    /**
     * @ORM\OneToOne(targetEntity="Phone", inversedBy="user")
     */
    private $phone;

    /**
     * @ORM\OneToOne(targetEntity="File")
     */
    private $photos;

    /**
     * @ORM\OneToMany(targetEntity="Business", mappedBy="manageUser")
     */
    private $manageBusinesses;

    /**
     * @ORM\OneToMany(targetEntity="Business", mappedBy="ownerUser")
     */
    private $ownerBusinesses;

    /**
     * @ORM\OneToMany(targetEntity="Booking", mappedBy="user")
     */
    private $bookings;

    /**
     * @ORM\OneToMany(targetEntity="Booking", mappedBy="owner")
     */
    private $ownerBookings;

    /**
     * @ORM\OneToMany(targetEntity="SupportTicket", mappedBy="fromUser", cascade={"remove"})
     */
    private $supportTickets;

    /**
     * @ORM\OneToMany(targetEntity="Gain", mappedBy="user")
     */
    private $gains;

    /**
     * @ORM\OneToOne(targetEntity="PasswordReset", inversedBy="user")
     */
    private $passwordReset;

    public function __construct()
    {
        $this->manageBusinesses = new ArrayCollection();
        $this->ownerBusinesses = new ArrayCollection();
        $this->bookings = new ArrayCollection();
        $this->supportTickets = new ArrayCollection();
        $this->gains = new ArrayCollection();
    }

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
            'id' => $this->getId(),
            'email' => $this->getEmail(),
            'firstname' => $this->getFirstname(),
            'lastname'  => $this->getLastname(),
            'isBlocked' => $this->getIsBlocked(),
            'name' => $this->getName(),
            'roles' => $this->getRoles(),
            'phone' => $this->getPhone(),
            'about' => $this->getAbout(),
            'photos' => $this->getPhotos(),
            'debit' => $this->getDebit(),
            'credit' => $this->getCredit(),
        ];
    }

    /**
     * Those 2 functions need to be implemented for a User, even if not used.
     */
    public function getSalt() { return; }
    public function eraseCredentials() {}

    /* Read-only fn */

    /*
     * Get the full name of the user
     * @return string
     */
    public function getName()
    {
        return $this->firstname.' '.$this->lastname;
    }

    public function getUsername()
    {
        return $this->email;
    }

    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Returns the roles or permissions granted to the user for security.
     */
    public function getRoles()
    {
        return $this->roles;
    }

    public function setRoles($roles)
    {
        $this->roles = $roles;
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
     * Set isActive.
     *
     * @param int $isActive
     *
     * @return User
     */
    public function setIsActive($isActive)
    {
        $this->isActive = $isActive;

        return $this;
    }

    /**
     * Get isActive.
     *
     * @return int
     */
    public function getIsActive()
    {
        return $this->isActive;
    }

    /**
     * Set isBlocked.
     *
     * @param bool $isBlocked
     *
     * @return User
     */
    public function setIsBlocked($isBlocked)
    {
        $this->isBlocked = $isBlocked;

        return $this;
    }

    /**
     * Get isBlocked.
     *
     * @return bool
     */
    public function getIsBlocked()
    {
        return $this->isBlocked;
    }

    /**
     * Set activationCode.
     *
     * @param string $activationCode
     *
     * @return User
     */
    public function setActivationCode($activationCode)
    {
        $this->activationCode = $activationCode;

        return $this;
    }

    /**
     * Get activationCode.
     *
     * @return string
     */
    public function getActivationCode()
    {
        return $this->activationCode;
    }

    /**
     * Set firstname.
     *
     * @param string $firstname
     *
     * @return User
     */
    public function setFirstname($firstname)
    {
        $this->firstname = $firstname;

        return $this;
    }

    /**
     * Get firstname.
     *
     * @return string
     */
    public function getFirstname()
    {
        return $this->firstname;
    }

    /**
     * Set lastname.
     *
     * @param string $lastname
     *
     * @return User
     */
    public function setLastname($lastname)
    {
        $this->lastname = $lastname;

        return $this;
    }

    /**
     * Get lastname.
     *
     * @return string
     */
    public function getLastname()
    {
        return $this->lastname;
    }

    /**
     * Set about.
     *
     * @param string|null $about
     *
     * @return User
     */
    public function setAbout($about = null)
    {
        $this->about = $about;

        return $this;
    }

    /**
     * Get about.
     *
     * @return string|null
     */
    public function getAbout()
    {
        return $this->about;
    }

    /**
     * Set email.
     *
     * @param string $email
     *
     * @return User
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email.
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set password.
     *
     * @param string $password
     *
     * @return User
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Set phone.
     *
     * @param \App\Entity\Phone|null $phone
     *
     * @return TemporaryUser
     */
    public function setPhone(\App\Entity\Phone $phone = null)
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * Get phone.
     *
     * @return \App\Entity\Phone|null
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * Add a photo.
     *
     * @param \App\Entity\File $file
     *
     * @return Business
     */
    public function addPhotos(\App\Entity\File $file)
    {
        $this->photos[] = $file;

        return $this;
    }

    /**
     * Remove a photo.
     *
     * @param \App\Entity\File $file
     *
     * @return boolean TRUE if this collection contained the specified element, FALSE otherwise.
     */
    public function removePhotos(\App\Entity\File $file)
    {
        return $this->photos->removeElement($file);
    }

    /**
     * Get photos.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getPhotos()
    {
        return $this->photos;
    }

    /**
     * Set createdAt.
     *
     * @param \DateTime $createdAt
     *
     * @return User
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
     * @return User
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
     * Add manageBusiness.
     *
     * @param \App\Entity\Business $manageBusiness
     *
     * @return User
     */
    public function addManageBusiness(\App\Entity\Business $manageBusiness)
    {
        $this->manageBusinesses[] = $manageBusiness;

        return $this;
    }

    /**
     * Remove manageBusiness.
     *
     * @param \App\Entity\Business $manageBusiness
     *
     * @return boolean TRUE if this collection contained the specified element, FALSE otherwise.
     */
    public function removeManageBusiness(\App\Entity\Business $manageBusiness)
    {
        return $this->manageBusinesses->removeElement($manageBusiness);
    }

    /**
     * Get manageBusinesses.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getManageBusinesses()
    {
        return $this->manageBusinesses;
    }

    /**
     * Add ownerBusiness.
     *
     * @param \App\Entity\Business $ownerBusiness
     *
     * @return User
     */
    public function addOwnerBusiness(\App\Entity\Business $ownerBusiness)
    {
        $this->ownerBusinesses[] = $ownerBusiness;

        return $this;
    }

    /**
     * Remove ownerBusiness.
     *
     * @param \App\Entity\Business $ownerBusiness
     *
     * @return boolean TRUE if this collection contained the specified element, FALSE otherwise.
     */
    public function removeOwnerBusiness(\App\Entity\Business $ownerBusiness)
    {
        return $this->ownerBusinesses->removeElement($ownerBusiness);
    }

    /**
     * Get ownerBusinesses.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getOwnerBusinesses()
    {
        return $this->ownerBusinesses;
    }

    /**
     * Add booking.
     *
     * @param \App\Entity\Booking $booking
     *
     * @return User
     */
    public function addBooking(\App\Entity\Booking $booking)
    {
        $this->bookings[] = $booking;

        return $this;
    }

    /**
     * Remove booking.
     *
     * @param \App\Entity\Booking $booking
     *
     * @return boolean TRUE if this collection contained the specified element, FALSE otherwise.
     */
    public function removeBooking(\App\Entity\Booking $booking)
    {
        return $this->bookings->removeElement($booking);
    }

    /**
     * Get bookings.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getBookings()
    {
        return $this->bookings;
    }

    /**
     * Add ownerBooking.
     *
     * @param \App\Entity\Booking $ownerBooking
     *
     * @return User
     */
    public function addOwnerBooking(\App\Entity\Booking $ownerBooking)
    {
        $this->ownerBookings[] = $ownerBooking;

        return $this;
    }

    /**
     * Remove ownerBooking.
     *
     * @param \App\Entity\Booking $ownerBooking
     *
     * @return boolean TRUE if this collection contained the specified element, FALSE otherwise.
     */
    public function removeOwnerBooking(\App\Entity\Booking $ownerBooking)
    {
        return $this->ownerBookings->removeElement($ownerBooking);
    }

    /**
     * Get ownerBookings.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getOwnerBookings()
    {
        return $this->ownerBookings;
    }

    /**
     * Add supportTicket.
     *
     * @param \App\Entity\SupportTicket $supportTicket
     *
     * @return User
     */
    public function addSupportTicket(\App\Entity\SupportTicket $supportTicket)
    {
        $this->supportTickets[] = $supportTicket;

        return $this;
    }

    /**
     * Remove supportTicket.
     *
     * @param \App\Entity\SupportTicket $supportTicket
     *
     * @return boolean TRUE if this collection contained the specified element, FALSE otherwise.
     */
    public function removeSupportTicket(\App\Entity\SupportTicket $supportTicket)
    {
        return $this->supportTickets->removeElement($supportTicket);
    }

    /**
     * Get supportTickets.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getSupportTickets()
    {
        return $this->supportTickets;
    }

    /**
     * Set passwordReset.
     *
     * @param \App\Entity\PasswordReset|null $passwordReset
     *
     * @return User
     */
    public function setPasswordReset(\App\Entity\PasswordReset $passwordReset = null)
    {
        $this->passwordReset = $passwordReset;

        return $this;
    }

    /**
     * Get passwordReset.
     *
     * @return \App\Entity\PasswordReset|null
     */
    public function getPasswordReset()
    {
        return $this->passwordReset;
    }

    /**
     * Set facebookPayload.
     *
     * @param string|null $facebookPayload
     *
     * @return User
     */
    public function setFacebookPayload($facebookPayload = null)
    {
        $this->facebookPayload = serialize($facebookPayload);

        return $this;
    }

    /**
     * Get facebookPayload.
     *
     * @return string|null
     */
    public function getFacebookPayload()
    {
        return unserialize($this->facebookPayload);
    }

    /**
     * Set facebookId.
     *
     * @param int|null $facebookId
     *
     * @return User
     */
    public function setFacebookId($facebookId = null)
    {
        $this->facebookId = $facebookId;

        return $this;
    }

    /**
     * Get facebookId.
     *
     * @return int|null
     */
    public function getFacebookId()
    {
        return $this->facebookId;
    }

    /**
     * Set debit.
     *
     * @param int $debit
     *
     * @return User
     */
    public function setDebit($debit)
    {
        $this->debit = $debit;

        return $this;
    }

    /**
     * Get debit.
     *
     * @return int
     */
    public function getDebit()
    {
        return $this->debit;
    }

    /**
     * Set credit.
     *
     * @param int $credit
     *
     * @return User
     */
    public function setCredit($credit)
    {
        $this->credit = $credit;

        return $this;
    }

    /**
     * Get credit.
     *
     * @return int
     */
    public function getCredit()
    {
        return $this->credit;
    }

    /**
     * Set explorerEarning.
     *
     * @param int $explorerEarning
     *
     * @return User
     */
    public function setExplorerEarning($explorerEarning)
    {
        $this->explorerEarning = $explorerEarning;

        return $this;
    }

    /**
     * Get explorerEarning.
     *
     * @return int
     */
    public function getExplorerEarning()
    {
        return $this->explorerEarning;
    }
}
