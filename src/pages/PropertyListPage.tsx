import { useState, useEffect } from 'react';
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from 'lucide-react';
import PropertySearch from '../components/common/PropertySearch';
import PropertyCard from '../components/common/PropertyCard';
import { properties } from '../data/properties';
import { Property } from '../types';

type SortOption = 'price-asc' | 'price-desc' | 'date-desc' | 'date-asc';

const PropertyListPage = () => {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [sortOption, setSortOption] = useState<SortOption>('date-desc');
  const [searchParams, setSearchParams] = useState({
    type: '',
    status: '',
    location: '',
    minPrice: 0,
    maxPrice: 0,
    minRooms: 0
  });

  // Appliquer les filtres et le tri
  useEffect(() => {
    let result = [...properties];

    // Filtrage
    if (searchParams.type) {
      result = result.filter(property => property.type === searchParams.type);
    }
    
    if (searchParams.status) {
      result = result.filter(property => property.status === searchParams.status);
    }
    
    if (searchParams.location) {
      const locationLower = searchParams.location.toLowerCase();
      result = result.filter(
        property => 
          property.address.city.toLowerCase().includes(locationLower) ||
          property.address.zipCode.includes(searchParams.location)
      );
    }
    
    if (searchParams.minPrice > 0) {
      result = result.filter(property => property.price >= searchParams.minPrice);
    }
    
    if (searchParams.maxPrice > 0) {
      result = result.filter(property => property.price <= searchParams.maxPrice);
    }
    
    if (searchParams.minRooms > 0) {
      result = result.filter(property => property.rooms >= searchParams.minRooms);
    }

    // Tri
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'date-desc':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'date-asc':
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
    }

    setFilteredProperties(result);
  }, [searchParams, sortOption]);

  const handleSearch = (params: any) => {
    setSearchParams(params);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as SortOption);
  };

  return (
    <div className="bg-gray-50 py-8 min-h-screen">
      <div className="container-custom">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">Nos Biens Immobiliers</h1>
        
        {/* Search Section */}
        <div className="mb-8">
          <PropertySearch onSearch={handleSearch} />
        </div>
        
        {/* Results Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="mb-4 md:mb-0">
              <h2 className="text-lg font-medium text-gray-800">
                {filteredProperties.length} bien{filteredProperties.length > 1 ? 's' : ''} trouvé{filteredProperties.length > 1 ? 's' : ''}
              </h2>
            </div>
            
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2 text-gray-700">Trier par:</label>
              <div className="relative">
                <select
                  id="sort"
                  value={sortOption}
                  onChange={handleSortChange}
                  className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900"
                >
                  <option value="date-desc">Date (récent)</option>
                  <option value="date-asc">Date (ancien)</option>
                  <option value="price-asc">Prix (croissant)</option>
                  <option value="price-desc">Prix (décroissant)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  {sortOption.includes('asc') ? (
                    <ArrowUpNarrowWide size={16} className="text-gray-500" />
                  ) : (
                    <ArrowDownNarrowWide size={16} className="text-gray-500" />
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {filteredProperties.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Aucun bien ne correspond à vos critères de recherche.</p>
              <p className="text-gray-500 mt-2">Essayez de modifier vos filtres pour obtenir plus de résultats.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyListPage;
