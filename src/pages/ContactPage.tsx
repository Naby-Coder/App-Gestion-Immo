import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import ContactForm from '../components/common/ContactForm';

const ContactPage = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Contactez-nous</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Notre équipe est à votre disposition pour répondre à toutes vos questions 
            et vous accompagner dans vos projets immobiliers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary-100 text-primary-600 mb-4">
              <Phone size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Téléphone</h3>
            <p className="text-gray-600 mb-4">Notre équipe est disponible pour vous répondre par téléphone</p>
            <a href="tel:+33123456789" className="text-lg font-medium text-primary-600 hover:text-primary-700">
              +33 176 00 00
            </a>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary-100 text-primary-600 mb-4">
              <Mail size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-600 mb-4">Envoyez-nous un email et nous vous répondrons rapidement</p>
            <a href="mailto:contact@immoexpert.fr" className="text-lg font-medium text-primary-600 hover:text-primary-700">
              contact@immoexpert.sn
            </a>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary-100 text-primary-600 mb-4">
              <Clock size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Horaires d'ouverture</h3>
            <p className="text-gray-600 mb-4">Nous vous accueillons à notre agence</p>
            <div className="text-gray-700">
              <p>Lundi - Vendredi : 9h - 19h</p>
              <p>Samedi : 10h - 17h</p>
              <p>Dimanche : Fermé</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire de contact */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Envoyez-nous un message</h2>
            <ContactForm />
          </div>
          
          {/* Carte et adresse */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Notre agence</h2>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Carte (iframe Google Maps à remplacer par une vraie intégration en production) */}
              <div className="h-72 bg-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin size={48} className="mx-auto mb-2 text-gray-400" />
                  <p>Carte interactive</p>
                  <p className="text-sm">(Intégration Google Maps ici)</p>
                </div>
              </div>
              
              {/* Adresse */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">ImmoExpert</h3>
                <div className="flex items-start mb-3">
                  <MapPin size={20} className="mr-3 text-primary-600 mt-1" />
                  <div>
                    <p>123 Avenue Cheikh Anta Diop, Dakar, Sénégal</p>
                    <p>75008 Dakar, Senegal</p>
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  <Phone size={20} className="mr-3 text-primary-600" />
                  <p>+33 176 00 00</p>
                </div>
                <div className="flex items-center">
                  <Mail size={20} className="mr-3 text-primary-600" />
                  <p>contact@immoexpert.sn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;