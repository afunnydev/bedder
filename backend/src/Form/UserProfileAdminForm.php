<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;

class UserProfileAdminForm extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('firstname', TextType::class, ['label'=> 'firstname'])
            ->add('lastname', TextType::class, ['label'=> 'lastname'])
            ->add('phone', TextType::class, ['label'=> 'phone', 'required' => false])
            ->add('photos', TextType::class, ['label'=> 'phone', 'required' => false])
            ->add('about', TextType::class, ['label'=> 'about', 'required' => false])
            ->add('email', EmailType::class, ['label'=> 'email', 'required' => 'false'])
            ->add('oldPassword', TextType::class, ['label'=> 'oldPassword','required' => false, 'mapped' => false])
            ->add('newPassword', TextType::class, ['label'=> 'newPassword','required' => false, 'mapped' => false])
            ->add('roles', TextType::class, ['label'=> 'roles', 'required' => 'false'])
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => User::class,
            'csrf_protection'   => false,
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return '';
    }
}
