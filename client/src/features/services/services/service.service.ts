import { api } from "@/lib/axios";
import type { Service, PaginatedResponse, ServiceListParams } from "@/features/services/types/service.types";
import type { ServiceFormValues } from "@/features/services/schemas/service.schema";

export const serviceApi = {
  async getPublicList(): Promise<Service[]> {
    const { data } = await api.get("/services");
    return data.data;
  },

  async getAdminList(params: ServiceListParams): Promise<PaginatedResponse<Service>> {
    const { data } = await api.get("/services/admin", { params });
    return data;
  },

  async getById(id: string): Promise<Service> {
    const { data } = await api.get(`/services/${id}`);
    return data.data;
  },

  async create(payload: ServiceFormValues): Promise<Service> {
    const { data } = await api.post("/services", payload);
    return data.data;
  },

  async update(id: string, payload: Partial<ServiceFormValues>): Promise<Service> {
    const { data } = await api.patch(`/services/${id}`, payload);
    return data.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/services/${id}`);
  },
};