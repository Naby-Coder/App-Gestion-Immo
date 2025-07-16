import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { mockStorage } from '../../lib/mockData';

interface ContactFormProps {
  propertyId?: string;
  propertyTitle?: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}
/*Form de contact*/
const ContactForm = ({ propertyId, propertyTitle }: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simuler un envoi de formulaire
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Créer une nouvelle demande de contact
      const newRequest = {
        id: Date.now().toString(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        message: data.message,
        propertyId: propertyId || null,
        status: 'Nouveau',
        createdAt: new Date().toISOString(),
        assignedTo: null
      };

      // Ajouter à la liste des demandes
      mockStorage.add('contactRequests', newRequest);
      
      console.log('Form data submitted:', newRequest);
      setIsSuccess(true);
      reset();
      
      // Réinitialiser le message de succès après 5 secondes
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {propertyTitle && (
        <div className="mb-4 pb-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Demande d'information</h3>
          <p className="text-gray-600">Concernant : {propertyTitle}</p>
        </div>
      )}
      
      {isSuccess ? (
        <div className="bg-success-50 border border-success-100 text-success-700 px-4 py-3 rounded-md mb-4">
          Votre demande a été envoyée avec succès. Nous vous contacterons dans les plus brefs délais.
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                Prénom *
              </label>
              <input
                id="firstName"
                type="text"
                className={`input ${errors.firstName ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
                {...register('firstName', { required: 'Ce champ est requis' })}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-error-500">{errors.firstName.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Nom *
              </label>
              <input
                id="lastName"
                type="text"
                className={`input ${errors.lastName ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
                {...register('lastName', { required: 'Ce champ est requis' })}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-error-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                id="email"
                type="email"
                className={`input ${errors.email ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
                {...register('email', { 
                  required: 'Ce champ est requis',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Adresse email invalide'
                  }
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-error-500">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone *
              </label>
              <input
                id="phone"
                type="tel"
                className={`input ${errors.phone ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
                {...register('phone', { 
                  required: 'Ce champ est requis'
                })}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-error-500">{errors.phone.message}</p>
              )}
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message *
            </label>
            <textarea
              id="message"
              rows={5}
              className={`input ${errors.message ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
              {...register('message', { required: 'Ce champ est requis' })}
            ></textarea>
            {errors.message && (
              <p className="mt-1 text-sm text-error-500">{errors.message.message}</p>
            )}
          </div>
          
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
