import { useState } from 'react';
import { X } from 'lucide-react';

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (client: any) => void;
}

const AddClientModal = ({ isOpen, onClose, onAdd }: AddClientModalProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    propertyTypes: [] as string[],
    minBudget: '',
    maxBudget: '',
    locations: [] as string[]
  });

  const propertyTypes = ['Appartement', 'Maison', 'Terrain', 'Commerce', 'Bureau'];
  const cities = ['Dakar', 'Thiès', 'Saint-Louis', 'Touba', 'Mbour', 'Saly', 'Rufisque'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newClient = {
      id: Date.now().toString(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      createdAt: new Date().toISOString(),
      preferences: {
        propertyTypes: formData.propertyTypes,
        budget: {
          min: parseInt(formData.minBudget) || 0,
          max: parseInt(formData.maxBudget) || 0
        },
        locations: formData.locations
      }
    };

    onAdd(newClient);
    onClose();
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      propertyTypes: [],
      minBudget: '',
      maxBudget: '',
      locations: []
    });
  };

  const togglePropertyType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter(t => t !== type)
        : [...prev.propertyTypes, type]
    }));
  };

  const toggleLocation = (location: string) => {
    setFormData(prev => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter(l => l !== location)
        : [...prev.locations, location]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Ajouter un client</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informations personnelles */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium mb-4">Informations personnelles</h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prénom *
              </label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                className="input"
                placeholder="Ex: Amadou"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom *
              </label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                className="input"
                placeholder="Ex: Diallo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="input"
                placeholder="Ex: amadou.diallo@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="input"
                placeholder="Ex: +221 77 123 45 67"
              />
            </div>

            {/* Préférences */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium mb-4 mt-6">Préférences de recherche</h3>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Types de biens recherchés
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {propertyTypes.map(type => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.propertyTypes.includes(type)}
                      onChange={() => togglePropertyType(type)}
                      className="mr-2"
                    />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Budget minimum (XOF)
              </label>
              <input
                type="number"
                value={formData.minBudget}
                onChange={(e) => setFormData(prev => ({ ...prev, minBudget: e.target.value }))}
                className="input"
                placeholder="Ex: 50000000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Budget maximum (XOF)
              </label>
              <input
                type="number"
                value={formData.maxBudget}
                onChange={(e) => setFormData(prev => ({ ...prev, maxBudget: e.target.value }))}
                className="input"
                placeholder="Ex: 150000000"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zones géographiques d'intérêt
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {cities.map(city => (
                  <label key={city} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.locations.includes(city)}
                      onChange={() => toggleLocation(city)}
                      className="mr-2"
                    />
                    <span className="text-sm">{city}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Ajouter le client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClientModal;