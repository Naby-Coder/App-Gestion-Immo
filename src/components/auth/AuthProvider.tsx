import { createContext, useContext, useEffect, useState } from 'react';

export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  avatar_url: string | null;
  role: 'admin' | 'agent' | 'client';
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: any | null;
  profile: UserProfile | null;
  session: any | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  updateProfile: (updates: any) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      console.log('🎯 Mode Démo - Inscription simulée:', email, userData.role);
      
      // Simuler un délai d'inscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: Date.now().toString(),
        email,
        user_metadata: userData
      };
      
      const mockProfile: UserProfile = {
        id: mockUser.id,
        first_name: userData.firstName,
        last_name: userData.lastName,
        role: userData.role || 'client',
        phone: userData.phone || null,
        avatar_url: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      const mockSession = { 
        user: mockUser, 
        access_token: 'demo-token-' + Date.now() 
      };
      
      setUser(mockUser);
      setProfile(mockProfile);
      setSession(mockSession);
      
      // Sauvegarder en localStorage pour persistance
      localStorage.setItem('demo-user', JSON.stringify(mockUser));
      localStorage.setItem('demo-profile', JSON.stringify(mockProfile));
      localStorage.setItem('demo-session', JSON.stringify(mockSession));
      
      return { 
        user: mockUser, 
        session: mockSession 
      };
    } catch (error) {
      console.error('Erreur inscription démo:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🎯 Mode Démo - Connexion simulée:', email);
      
      // Validation basique
      if (!email || !password) {
        throw new Error('Email et mot de passe requis');
      }
      
      // Simuler un délai de connexion
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Déterminer le rôle selon l'email
      let role = 'client';
      if (email.toLowerCase().includes('admin')) role = 'admin';
      if (email.toLowerCase().includes('agent')) role = 'agent';
      
      const mockUser = {
        id: Date.now().toString(),
        email,
        user_metadata: { role }
      };
      
      const mockProfile: UserProfile = {
        id: mockUser.id,
        first_name: email.split('@')[0].split('.')[0] || 'Utilisateur',
        last_name: email.split('@')[0].split('.')[1] || 'Démo',
        role: role as 'admin' | 'agent' | 'client',
        phone: '+221 77 123 45 67',
        avatar_url: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      const mockSession = { 
        user: mockUser, 
        access_token: 'demo-token-' + Date.now() 
      };
      
      setUser(mockUser);
      setProfile(mockProfile);
      setSession(mockSession);
      
      // Sauvegarder en localStorage pour persistance
      localStorage.setItem('demo-user', JSON.stringify(mockUser));
      localStorage.setItem('demo-profile', JSON.stringify(mockProfile));
      localStorage.setItem('demo-session', JSON.stringify(mockSession));
      
      return { 
        user: mockUser, 
        session: mockSession 
      };
    } catch (error) {
      console.error('Erreur connexion démo:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log('🎯 Mode Démo - Déconnexion');
      
      setProfile(null);
      setUser(null);
      setSession(null);
      
      // Nettoyer le localStorage
      localStorage.removeItem('demo-user');
      localStorage.removeItem('demo-profile');
      localStorage.removeItem('demo-session');
      
    } catch (error) {
      console.error('Erreur déconnexion démo:', error);
      throw error;
    }
  };

  const updateProfile = async (updates: any) => {
    if (!user) throw new Error('Aucun utilisateur connecté');

    try {
      const updatedProfile = { ...profile, ...updates };
      setProfile(updatedProfile);
      
      // Mettre à jour le localStorage
      localStorage.setItem('demo-profile', JSON.stringify(updatedProfile));
      
      return updatedProfile;
    } catch (error) {
      console.error('Erreur mise à jour profil démo:', error);
      throw error;
    }
  };

  // Initialisation au chargement
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const savedUser = localStorage.getItem('demo-user');
        const savedProfile = localStorage.getItem('demo-profile');
        const savedSession = localStorage.getItem('demo-session');
        
        if (savedUser && savedProfile && savedSession) {
          setUser(JSON.parse(savedUser));
          setProfile(JSON.parse(savedProfile));
          setSession(JSON.parse(savedSession));
          console.log('🎯 Session démo restaurée depuis localStorage');
        }
      } catch (error) {
        console.error('Erreur restauration session démo:', error);
        // Nettoyer en cas d'erreur
        localStorage.removeItem('demo-user');
        localStorage.removeItem('demo-profile');
        localStorage.removeItem('demo-session');
      } finally {
        setLoading(false);
      }
    };

    // Délai court pour éviter le flash
    const timer = setTimeout(initializeAuth, 100);
    return () => clearTimeout(timer);
  }, []);

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}