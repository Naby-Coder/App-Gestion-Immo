import { useState, useEffect } from 'react';
import { properties as mockProperties } from '../data/properties';

export interface Property {
  id: string;
  title: string;
  type: 'Appartement' | 'Maison' | 'Terrain' | 'Commerce' | 'Bureau';
  status: 'Vente' | 'Location';
  price: number;
  surface: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  street: string;
  city: string;
  zip_code: string;
  country: string;
  features: string[];
  images: string[];
  featured: boolean;
  agent_id: string | null;
  created_at: string;
  updated_at: string;
}

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async (filters?: {
    type?: string;
    status?: string;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    featured?: boolean;
  }) => {
    try {
      setLoading(true);
      console.log('🎯 Mode Démo - Chargement des biens immobiliers');
      
      // Simuler un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 300));
      
      let filteredProperties = [...mockProperties];

      if (filters?.type) {
        filteredProperties = filteredProperties.filter(p => p.type === filters.type);
      }
      if (filters?.status) {
        filteredProperties = filteredProperties.filter(p => p.status === filters.status);
      }
      if (filters?.city) {
        filteredProperties = filteredProperties.filter(p => 
          p.address.city.toLowerCase().includes(filters.city!.toLowerCase())
        );
      }
      if (filters?.minPrice) {
        filteredProperties = filteredProperties.filter(p => p.price >= filters.minPrice!);
      }
      if (filters?.maxPrice) {
        filteredProperties = filteredProperties.filter(p => p.price <= filters.maxPrice!);
      }
      if (filters?.featured !== undefined) {
        filteredProperties = filteredProperties.filter(p => p.featured === filters.featured);
      }

      setProperties(filteredProperties);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des biens');
    } finally {
      setLoading(false);
    }
  };

  const getProperty = async (id: string) => {
    try {
      console.log('🎯 Mode Démo - Récupération du bien:', id);
      
      // Simuler un délai
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const property = mockProperties.find(p => p.id === id);
      return property || null;
    } catch (err) {
      console.error('Erreur récupération bien démo:', err);
      return null;
    }
  };

  const createProperty = async (propertyData: Omit<Property, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      console.log('🎯 Mode Démo - Création d\'un bien');
      
      const newProperty = {
        ...propertyData,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      setProperties(prev => [newProperty, ...prev]);
      return { data: newProperty, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  };

  const updateProperty = async (id: string, updates: Partial<Property>) => {
    try {
      console.log('🎯 Mode Démo - Mise à jour du bien:', id);
      
      const updatedProperty = {
        ...updates,
        updated_at: new Date().toISOString()
      };

      setProperties(prev => prev.map(p => 
        p.id === id ? { ...p, ...updatedProperty } : p
      ));
      
      return { data: updatedProperty, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  };

  const deleteProperty = async (id: string) => {
    try {
      console.log('🎯 Mode Démo - Suppression du bien:', id);
      
      setProperties(prev => prev.filter(p => p.id !== id));
      return { error: null };
    } catch (err) {
      return { error: err };
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return {
    properties,
    loading,
    error,
    fetchProperties,
    getProperty,
    createProperty,
    updateProperty,
    deleteProperty,
  };
}