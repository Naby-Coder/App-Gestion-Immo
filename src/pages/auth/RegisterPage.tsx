import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Building } from 'lucide-react';
import { useAuth } from '../../components/auth/AuthProvider';

const RegisterPage = () => {
  const { signUp, signOut, loading: authLoading, user, profile } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'client'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Déconnecter automatiquement l'utilisateur au chargement de la page d'inscription
  useEffect(() => {
    const handleSignOut = async () => {
      if (user) {
        console.log('User detected on register page, signing out...');
        try {
          await signOut();
        } catch (error) {
          console.error('Error signing out:', error);
        }
      }
    };

    if (!authLoading) {
      handleSignOut();
    }
  }, [user, authLoading, signOut]);

  // Redirection automatique si l'utilisateur est connecté APRÈS une inscription réussie
  useEffect(() => {
    if (!authLoading && user && profile && !isSubmitting) {
      console.log('User registered successfully, redirecting...', profile.role);
      
      const dashboardRoutes = {
        admin: '/admin',
        agent: '/admin',
        client: '/espace-client'
      };
      
      const targetRoute = dashboardRoutes[profile.role] || '/espace-client';
      navigate(targetRoute, { replace: true });
    }
  }, [user, profile, authLoading, navigate, isSubmitting]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('Le prénom et le nom sont obligatoires');
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Attempting to sign up:', formData.email, formData.role);
      
      const result = await signUp(formData.email, formData.password, {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim() || null,
        role: formData.role
      });

      console.log('Sign up result:', result);

      if (result.user && !result.session) {
        // User needs to confirm email
        setSuccess('Un email de confirmation a été envoyé à votre adresse. Veuillez vérifier votre boîte de réception et cliquer sur le lien de confirmation avant de vous connecter.');
        setIsSubmitting(false);
        return;
      }

      if (result.session || result.user) {
        // User is immediately signed in or account created
        setSuccess('Compte créé avec succès ! Redirection vers votre espace...');
        // La redirection sera gérée par useEffect
      }
      
    } catch (err: any) {
      console.error('Registration error:', err);
      
      let errorMessage = 'Une erreur est survenue lors de l\'inscription';
      
      if (err.message?.includes('user_already_exists') || 
          err.message?.includes('User already registered')) {
        errorMessage = 'Un compte avec cette adresse email existe déjà. Veuillez vous connecter ou utiliser une autre adresse email.';
      } else if (err.message?.includes('Invalid email')) {
        errorMessage = 'Adresse email invalide. Veuillez vérifier le format de votre email.';
      } else if (err.message?.includes('Password should be at least')) {
        errorMessage = 'Le mot de passe doit contenir au moins 6 caractères.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      setIsSubmitting(false);
    }
  };

  // Afficher le spinner SEULEMENT si on est en train de soumettre ET qu'il n'y a pas d'erreur
  if (isSubmitting && !error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Création du compte en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center items-center mb-6">
          <Building className="h-10 w-10 text-primary-600" />
          <span className="text-2xl font-title font-bold text-primary-800 ml-2">ImmoExpert</span>
        </Link>
        
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Créer un compte
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ou{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
            connectez-vous à votre compte existant
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

          {success && (
            <div className="mb-4 bg-green-50 border-l-4 border-green-400 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Type de compte
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                disabled={isSubmitting}
              >
                <option value="client">Client - Recherche de biens</option>
                <option value="agent">Agent immobilier - Gestion des biens</option>
                <option value="admin">Administrateur - Gestion complète</option>
              </select>
              <p className="mt-1 text-xs text-gray-500">
                {formData.role === 'client' && 'Accès à l\'espace client pour rechercher et suivre vos biens favoris'}
                {formData.role === 'agent' && 'Accès à l\'interface d\'administration pour gérer les biens et clients'}
                {formData.role === 'admin' && 'Accès complet à toutes les fonctionnalités d\'administration'}
              </p>
            </div>

            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                Prénom
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Amadou"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Diallo"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="vous@exemple.com"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Téléphone (optionnel)
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="+221 77 123 45 67"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="••••••••"
                  disabled={isSubmitting}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">Minimum 6 caractères</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmer le mot de passe
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="••••••••"
                  disabled={isSubmitting}
                />
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
                    Inscription en cours...
                  </div>
                ) : (
                  'S\'inscrire'
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
                <span className="px-2 bg-white text-gray-500">Mode Démo</span>
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-600 bg-gray-50 p-3 rounded-md">
              <p className="font-medium text-gray-700 mb-1">🎯 Mode Démo Activé</p>
              <p>Créez un compte avec n'importe quelles informations pour tester l'application. Votre choix de rôle déterminera l'interface à laquelle vous aurez accès.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;