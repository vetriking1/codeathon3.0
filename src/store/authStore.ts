import { create } from "zustand";

interface User {
  _id: string;
  email: string;
  username: string;
  phoneNumber:string;
  role: "buyer" | "supplier";
  sizeOfIndustry?: string;
  productsExpected?: string[];
  productsOffered?: string[];
  description?: string;
  location?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (formData: {
    email: string;
    password: string;
    username: string;
    phoneNumber:string;
    role: "buyer" | "supplier";
    sizeOfIndustry?: string;
    productsExpected?: string[];
    productsOffered?: string[];
    description?: string;
    location?: string;
  }) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }

      const data = await response.json();
      set({ user: data.user, isAuthenticated: true });
      localStorage.setItem("user", JSON.stringify(data.user));
      return data.user;
    } catch (error) {
      throw error;
    }
  },

  register: async (formData) => {
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Registration failed");
      }

      const data = await response.json();
      set({ user: data.user, isAuthenticated: true });
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem("user");
  },
}));
