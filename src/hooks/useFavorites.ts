import { useState, useEffect } from 'react';
import { useAuth } from '../components/auth/AuthProvider';

export interface Favorite {
  id: string;
  user_id: string;
  property_id: string;
  created_at: string;
}

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    try {
      console.log('🎯 Mode Démo - Chargement des favoris pour:', user.id);
      
      // Récupérer les favoris depuis localStorage
      const savedFavorites = localStorage.getItem(`demo-favorites-${user.id}`);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      } else {
        // Favoris par défaut pour la démo
        const defaultFavorites: Favorite[] = [
          {
            id: 'fav-1',
            user_id: user.id,
            property_id: '1',
            created_at: new Date().toISOString()
          },
          {
            id: 'fav-2',
            user_id: user.id,
            property_id: '2',
            created_at: new Date().toISOString()
          }
        ];
        setFavorites(defaultFavorites);
        localStorage.setItem(`demo-favorites-${user.id}`, JSON.stringify(defaultFavorites));
      }
    } catch (error) {
      console.error('Erreur chargement favoris démo:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (propertyId: string) => {
    if (!user) return { error: new Error('Utilisateur non connecté') };

    try {
      const newFavorite: Favorite = {
        id: 'fav-' + Date.now(),
        user_id: user.id,
        property_id: propertyId,
        created_at: new Date().toISOString()
      };

      const updatedFavorites = [newFavorite, ...favorites];
      setFavorites(updatedFavorites);
      
      // Sauvegarder en localStorage
      localStorage.setItem(`demo-favorites-${user.id}`, JSON.stringify(updatedFavorites));
      
      return { data: newFavorite, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  };

  const removeFromFavorites = async (propertyId: string) => {
    if (!user) return { error: new Error('Utilisateur non connecté') };

    try {
      const updatedFavorites = favorites.filter(f => f.property_id !== propertyId);
      setFavorites(updatedFavorites);
      
      // Sauvegarder en localStorage
      localStorage.setItem(`demo-favorites-${user.id}`, JSON.stringify(updatedFavorites));
      
      return { error: null };
    } catch (err) {
      return { error: err };
    }
  };

  const isFavorite = (propertyId: string) => {
    return favorites.some(f => f.property_id === propertyId);
  };

  const toggleFavorite = async (propertyId: string) => {
    if (isFavorite(propertyId)) {
      return await removeFromFavorites(propertyId);
    } else {
      return await addToFavorites(propertyId);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    refetch: fetchFavorites,
  };
}