import { api } from "@/lib/axios";
import type { Testimonial, PaginatedResponse } from "@/features/testimonials/types/testimonial.types";
import type { TestimonialFormValues } from "@/features/testimonials/schemas/testimonial.schema";

export const testimonialApi = {
  async getPublicList(): Promise<Testimonial[]> {
    const { data } = await api.get("/testimonials");
    return data.data;
  },

  async getAdminList(params: { page: number; limit: number }): Promise<PaginatedResponse<Testimonial>> {
    const { data } = await api.get("/testimonials/admin", { params });
    return data;
  },

  async getById(id: string): Promise<Testimonial> {
    const { data } = await api.get(`/testimonials/${id}`);
    return data.data;
  },

  async create(payload: TestimonialFormValues): Promise<Testimonial> {
    const { data } = await api.post("/testimonials", payload);
    return data.data;
  },

  async update(id: string, payload: Partial<TestimonialFormValues>): Promise<Testimonial> {
    const { data } = await api.patch(`/testimonials/${id}`, payload);
    return data.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/testimonials/${id}`);
  },
};
