import React from 'react';

const BlogPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Notre Blog Immobilier</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Article cards will be dynamically populated here */}
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg" 
            alt="Investissement immobilier" 
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <div className="text-sm text-blue-600 mb-2">15 Mars 2025</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Guide de l'investissement immobilier en 2025
            </h2>
            <p className="text-gray-600 mb-4">
              Découvrez les meilleures stratégies d'investissement immobilier 
              pour maximiser votre rendement dans le contexte actuel du marché.
            </p>
            <button className="text-blue-600 font-semibold hover:text-blue-800">
              Lire la suite →
            </button>
          </div>
        </article>

        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg" 
            alt="Rénovation maison" 
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <div className="text-sm text-blue-600 mb-2">10 Mars 2025</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              5 Astuces pour rénover votre bien
            </h2>
            <p className="text-gray-600 mb-4">
              Les rénovations qui augmentent vraiment la valeur de votre 
              propriété et comment les réaliser efficacement.
            </p>
            <button className="text-blue-600 font-semibold hover:text-blue-800">
              Lire la suite →
            </button>
          </div>
        </article>

        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/7578916/pexels-photo-7578916.jpeg" 
            alt="Marché immobilier" 
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <div className="text-sm text-blue-600 mb-2">5 Mars 2025</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Tendances du marché immobilier
            </h2>
            <p className="text-gray-600 mb-4">
              Analyse des dernières tendances du marché immobilier et 
              prévisions pour les mois à venir.
            </p>
            <button className="text-blue-600 font-semibold hover:text-blue-800">
              Lire la suite →
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPage;