import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { blogApi } from "@/features/blog/services/blog.service";
import type { BlogPostFormValues } from "@/features/blog/schemas/blog.schema";

const KEY = "blog";

export function usePublicBlogPosts(params: { page: number; limit: number }) {
  return useQuery({ queryKey: [KEY, "public", params], queryFn: () => blogApi.getPublicList(params) });
}

export function useBlogPostBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: [KEY, "slug", slug],
    queryFn: () => blogApi.getBySlug(slug!),
    enabled: !!slug,
  });
}

export function useAdminBlogPosts(params: { page: number; limit: number; search?: string }) {
  return useQuery({ queryKey: [KEY, "admin", params], queryFn: () => blogApi.getAdminList(params) });
}

export function useBlogPost(id: string | undefined) {
  return useQuery({
    queryKey: [KEY, id],
    queryFn: () => blogApi.getById(id!),
    enabled: !!id,
  });
}

export function useCreateBlogPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: BlogPostFormValues) => blogApi.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useUpdateBlogPost(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<BlogPostFormValues>) => blogApi.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useDeleteBlogPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => blogApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [KEY] }),
  });
}
