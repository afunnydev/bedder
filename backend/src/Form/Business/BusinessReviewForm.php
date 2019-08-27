<?php

namespace App\Form\Business;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;

class BusinessReviewForm extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('ratingMoney', IntegerType::class, ['label'=> 'ratingMoney', 'required' => true, 'attr' => array('min' => 8)])
            ->add('ratingStaff', IntegerType::class, ['label'=> 'ratingStaff', 'required' => true])
            ->add('ratingLocation', IntegerType::class, ['label'=> 'ratingLocation', 'required' => true])
            ->add('ratingCleanliness', IntegerType::class, ['label'=> 'ratingCleanliness', 'required' => true])
            ->add('ratingServices', IntegerType::class, ['label'=> 'ratingServices', 'required' => true])
            ->add('description', TextType::class, ['label'=> 'description', 'required' => false])
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => null,
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
