import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building, Users, Search, Shield } from 'lucide-react';
import PropertySearch from '../components/common/PropertySearch';
import PropertyCard from '../components/common/PropertyCard';
import AgentCard from '../components/common/AgentCard';
import { properties } from '../data/properties';
import { agents } from '../data/agents';

const HomePage = () => {
  const [searchParams, setSearchParams] = useState({});
  
  const featuredProperties = properties.filter(property => property.featured).slice(0, 3);
  const featuredAgents = agents.slice(0, 3);
  
  const handleSearch = (params: any) => {
    console.log('Search params:', params);
    setSearchParams(params);
    // Rediriger vers la page des biens avec les paramètres de recherche
  };
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-800 to-primary-700 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="container-custom relative z-10 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Trouvez le bien immobilier de vos rêves
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Des experts immobiliers à votre service pour vous accompagner dans tous vos projets
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/biens" className="btn bg-white text-primary-700 hover:bg-gray-100">
                Voir nos biens
              </Link>
              <Link to="/contact" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-700">
                Nous contacter
              </Link>
            </div>
          </div>
          
          {/* Search Box */}
          <div className="max-w-5xl mx-auto">
            <PropertySearch onSearch={handleSearch} />
          </div>
        </div>
      </section>
      
      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-semibold text-gray-800">Biens à la une</h2>
            <Link to="/biens" className="flex items-center text-primary-600 hover:text-primary-700 font-medium">
              Voir tous les biens
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Services */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Nos services immobiliers</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              ImmoExpert vous propose une gamme complète de services pour répondre à tous vos besoins immobiliers, 
              qu'il s'agisse d'achat, de vente ou de location.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary-100 text-primary-600 mb-4">
                <Building size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Vente de biens</h3>
              <p className="text-gray-600">
                Nous vous accompagnons dans la vente de votre bien immobilier avec une estimation gratuite et un suivi personnalisé.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-secondary-100 text-secondary-600 mb-4">
                <Search size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Recherche personnalisée</h3>
              <p className="text-gray-600">
                Notre équipe d'experts recherche pour vous le bien qui correspond exactement à vos critères et à votre budget.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-accent-100 text-accent-600 mb-4">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gestion locative</h3>
              <p className="text-gray-600">
                Confiez-nous la gestion de votre bien en location et profitez d'un revenu locatif sans les contraintes administratives.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-gray-100 text-gray-600 mb-4">
                <Shield size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Conseil juridique</h3>
              <p className="text-gray-600">
                Nos experts vous conseillent sur les aspects juridiques et fiscaux de votre projet immobilier pour sécuriser votre investissement.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Notre équipe d'experts</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Des professionnels expérimentés et passionnés, à votre écoute pour vous accompagner 
              dans toutes les étapes de votre projet immobilier.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredAgents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/a-propos" className="btn-primary">
              En savoir plus sur notre équipe
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Ce que disent nos clients</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Découvrez les témoignages de nos clients satisfaits qui nous ont fait confiance 
              pour leurs projets immobiliers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-1 text-secondary-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">
                "ImmoExpert a été d'une aide précieuse dans l'achat de notre première maison. 
                L'équipe a su nous guider et nous conseiller tout au long du processus. Un grand merci !"
              </p>
              <div className="font-medium">
                <p className="text-gray-800">Marie et Pierre D.</p>
                <p className="text-gray-500 text-sm">Acheteurs à Lyon</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-1 text-secondary-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">
                "Professionnalisme et réactivité ! J'ai vendu mon appartement en moins de 2 mois 
                grâce à l'expertise de Sophie. Je recommande vivement cette agence."
              </p>
              <div className="font-medium">
                <p className="text-gray-800">Jean-Marc L.</p>
                <p className="text-gray-500 text-sm">Vendeur à Villeurbanne</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-1 text-secondary-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">
                "La gestion locative proposée par ImmoExpert est impeccable. Je n'ai plus à me soucier 
                de mes biens en location et je reçois des rapports détaillés chaque mois."
              </p>
              <div className="font-medium">
                <p className="text-gray-800">Sophie T.</p>
                <p className="text-gray-500 text-sm">Propriétaire investisseur</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-primary-800 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à concrétiser votre projet immobilier ?
            </h2>
            <p className="text-xl mb-8">
              Contactez-nous dès aujourd'hui pour un accompagnement personnalisé
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn bg-white text-primary-700 hover:bg-gray-100">
                Nous contacter
              </Link>
              <Link to="/biens" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-700">
                Voir nos biens
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;