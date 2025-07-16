export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'admin' | 'agent' | 'client';
  createdAt: string;
}

export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  phone?: string;
  avatar_url?: string;
  role: 'admin' | 'agent' | 'client';
  created_at: string;
  updated_at: string;
}

export interface Favorite {
  id: string;
  userId: string;
  propertyId: string;
  createdAt: string;
}

export interface Property {
  id: string;
  title: string;
  type: string;
  status: 'Vente' | 'Location';
  price: number;
  surface: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  address: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
  features: string[];
  images: string[];
  featured: boolean;
  agentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Agent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
  specialties: string[];
  experience: number;
  properties: number;
  sales: number;
  rating: number;
}

export interface ContactRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  propertyId?: string;
  status: 'Nouveau' | 'En cours' | 'Traité';
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  subject: string;
  content: string;
  read: boolean;
  propertyId?: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  userId: string;
  propertyId: string;
  agentId: string;
  date: string;
  time: string;
  status: 'Programmé' | 'Confirmé' | 'Terminé' | 'Annulé';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
