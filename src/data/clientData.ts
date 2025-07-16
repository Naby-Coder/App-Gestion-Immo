import { Favorite, Appointment, Message, ContactRequest } from '../types';

export const favorites: Favorite[] = [
  {
    id: '1',
    userId: 'client-1',
    propertyId: '1',
    createdAt: '2025-01-15T10:30:00Z'
  },
  {
    id: '2',
    userId: 'client-1',
    propertyId: '2',
    createdAt: '2025-01-20T14:45:00Z'
  },
  {
    id: '3',
    userId: 'client-1',
    propertyId: '4',
    createdAt: '2025-02-05T09:15:00Z'
  }
];

export const appointments: Appointment[] = [
  {
    id: '1',
    userId: 'client-1',
    propertyId: '1',
    agentId: '1',
    date: '2025-01-25',
    time: '14:00',
    status: 'Confirmé',
    notes: 'Visite de la villa aux Almadies',
    createdAt: '2025-01-18T10:30:00Z'
  },
  {
    id: '2',
    userId: 'client-1',
    propertyId: '3',
    agentId: '3',
    date: '2025-01-28',
    time: '10:30',
    status: 'Programmé',
    notes: 'Visite du local commercial à Ngor',
    createdAt: '2025-01-20T16:20:00Z'
  }
];

export const messages: Message[] = [
  {
    id: '1',
    senderId: 'agent-1',
    receiverId: 'client-1',
    subject: 'Confirmation de votre visite',
    content: 'Bonjour, je vous confirme notre rendez-vous pour la visite de la villa aux Almadies le 25 janvier à 14h. N\'hésitez pas si vous avez des questions.',
    read: false,
    createdAt: '2025-01-18T11:00:00Z',
    propertyId: '1'
  },
  {
    id: '2',
    senderId: 'agent-2',
    receiverId: 'client-1',
    subject: 'Nouvelle proposition',
    content: 'Suite à votre recherche, j\'ai trouvé un appartement qui pourrait vous intéresser. Souhaitez-vous que je vous envoie les détails ?',
    read: true,
    createdAt: '2025-01-16T09:30:00Z'
  },
  {
    id: '3',
    senderId: 'agent-3',
    receiverId: 'client-1',
    subject: 'Documents pour le dossier',
    content: 'Merci de me faire parvenir les documents demandés pour finaliser votre dossier de location.',
    read: false,
    createdAt: '2025-01-22T15:45:00Z'
  }
];

export const clientRequests: ContactRequest[] = [
  {
    id: '1',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.com',
    phone: '+221 77 123 45 67',
    message: 'Je suis intéressé par la villa aux Almadies. Pourriez-vous m\'envoyer plus d\'informations ?',
    propertyId: '1',
    status: 'En cours',
    createdAt: '2025-01-15T10:30:00Z',
    assignedTo: '1'
  },
  {
    id: '2',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.com',
    phone: '+221 77 123 45 67',
    message: 'Demande d\'estimation pour mon appartement à Plateau.',
    status: 'Nouveau',
    createdAt: '2025-01-20T14:15:00Z'
  },
  {
    id: '3',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.com',
    phone: '+221 77 123 45 67',
    message: 'Recherche d\'un local commercial dans la zone de Ngor.',
    status: 'Traité',
    createdAt: '2025-01-10T09:00:00Z',
    assignedTo: '3'
  }
];
