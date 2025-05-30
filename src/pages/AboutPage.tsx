import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Clock, MapPin, Phone, Mail } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative py-16 bg-primary-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-white mb-6"
            >
              À Propos de Maison Élégance
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-primary-100"
            >
              Votre partenaire de confiance dans l'immobilier de prestige depuis 2005
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
                  Fondée en 2005, Maison Élégance est née de la passion pour l'immobilier de prestige et
                  de la volonté d'offrir un service d'excellence à une clientèle exigeante.
                </p>
                <p>
                  Au fil des années, nous avons développé une expertise unique dans le secteur de
                  l'immobilier haut de gamme, en nous appuyant sur des valeurs fortes : l'excellence,
                  la discrétion et le professionnalisme.
                </p>
                <p>
                  Aujourd'hui, notre agence est devenue une référence incontournable dans le secteur de
                  l'immobilier de luxe, avec un portefeuille de biens exceptionnels et une équipe
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
                alt="Maison Élégance"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
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
                  'Une équipe d\'experts qualifiés à votre service pour vous accompagner dans votre projet immobilier',
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
                className="bg-white rounded-xl p-8 shadow-sm"
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
              Des professionnels passionnés et expérimentés à votre service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Sophie Martin',
                role: 'Directrice',
                photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
                description:
                  'Plus de 15 ans d\'expérience dans l\'immobilier de luxe',
              },
              {
                name: 'Thomas Dubois',
                role: 'Agent Immobilier Senior',
                photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
                description:
                  'Spécialiste des propriétés d\'exception sur la Côte d\'Azur',
              },
              {
                name: 'Julie Laurent',
                role: 'Conseillère Immobilier',
                photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
                description:
                  'Experte en estimation et valorisation de biens',
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm"
              >
                <div className="relative h-64">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contactez-nous */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contactez-nous</h2>
              <p className="text-gray-600">
                Notre équipe est à votre disposition pour répondre à toutes vos questions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Adresse</h3>
                  <p className="text-gray-600">123 Avenue des Champs-Élysées, 75008 Paris</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Téléphone</h3>
                  <p className="text-gray-600">+33 1 23 45 67 89</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">contact@maisonelegance.fr</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;