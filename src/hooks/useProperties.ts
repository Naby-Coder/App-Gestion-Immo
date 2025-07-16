import { useState, useEffect } from 'react';
import { properties as initialProperties } from '../data/properties';

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
  address: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
  features: string[];
  images: string[];
  featured: boolean;
  agentId: string;
  createdAt: string;
  updatedAt: string;
}

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [loading, setLoading] = useState(false);
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
      
      // Simuler un délai de réseau
      await new Promise(resolve => setTimeout(resolve, 300));
      
      let filteredProperties = [...initialProperties];

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
      console.error('Erreur lors du chargement des biens:', err);
    } finally {
      setLoading(false);
    }
  };

  const getProperty = async (id: string) => {
    try {
      // Simuler un délai de réseau
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const property = initialProperties.find(p => p.id === id);
      return property || null;
    } catch (err) {
      console.error('Erreur lors de la récupération du bien:', err);
      return null;
    }
  };

  const createProperty = async (propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      // Simuler un délai de réseau
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newProperty: Property = {
        ...propertyData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setProperties(prev => [newProperty, ...prev]);
      return { data: newProperty, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  };

  const updateProperty = async (id: string, updates: Partial<Property>) => {
    try {
      // Simuler un délai de réseau
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const updatedProperty = {
        ...properties.find(p => p.id === id),
        ...updates,
        updatedAt: new Date().toISOString()
      } as Property;

      setProperties(prev => prev.map(p => p.id === id ? updatedProperty : p));
      return { data: updatedProperty, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  };

  const deleteProperty = async (id: string) => {
    try {
      // Simuler un délai de réseau
      await new Promise(resolve => setTimeout(resolve, 300));
      
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
