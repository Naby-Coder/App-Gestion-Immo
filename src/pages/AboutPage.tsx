import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">À propos de nous</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notre Histoire</h2>
          <p className="text-gray-600 mb-6">
            Depuis notre création, nous nous engageons à offrir un service immobilier 
            d'excellence, combinant expertise locale approfondie et approche personnalisée 
            pour chaque client.
          </p>
          <p className="text-gray-600 mb-6">
            Notre équipe de professionnels passionnés travaille sans relâche pour 
            vous accompagner dans tous vos projets immobiliers, qu'il s'agisse 
            d'achat, de vente ou de location.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nos Valeurs</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Intégrité</h3>
                <p className="text-gray-600">Nous plaçons l'honnêteté et la transparence au cœur de chaque transaction.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Excellence</h3>
                <p className="text-gray-600">Nous visons l'excellence dans chaque aspect de notre service.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Service Client</h3>
                <p className="text-gray-600">La satisfaction de nos clients est notre priorité absolue.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;