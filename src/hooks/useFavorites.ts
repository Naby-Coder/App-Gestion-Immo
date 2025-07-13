import { useState, useEffect } from 'react';
import { useAuth } from '../components/auth/AuthProvider';
import { mockStorage } from '../lib/mockData';

export interface Favorite {
  id: string;
  userId: string;
  propertyId: string;
  createdAt: string;
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
      // Simuler un délai de réseau
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const allFavorites = mockStorage.get('favorites') || [];
      const userFavorites = allFavorites.filter((f: Favorite) => f.userId === user.id);
      setFavorites(userFavorites);
    } catch (error) {
      console.error('Erreur lors du chargement des favoris:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (propertyId: string) => {
    if (!user) return { error: new Error('Utilisateur non connecté') };

    try {
      const newFavorite: Favorite = {
        id: Date.now().toString(),
        userId: user.id,
        propertyId,
        createdAt: new Date().toISOString()
      };

      mockStorage.add('favorites', newFavorite);
      setFavorites(prev => [newFavorite, ...prev]);
      return { data: newFavorite, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  };

  const removeFromFavorites = async (propertyId: string) => {
    if (!user) return { error: new Error('Utilisateur non connecté') };

    try {
      const allFavorites = mockStorage.get('favorites') || [];
      const favoriteToRemove = allFavorites.find((f: Favorite) => 
        f.userId === user.id && f.propertyId === propertyId
      );

      if (favoriteToRemove) {
        mockStorage.remove('favorites', favoriteToRemove.id);
        setFavorites(prev => prev.filter(f => f.propertyId !== propertyId));
      }

      return { error: null };
    } catch (err) {
      return { error: err };
    }
  };

  const isFavorite = (propertyId: string) => {
    return favorites.some(f => f.propertyId === propertyId);
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