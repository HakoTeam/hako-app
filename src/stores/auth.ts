import { strings } from "@/constants/strings";
import { useLogin, useLogout, useRegister } from "@/hooks/api/useAuth";
import { IUser } from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  phoneNumber: string;
  user: IUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;

  setPhoneNumber: (phoneNumber: string) => void;
  setUser: (user: IUser | null) => void;
  setToken: (token: string | null) => void;
  clearError: () => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      phoneNumber: "",
      user: null,
      token: null,
      isLoading: false,
      error: null,

      setPhoneNumber(phoneNumber: string) {
        set({ phoneNumber });
      },

      setUser(user: IUser | null) {
        set({ user });
      },

      setToken(token: string | null) {
        set({ token });
      },

      clearError: () => set({ error: null }),

      reset: () =>
        set({
          phoneNumber: "",
          user: null,
          token: null,
          error: null,
        }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        phoneNumber: state.phoneNumber,
        user: state.user,
        token: state.token,
      }),
    }
  )
);

export const useAuthSession = () => {
  const store = useAuthStore();
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  const login = async (phoneNumber: string, password: string) => {
    try {
      store.clearError();
      const result = await loginMutation.mutateAsync({
        phone: phoneNumber,
        password,
      });
      store.setUser(result.user);
      store.setToken(result.token);
      store.setPhoneNumber(phoneNumber);
      return result;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || strings.loginFailed);
    }
  };

  const register = async (phoneNumber: string, password: string) => {
    try {
      store.clearError();
      const result = await registerMutation.mutateAsync({
        phone: phoneNumber,
        password,
      });
      store.setUser(result.user);
      store.setToken(result.token);
      store.setPhoneNumber(phoneNumber);
      return result;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || strings.registerFailed);
    }
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
      store.reset();
    } catch (error: any) {
      // Even if logout fails on server, clear local data
      store.reset();
    }
  };

  return {
    phoneNumber: store.phoneNumber,
    user: store.user,
    token: store.token,
    isAuthenticated: !!store.user && !!store.token,
    isLoading:
      loginMutation.isPending ||
      registerMutation.isPending ||
      logoutMutation.isPending,
    error: store.error,
    setUser: store.setUser,
    setPhoneNumber: store.setPhoneNumber,
    logout,
    login,
    register,
    clearError: store.clearError,
  };
};
