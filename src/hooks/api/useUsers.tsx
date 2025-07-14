import { ICreateUserData, IUser } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";

// Query keys
const QUERY_KEYS = {
  users: ["users"] as const,
  user: (id: string) => ["users", id] as const,
};

// Fetch all users
export const useUsers = () => {
  return useQuery({
    queryKey: QUERY_KEYS.users,
    queryFn: async (): Promise<IUser[]> => {
      const response = await api.get("/users");
      return response.data;
    },
  });
};

// Fetch single user
export const useUser = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.user(id),
    queryFn: async (): Promise<IUser> => {
      const response = await api.get(`/users/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

// Create user mutation
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: ICreateUserData): Promise<IUser> => {
      const response = await api.post("/users", userData);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users });
    },
  });
};

// Update user mutation
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...userData
    }: { id: string } & Partial<ICreateUserData>): Promise<IUser> => {
      const response = await api.put(`/users/${id}`, userData);
      return response.data;
    },
    onSuccess: (data) => {
      // Update specific user in cache
      queryClient.setQueryData(QUERY_KEYS.user(data.id), data);
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users });
    },
  });
};

// Delete user mutation
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await api.delete(`/users/${id}`);
    },
    onSuccess: () => {
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users });
    },
  });
};
