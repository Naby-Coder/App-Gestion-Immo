import { Client } from '../types';

export const clients: Client[] = [
  {
    id: '1',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.com',
    phone: '06 11 22 33 44',
    createdAt: '2023-01-15T10:30:00Z',
    preferences: {
      propertyTypes: ['Appartement', 'Maison'],
      budget: {
        min: 300000,
        max: 500000
      },
      locations: ['Lyon', 'Villeurbanne']
    }
  },
  {
    id: '2',
    firstName: 'Marie',
    lastName: 'Robert',
    email: 'marie.robert@email.com',
    phone: '06 22 33 44 55',
    createdAt: '2023-02-20T14:45:00Z',
    preferences: {
      propertyTypes: ['Appartement'],
      budget: {
        min: 200000,
        max: 350000
      },
      locations: ['Lyon']
    }
  },
  {
    id: '3',
    firstName: 'Pierre',
    lastName: 'Leroy',
    email: 'pierre.leroy@email.com',
    phone: '06 33 44 55 66',
    createdAt: '2023-03-10T09:15:00Z',
    preferences: {
      propertyTypes: ['Maison'],
      budget: {
        min: 450000,
        max: 700000
      },
      locations: ['Écully', 'Tassin-la-Demi-Lune']
    }
  },
  {
    id: '4',
    firstName: 'Claire',
    lastName: 'Moreau',
    email: 'claire.moreau@email.com',
    phone: '06 44 55 66 77',
    createdAt: '2023-04-05T16:20:00Z',
    preferences: {
      propertyTypes: ['Appartement', 'Bureau'],
      budget: {
        min: 150000,
        max: 400000
      },
      locations: ['Lyon', 'Villeurbanne', 'Caluire-et-Cuire']
    }
  },
  {
    id: '5',
    firstName: 'Alexandre',
    lastName: 'Petit',
    email: 'alexandre.petit@email.com',
    phone: '06 55 66 77 88',
    createdAt: '2023-05-12T11:30:00Z',
    preferences: {
      propertyTypes: ['Commerce', 'Bureau'],
      budget: {
        min: 200000,
        max: 1000000
      },
      locations: ['Lyon']
    }
  }
];