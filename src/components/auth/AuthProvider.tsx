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

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId);

      if (error) {
        console.error('Error fetching profile:', error);
        setProfile(null);
        return null;
      } else if (data && data.length > 0) {
        setProfile(data[0]);
        return data[0];
      } else {
        // No profile found - this is okay for new users
        setProfile(null);
        return null;
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfile(null);
      return null;
    }
  };

  useEffect(() => {
    let mounted = true;

    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
        }

        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            await fetchProfile(session.user.id);
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

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      console.log('Auth state changed:', event, session?.user?.email);
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const profile = await fetchProfile(session.user.id);
        
        // Redirect based on role after successful login
        if (event === 'SIGNED_IN' && profile) {
          const currentPath = window.location.pathname;
          
          // Only redirect if we're on login/register pages
          if (currentPath === '/login' || currentPath === '/inscription') {
            if (profile.role === 'admin' || profile.role === 'agent') {
              window.location.href = '/admin';
            } else {
              window.location.href = '/espace-client';
            }
          }
        }
      } else {
        setProfile(null);
      }
      
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, userData: any) => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            role: userData.role || 'client'
          }
        }
      });

      if (error) throw error;

      // Create profile after successful signup
      if (data.user) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            first_name: userData.firstName,
            last_name: userData.lastName,
            role: userData.role || 'client',
            phone: userData.phone || null
          })
          .select()
          .single();

        if (profileError) {
          console.error('Error creating profile:', profileError);
        } else if (profileData) {
          setProfile(profileData);
        }

        // If user is an agent, create agent record
        if (userData.role === 'agent') {
          const { error: agentError } = await supabase
            .from('agents')
            .insert({
              user_id: data.user.id,
              bio: userData.bio || 'Agent immobilier professionnel',
              position: userData.position || 'Agent immobilier',
              specialties: userData.specialties || []
            });

          if (agentError) {
            console.error('Error creating agent record:', agentError);
          }
        }

        // If user is a client, create client record
        if (userData.role === 'client') {
          const { error: clientError } = await supabase
            .from('clients')
            .insert({
              user_id: data.user.id,
              property_types: userData.propertyTypes || [],
              budget_min: userData.budgetMin || 0,
              budget_max: userData.budgetMax || 0,
              preferred_locations: userData.preferredLocations || []
            });

          if (clientError) {
            console.error('Error creating client record:', clientError);
          }
        }
      }

      return data;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setProfile(null);
  };

  const updateProfile = async (updates: any) => {
    if (!user) throw new Error('No user logged in');

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