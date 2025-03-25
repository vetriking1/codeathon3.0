import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  role: 'buyer' | 'supplier';
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: 'buyer' | 'supplier', name: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    try {
      // TODO: Implement actual API call
      const mockUser = { id: '1', email, role: 'buyer' as const, name: 'John Doe' };
      set({ user: mockUser, isAuthenticated: true });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  register: async (email: string, password: string, role: 'buyer' | 'supplier', name: string) => {
    try {
      // TODO: Implement actual API call
      const mockUser = { id: '1', email, role, name };
      set({ user: mockUser, isAuthenticated: true });
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));