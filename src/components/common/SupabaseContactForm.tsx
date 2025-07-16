import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDemandesContact } from '../../hooks/useSupabase';

interface ContactFormProps {
  propertyId?: string;
  propertyTitle?: string;
}

interface FormData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  message: string;
}

const SupabaseContactForm = ({ propertyId, propertyTitle }: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { createDemande } = useDemandesContact();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const result = await createDemande({
        prenom: data.prenom,
        nom: data.nom,
        email: data.email,
        telephone: data.telephone,
        message: data.message,
        bien_id: propertyId || null,
        statut: 'Nouveau'
      });

      if (result.error) {
        throw new Error(result.error);
      }
      
      setIsSuccess(true);
      reset();
      
      // Réinitialiser le message de succès après 5 secondes
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
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
              <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">
                Prénom *
              </label>
              <input
                id="prenom"
                type="text"
                className={`input ${errors.prenom ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
                {...register('prenom', { required: 'Ce champ est requis' })}
              />
              {errors.prenom && (
                <p className="mt-1 text-sm text-error-500">{errors.prenom.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                Nom *
              </label>
              <input
                id="nom"
                type="text"
                className={`input ${errors.nom ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
                {...register('nom', { required: 'Ce champ est requis' })}
              />
              {errors.nom && (
                <p className="mt-1 text-sm text-error-500">{errors.nom.message}</p>
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
              <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone *
              </label>
              <input
                id="telephone"
                type="tel"
                className={`input ${errors.telephone ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
                {...register('telephone', { 
                  required: 'Ce champ est requis'
                })}
              />
              {errors.telephone && (
                <p className="mt-1 text-sm text-error-500">{errors.telephone.message}</p>
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

export default SupabaseContactForm;
