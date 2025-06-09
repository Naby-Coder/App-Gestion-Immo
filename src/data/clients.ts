import { Client } from '../types';

export const clients: Client[] = [
  {
    id: '1',
    firstName: 'Amadou',
    lastName: 'Diallo',
    email: 'amadou.diallo@email.com',
    phone: '+221 77 123 45 67',
    createdAt: '2023-01-15T10:30:00Z',
    preferences: {
      propertyTypes: ['Appartement', 'Maison'],
      budget: {
        min: 50000000,
        max: 150000000
      },
      locations: ['Dakar', 'Thiès']
    }
  },
  {
    id: '2',
    firstName: 'Fatou',
    lastName: 'Sall',
    email: 'fatou.sall@email.com',
    phone: '+221 76 234 56 78',
    createdAt: '2023-02-20T14:45:00Z',
    preferences: {
      propertyTypes: ['Appartement'],
      budget: {
        min: 30000000,
        max: 80000000
      },
      locations: ['Dakar']
    }
  },
  {
    id: '3',
    firstName: 'Ousmane',
    lastName: 'Ba',
    email: 'ousmane.ba@email.com',
    phone: '+221 78 345 67 89',
    createdAt: '2023-03-10T09:15:00Z',
    preferences: {
      propertyTypes: ['Maison'],
      budget: {
        min: 100000000,
        max: 300000000
      },
      locations: ['Saly', 'Mbour']
    }
  },
  {
    id: '4',
    firstName: 'Aïssatou',
    lastName: 'Ndiaye',
    email: 'aissatou.ndiaye@email.com',
    phone: '+221 70 456 78 90',
    createdAt: '2023-04-05T16:20:00Z',
    preferences: {
      propertyTypes: ['Appartement', 'Bureau'],
      budget: {
        min: 40000000,
        max: 120000000
      },
      locations: ['Dakar', 'Rufisque']
    }
  },
  {
    id: '5',
    firstName: 'Ibrahima',
    lastName: 'Sarr',
    email: 'ibrahima.sarr@email.com',
    phone: '+221 75 567 89 01',
    createdAt: '2023-05-12T11:30:00Z',
    preferences: {
      propertyTypes: ['Commerce', 'Bureau'],
      budget: {
        min: 60000000,
        max: 200000000
      },
      locations: ['Dakar']
    }
  },
  {
    id: '6',
    firstName: 'Mariama',
    lastName: 'Cissé',
    email: 'mariama.cisse@email.com',
    phone: '+221 77 678 90 12',
    createdAt: '2023-06-18T13:45:00Z',
    preferences: {
      propertyTypes: ['Maison', 'Terrain'],
      budget: {
        min: 80000000,
        max: 250000000
      },
      locations: ['Thiès', 'Saint-Louis']
    }
  }
];