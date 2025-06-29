import { Property } from '../types';

export const properties: Property[] = [
  {
    id: '1',
    title: 'Villa moderne avec vue sur mer aux Almadies',
    type: 'Maison',
    status: 'Vente',
    price: 250000000,
    surface: 350,
    rooms: 6,
    bedrooms: 4,
    bathrooms: 3,
    description: "Magnifique villa moderne située dans le quartier prisé des Almadies. Cette propriété d'exception offre une vue imprenable sur l'océan et dispose d'un grand jardin paysager. La villa comprend un vaste séjour lumineux, une cuisine équipée haut de gamme, quatre chambres avec salles de bains privatives, un bureau et une piscine à débordement.",
    address: {
      street: '123 Route des Almadies',
      city: 'Dakar',
      zipCode: '12000',
      country: 'Sénégal'
    },
    features: ['Piscine', 'Jardin', 'Garage double', 'Climatisation', 'Sécurité 24/7', 'Vue mer'],
    images: [
      '/maxresdefault-5 copy.jpg',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      '/appartement-vente-vefa-fann-hock-dakar-525x328.jpg'
    ],
    createdAt: '2023-05-15T10:30:00Z',
    updatedAt: '2023-05-20T14:45:00Z',
    featured: true,
    agentId: '1'
  },
  {
    id: '2',
    title: 'Appartement de standing à Plateau',
    type: 'Appartement',
    status: 'Location',
    price: 1500000,
    surface: 180,
    rooms: 4,
    bedrooms: 3,
    bathrooms: 2,
    description: "Au cœur du quartier des affaires, superbe appartement de standing offrant des prestations haut de gamme. L'appartement comprend un double séjour avec balcon, une cuisine américaine équipée, trois chambres dont une suite parentale, et deux salles de bains modernes. Résidence sécurisée avec parking souterrain.",
    address: {
      street: '45 Avenue Léopold Sédar Senghor',
      city: 'Dakar',
      zipCode: '11500',
      country: 'Sénégal'
    },
    features: ['Ascenseur', 'Parking', 'Climatisation', 'Sécurité', 'Balcon'],
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg',
      'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg'
    ],
    createdAt: '2023-06-02T09:15:00Z',
    updatedAt: '2023-06-10T11:20:00Z',
    featured: true,
    agentId: '2'
  },
  {
    id: '3',
    title: 'Local commercial à Ngor',
    type: 'Commerce',
    status: 'Location',
    price: 800000,
    surface: 120,
    rooms: 2,
    bedrooms: 0,
    bathrooms: 1,
    description: "Local commercial idéalement situé dans une zone à fort potentiel commercial. Le local dispose d'une grande vitrine sur rue, d'un espace de stockage et d'un parking privé. Parfait pour tout type de commerce ou bureau.",
    address: {
      street: '78 Route de Ngor',
      city: 'Dakar',
      zipCode: '12100',
      country: 'Sénégal'
    },
    features: ['Climatisation', 'Parking', 'Sécurité', 'Grande vitrine'],
    images: [
      'https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg',
      'https://images.pexels.com/photos/3932931/pexels-photo-3932931.jpeg',
      'https://images.pexels.com/photos/3932932/pexels-photo-3932932.jpeg'
    ],
    createdAt: '2023-07-05T14:20:00Z',
    updatedAt: '2023-07-05T14:20:00Z',
    featured: true,
    agentId: '3'
  },
  {
    id: '4',
    title: 'Villa de luxe à Saly',
    type: 'Maison',
    status: 'Vente',
    price: 350000000,
    surface: 450,
    rooms: 8,
    bedrooms: 5,
    bathrooms: 4,
    description: "Somptueuse villa pieds dans l'eau à Saly. Cette propriété exceptionnelle offre des prestations haut de gamme avec accès direct à la plage. Grande piscine, jardin tropical, et espaces de vie spacieux.",
    address: {
      street: '15 Boulevard Maritime',
      city: 'Saly',
      zipCode: '23000',
      country: 'Sénégal'
    },
    features: ['Piscine', 'Accès plage', 'Jardin', 'Garage', 'Sécurité 24/7'],
    images: [
      'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
      'https://images.pexels.com/photos/1732415/pexels-photo-1732415.jpeg',
      'https://images.pexels.com/photos/1732416/pexels-photo-1732416.jpeg'
    ],
    createdAt: '2023-08-10T09:00:00Z',
    updatedAt: '2023-08-10T09:00:00Z',
    featured: true,
    agentId: '1'
  },
  {
    id: '5',
    title: 'Bureau moderne à Plateau',
    type: 'Bureau',
    status: 'Location',
    price: 2500000,
    surface: 200,
    rooms: 4,
    bedrooms: 0,
    bathrooms: 2,
    description: "Espace de bureau moderne et fonctionnel au cœur du quartier d'affaires. Open space, salles de réunion, et bureaux privatifs. Idéal pour entreprise ou profession libérale.",
    address: {
      street: '28 Rue Félix Faure',
      city: 'Dakar',
      zipCode: '11500',
      country: 'Sénégal'
    },
    features: ['Climatisation', 'Fibre optique', 'Parking', 'Sécurité 24/7'],
    images: [
      'https://images.pexels.com/photos/1743555/pexels-photo-1743555.jpeg',
      'https://images.pexels.com/photos/1743556/pexels-photo-1743556.jpeg',
      'https://images.pexels.com/photos/1743557/pexels-photo-1743557.jpeg'
    ],
    createdAt: '2023-09-15T11:30:00Z',
    updatedAt: '2023-09-15T11:30:00Z',
    featured: true,
    agentId: '2'
  },
  {
    id: '6',
    title: 'Villa contemporaine à Fann',
    type: 'Maison',
    status: 'Vente',
    price: 280000000,
    surface: 380,
    rooms: 7,
    bedrooms: 4,
    bathrooms: 3,
    description: "Magnifique villa contemporaine située dans le quartier prisé de Fann. Cette propriété d'exception offre des prestations haut de gamme avec une architecture moderne. La villa comprend un vaste séjour cathédrale, une cuisine entièrement équipée, quatre grandes chambres avec salles de bains, un bureau, une salle de sport, et une piscine chauffée.",
    address: {
      street: '45 Avenue Cheikh Anta Diop',
      city: 'Dakar',
      zipCode: '12100',
      country: 'Sénégal'
    },
    features: ['Piscine chauffée', 'Salle de sport', 'Domotique', 'Jardin paysager', 'Garage double', 'Sécurité 24/7'],
    images: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      '/appartement-vente-vefa-fann-hock-dakar-525x328.jpg'
    ],
    createdAt: '2023-10-01T09:00:00Z',
    updatedAt: '2023-10-01T09:00:00Z',
    featured: true,
    agentId: '3'
  }
];