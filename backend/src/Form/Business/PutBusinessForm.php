<?php

namespace App\Form\Business;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotNull;

class PutBusinessForm extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', TextType::class, ['label'=> 'name', 'constraints' => array(new NotNull()) ])
            ->add('address', TextType::class, ['label'=> 'address', 'constraints' => array(new NotNull()) ])
            ->add('lat', TextType::class, ['label'=> 'lat', 'constraints' => array(new NotNull()) ])
            ->add('lon', TextType::class, ['label'=> 'lon', 'constraints' => array(new NotNull()) ])
            ->add('smsValidation', CheckboxType::class, ['label'=> 'smsValidation', 'constraints' => array(new NotNull()) ])
            ->add('country', TextType::class, ['label'=> 'country', 'required' => false ])
            ->add('city', TextType::class, ['label'=> 'city', 'required' => false ])
            ->add('rate', TextType::class, ['label'=> 'rate', 'required' => false ])
            ->add('maxPersons', TextType::class, ['label'=> 'maxPersons', 'required' => false ])
            ->add('description',TextType::class, ['label'=> 'description', 'required' => false ])
            ->add('sameUnitsAmount',TextType::class, ['label'=> 'sameUnitsAmount', 'required' => false ])
            ->add('mood', TextType::class, ['label' => 'mood', 'required' => false])
            ->add('propertyType', TextType::class, ['label' => 'propertyType', 'required' => false])
            ->add('amenities', TextType::class, ['label' => 'amenities', 'required' => false])
            ->add('businessUnits', TextType::class, ['label' => 'businessUnits', 'required' => false])
            ->add('stars', TextType::class, ['label' => 'stars', 'required' => false])
            ->add('opinionStrong', TextType::class, ['label' => 'opinionStrong', 'required' => false])
            ->add('opinionWeak', TextType::class, ['label' => 'opinionWeak', 'required' => false])
            ->add('around', TextType::class, ['label' => 'around', 'required' => false])
            ->add('howToFind', TextType::class, ['label' => 'howToFind', 'required' => false])
            ->add('status', TextType::class, ['label' => 'status', 'required' => false])
            ->add('activities', TextType::class, ['label' => 'activities', 'required' => false])
            ->add('coverPhotos', TextType::class, ['label' => 'coverPhotos', 'required' => false])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => null,
            'csrf_protection'   => false,
        ));
    }


    public function getBlockPrefix()
    {
        return '';
    }

}