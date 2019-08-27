<?php
namespace App\Form\Booking;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotNull;

class PostBookingForm extends AbstractType
{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('from', TextType::class, ['label'=> 'to', 'constraints' => array(new NotNull()) ])
            ->add('to', TextType::class, ['label'=> 'to', 'constraints' => array(new NotNull()) ])
            ->add('businessUnitId', TextType::class, ['label'=> 'business', 'constraints' => array(new NotNull()) ])
            ->add('numUnits', TextType::class, ['label'=> 'numUnits', 'constraints' => array(new NotNull()) ])
            ->add('payload', TextType::class, ['label'=> 'payload', 'constraints' => array(new NotNull()) ])
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