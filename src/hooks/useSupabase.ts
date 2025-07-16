import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Tables = Database['public']['Tables'];

// Hook pour les biens immobiliers
export function useBiensImmobiliers() {
  const [biens, setBiens] = useState<Tables['biens_immobiliers']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBiens = async (filters?: {
    type_bien?: string;
    statut?: string;
    ville?: string;
    prix_min?: number;
    prix_max?: number;
  }) => {
    try {
      setLoading(true);
      let query = supabase.from('biens_immobiliers').select('*');

      if (filters?.type_bien) {
        query = query.eq('type_bien', filters.type_bien);
      }
      if (filters?.statut) {
        query = query.eq('statut', filters.statut);
      }
      if (filters?.ville) {
        query = query.ilike('ville', `%${filters.ville}%`);
      }
      if (filters?.prix_min) {
        query = query.gte('prix', filters.prix_min);
      }
      if (filters?.prix_max) {
        query = query.lte('prix', filters.prix_max);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setBiens(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const createBien = async (bien: Tables['biens_immobiliers']['Insert']) => {
    try {
      const { data, error } = await supabase
        .from('biens_immobiliers')
        .insert(bien)
        .select()
        .single();

      if (error) throw error;
      setBiens(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Erreur inconnue' };
    }
  };

  const updateBien = async (id: string, updates: Tables['biens_immobiliers']['Update']) => {
    try {
      const { data, error } = await supabase
        .from('biens_immobiliers')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setBiens(prev => prev.map(b => b.id === id ? data : b));
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Erreur inconnue' };
    }
  };

  const deleteBien = async (id: string) => {
    try {
      const { error } = await supabase
        .from('biens_immobiliers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setBiens(prev => prev.filter(b => b.id !== id));
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Erreur inconnue' };
    }
  };

  useEffect(() => {
    fetchBiens();
  }, []);

  return {
    biens,
    loading,
    error,
    fetchBiens,
    createBien,
    updateBien,
    deleteBien,
  };
}

// Hook pour les favoris
export function useFavoris(userId?: string) {
  const [favoris, setFavoris] = useState<Tables['favoris']['Row'][]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavoris = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('favoris')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      setFavoris(data || []);
    } catch (err) {
      console.error('Erreur lors du chargement des favoris:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToFavoris = async (bienId: string) => {
    if (!userId) return { error: 'Utilisateur non connecté' };

    try {
      const { data, error } = await supabase
        .from('favoris')
        .insert({ user_id: userId, bien_id: bienId })
        .select()
        .single();

      if (error) throw error;
      setFavoris(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Erreur inconnue' };
    }
  };

  const removeFromFavoris = async (bienId: string) => {
    if (!userId) return { error: 'Utilisateur non connecté' };

    try {
      const { error } = await supabase
        .from('favoris')
        .delete()
        .eq('user_id', userId)
        .eq('bien_id', bienId);

      if (error) throw error;
      setFavoris(prev => prev.filter(f => f.bien_id !== bienId));
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Erreur inconnue' };
    }
  };

  const isFavorite = (bienId: string) => {
    return favoris.some(f => f.bien_id === bienId);
  };

  useEffect(() => {
    fetchFavoris();
  }, [userId]);

  return {
    favoris,
    loading,
    addToFavoris,
    removeFromFavoris,
    isFavorite,
    refetch: fetchFavoris,
  };
}

// Hook pour les demandes de contact
export function useDemandesContact() {
  const [demandes, setDemandes] = useState<Tables['demandes_contact']['Row'][]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDemandes = async () => {
    try {
      const { data, error } = await supabase
        .from('demandes_contact')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDemandes(data || []);
    } catch (err) {
      console.error('Erreur lors du chargement des demandes:', err);
    } finally {
      setLoading(false);
    }
  };

  const createDemande = async (demande: Tables['demandes_contact']['Insert']) => {
    try {
      const { data, error } = await supabase
        .from('demandes_contact')
        .insert(demande)
        .select()
        .single();

      if (error) throw error;
      setDemandes(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Erreur inconnue' };
    }
  };

  const updateDemande = async (id: string, updates: Tables['demandes_contact']['Update']) => {
    try {
      const { data, error } = await supabase
        .from('demandes_contact')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setDemandes(prev => prev.map(d => d.id === id ? data : d));
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Erreur inconnue' };
    }
  };

  useEffect(() => {
    fetchDemandes();
  }, []);

  return {
    demandes,
    loading,
    fetchDemandes,
    createDemande,
    updateDemande,
  };
}

// Hook pour les statistiques
export function useStatistiques() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase.rpc('obtenir_statistiques_generales');
      
      if (error) throw error;
      setStats(data);
    } catch (err) {
      console.error('Erreur lors du chargement des statistiques:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    refetch: fetchStats,
  };
}
