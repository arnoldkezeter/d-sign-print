import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { testimonialApi } from "@/features/testimonials/services/testimonial.service";
import type { TestimonialFormValues } from "@/features/testimonials/schemas/testimonial.schema";

const KEY = "testimonials";

export function usePublicTestimonials() {
  return useQuery({ queryKey: [KEY, "public"], queryFn: testimonialApi.getPublicList });
}

export function useAdminTestimonials(params: { page: number; limit: number }) {
  return useQuery({ queryKey: [KEY, "admin", params], queryFn: () => testimonialApi.getAdminList(params) });
}

export function useTestimonial(id: string | undefined) {
  return useQuery({
    queryKey: [KEY, id],
    queryFn: () => testimonialApi.getById(id!),
    enabled: !!id,
  });
}

export function useCreateTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TestimonialFormValues) => testimonialApi.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useUpdateTestimonial(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<TestimonialFormValues>) => testimonialApi.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useDeleteTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => testimonialApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [KEY] }),
  });
}
