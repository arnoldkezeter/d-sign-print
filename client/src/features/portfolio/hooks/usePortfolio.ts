import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { portfolioApi } from "@/features/portfolio/services/portfolio.service";
import type { PortfolioFormValues } from "@/features/portfolio/schemas/portfolio.schema";

const KEY = "portfolio";

export function usePublicPortfolio(category?: string) {
  return useQuery({ queryKey: [KEY, "public", category], queryFn: () => portfolioApi.getPublicList(category) });
}

export function useFeaturedPortfolio() {
  return useQuery({ queryKey: [KEY, "featured"], queryFn: portfolioApi.getFeatured });
}

export function usePortfolioBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: [KEY, "slug", slug],
    queryFn: () => portfolioApi.getBySlug(slug!),
    enabled: !!slug,
  });
}

export function useAdminPortfolio(params: { page: number; limit: number; search?: string }) {
  return useQuery({ queryKey: [KEY, "admin", params], queryFn: () => portfolioApi.getAdminList(params) });
}

export function usePortfolioItem(id: string | undefined) {
  return useQuery({
    queryKey: [KEY, id],
    queryFn: () => portfolioApi.getById(id!),
    enabled: !!id,
  });
}

export function useCreatePortfolio() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: PortfolioFormValues) => portfolioApi.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useUpdatePortfolio(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<PortfolioFormValues>) => portfolioApi.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useDeletePortfolio() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => portfolioApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [KEY] }),
  });
}
