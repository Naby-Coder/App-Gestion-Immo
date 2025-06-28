import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';

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
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  updateProfile: (updates: any) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      console.log('Fetching profile for user:', userId);
      
      if (!supabase) {
        console.log('No supabase, skipping profile fetch');
        return null;
      }
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      if (data) {
        console.log('Profile found:', data);
        setProfile(data);
        return data;
      } else {
        console.log('No profile found for user:', userId);
        setProfile(null);
        return null;
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      setProfile(null);
      return null;
    }
  };

  const createProfile = async (user: User, userData: any): Promise<UserProfile | null> => {
    try {
      console.log('Creating profile for user:', user.id, userData);
      
      if (!supabase) {
        console.log('No supabase, skipping profile creation');
        return null;
      }
      
      const profileData = {
        id: user.id,
        first_name: userData.firstName || user.user_metadata?.first_name || 'Utilisateur',
        last_name: userData.lastName || user.user_metadata?.last_name || '',
        role: userData.role || user.user_metadata?.role || 'client',
        phone: userData.phone || null,
        avatar_url: null
      };

      const { data, error } = await supabase
        .from('profiles')
        .insert(profileData)
        .select()
        .single();

      if (error) {
        console.error('Error creating profile:', error);
        return null;
      }

      console.log('Profile created successfully:', data);
      setProfile(data);
      return data;
    } catch (error) {
      console.error('Error in createProfile:', error);
      return null;
    }
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log('Initializing auth...');
        
        // Vérifier si Supabase est configuré
        if (!supabase) {
          console.warn('Supabase not configured, using mock auth');
          if (mounted) {
            setLoading(false);
          }
          return;
        }

        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
        }

        if (mounted) {
          console.log('Session found:', !!session, session?.user?.email);
          
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            const profile = await fetchProfile(session.user.id);
            
            // If no profile exists, try to create one from user metadata
            if (!profile && session.user.user_metadata) {
              await createProfile(session.user, session.user.user_metadata);
            }
          }
          
          setLoading(false);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Délai court pour éviter le flash de chargement
    const timer = setTimeout(() => {
      initializeAuth();
    }, 100);

    // Seulement s'abonner aux changements si Supabase est configuré
    let subscription: any = null;
    
    if (supabase) {
      const {
        data: { subscription: authSubscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (!mounted) return;

        console.log('Auth state changed:', event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          let profile = await fetchProfile(session.user.id);
          
          // If no profile exists and this is a sign in, try to create one
          if (!profile && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
            profile = await createProfile(session.user, session.user.user_metadata || {});
          }
        } else {
          setProfile(null);
        }
        
        // Only set loading to false after we've handled the profile
        if (event !== 'TOKEN_REFRESHED') {
          setLoading(false);
        }
      });
      
      subscription = authSubscription;
    }

    return () => {
      mounted = false;
      clearTimeout(timer);
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      console.log('Signing up user:', email, userData);
      
      // Si Supabase n'est pas configuré, simuler l'inscription
      if (!supabase) {
        console.log('Mock signup - creating mock user');
        const mockUser = {
          id: Date.now().toString(),
          email,
          user_metadata: userData
        };
        
        const mockProfile = {
          id: mockUser.id,
          first_name: userData.firstName,
          last_name: userData.lastName,
          role: userData.role || 'client',
          phone: userData.phone || null,
          avatar_url: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        // Simuler un délai
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setUser(mockUser as any);
        setProfile(mockProfile);
        
        return { 
          user: mockUser, 
          session: { user: mockUser, access_token: 'mock-token' } 
        };
      }
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            role: userData.role || 'client',
            phone: userData.phone || null
          }
        }
      });

      if (error) {
        console.error('Signup error:', error);
        throw error;
      }

      console.log('Signup successful:', data);
      return data;
    } catch (error) {
      console.error('Error in signUp:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Signing in user:', email);
      
      // Si Supabase n'est pas configuré, simuler la connexion
      if (!supabase) {
        console.log('Mock signin');
        
        // Simuler différents utilisateurs selon l'email
        let role = 'client';
        if (email.includes('admin')) role = 'admin';
        if (email.includes('agent')) role = 'agent';
        
        const mockUser = {
          id: Date.now().toString(),
          email,
          user_metadata: { role }
        };
        
        const mockProfile = {
          id: mockUser.id,
          first_name: email.split('@')[0].split('.')[0] || 'Utilisateur',
          last_name: email.split('@')[0].split('.')[1] || 'Test',
          role: role as 'admin' | 'agent' | 'client',
          phone: null,
          avatar_url: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        // Simuler un délai
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mettre à jour l'état immédiatement
        setUser(mockUser as any);
        setProfile(mockProfile);
        
        return { 
          user: mockUser, 
          session: { user: mockUser, access_token: 'mock-token' } 
        };
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        throw error;
      }

      console.log('Sign in successful:', data);
      return data;
    } catch (error) {
      console.error('Error in signIn:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log('Signing out...');
      
      if (supabase) {
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error('Sign out error:', error);
          throw error;
        }
      }
      
      setProfile(null);
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Error in signOut:', error);
      throw error;
    }
  };

  const updateProfile = async (updates: any) => {
    if (!user) throw new Error('No user logged in');

    try {
      if (!supabase) {
        // Mock update
        const updatedProfile = { ...profile, ...updates };
        setProfile(updatedProfile);
        return updatedProfile;
      }

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      if (data) {
        setProfile(data);
      }
      
      return data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

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