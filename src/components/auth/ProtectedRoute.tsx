import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'agent' | 'client';
  redirectTo?: string;
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();

  // Afficher le spinner seulement pendant le chargement initial
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  // Si pas d'utilisateur connecté, rediriger vers login
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Si un rôle spécifique est requis et que l'utilisateur n'a pas ce rôle
  if (requiredRole && profile?.role !== requiredRole) {
    // Cas spécial: les agents peuvent accéder aux routes admin mais avec des permissions limitées
    // if (requiredRole === 'admin' && profile?.role === 'agent') {
    //   // Permettre l'accès mais avec des restrictions dans les composants
    //   return <>{children}</>;
    // }
    
    // Rediriger vers le bon dashboard selon le rôle de l'utilisateur
    const dashboardRoutes = {
      admin: '/admin',
      agent: '/agent',
      client: '/espace-client'
    };
    
    if (profile?.role && dashboardRoutes[profile.role]) {
      return <Navigate to={dashboardRoutes[profile.role]} replace />;
    }
    
    // Si pas de rôle défini, rediriger vers l'accueil
    return <Navigate to="/" replace />;
  }

  // Tout est OK, afficher le contenu protégé
  return <>{children}</>;
}