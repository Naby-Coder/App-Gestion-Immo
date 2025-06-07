export interface Property {
  id: string;
  title: string;
  type: 'Appartement' | 'Maison' | 'Terrain' | 'Commerce' | 'Bureau' | 'Autre';
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
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
  agentId: string;
}

export interface Agent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
  position: string;
}

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
  preferences?: {
    propertyTypes: string[];
    budget: {
      min: number;
      max: number;
    };
    locations: string[];
  };
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
  createdAt: string;
  assignedTo?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'agent' | 'client';
  avatar?: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'client' | 'agent';
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
}

export interface Favorite {
  id: string;
  userId: string;
  propertyId: string;
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
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  subject: string;
  content: string;
  read: boolean;
  createdAt: string;
  propertyId?: string;
}