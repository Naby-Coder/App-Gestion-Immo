// Mode démo - Pas de connexion Supabase
// L'application fonctionne entièrement en local avec des données fictives

console.log('🎯 Mode Démo Activé - Aucune connexion base de données requise');
console.log('📱 Application prête pour présentation locale');

// Pas de client Supabase - tout est en mode démo
export const supabase = null;

// Types pour TypeScript (gardés pour compatibilité)
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