import { Property } from '../types';

export const properties: Property[] = [
  {
    id: '1',
    title: 'Appartement lumineux avec vue panoramique',
    type: 'Appartement',
    status: 'Vente',
    price: 450000,
    surface: 85,
    rooms: 4,
    bedrooms: 2,
    bathrooms: 1,
    description: "Magnifique appartement traversant au 5ème étage avec ascenseur, offrant une vue imprenable sur la ville. Entièrement rénové avec des matériaux de qualité, il se compose d'une entrée, d'un séjour lumineux avec cuisine ouverte équipée, de deux chambres spacieuses, d'une salle de bain moderne et d'un WC séparé. Une cave complète ce bien. Idéalement situé à proximité des commerces, écoles et transports.",
    address: {
      street: '15 rue des Lilas',
      city: 'Lyon',
      zipCode: '69003',
      country: 'France'
    },
    features: ['Ascenseur', 'Balcon', 'Cave', 'Cuisine équipée', 'Double vitrage', 'Parking'],
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    createdAt: '2023-05-15T10:30:00Z',
    updatedAt: '2023-05-20T14:45:00Z',
    featured: true,
    agentId: '1'
  },
  {
    id: '2',
    title: 'Maison familiale avec jardin',
    type: 'Maison',
    status: 'Vente',
    price: 680000,
    surface: 150,
    rooms: 6,
    bedrooms: 4,
    bathrooms: 2,
    description: "Belle maison familiale dans un quartier résidentiel calme. Elle offre au rez-de-chaussée une entrée, un vaste séjour double avec cheminée donnant sur le jardin, une cuisine équipée, une chambre et une salle d'eau. À l'étage, trois chambres, une salle de bain et un bureau. Un sous-sol total avec garage double, buanderie et cave à vin. Jardin arboré de 800m² avec terrasse exposée sud.",
    address: {
      street: '8 allée des Chênes',
      city: 'Écully',
      zipCode: '69130',
      country: 'France'
    },
    features: ['Jardin', 'Garage', 'Cheminée', 'Terrasse', 'Sous-sol', 'Calme'],
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    createdAt: '2023-06-02T09:15:00Z',
    updatedAt: '2023-06-10T11:20:00Z',
    featured: true,
    agentId: '2'
  },
  {
    id: '3',
    title: 'Studio moderne en centre-ville',
    type: 'Appartement',
    status: 'Location',
    price: 750,
    surface: 32,
    rooms: 1,
    bedrooms: 1,
    bathrooms: 1,
    description: "Charmant studio entièrement rénové au cœur du centre-ville. Pièce principale lumineuse avec coin cuisine aménagée et équipée, espace nuit, salle d'eau avec WC. Idéal pour étudiant ou jeune actif. Nombreux rangements, parquet, double vitrage. À deux pas des commerces, restaurants et transports en commun.",
    address: {
      street: '45 rue de la République',
      city: 'Lyon',
      zipCode: '69002',
      country: 'France'
    },
    features: ['Meublé', 'Interphone', 'Fibre optique', 'Digicode', 'Ascenseur'],
    images: [
      'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    createdAt: '2023-07-05T14:20:00Z',
    updatedAt: '2023-07-05T14:20:00Z',
    agentId: '3'
  },
  {
    id: '4',
    title: 'Appartement T3 avec terrasse',
    type: 'Appartement',
    status: 'Vente',
    price: 320000,
    surface: 65,
    rooms: 3,
    bedrooms: 2,
    bathrooms: 1,
    description: "Bel appartement T3 situé dans une résidence récente et sécurisée. Il se compose d'une entrée avec placard, d'un séjour avec cuisine ouverte donnant sur une terrasse de 10m², de deux chambres avec rangements, d'une salle de bain et d'un WC séparé. Un garage en sous-sol complète ce bien. Proche de toutes commodités.",
    address: {
      street: '12 rue des Peupliers',
      city: 'Villeurbanne',
      zipCode: '69100',
      country: 'France'
    },
    features: ['Terrasse', 'Garage', 'Ascenseur', 'Interphone', 'Résidence sécurisée'],
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    createdAt: '2023-08-12T10:00:00Z',
    updatedAt: '2023-08-18T16:30:00Z',
    agentId: '1'
  },
  {
    id: '5',
    title: 'Local commercial en rez-de-chaussée',
    type: 'Commerce',
    status: 'Location',
    price: 1200,
    surface: 80,
    rooms: 2,
    bedrooms: 0,
    bathrooms: 1,
    description: "Local commercial bien situé en rez-de-chaussée d'un immeuble ancien. Espace de vente de 60m² avec vitrine sur rue passante, arrière-boutique de 15m² et sanitaires. Excellente visibilité, fort passage piéton. Idéal pour commerce de proximité, salon de beauté ou profession libérale.",
    address: {
      street: '28 avenue Jean Jaurès',
      city: 'Lyon',
      zipCode: '69007',
      country: 'France'
    },
    features: ['Vitrine', 'Climatisation', 'Alarme', 'Rideau métallique'],
    images: [
      'https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3932931/pexels-photo-3932931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3932932/pexels-photo-3932932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    createdAt: '2023-09-05T11:45:00Z',
    updatedAt: '2023-09-05T11:45:00Z',
    agentId: '2'
  },
  {
    id: '6',
    title: 'Bureaux modernes dans immeuble de standing',
    type: 'Bureau',
    status: 'Location',
    price: 2800,
    surface: 120,
    rooms: 4,
    bedrooms: 0,
    bathrooms: 2,
    description: "Magnifiques bureaux dans un immeuble de standing avec prestations haut de gamme. Espace de 120m² comprenant un accueil, trois bureaux fermés, une salle de réunion, un espace détente et deux sanitaires. Climatisation réversible, fibre optique, contrôle d'accès. Deux places de parking en sous-sol.",
    address: {
      street: '15 quai Claude Bernard',
      city: 'Lyon',
      zipCode: '69007',
      country: 'France'
    },
    features: ['Parking', 'Ascenseur', 'Climatisation', 'Fibre optique', 'Salle de réunion'],
    images: [
      'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1170413/pexels-photo-1170413.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1170414/pexels-photo-1170414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    createdAt: '2023-10-10T15:30:00Z',
    updatedAt: '2023-10-15T09:20:00Z',
    agentId: '3'
  }
];