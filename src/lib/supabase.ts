import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variables d\'environnement Supabase manquantes');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Types pour TypeScript
export type Database = {
  public: {
    Tables: {
      profils: {
        Row: {
          id: string;
          prenom: string;
          nom: string;
          telephone: string | null;
          avatar_url: string | null;
          role: 'admin' | 'agent' | 'client';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          prenom: string;
          nom: string;
          telephone?: string | null;
          avatar_url?: string | null;
          role?: 'admin' | 'agent' | 'client';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          prenom?: string;
          nom?: string;
          telephone?: string | null;
          avatar_url?: string | null;
          role?: 'admin' | 'agent' | 'client';
          created_at?: string;
          updated_at?: string;
        };
      };
      biens_immobiliers: {
        Row: {
          id: string;
          titre: string;
          type_bien: 'Appartement' | 'Maison' | 'Terrain' | 'Commerce' | 'Bureau';
          statut: 'Vente' | 'Location';
          prix: number;
          surface: number;
          nombre_pieces: number;
          nombre_chambres: number;
          nombre_salles_bain: number;
          description: string;
          rue: string;
          ville: string;
          code_postal: string;
          pays: string;
          equipements: string[];
          images: string[];
          a_la_une: boolean;
          agent_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          titre: string;
          type_bien: 'Appartement' | 'Maison' | 'Terrain' | 'Commerce' | 'Bureau';
          statut?: 'Vente' | 'Location';
          prix: number;
          surface: number;
          nombre_pieces?: number;
          nombre_chambres?: number;
          nombre_salles_bain?: number;
          description: string;
          rue: string;
          ville: string;
          code_postal: string;
          pays?: string;
          equipements?: string[];
          images?: string[];
          a_la_une?: boolean;
          agent_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          titre?: string;
          type_bien?: 'Appartement' | 'Maison' | 'Terrain' | 'Commerce' | 'Bureau';
          statut?: 'Vente' | 'Location';
          prix?: number;
          surface?: number;
          nombre_pieces?: number;
          nombre_chambres?: number;
          nombre_salles_bain?: number;
          description?: string;
          rue?: string;
          ville?: string;
          code_postal?: string;
          pays?: string;
          equipements?: string[];
          images?: string[];
          a_la_une?: boolean;
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
          poste: string | null;
          specialites: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          bio?: string | null;
          poste?: string | null;
          specialites?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          bio?: string | null;
          poste?: string | null;
          specialites?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      clients: {
        Row: {
          id: string;
          user_id: string | null;
          types_biens: string[];
          budget_min: number;
          budget_max: number;
          zones_preferees: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          types_biens?: string[];
          budget_min?: number;
          budget_max?: number;
          zones_preferees?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          types_biens?: string[];
          budget_min?: number;
          budget_max?: number;
          zones_preferees?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      favoris: {
        Row: {
          id: string;
          user_id: string | null;
          bien_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          bien_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          bien_id?: string | null;
          created_at?: string;
        };
      };
      demandes_contact: {
        Row: {
          id: string;
          prenom: string;
          nom: string;
          email: string;
          telephone: string;
          message: string;
          bien_id: string | null;
          statut: 'Nouveau' | 'En cours' | 'Traité';
          assigne_a: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          prenom: string;
          nom: string;
          email: string;
          telephone: string;
          message: string;
          bien_id?: string | null;
          statut?: 'Nouveau' | 'En cours' | 'Traité';
          assigne_a?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          prenom?: string;
          nom?: string;
          email?: string;
          telephone?: string;
          message?: string;
          bien_id?: string | null;
          statut?: 'Nouveau' | 'En cours' | 'Traité';
          assigne_a?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          expediteur_id: string | null;
          destinataire_id: string | null;
          sujet: string;
          contenu: string;
          lu: boolean;
          bien_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          expediteur_id?: string | null;
          destinataire_id?: string | null;
          sujet: string;
          contenu: string;
          lu?: boolean;
          bien_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          expediteur_id?: string | null;
          destinataire_id?: string | null;
          sujet?: string;
          contenu?: string;
          lu?: boolean;
          bien_id?: string | null;
          created_at?: string;
        };
      };
      rendez_vous: {
        Row: {
          id: string;
          user_id: string | null;
          bien_id: string | null;
          agent_id: string | null;
          date_rendez_vous: string;
          heure_rendez_vous: string;
          statut: 'Programmé' | 'Confirmé' | 'Terminé' | 'Annulé';
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          bien_id?: string | null;
          agent_id?: string | null;
          date_rendez_vous: string;
          heure_rendez_vous: string;
          statut?: 'Programmé' | 'Confirmé' | 'Terminé' | 'Annulé';
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          bien_id?: string | null;
          agent_id?: string | null;
          date_rendez_vous?: string;
          heure_rendez_vous?: string;
          statut?: 'Programmé' | 'Confirmé' | 'Terminé' | 'Annulé';
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      contrats: {
        Row: {
          id: string;
          type_contrat: 'Vente' | 'Location';
          statut: 'Brouillon' | 'En attente' | 'Signé' | 'Annulé';
          client_id: string | null;
          agent_id: string | null;
          bien_id: string | null;
          montant: number;
          date_signature: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          type_contrat: 'Vente' | 'Location';
          statut?: 'Brouillon' | 'En attente' | 'Signé' | 'Annulé';
          client_id?: string | null;
          agent_id?: string | null;
          bien_id?: string | null;
          montant: number;
          date_signature?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          type_contrat?: 'Vente' | 'Location';
          statut?: 'Brouillon' | 'En attente' | 'Signé' | 'Annulé';
          client_id?: string | null;
          agent_id?: string | null;
          bien_id?: string | null;
          montant?: number;
          date_signature?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      paiements: {
        Row: {
          id: string;
          type_paiement: 'Commission' | 'Loyer' | 'Caution' | 'Frais';
          methode_paiement: 'Virement' | 'Chèque' | 'Espèces' | 'Carte';
          statut: 'En attente' | 'Payé' | 'Retard' | 'Annulé';
          contrat_id: string | null;
          montant: number;
          date_echeance: string;
          date_paiement: string | null;
          reference: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          type_paiement: 'Commission' | 'Loyer' | 'Caution' | 'Frais';
          methode_paiement?: 'Virement' | 'Chèque' | 'Espèces' | 'Carte';
          statut?: 'En attente' | 'Payé' | 'Retard' | 'Annulé';
          contrat_id?: string | null;
          montant: number;
          date_echeance: string;
          date_paiement?: string | null;
          reference?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          type_paiement?: 'Commission' | 'Loyer' | 'Caution' | 'Frais';
          methode_paiement?: 'Virement' | 'Chèque' | 'Espèces' | 'Carte';
          statut?: 'En attente' | 'Payé' | 'Retard' | 'Annulé';
          contrat_id?: string | null;
          montant?: number;
          date_echeance?: string;
          date_paiement?: string | null;
          reference?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      vue_biens_complets: {
        Row: {
          id: string;
          titre: string;
          type_bien: string;
          statut: string;
          prix: number;
          surface: number;
          nombre_pieces: number;
          nombre_chambres: number;
          nombre_salles_bain: number;
          description: string;
          rue: string;
          ville: string;
          code_postal: string;
          pays: string;
          equipements: string[];
          images: string[];
          a_la_une: boolean;
          created_at: string;
          updated_at: string;
          agent_nom: string | null;
          agent_telephone: string | null;
          agent_avatar: string | null;
          agent_bio: string | null;
          agent_poste: string | null;
        };
      };
    };
    Functions: {
      rechercher_biens: {
        Args: {
          p_type_bien?: string;
          p_statut?: string;
          p_ville?: string;
          p_prix_min?: number;
          p_prix_max?: number;
          p_surface_min?: number;
          p_pieces_min?: number;
        };
        Returns: {
          id: string;
          titre: string;
          type_bien: string;
          statut: string;
          prix: number;
          surface: number;
          nombre_pieces: number;
          ville: string;
          agent_nom: string;
          agent_telephone: string;
          images: string[];
        }[];
      };
      obtenir_statistiques_generales: {
        Args: Record<PropertyKey, never>;
        Returns: any;
      };
    };
  };
};