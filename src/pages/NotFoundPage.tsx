import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4 mb-6">Page non trouvée</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          <Home size={20} className="mr-2" />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;