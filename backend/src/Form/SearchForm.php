<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Validator\Constraints\NotNull;

class SearchForm extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('from', TextType::class, ['label'=> 'from', 'constraints' => array(new NotNull()) ])
            ->add('to', TextType::class, ['label'=> 'to', 'constraints' => array(new NotNull()) ])
            ->add('lat', TextType::class, ['label'=> 'lat', 'constraints' => array(new NotNull()) ])
            ->add('lon', TextType::class, ['label'=> 'lon', 'constraints' => array(new NotNull()) ])
            ->add('minPersons', TextType::class, ['label'=> 'minPersons', 'constraints' => array(new NotNull()) ])
            ->add('numBed', TextType::class, ['label'=> 'numBed', 'constraints' => array(new NotNull()) ])
            ->add('name', TextType::class, ['label'=> 'name', 'required' => false])
            ->add('location', TextType::class, ['label'=> 'location', 'required' => false])
            ->add('pageNum', TextType::class, ['label'=> 'pageNum', 'required' => false])
            ->add('filterPrice', CollectionType::class, ['label'=> 'filterPrice', 'required' => false, 'entry_type' => TextType::class, 'allow_add' => true])
            ->add('filter1Star', TextType::class, ['label'=> 'filter1Star', 'required' => false])
            ->add('filter2Star', TextType::class, ['label'=> 'filter2Star', 'required' => false])
            ->add('filter3Star', TextType::class, ['label'=> 'filter3Star', 'required' => false])
            ->add('filter4Star', TextType::class, ['label'=> 'filter4Star', 'required' => false])
            ->add('filter5Star', TextType::class, ['label'=> 'filter5Star', 'required' => false])
            ->add('filterTypes', CollectionType::class, ['label'=> 'filterTypes', 'required' => false, 'entry_type' => TextType::class,'allow_add' => true])
            ->add('sortBy', TextType::class, ['label'=> 'sortBy', 'required' => false])
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
