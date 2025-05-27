import { Link } from 'react-router-dom';
import { Home, MapPin, Maximize, Bed, Bath } from 'lucide-react';
import { Property } from '../../types';
import { formatPrice } from '../../utils/formatters';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const { id, title, type, status, price, surface, rooms, bedrooms, bathrooms, address, images } = property;

  return (
    <Link to={`/biens/${id}`} className="block">
      <div className="card property-card-transition">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img 
            src={images[0]} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 m-2">
            <span className={`px-2 py-1 text-xs font-medium rounded ${
              status === 'Vente' ? 'bg-primary-600 text-white' : 'bg-secondary-500 text-white'
            }`}>
              {status}
            </span>
          </div>
          <div className="absolute top-0 right-0 m-2">
            <span className="px-2 py-1 text-xs font-medium rounded bg-white text-gray-700">
              {type}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-1">{title}</h3>
          
          <div className="flex items-center text-gray-600 text-sm mb-3">
            <MapPin size={16} className="mr-1" />
            <span>{address.city}, {address.zipCode}</span>
          </div>
          
          <div className="flex justify-between items-center mb-3">
            <span className="text-xl font-bold text-primary-600">{formatPrice(price)}</span>
            {status === 'Location' && <span className="text-sm text-gray-500">/mois</span>}
          </div>
          
          <div className="flex justify-between text-sm text-gray-600 pt-3 border-t border-gray-100">
            <div className="flex items-center">
              <Maximize size={16} className="mr-1" />
              <span>{surface} m²</span>
            </div>
            <div className="flex items-center">
              <Home size={16} className="mr-1" />
              <span>{rooms} pièce{rooms > 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center">
              <Bed size={16} className="mr-1" />
              <span>{bedrooms} ch.</span>
            </div>
            <div className="flex items-center">
              <Bath size={16} className="mr-1" />
              <span>{bathrooms} sdb</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;