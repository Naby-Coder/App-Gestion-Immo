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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  if (requiredRole && profile?.role !== requiredRole) {
    // Rediriger vers le bon dashboard selon le rôle
    const dashboardRoutes = {
      admin: '/admin',
      agent: '/admin',
      client: '/espace-client'
    };
    
    if (profile?.role && dashboardRoutes[profile.role]) {
      return <Navigate to={dashboardRoutes[profile.role]} replace />;
    }
    
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}