import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour TypeScript
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          phone: string | null;
          avatar_url: string | null;
          role: 'admin' | 'agent' | 'client';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          first_name: string;
          last_name: string;
          phone?: string | null;
          avatar_url?: string | null;
          role?: 'admin' | 'agent' | 'client';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string;
          phone?: string | null;
          avatar_url?: string | null;
          role?: 'admin' | 'agent' | 'client';
          created_at?: string;
          updated_at?: string;
        };
      };
      properties: {
        Row: {
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
        };
        Insert: {
          id?: string;
          title: string;
          type: 'Appartement' | 'Maison' | 'Terrain' | 'Commerce' | 'Bureau';
          status?: 'Vente' | 'Location';
          price: number;
          surface: number;
          rooms?: number;
          bedrooms?: number;
          bathrooms?: number;
          description: string;
          street: string;
          city: string;
          zip_code: string;
          country?: string;
          features?: string[];
          images?: string[];
          featured?: boolean;
          agent_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          type?: 'Appartement' | 'Maison' | 'Terrain' | 'Commerce' | 'Bureau';
          status?: 'Vente' | 'Location';
          price?: number;
          surface?: number;
          rooms?: number;
          bedrooms?: number;
          bathrooms?: number;
          description?: string;
          street?: string;
          city?: string;
          zip_code?: string;
          country?: string;
          features?: string[];
          images?: string[];
          featured?: boolean;
          agent_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      agents: {
        Row: {
          id: string;
          user_id: string | null;
          bio: string | null;
          position: string | null;
          specialties: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          bio?: string | null;
          position?: string | null;
          specialties?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          bio?: string | null;
          position?: string | null;
          specialties?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          property_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          property_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          property_id?: string;
          created_at?: string;
        };
      };
      contact_requests: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string;
          message: string;
          property_id: string | null;
          status: 'Nouveau' | 'En cours' | 'Traité';
          assigned_to: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string;
          message: string;
          property_id?: string | null;
          status?: 'Nouveau' | 'En cours' | 'Traité';
          assigned_to?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          phone?: string;
          message?: string;
          property_id?: string | null;
          status?: 'Nouveau' | 'En cours' | 'Traité';
          assigned_to?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};