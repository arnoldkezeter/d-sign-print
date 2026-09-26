import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { quoteApi } from "@/features/quotes/services/quote.service";
import type { QuoteRequestFormValues } from "@/features/quotes/schemas/quote.schema";
import type { QuoteStatus } from "@/features/quotes/types/quote.types";

const KEY = "quotes";

export function useCreateQuote() {
  return useMutation({ mutationFn: (payload: QuoteRequestFormValues) => quoteApi.create(payload) });
}

export function useAdminQuotes(params: { page: number; limit: number; status?: string }) {
  return useQuery({ queryKey: [KEY, "admin", params], queryFn: () => quoteApi.getAdminList(params) });
}

export function useQuote(id: string | undefined) {
  return useQuery({
    queryKey: [KEY, id],
    queryFn: () => quoteApi.getById(id!),
    enabled: !!id,
  });
}

export function useUpdateQuote(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { status?: QuoteStatus; adminNotes?: string }) => quoteApi.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useDeleteQuote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => quoteApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [KEY] }),
  });
}
