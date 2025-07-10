import { IUser } from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
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
            user: { phoneNumber, id: Date.now().toString() },
          };

          set({
            user: response.user,
            phoneNumber: phoneNumber,
            isLoading: false,
          });
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
        }
      },

      logout: async () => {
        try {
          set({ user: null, phoneNumber: "" });
        } catch (error: any) {
          set({ error: error.message });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        phoneNumber: state.phoneNumber,
        user: state.user,
      }),
    }
  )
);

export const useAuthSession = () => {
  const store = useAuthStore();
  return {
    phoneNumber: store.phoneNumber,
    user: store.user,
    isAuthenticated: !!store.user,
    isLoading: store.isLoading,
    error: store.error,
    setUser: store.setUser,
    setPhoneNumber: store.setPhoneNumber,
    logout: store.logout,
    register: store.register,
    clearError: store.clearError,
  };
};
