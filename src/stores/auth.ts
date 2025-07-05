import { IUser } from "@/types/user";
import { create } from "zustand";

interface AuthState {
  phoneNumber: string;
  user: IUser | null;
  isLoading: boolean;
  error: string | null;
  setPhoneNumber: (phoneNumber: string) => void;
  setUser: (user: IUser | null) => void;
  login: (phoneNumber: string, password?: string) => Promise<void>;
  register: (phoneNumber: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  phoneNumber: "",
  user: null,
  isLoading: false,
  error: null,

  setPhoneNumber(phoneNumber: string) {
    set({ phoneNumber });
  },

  setUser(user: IUser | null) {
    set({ user: user });
  },

  login: async (phoneNumber: string, password?: string) => {
    try {
      set({ isLoading: true, error: null });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  register: async (phoneNumber: string, password?: string) => {
    try {
      set({ isLoading: true, error: null });

      // fake API response
      const response = {
        user: { phoneNumber, id: "" },
      };

      set({
        user: response.user,
        isLoading: false,
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  logout: async () => {
    try {
      set({ user: null });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  clearError: () => set({ error: null }),
}));
