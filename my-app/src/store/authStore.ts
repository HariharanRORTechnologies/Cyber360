import { create } from 'zustand';
import type { User, UserRole } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
  hasAllRoles: (roles: UserRole[]) => boolean;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user: User) => {
    set({
      user,
      isAuthenticated: true,
    });
    // Store in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(user));
  },

  clearUser: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
    localStorage.removeItem('user');
  },

  hasRole: (role: UserRole) => {
    const state = get();
    return state.user?.roles.includes(role) ?? false;
  },

  hasAnyRole: (roles: UserRole[]) => {
    const state = get();
    if (!state.user) return false;
    return roles.some(role => state.user!.roles.includes(role));
  },

  hasAllRoles: (roles: UserRole[]) => {
    const state = get();
    if (!state.user) return false;
    return roles.every(role => state.user!.roles.includes(role));
  },

  isAdmin: () => {
    const state = get();
    return state.user?.roles.includes('Admin') ?? false;
  },
}));

// Initialize auth state from localStorage on app load
export const initializeAuth = () => {
  const stored = localStorage.getItem('user');
  if (stored) {
    try {
      const user = JSON.parse(stored) as User;
      useAuthStore.setState({ user, isAuthenticated: true });
    } catch (error) {
      console.error('Failed to restore auth state:', error);
      localStorage.removeItem('user');
    }
  }
};
