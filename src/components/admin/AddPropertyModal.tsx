import { useState } from 'react';
import { X, Upload } from 'lucide-react';

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (property: any) => void;
}

const AddPropertyModal = ({ isOpen, onClose, onAdd }: AddPropertyModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'Appartement',
    status: 'Vente',
    price: '',
    surface: '',
    rooms: '',
    bedrooms: '',
    bathrooms: '',
    description: '',
    street: '',
    city: 'Dakar',
    zipCode: '',
    features: [] as string[],
    agentId: '1'
  });

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const availableFeatures = [
    'Piscine', 'Jardin', 'Garage', 'Climatisation', 'Sécurité 24/7',
    'Ascenseur', 'Parking', 'Balcon', 'Terrasse', 'Cave', 'Domotique',
    'Fibre optique', 'Vue mer', 'Accès plage', 'Salle de sport'
  ];

  const cities = ['Dakar', 'Thiès', 'Saint-Louis', 'Touba', 'Mbour', 'Saly', 'Rufisque'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProperty = {
      id: Date.now().toString(),
      title: formData.title,
      type: formData.type,
      status: formData.status,
      price: parseInt(formData.price),
      surface: parseInt(formData.surface),
      rooms: parseInt(formData.rooms),
      bedrooms: parseInt(formData.bedrooms),
      bathrooms: parseInt(formData.bathrooms),
      description: formData.description,
      address: {
        street: formData.street,
        city: formData.city,
        zipCode: formData.zipCode,
        country: 'Sénégal'
      },
      features: selectedFeatures,
      images: ['https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      featured: false,
      agentId: formData.agentId
    };

    onAdd(newProperty);
    onClose();
    
    // Reset form
    setFormData({
      title: '',
      type: 'Appartement',
      status: 'Vente',
      price: '',
      surface: '',
      rooms: '',
      bedrooms: '',
      bathrooms: '',
      description: '',
      street: '',
      city: 'Dakar',
      zipCode: '',
      features: [],
      agentId: '1'
    });
    setSelectedFeatures([]);
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Ajouter un bien immobilier</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informations générales */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium mb-4">Informations générales</h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="input"
                placeholder="Ex: Villa moderne avec vue sur mer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type de bien *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                className="input"
              >
                <option value="Appartement">Appartement</option>
                <option value="Maison">Maison</option>
                <option value="Terrain">Terrain</option>
                <option value="Commerce">Commerce</option>
                <option value="Bureau">Bureau</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Statut *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="input"
              >
                <option value="Vente">Vente</option>
                <option value="Location">Location</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prix (XOF) *
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                className="input"
                placeholder="Ex: 150000000"
              />
            </div>

            {/* Caractéristiques */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium mb-4 mt-6">Caractéristiques</h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Surface (m²) *
              </label>
              <input
                type="number"
                required
                value={formData.surface}
                onChange={(e) => setFormData(prev => ({ ...prev, surface: e.target.value }))}
                className="input"
                placeholder="Ex: 120"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de pièces *
              </label>
              <input
                type="number"
                required
                value={formData.rooms}
                onChange={(e) => setFormData(prev => ({ ...prev, rooms: e.target.value }))}
                className="input"
                placeholder="Ex: 4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chambres *
              </label>
              <input
                type="number"
                required
                value={formData.bedrooms}
                onChange={(e) => setFormData(prev => ({ ...prev, bedrooms: e.target.value }))}
                className="input"
                placeholder="Ex: 3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salles de bain *
              </label>
              <input
                type="number"
                required
                value={formData.bathrooms}
                onChange={(e) => setFormData(prev => ({ ...prev, bathrooms: e.target.value }))}
                className="input"
                placeholder="Ex: 2"
              />
            </div>

            {/* Adresse */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium mb-4 mt-6">Adresse</h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rue *
              </label>
              <input
                type="text"
                required
                value={formData.street}
                onChange={(e) => setFormData(prev => ({ ...prev, street: e.target.value }))}
                className="input"
                placeholder="Ex: 123 Avenue Cheikh Anta Diop"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ville *
              </label>
              <select
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                className="input"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Code postal *
              </label>
              <input
                type="text"
                required
                value={formData.zipCode}
                onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                className="input"
                placeholder="Ex: 12000"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="input"
                placeholder="Décrivez le bien immobilier..."
              />
            </div>

            {/* Équipements */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium mb-4 mt-6">Équipements et services</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {availableFeatures.map(feature => (
                  <label key={feature} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedFeatures.includes(feature)}
                      onChange={() => toggleFeature(feature)}
                      className="mr-2"
                    />
                    <span className="text-sm">{feature}</span>
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
              Ajouter le bien
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyModal;