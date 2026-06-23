import { create } from 'zustand';
import { User, UserRole } from '@/lib/types';
import { users } from '@/lib/data/users';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  loadSession: () => void;
}

const AUTH_STORAGE_KEY = 'afriyie_auth';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (email: string, _password: string) => {
    /* Prototype mock: any password matches as long as email exists in dummy data.
       For demo credentials, password is always "demo1234" */
    const foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(foundUser));
      set({ user: foundUser, isAuthenticated: true });
      return true;
    }
    return false;
  },

  signup: (name: string, email: string, _password: string, role: UserRole) => {
    const existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) return false;

    const newUser: User = {
      id: `usr_${String(users.length + 1).padStart(3, '0')}`,
      email,
      name,
      role,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    set({ user: newUser, isAuthenticated: true });
    return true;
  },

  logout: () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    set({ user: null, isAuthenticated: false });
  },

  loadSession: () => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        const user = JSON.parse(stored) as User;
        set({ user, isAuthenticated: true });
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
  },
}));
