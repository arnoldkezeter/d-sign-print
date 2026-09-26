import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "@/features/users/services/user.service";
import type { CreateUserFormValues } from "@/features/users/schemas/user.schema";

const KEY = ["users"];

export function useUsers() {
  return useQuery({ queryKey: KEY, queryFn: userApi.getAll });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateUserFormValues) => userApi.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  });
}

export function useSetUserActive() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) => userApi.setActive(id, isActive),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => userApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  });
}
