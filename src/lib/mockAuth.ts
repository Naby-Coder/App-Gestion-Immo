// Service d'authentification fictif
import { mockStorage, mockUsers } from './mockData';

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'agent' | 'client';
  avatar?: string;
}

class MockAuthService {
  private currentUser: AuthUser | null = null;
  private listeners: ((user: AuthUser | null) => void)[] = [];

  constructor() {
    // Vérifier s'il y a un utilisateur connecté dans le localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  async signIn(email: string, password: string): Promise<{ user: AuthUser | null; error: string | null }> {
    // Simuler un délai de réseau
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return { user: null, error: 'Email ou mot de passe incorrect' };
    }

    const authUser: AuthUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    };

    this.currentUser = authUser;
    localStorage.setItem('currentUser', JSON.stringify(authUser));
    mockStorage.set('currentUser', authUser);
    
    // Notifier les listeners
    this.listeners.forEach(listener => listener(authUser));

    return { user: authUser, error: null };
  }

  async signUp(email: string, password: string, userData: any): Promise<{ user: AuthUser | null; error: string | null }> {
    // Simuler un délai de réseau
    await new Promise(resolve => setTimeout(resolve, 500));

    // Vérifier si l'email existe déjà
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return { user: null, error: 'Un compte avec cette adresse email existe déjà' };
    }

    const newUser = {
      id: Date.now().toString(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email,
      role: userData.role || 'client',
      password,
      avatar: userData.avatar,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Ajouter à la liste des utilisateurs
    mockUsers.push(newUser);
    mockStorage.set('users', mockUsers);

    const authUser: AuthUser = {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      role: newUser.role,
      avatar: newUser.avatar
    };

    this.currentUser = authUser;
    localStorage.setItem('currentUser', JSON.stringify(authUser));
    mockStorage.set('currentUser', authUser);
    
    // Notifier les listeners
    this.listeners.forEach(listener => listener(authUser));

    return { user: authUser, error: null };
  }

  async signOut(): Promise<void> {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    mockStorage.set('currentUser', null);
    
    // Notifier les listeners
    this.listeners.forEach(listener => listener(null));
    
    // Rediriger vers la page de connexion
    window.location.href = '/login';
  }

  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    this.listeners.push(callback);
    
    // Appeler immédiatement avec l'état actuel
    callback(this.currentUser);

    // Retourner une fonction de nettoyage
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  async updateProfile(updates: Partial<AuthUser>): Promise<{ user: AuthUser | null; error: string | null }> {
    if (!this.currentUser) {
      return { user: null, error: 'Aucun utilisateur connecté' };
    }

    // Simuler un délai de réseau
    await new Promise(resolve => setTimeout(resolve, 300));

    const updatedUser = { ...this.currentUser, ...updates };
    this.currentUser = updatedUser;
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    mockStorage.set('currentUser', updatedUser);

    // Mettre à jour dans la liste des utilisateurs
    const userIndex = mockUsers.findIndex(u => u.id === this.currentUser!.id);
    if (userIndex !== -1) {
      mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates };
      mockStorage.set('users', mockUsers);
    }

    // Notifier les listeners
    this.listeners.forEach(listener => listener(updatedUser));

    return { user: updatedUser, error: null };
  }
}

export const mockAuth = new MockAuthService();
