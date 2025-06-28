import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Building } from 'lucide-react';
import { useAuth } from '../../components/auth/AuthProvider';

const LoginPage = () => {
  const { signIn, loading: authLoading, user, profile } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Redirection automatique si l'utilisateur est déjà connecté
  useEffect(() => {
    if (!authLoading && user && profile) {
      console.log('User already logged in, redirecting...', profile.role);
      
      const dashboardRoutes = {
        admin: '/admin',
        agent: '/admin',
        client: '/espace-client'
      };
      
      const targetRoute = dashboardRoutes[profile.role] || '/';
      navigate(targetRoute, { replace: true });
    }
  }, [user, profile, authLoading, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log('Attempting to sign in with:', email);
      
      const result = await signIn(email, password);
      console.log('Sign in result:', result);
      
      if (result.session && result.user) {
        setError('');
        console.log('Login successful, waiting for profile...');
        
        // Attendre un peu pour que le profil soit chargé
        setTimeout(() => {
          // La redirection sera gérée par useEffect
          window.location.reload(); // Force reload pour s'assurer que tout est à jour
        }, 1000);
      }
      
    } catch (err: any) {
      console.error('Login error:', err);
      
      let errorMessage = 'Une erreur est survenue lors de la connexion.';
      
      if (err.message?.includes('Invalid login credentials') || 
          err.message?.includes('invalid_credentials') ||
          err.message?.includes('Invalid email or password')) {
        errorMessage = 'Email ou mot de passe incorrect. Veuillez vérifier vos identifiants.';
      } else if (err.message?.includes('Email not confirmed')) {
        errorMessage = 'Veuillez confirmer votre email avant de vous connecter. Vérifiez votre boîte de réception.';
      } else if (err.message?.includes('Too many requests')) {
        errorMessage = 'Trop de tentatives de connexion. Veuillez patienter quelques minutes.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      setIsSubmitting(false);
    }
  };

  // Show loading spinner if auth is still initializing
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center space-x-2">
            <Building className="h-10 w-10 text-primary-600" />
            <span className="text-2xl font-title font-bold text-primary-800">ImmoExpert</span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Connexion à votre compte
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ou{' '}
          <Link to="/inscription" className="font-medium text-primary-600 hover:text-primary-500">
            créer un nouveau compte
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {isSubmitting && (
            <div className="mb-4 bg-blue-50 border-l-4 border-blue-400 p-4">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>
                <p className="text-sm text-blue-700">Connexion en cours... Redirection vers votre espace.</p>
              </div>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  placeholder="exemple@email.com"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pr-10"
                  placeholder="Votre mot de passe"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  disabled={isSubmitting}
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                  Se souvenir de moi
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                  Mot de passe oublié ?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Connexion en cours...
                  </div>
                ) : (
                  'Se connecter'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Comptes de test</span>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-600">
              <p className="mb-2 font-medium">Pour tester l'application :</p>
              <div className="space-y-2 text-xs bg-gray-50 p-3 rounded-md">
                <div>
                  <p className="font-medium text-gray-700">1. Créez un compte via "Inscription"</p>
                  <p className="text-gray-600">• Choisissez le type : Client, Agent ou Admin</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">2. Après connexion, redirection automatique :</p>
                  <p className="text-gray-600">• <span className="font-medium">Client</span> → Espace Client</p>
                  <p className="text-gray-600">• <span className="font-medium">Agent/Admin</span> → Interface d'administration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;