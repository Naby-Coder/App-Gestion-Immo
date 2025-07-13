import { useState, useEffect } from 'react';
import { Heart, Trash2, Eye, MessageSquare, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../hooks/useFavorites';
import { properties } from '../../data/properties';
import { formatPrice } from '../../utils/formatters';

const ClientFavorites = () => {
  const { favorites, loading, removeFromFavorites } = useFavorites();
  
  const favoriteProperties = favorites.map(fav => {
    const property = properties.find(p => p.id === fav.propertyId);
    return property ? { ...property, favoriteId: fav.id } : null;
  }).filter(Boolean);

  const removeFavorite = async (propertyId: string) => {
    if (confirm('Êtes-vous sûr de vouloir retirer ce bien de vos favoris ?')) {
      await removeFromFavorites(propertyId);
    }
  };

  const requestInfo = (property: any) => {
    alert(`Demande d'information envoyée pour: ${property.title}`);
  };

  const scheduleVisit = (property: any) => {
    alert(`Demande de visite programmée pour: ${property.title}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Mes biens favoris</h1>
        <div className="flex items-center text-gray-600">
          <Heart size={20} className="mr-2 text-red-500" />
          <span>{favoriteProperties.length} bien{favoriteProperties.length > 1 ? 's' : ''}</span>
        </div>
      </div>

      {favoriteProperties.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Heart size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun bien favori</h3>
          <p className="text-gray-600 mb-6">
            Vous n'avez pas encore ajouté de biens à vos favoris.
          </p>
          <Link to="/biens" className="btn-primary">
            Découvrir nos biens
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <img 
                  src={property.images[0]} 
                  alt={property.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    property.status === 'Vente' ? 'bg-primary-600 text-white' : 'bg-secondary-500 text-white'
                  }`}>
                    {property.status}
                  </span>
                </div>
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => removeFavorite(property.id)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                    title="Retirer des favoris"
                  >
                    <Heart size={16} className="text-red-500" fill="currentColor" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-1">
                  {property.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3">
                  {property.address.city}, {property.address.zipCode}
                </p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-primary-600">
                    {formatPrice(property.price)}
                  </span>
                  {property.status === 'Location' && (
                    <span className="text-sm text-gray-500">/mois</span>
                  )}
                </div>
                
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span>{property.surface} m²</span>
                  <span>{property.rooms} pièces</span>
                  <span>{property.bedrooms} ch.</span>
                </div>

                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Link 
                      to={`/biens/${property.id}`}
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm"
                    >
                      <Eye size={14} className="mr-1" />
                      Voir le bien
                    </Link>
                    <button
                      onClick={() => removeFavorite(property.id)}
                      className="px-3 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => requestInfo(property)}
                      className="flex-1 flex items-center justify-center px-3 py-2 border border-primary-300 text-primary-600 rounded-md hover:bg-primary-50 transition-colors text-sm"
                    >
                      <MessageSquare size={14} className="mr-1" />
                      Demander info
                    </button>
                    <button
                      onClick={() => scheduleVisit(property)}
                      className="flex-1 flex items-center justify-center px-3 py-2 border border-secondary-300 text-secondary-600 rounded-md hover:bg-secondary-50 transition-colors text-sm"
                    >
                      <Calendar size={14} className="mr-1" />
                      Programmer visite
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientFavorites;