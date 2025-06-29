import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building, Users, Search, Shield, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import PropertySearch from '../components/common/PropertySearch';
import PropertyCard from '../components/common/PropertyCard';
import AgentCard from '../components/common/AgentCard';
import TestimonialSlider from '../components/common/TestimonialSlider';
import { properties } from '../data/properties';
import { agents } from '../data/agents';

const HomePage = () => {
  const [searchParams, setSearchParams] = useState({});
  
  const featuredProperties = properties.filter(property => property.featured).slice(0, 6);
  const featuredAgents = agents.slice(0, 3);
  
  const handleSearch = (params: any) => {
    console.log('Search params:', params);
    setSearchParams(params);
  };

  const cities = [
    { name: 'Dakar', image: '/Dakar.jpg', count: 45 },
    { name: 'Thiès', image: '/Thies.png', count: 23 },
    { name: 'Saint-Louis', image: '/Saint louis.jpg', count: 18 },
    { name: 'Touba', image: '/Touba.jpg', count: 15 }
  ];
  
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

      {/* Cities Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Emplacements Prisés</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez nos biens dans les meilleures zones immobilières du Sénégal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities.map((city) => (
              <Link to={`/biens?city=${city.name}`} key={city.name}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-xl overflow-hidden h-60 group shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={city.image}
                    alt={`${city.name} - Immobilier au Sénégal`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback en cas d'erreur de chargement
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.pexels.com/photos/3876958/pexels-photo-3876958.jpeg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2 drop-shadow-lg">{city.name}</h3>
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2 text-primary-300" />
                      <span className="text-sm text-gray-200">{city.count} propriétés</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <Building size={20} className="text-white" />
                    </div>
                  </div>
                </motion.div>
              </Link>
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
          
          <TestimonialSlider />
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