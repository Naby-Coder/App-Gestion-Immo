import { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit, Save, X } from 'lucide-react';

const ClientProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'Arame',
    lastName: 'Diop',
    email: 'arame.diop@email.com',
    phone: '+221 77 123 45 67',
    address: '123 Rue de la Paix, Dakar',
    preferences: {
      propertyTypes: ['Appartement', 'Maison'],
      budget: {
        min: 50000000,
        max: 150000000
      },
      locations: ['Dakar', 'Thiès']
    }
  });

  const handleSave = () => {
    // Ici on sauvegarderait les données
    setIsEditing(false);
    alert('Profil mis à jour avec succès !');
  };

  const handleCancel = () => {
    // Ici on restaurerait les données originales
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Mon profil</h1>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="btn-primary flex items-center"
          >
            <Edit size={16} className="mr-2" />
            Modifier
          </button>
        ) : (
          <div className="flex space-x-2">
            <button 
              onClick={handleSave}
              className="btn-primary flex items-center"
            >
              <Save size={16} className="mr-2" />
              Sauvegarder
            </button>
            <button 
              onClick={handleCancel}
              className="btn-outline flex items-center"
            >
              <X size={16} className="mr-2" />
              Annuler
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations personnelles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                    className="input"
                  />
                ) : (
                  <p className="text-gray-900">{profile.firstName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                    className="input"
                  />
                ) : (
                  <p className="text-gray-900">{profile.lastName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="input"
                  />
                ) : (
                  <div className="flex items-center">
                    <Mail size={16} className="mr-2 text-gray-400" />
                    <p className="text-gray-900">{profile.email}</p>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                    className="input"
                  />
                ) : (
                  <div className="flex items-center">
                    <Phone size={16} className="mr-2 text-gray-400" />
                    <p className="text-gray-900">{profile.phone}</p>
                  </div>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.address}
                    onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                    className="input"
                  />
                ) : (
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2 text-gray-400" />
                    <p className="text-gray-900">{profile.address}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Préférences de recherche</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Types de biens recherchés
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Appartement', 'Maison', 'Terrain', 'Commerce', 'Bureau'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={profile.preferences.propertyTypes.includes(type)}
                        disabled={!isEditing}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setProfile(prev => ({
                              ...prev,
                              preferences: {
                                ...prev.preferences,
                                propertyTypes: [...prev.preferences.propertyTypes, type]
                              }
                            }));
                          } else {
                            setProfile(prev => ({
                              ...prev,
                              preferences: {
                                ...prev.preferences,
                                propertyTypes: prev.preferences.propertyTypes.filter(t => t !== type)
                              }
                            }));
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget minimum (XOF)
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={profile.preferences.budget.min}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        preferences: {
                          ...prev.preferences,
                          budget: { ...prev.preferences.budget, min: Number(e.target.value) }
                        }
                      }))}
                      className="input"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.preferences.budget.min.toLocaleString()} XOF</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget maximum (XOF)
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={profile.preferences.budget.max}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        preferences: {
                          ...prev.preferences,
                          budget: { ...prev.preferences.budget, max: Number(e.target.value) }
                        }
                      }))}
                      className="input"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.preferences.budget.max.toLocaleString()} XOF</p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zones géographiques
                </label>
                <div className="flex flex-wrap gap-2">
                  {profile.preferences.locations.map((location, index) => (
                    <span key={index} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-md text-sm">
                      {location}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Picture */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Photo de profil</h3>
            
            <div className="text-center">
              <div className="mx-auto h-32 w-32 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <User size={48} className="text-primary-600" />
              </div>
              
              {isEditing && (
                <button className="btn-outline text-sm">
                  Changer la photo
                </button>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistiques</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Biens favoris</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Demandes envoyées</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Visites programmées</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Messages reçus</span>
                <span className="font-medium">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;