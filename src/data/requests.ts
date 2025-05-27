import { ContactRequest } from '../types';

export const contactRequests: ContactRequest[] = [
  {
    id: '1',
    firstName: 'Paul',
    lastName: 'Bernard',
    email: 'paul.bernard@email.com',
    phone: '06 12 34 56 78',
    message: "Bonjour, je suis intéressé par l'appartement avec vue panoramique. Serait-il possible d'organiser une visite ce weekend ? Merci d'avance.",
    propertyId: '1',
    status: 'Nouveau',
    createdAt: '2023-10-05T09:30:00Z',
    assignedTo: '1'
  },
  {
    id: '2',
    firstName: 'Lucie',
    lastName: 'Girard',
    email: 'lucie.girard@email.com',
    phone: '06 23 45 67 89',
    message: "Bonjour, je souhaiterais avoir plus d'informations sur la maison familiale à Écully, notamment concernant l'état de la toiture et du système de chauffage. Pourriez-vous me contacter par téléphone ? Merci.",
    propertyId: '2',
    status: 'En cours',
    createdAt: '2023-10-06T14:15:00Z',
    assignedTo: '2'
  },
  {
    id: '3',
    firstName: 'Antoine',
    lastName: 'Marchand',
    email: 'antoine.marchand@email.com',
    phone: '06 34 56 78 90',
    message: "Bonjour, je cherche un bien pour investissement locatif dans le centre de Lyon. J'ai vu votre studio en location mais je serais plutôt intéressé pour l'acheter. Avez-vous des biens similaires à vendre ? Cordialement.",
    propertyId: '3',
    status: 'Traité',
    createdAt: '2023-10-08T11:45:00Z',
    assignedTo: '3'
  },
  {
    id: '4',
    firstName: 'Sophie',
    lastName: 'Durand',
    email: 'sophie.durand@email.com',
    phone: '06 45 67 89 01',
    message: "Bonjour, je souhaite prendre rendez-vous pour estimer mon appartement situé dans le 6ème arrondissement de Lyon en vue d'une vente dans les prochains mois. Quelles sont vos disponibilités ? Merci.",
    status: 'Nouveau',
    createdAt: '2023-10-10T16:30:00Z'
  },
  {
    id: '5',
    firstName: 'Julien',
    lastName: 'Fabre',
    email: 'julien.fabre@email.com',
    phone: '06 56 78 90 12',
    message: "Bonjour, je suis à la recherche d'un local commercial dans le 7ème arrondissement pour y installer ma boutique. J'ai vu votre annonce qui m'intéresse. Pourriez-vous me préciser les charges mensuelles et si une extraction est possible pour un commerce de restauration ? Cordialement.",
    propertyId: '5',
    status: 'En cours',
    createdAt: '2023-10-12T10:20:00Z',
    assignedTo: '2'
  }
];