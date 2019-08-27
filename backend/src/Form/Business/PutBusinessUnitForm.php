<?php

namespace App\Form\Business;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotNull;

class PutBusinessUnitForm extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', TextType::class, ['label'=> 'name', 'constraints' => array(new NotNull()) ])
            ->add('rate', TextType::class, ['label'=> 'rate', 'constraints' => array(new NotNull()) ])
            ->add('maxPersons', TextType::class, ['label'=> 'maxPersons', 'constraints' => array(new NotNull()) ])
            ->add('options',TextType::class, ['label'=> 'options', 'required' => false ])
            ->add('description',TextType::class, ['label'=> 'description', 'required' => false ])
            ->add('sameUnitsAmount',TextType::class, ['label'=> 'sameUnitsAmount', 'required' => false ])
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