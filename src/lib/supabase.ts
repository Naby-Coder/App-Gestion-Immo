import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: any = null;

// Fonction pour valider l'URL Supabase
function isValidSupabaseUrl(url: string): boolean {
  if (!url || url === 'your_supabase_project_url') return false;
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:' && urlObj.hostname.includes('supabase');
  } catch {
    return false;
  }
}

// Fonction pour valider la clé anonyme Supabase
function isValidSupabaseKey(key: string): boolean {
  return !(!key || key === 'your_supabase_anon_key' || key.length < 10);
}

// Vérifier si les variables d'environnement sont définies et valides
if (supabaseUrl && supabaseAnonKey && isValidSupabaseUrl(supabaseUrl) && isValidSupabaseKey(supabaseAnonKey)) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('Supabase client initialized successfully');
  } catch (error) {
    console.error('Error initializing Supabase client:', error);
    supabase = null;
  }
} else {
  console.warn('Supabase configuration incomplete or invalid. Running in mock mode.');
  console.warn('Please configure your Supabase credentials in the .env file:');
  console.warn('- VITE_SUPABASE_URL should be your Supabase project URL (e.g., https://your-project.supabase.co)');
  console.warn('- VITE_SUPABASE_ANON_KEY should be your Supabase anonymous key');
  console.warn('Current values:');
  console.warn('- URL valid:', isValidSupabaseUrl(supabaseUrl || ''));
  console.warn('- Key valid:', isValidSupabaseKey(supabaseAnonKey || ''));
}

export { supabase };

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