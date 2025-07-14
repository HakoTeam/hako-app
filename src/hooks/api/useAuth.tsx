import { api } from "@/services/api";
import { ILoginData, IRegisterData } from "@/types/auth";
import { IUser } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Auth API functions
const authApi = {
  login: async (data: ILoginData): Promise<{ user: IUser; token: string }> => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  register: async (
    data: IRegisterData
  ): Promise<{ user: IUser; token: string }> => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },
};

// Login mutation
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      // Cache user data
      queryClient.setQueryData(["user"], data.user);
    },
    onError: (error: any) => {
      console.error("Login error:", error);
    },
  });
};

// Register mutation
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      // Cache user data
      queryClient.setQueryData(["user"], data.user);
    },
    onError: (error: any) => {
      console.error("Register error:", error);
    },
  });
};

// Logout mutation
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
    },
  });
};
