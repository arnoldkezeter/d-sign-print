import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceApi } from "@/features/services/services/service.service";
import type { ServiceListParams } from "@/features/services/types/service.types";
import type { ServiceFormValues } from "@/features/services/schemas/service.schema";

const SERVICES_KEY = "services";

export function usePublicServices() {
  return useQuery({
    queryKey: [SERVICES_KEY, "public"],
    queryFn: serviceApi.getPublicList,
  });
}

export function useServiceBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: [SERVICES_KEY, "slug", slug],
    queryFn: () => serviceApi.getBySlug(slug!),
    enabled: !!slug,
  });
}

export function useAdminServices(params: ServiceListParams) {
  return useQuery({
    queryKey: [SERVICES_KEY, "admin", params],
    queryFn: () => serviceApi.getAdminList(params),
  });
}

export function useService(id: string | undefined) {
  return useQuery({
    queryKey: [SERVICES_KEY, id],
    queryFn: () => serviceApi.getById(id!),
    enabled: !!id,
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ServiceFormValues) => serviceApi.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [SERVICES_KEY] }),
  });
}

export function useUpdateService(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<ServiceFormValues>) => serviceApi.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [SERVICES_KEY] }),
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => serviceApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [SERVICES_KEY] }),
  });
}