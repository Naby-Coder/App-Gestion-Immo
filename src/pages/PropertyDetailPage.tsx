import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Home, Maximize, Bed, Bath, Calendar, Share2, Heart, 
  Printer, Download, ArrowLeft 
} from 'lucide-react';
import ContactForm from '../components/common/ContactForm';
import AgentCard from '../components/common/AgentCard';
import { properties } from '../data/properties';
import { agents } from '../data/agents';
import { formatPrice, formatDate } from '../utils/formatters';
import { Property, Agent } from '../types';

const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    // Récupérer le bien immobilier
    const foundProperty = properties.find(p => p.id === id);
    
    if (foundProperty) {
      setProperty(foundProperty);
      
      // Récupérer l'agent associé
      const foundAgent = agents.find(a => a.id === foundProperty.agentId);
      if (foundAgent) {
        setAgent(foundAgent);
      }
      
      // Réinitialiser l'image active
      setActiveImage(0);
      
      // Mettre à jour le titre de la page
      document.title = `${foundProperty.title} | ImmoExpert`;
    }
    
    // Récupérer le statut de favori (simulé)
    setIsFavorite(localStorage.getItem(`favorite-${id}`) === 'true');
    
  }, [id]);
  
  const toggleFavorite = () => {
    const newStatus = !isFavorite;
    setIsFavorite(newStatus);
    localStorage.setItem(`favorite-${id}`, newStatus.toString());
  };
  
  if (!property) {
    return (
      <div className="container-custom py-16 text-center">
        <p className="text-xl text-gray-600">Bien immobilier non trouvé.</p>
        <Link to="/biens" className="inline-flex items-center text-primary-600 mt-4">
          <ArrowLeft size={18} className="mr-2" />
          Retour à la liste des biens
        </Link>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 py-8">
      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <ol className="flex items-center text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-primary-600">Accueil</Link>
            </li>
            <li className="mx-2">/</li>
            <li>
              <Link to="/biens" className="hover:text-primary-600">Biens</Link>
            </li>
            <li className="mx-2">/</li>
            <li className="text-gray-700 font-medium truncate">{property.title}</li>
          </ol>
        </nav>
        
        {/* Property Title and Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">{property.title}</h1>
            <div className="flex items-center text-gray-600">
              <MapPin size={18} className="mr-1" />
              <span>{property.address.street}, {property.address.zipCode} {property.address.city}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button 
              onClick={toggleFavorite}
              className={`p-2 rounded-full border ${
                isFavorite ? 'bg-red-100 border-red-300 text-red-500' : 'border-gray-300 text-gray-500 hover:bg-gray-100'
              }`}
              aria-label="Ajouter aux favoris"
            >
              <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
            <button 
              className="p-2 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100"
              aria-label="Partager"
            >
              <Share2 size={20} />
            </button>
            <button 
              className="p-2 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100"
              aria-label="Imprimer"
            >
              <Printer size={20} />
            </button>
            <button 
              className="p-2 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100"
              aria-label="Télécharger la fiche"
            >
              <Download size={20} />
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="relative h-80 md:h-96">
                <img 
                  src={property.images[activeImage]} 
                  alt={property.title} 
                  className="w-full h-full object-cover"
                />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-sm font-medium rounded-md ${
                    property.status === 'Vente' ? 'bg-primary-600 text-white' : 'bg-secondary-500 text-white'
                  }`}>
                    {property.status}
                  </span>
                </div>
                
                {/* Price Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="px-4 py-2 bg-white text-primary-700 font-bold rounded-md shadow-md">
                    {formatPrice(property.price)}
                    {property.status === 'Location' && <span className="text-sm font-normal ml-1">/mois</span>}
                  </span>
                </div>
              </div>
              
              {/* Thumbnails */}
              {property.images.length > 1 && (
                <div className="p-4 flex space-x-2 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`h-16 w-24 flex-shrink-0 rounded overflow-hidden ${
                        activeImage === index ? 'ring-2 ring-primary-500' : 'opacity-70'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`Vue ${index + 1}`} 
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Caractéristiques</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center">
                    <Home size={20} className="mr-2 text-primary-600" />
                    <div>
                      <p className="text-sm text-gray-500">Type</p>
                      <p className="font-medium">{property.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Maximize size={20} className="mr-2 text-primary-600" />
                    <div>
                      <p className="text-sm text-gray-500">Surface</p>
                      <p className="font-medium">{property.surface} m²</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Home size={20} className="mr-2 text-primary-600" />
                    <div>
                      <p className="text-sm text-gray-500">Pièces</p>
                      <p className="font-medium">{property.rooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Bed size={20} className="mr-2 text-primary-600" />
                    <div>
                      <p className="text-sm text-gray-500">Chambres</p>
                      <p className="font-medium">{property.bedrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Bath size={20} className="mr-2 text-primary-600" />
                    <div>
                      <p className="text-sm text-gray-500">Salles de bain</p>
                      <p className="font-medium">{property.bathrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={20} className="mr-2 text-primary-600" />
                    <div>
                      <p className="text-sm text-gray-500">Disponibilité</p>
                      <p className="font-medium">Immédiate</p>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Description</h2>
                <p className="text-gray-700 mb-6 whitespace-pre-line">
                  {property.description}
                </p>
                
                {property.features.length > 0 && (
                  <>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Équipements et services</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
                      {property.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <svg className="h-5 w-5 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div>
            {/* Agent Info */}
            {agent && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Votre contact</h2>
                <AgentCard agent={agent} />
              </div>
            )}
            
            {/* Contact Form */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Demande d'informations</h2>
              <ContactForm propertyId={property.id} propertyTitle={property.title} />
            </div>
          </div>
        </div>
        
        {/* Related Properties 
        This section can be added later with similar properties based on location or type
        */}
      </div>
    </div>
  );
};

export default PropertyDetailPage;