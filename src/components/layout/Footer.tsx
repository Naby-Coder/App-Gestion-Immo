import { Link } from 'react-router-dom';
import { Building, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Building className="h-6 w-6 text-primary-400" />
              <h3 className="text-xl font-bold text-white">ImmoExpert</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Votre partenaire de confiance pour tous vos projets immobiliers depuis 2005. 
              Expertise, professionnalisme et satisfaction client sont nos priorités.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary-400 transition-colors">Accueil</Link>
              </li>
              <li>
                <Link to="/biens" className="text-gray-300 hover:text-primary-400 transition-colors">Nos Biens</Link>
              </li>
              <li>
                <Link to="/a-propos" className="text-gray-300 hover:text-primary-400 transition-colors">À Propos</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary-400 transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-primary-400 transition-colors">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Nos Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 hover:text-primary-400 transition-colors">Vente de biens</li>
              <li className="text-gray-300 hover:text-primary-400 transition-colors">Location</li>
              <li className="text-gray-300 hover:text-primary-400 transition-colors">Estimation gratuite</li>
              <li className="text-gray-300 hover:text-primary-400 transition-colors">Gestion locative</li>
              <li className="text-gray-300 hover:text-primary-400 transition-colors">Conseil immobilier</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 mt-0.5" />
                <span className="text-gray-300">123 Avenue des Champs-Élysées, 75008 Paris</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">contact@immoexpert.fr</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} ImmoExpert. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;