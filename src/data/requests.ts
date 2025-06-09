import { ContactRequest } from '../types';

export const contactRequests: ContactRequest[] = [
  {
    id: '1',
    firstName: 'Moussa',
    lastName: 'Diop',
    email: 'moussa.diop@email.com',
    phone: '+221 77 123 45 67',
    message: "Bonjour, je suis intéressé par la villa aux Almadies. Serait-il possible d'organiser une visite ce weekend ? Merci d'avance.",
    propertyId: '1',
    status: 'Nouveau',
    createdAt: '2023-10-05T09:30:00Z',
    assignedTo: '1'
  },
  {
    id: '2',
    firstName: 'Khady',
    lastName: 'Fall',
    email: 'khady.fall@email.com',
    phone: '+221 76 234 56 78',
    message: "Bonjour, je souhaiterais avoir plus d'informations sur l'appartement à Plateau, notamment concernant les charges et la disponibilité. Pourriez-vous me contacter par téléphone ? Merci.",
    propertyId: '2',
    status: 'En cours',
    createdAt: '2023-10-06T14:15:00Z',
    assignedTo: '2'
  },
  {
    id: '3',
    firstName: 'Cheikh',
    lastName: 'Mbaye',
    email: 'cheikh.mbaye@email.com',
    phone: '+221 78 345 67 89',
    message: "Bonjour, je cherche un bien pour investissement locatif dans le centre de Dakar. J'ai vu votre local commercial mais je serais plutôt intéressé pour l'acheter. Avez-vous des biens similaires à vendre ? Cordialement.",
    propertyId: '3',
    status: 'Traité',
    createdAt: '2023-10-08T11:45:00Z',
    assignedTo: '3'
  },
  {
    id: '4',
    firstName: 'Bineta',
    lastName: 'Thiam',
    email: 'bineta.thiam@email.com',
    phone: '+221 70 456 78 90',
    message: "Bonjour, je souhaite prendre rendez-vous pour estimer ma maison située à Fann en vue d'une vente dans les prochains mois. Quelles sont vos disponibilités ? Merci.",
    status: 'Nouveau',
    createdAt: '2023-10-10T16:30:00Z'
  },
  {
    id: '5',
    firstName: 'Mamadou',
    lastName: 'Gueye',
    email: 'mamadou.gueye@email.com',
    phone: '+221 75 567 89 01',
    message: "Bonjour, je suis à la recherche d'un bureau moderne dans le quartier Plateau pour y installer mon cabinet. J'ai vu votre annonce qui m'intéresse. Pourriez-vous me préciser les charges mensuelles et si un parking est inclus ? Cordialement.",
    propertyId: '5',
    status: 'En cours',
    createdAt: '2023-10-12T10:20:00Z',
    assignedTo: '2'
  }
];