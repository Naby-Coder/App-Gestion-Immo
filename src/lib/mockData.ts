// Données fictives pour remplacer Supabase
import { User, Property, Agent, Client, ContactRequest, Message, Appointment, Favorite } from '../types';

// Utilisateurs fictifs
export const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Mouhamed',
    lastName: 'Ndione',
    email: 'mouhamed.ndione@immoexpert.sn',
    role: 'admin',
    avatar: '/popup-scaled-1-195x300.jpg',
    password: 'admin123',
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2023-01-15T10:30:00Z'
  },
  {
    id: '2',
    firstName: 'Fadel',
    lastName: 'Fall',
    email: 'fadel.fall@immoexpert.sn',
    role: 'agent',
    avatar: '/Fadel.png',
    password: 'agent123',
    createdAt: '2023-02-20T14:45:00Z',
    updatedAt: '2023-02-20T14:45:00Z'
  },
  {
    id: '3',
    firstName: 'Aïssatou',
    lastName: 'Sall',
    email: 'aissatou.sall@immoexpert.sn',
    role: 'agent',
    avatar: '/Snapchat-1056148261.jpg',
    password: 'agent123',
    createdAt: '2023-03-10T09:15:00Z',
    updatedAt: '2023-03-10T09:15:00Z'
  },
  {
    id: '4',
    firstName: 'Arame',
    lastName: 'Diop',
    email: 'arame.diop@email.com',
    role: 'client',
    password: 'client123',
    createdAt: '2023-04-05T16:20:00Z',
    updatedAt: '2023-04-05T16:20:00Z'
  },
  {
    id: '5',
    firstName: 'Amadou',
    lastName: 'Diallo',
    email: 'amadou.diallo@email.com',
    role: 'client',
    password: 'client123',
    createdAt: '2023-05-12T11:30:00Z',
    updatedAt: '2023-05-12T11:30:00Z'
  }
];

// Messages fictifs
export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '2',
    receiverId: '4',
    subject: 'Confirmation de votre visite',
    content: 'Bonjour Arame, je vous confirme notre rendez-vous pour la visite de la villa aux Almadies le 25 janvier à 14h. N\'hésitez pas si vous avez des questions.',
    read: false,
    createdAt: '2025-01-18T11:00:00Z',
    propertyId: '1'
  },
  {
    id: '2',
    senderId: '3',
    receiverId: '4',
    subject: 'Nouvelle proposition',
    content: 'Suite à votre recherche, j\'ai trouvé un appartement qui pourrait vous intéresser. Souhaitez-vous que je vous envoie les détails ?',
    read: true,
    createdAt: '2025-01-16T09:30:00Z'
  },
  {
    id: '3',
    senderId: '2',
    receiverId: '4',
    subject: 'Documents pour le dossier',
    content: 'Merci de me faire parvenir les documents demandés pour finaliser votre dossier de location.',
    read: false,
    createdAt: '2025-01-22T15:45:00Z'
  }
];

// Favoris fictifs
export const mockFavorites: Favorite[] = [
  {
    id: '1',
    userId: '4',
    propertyId: '1',
    createdAt: '2025-01-15T10:30:00Z'
  },
  {
    id: '2',
    userId: '4',
    propertyId: '2',
    createdAt: '2025-01-20T14:45:00Z'
  },
  {
    id: '3',
    userId: '4',
    propertyId: '4',
    createdAt: '2025-02-05T09:15:00Z'
  }
];

// Rendez-vous fictifs
export const mockAppointments: Appointment[] = [
  {
    id: '1',
    userId: '4',
    propertyId: '1',
    agentId: '2',
    date: '2025-01-25',
    time: '14:00',
    status: 'Confirmé',
    notes: 'Visite de la villa aux Almadies',
    createdAt: '2025-01-18T10:30:00Z'
  },
  {
    id: '2',
    userId: '4',
    propertyId: '3',
    agentId: '3',
    date: '2025-01-28',
    time: '10:30',
    status: 'Programmé',
    notes: 'Visite du local commercial à Ngor',
    createdAt: '2025-01-20T16:20:00Z'
  }
];

// Demandes de contact fictives
export const mockContactRequests: ContactRequest[] = [
  {
    id: '1',
    firstName: 'Arame',
    lastName: 'Diop',
    email: 'arame.diop@email.com',
    phone: '+221 77 123 45 67',
    message: 'Je suis intéressée par la villa aux Almadies. Pourriez-vous m\'envoyer plus d\'informations ?',
    propertyId: '1',
    status: 'En cours',
    createdAt: '2025-01-15T10:30:00Z',
    assignedTo: '2'
  },
  {
    id: '2',
    firstName: 'Arame',
    lastName: 'Diop',
    email: 'arame.diop@email.com',
    phone: '+221 77 123 45 67',
    message: 'Demande d\'estimation pour mon appartement à Plateau.',
    status: 'Nouveau',
    createdAt: '2025-01-20T14:15:00Z'
  },
  {
    id: '3',
    firstName: 'Arame',
    lastName: 'Diop',
    email: 'arame.diop@email.com',
    phone: '+221 77 123 45 67',
    message: 'Recherche d\'un local commercial dans la zone de Ngor.',
    status: 'Traité',
    createdAt: '2025-01-10T09:00:00Z',
    assignedTo: '3'
  }
];

// Stockage local simulé
class MockStorage {
  private data: { [key: string]: any } = {
    users: [...mockUsers],
    messages: [...mockMessages],
    favorites: [...mockFavorites],
    appointments: [...mockAppointments],
    contactRequests: [...mockContactRequests],
    currentUser: null
  };

  get(key: string) {
    return this.data[key] || [];
  }

  set(key: string, value: any) {
    this.data[key] = value;
  }

  add(key: string, item: any) {
    if (!this.data[key]) this.data[key] = [];
    this.data[key].push(item);
  }

  update(key: string, id: string, updates: any) {
    if (!this.data[key]) return null;
    const index = this.data[key].findIndex((item: any) => item.id === id);
    if (index !== -1) {
      this.data[key][index] = { ...this.data[key][index], ...updates };
      return this.data[key][index];
    }
    return null;
  }

  remove(key: string, id: string) {
    if (!this.data[key]) return false;
    const index = this.data[key].findIndex((item: any) => item.id === id);
    if (index !== -1) {
      this.data[key].splice(index, 1);
      return true;
    }
    return false;
  }
}

export const mockStorage = new MockStorage();
