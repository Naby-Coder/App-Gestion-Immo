import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

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
      let query = supabase.from('properties').select('*');

      if (filters?.type) {
        query = query.eq('type', filters.type);
      }
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.city) {
        query = query.ilike('city', `%${filters.city}%`);
      }
      if (filters?.minPrice) {
        query = query.gte('price', filters.minPrice);
      }
      if (filters?.maxPrice) {
        query = query.lte('price', filters.maxPrice);
      }
      if (filters?.featured !== undefined) {
        query = query.eq('featured', filters.featured);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setProperties(data || []);
        setError(null);
      }
    } catch (err) {
      setError('Erreur lors du chargement des biens');
    } finally {
      setLoading(false);
    }
  };

  const getProperty = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (err) {
      console.error('Error fetching property:', err);
      return null;
    }
  };

  const createProperty = async (propertyData: Omit<Property, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .insert([propertyData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      setProperties(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  };

  const updateProperty = async (id: string, updates: Partial<Property>) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      setProperties(prev => prev.map(p => p.id === id ? data : p));
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  };

  const deleteProperty = async (id: string) => {
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

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