import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contactApi } from "@/features/contact/services/contact.service";
import type { ContactFormValues } from "@/features/contact/schemas/contact.schema";

const KEY = "contact-messages";

export function useSendContactMessage() {
  return useMutation({ mutationFn: (payload: ContactFormValues) => contactApi.send(payload) });
}

export function useAdminContactMessages(params: { page: number; limit: number; isRead?: boolean }) {
  return useQuery({ queryKey: [KEY, "admin", params], queryFn: () => contactApi.getAdminList(params) });
}

export function useMarkContactMessageAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => contactApi.markAsRead(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useDeleteContactMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => contactApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [KEY] }),
  });
}
