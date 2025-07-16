import { createContext, useContext, useEffect, useState } from 'react';
import { mockAuth, AuthUser } from '../../lib/mockAuth';

interface AuthContextType {
  user: AuthUser | null;
  profile: AuthUser | null;
  session: any;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  updateProfile: (updates: any) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Écouter les changements d'authentification
    const unsubscribe = mockAuth.onAuthStateChange((authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string, userData: any) => {
    setLoading(true);
    try {
      const result = await mockAuth.signUp(email, password, userData);
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await mockAuth.signIn(email, password);
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await mockAuth.signOut();
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: any) => {
    const result = await mockAuth.updateProfile(updates);
    if (result.error) {
      throw new Error(result.error);
    }
    return result;
  };

  const value = {
    user,
    profile: user, // Dans le mock, user et profile sont identiques
    session: user ? { user } : null,
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
