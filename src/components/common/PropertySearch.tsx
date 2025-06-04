import { useState } from 'react';
import { Search } from 'lucide-react';

interface PropertySearchProps {
  onSearch: (searchParams: {
    type: string;
    status: string;
    location: string;
    minPrice: number;
    maxPrice: number;
    minRooms: number;
  }) => void;
}

const PropertySearch = ({ onSearch }: PropertySearchProps) => {
  const [searchParams, setSearchParams] = useState({
    type: '',
    status: '',
    location: '',
    minPrice: 0,
    maxPrice: 0,
    minRooms: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: name.includes('Price') || name.includes('Rooms') ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  const cities = ['Dakar', 'Thiès', 'Saint-Louis', 'Touba', 'Mbour', 'Saly', 'Rufisque'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Type d'offre
            </label>
            <select
              id="status"
              name="status"
              value={searchParams.status}
              onChange={handleChange}
              className="input text-gray-900"
            >
              <option value="">Tous</option>
              <option value="Vente">Vente</option>
              <option value="Location">Location</option>
            </select>
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Type de bien
            </label>
            <select
              id="type"
              name="type"
              value={searchParams.type}
              onChange={handleChange}
              className="input text-gray-900"
            >
              <option value="">Tous</option>
              <option value="Appartement">Appartement</option>
              <option value="Maison">Maison</option>
              <option value="Terrain">Terrain</option>
              <option value="Commerce">Commerce</option>
              <option value="Bureau">Bureau</option>
            </select>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Ville
            </label>
            <select
              id="location"
              name="location"
              value={searchParams.location}
              onChange={handleChange}
              className="input text-gray-900"
            >
              <option value="">Toutes les villes</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Prix minimum
            </label>
            <input
              id="minPrice"
              name="minPrice"
              type="number"
              placeholder="Min XOF"
              value={searchParams.minPrice || ''}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Prix maximum
            </label>
            <input
              id="maxPrice"
              name="maxPrice"
              type="number"
              placeholder="Max XOF"
              value={searchParams.maxPrice || ''}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label htmlFor="minRooms" className="block text-sm font-medium text-gray-700 mb-1">
              Pièces minimum
            </label>
            <select
              id="minRooms"
              name="minRooms"
              value={searchParams.minRooms}
              onChange={handleChange}
              className="input text-gray-900"
            >
              <option value={0}>Indifférent</option>
              <option value={1}>1+</option>
              <option value={2}>2+</option>
              <option value={3}>3+</option>
              <option value={4}>4+</option>
              <option value={5}>5+</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center btn-primary py-3"
        >
          <Search size={18} className="mr-2" />
          Rechercher
        </button>
      </form>
    </div>
  );
};

export default PropertySearch;