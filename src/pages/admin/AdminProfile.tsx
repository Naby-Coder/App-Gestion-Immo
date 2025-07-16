import { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit, Save, X, Camera } from 'lucide-react';
import { useAuth } from '../../components/auth/AuthProvider';

const AdminProfile = () => {
  const { profile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: profile?.role === 'admin' ? 'Mouhamed' : 'Fadel',
    lastName: profile?.role === 'admin' ? 'Ndione' : 'Fall',
    email: profile?.role === 'admin' ? 'mouhamed.ndione@immoexpert.sn' : 'fadel.fall@immoexpert.sn',
    phone: profile?.role === 'admin' ? '+221 77 123 45 67' : '+221 76 234 56 78',
    position: profile?.role === 'admin' ? 'Directeur Général' : 'Agent Immobilier Senior',
    address: '123 Avenue Cheikh Anta Diop, Dakar',
    bio: profile?.role === 'admin' 
      ? "Directeur général d'ImmoExpert avec plus de 15 ans d'expérience dans l'immobilier de prestige au Sénégal."
      : "Agent immobilier spécialisé dans les biens résidentiels et commerciaux à Dakar. 8 ans d'expérience dans le secteur."
  });

  const handleSave = () => {
    setIsEditing(false);
    alert('Profil mis à jour avec succès !');
  };

  const handleCancel = () => {
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
        {/* Profile Picture */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Photo de profil</h3>
            
            <div className="text-center">
              <div className="relative mx-auto h-32 w-32 rounded-full overflow-hidden mb-4">
                <img 
                  src={profile?.role === 'admin' ? '/popup-scaled-1-195x300.jpg' : '/Fadel.png'}
                  alt="Photo de profil"
                  className="w-full h-full object-cover"
                />
                {isEditing && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Camera size={24} className="text-white" />
                  </div>
                )}
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
                <span className="text-gray-600">Biens gérés</span>
                <span className="font-medium">{profile?.role === 'admin' ? '156' : '12'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Clients actifs</span>
                <span className="font-medium">{profile?.role === 'admin' ? '89' : '28'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ventes ce mois</span>
                <span className="font-medium">{profile?.role === 'admin' ? '18' : '6'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taux de réussite</span>
                <span className="font-medium text-green-600">
                  {profile?.role === 'admin' ? '94%' : '87%'}
                </span>
              </div>
            </div>
          </div>
        </div>

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
                    value={profileData.firstName}
                    onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="input"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.firstName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="input"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.lastName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    className="input"
                  />
                ) : (
                  <div className="flex items-center">
                    <Mail size={16} className="mr-2 text-gray-400" />
                    <p className="text-gray-900">{profileData.email}</p>
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
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    className="input"
                  />
                ) : (
                  <div className="flex items-center">
                    <Phone size={16} className="mr-2 text-gray-400" />
                    <p className="text-gray-900">{profileData.phone}</p>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Poste
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.position}
                    onChange={(e) => setProfileData(prev => ({ ...prev, position: e.target.value }))}
                    className="input"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.position}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.address}
                    onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                    className="input"
                  />
                ) : (
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2 text-gray-400" />
                    <p className="text-gray-900">{profileData.address}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Biographie</h2>
            
            {isEditing ? (
              <textarea
                rows={4}
                value={profileData.bio}
                onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                className="input"
                placeholder="Décrivez votre parcours professionnel..."
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
