import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Clock, MapPin, Phone, Mail, Building } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-primary-800 to-primary-700">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-white mb-6"
            >
              À Propos d'ImmoExpert
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-primary-100"
            >
              Votre partenaire de confiance dans l'immobilier sénégalais depuis 2005
            </motion.p>
          </div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Histoire</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Fondée en 2005, ImmoExpert est née de la passion pour l'immobilier de prestige et
                  de la volonté d'offrir un service d'excellence à une clientèle exigeante au Sénégal.
                </p>
                <p>
                  Au fil des années, nous avons développé une expertise unique dans le secteur de
                  l'immobilier haut de gamme, en nous appuyant sur des valeurs fortes : l'excellence,
                  la discrétion et le professionnalisme.
                </p>
                <p>
                  Aujourd'hui, notre agence est devenue une référence incontournable dans le secteur de
                  l'immobilier de luxe au Sénégal, avec un portefeuille de biens exceptionnels et une équipe
                  d'experts passionnés.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-96"
            >
              <img
                src="https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="ImmoExpert Sénégal"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent rounded-lg"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Valeurs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Des principes qui guident chacune de nos actions pour vous offrir le meilleur service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Professionnalisme',
                description:
                  'Une équipe d\'experts qualifiés à votre service pour vous accompagner dans votre projet immobilier au Sénégal',
              },
              {
                icon: Award,
                title: 'Excellence',
                description:
                  'Un engagement constant vers l\'excellence dans la sélection des biens et la qualité de service',
              },
              {
                icon: Clock,
                title: 'Disponibilité',
                description:
                  'Une équipe réactive et disponible pour répondre à vos besoins et questions à tout moment',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <value.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Équipe */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Équipe</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Des professionnels expérimentés et passionnés, à votre écoute pour vous accompagner
              dans toutes les étapes de votre projet immobilier
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Mouhamed Ndione',
                role: 'Directeur des ventes',
                photo: '/popup-scaled-1-195x300.jpg',
                description:
                  'Plus de 10 ans d\'expérience dans l\'immobilier de luxe à Dakar. Expert en biens d\'exception et accompagnement personnalisé.',
              },
              {
                name: 'Fadel Fall',
                role: 'Conseiller immobilier',
                photo: '/Fadel.png',
                description:
                  'Spécialiste du marché immobilier dakarois depuis 8 ans. Connaissance approfondie de chaque quartier et ses spécificités.',
              },
              {
                name: 'Aïssatou Sall',
                role: 'Conseillère juridique',
                photo: '/Snapchat-1056148261.jpg',
                description:
                  'Experte en droit immobilier avec 5 ans d\'expérience. Accompagnement juridique et sécurisation des transactions.',
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={member.photo}
                    alt={`${member.name} - ${member.role} chez ImmoExpert`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback en cas d'erreur de chargement
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Mail size={18} className="text-white" />
                      </div>
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Phone size={18} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos Réalisations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Réalisations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quelques chiffres qui témoignent de notre expertise et de la confiance de nos clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Biens vendus', icon: Building },
              { number: '20+', label: 'Années d\'expérience', icon: Award },
              { number: '1000+', label: 'Clients satisfaits', icon: Users },
              { number: '98%', label: 'Taux de satisfaction', icon: Clock },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-primary-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contactez-nous */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl shadow-sm p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contactez-nous</h2>
              <p className="text-gray-600">
                Notre équipe est à votre disposition pour répondre à toutes vos questions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Adresse</h3>
                  <p className="text-gray-600">123 Avenue Cheikh Anta Diop, Dakar, Sénégal</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Téléphone</h3>
                  <p className="text-gray-600">+221 33 123 45 67</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">contact@immoexpert.sn</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <a 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                <Mail className="w-5 h-5 mr-2" />
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
