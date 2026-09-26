import { api } from "@/lib/axios";
import type { BlogPost, PaginatedResponse } from "@/features/blog/types/blog.types";
import type { BlogPostFormValues } from "@/features/blog/schemas/blog.schema";

export const blogApi = {
  async getPublicList(params: { page: number; limit: number }): Promise<PaginatedResponse<BlogPost>> {
    const { data } = await api.get("/blog", { params });
    return data;
  },

  async getBySlug(slug: string): Promise<BlogPost> {
    const { data } = await api.get(`/blog/slug/${slug}`);
    return data.data;
  },

  async getAdminList(params: { page: number; limit: number; search?: string }): Promise<PaginatedResponse<BlogPost>> {
    const { data } = await api.get("/blog/admin", { params });
    return data;
  },

  async getById(id: string): Promise<BlogPost> {
    const { data } = await api.get(`/blog/${id}`);
    return data.data;
  },

  async create(payload: BlogPostFormValues): Promise<BlogPost> {
    const { data } = await api.post("/blog", payload);
    return data.data;
  },

  async update(id: string, payload: Partial<BlogPostFormValues>): Promise<BlogPost> {
    const { data } = await api.patch(`/blog/${id}`, payload);
    return data.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/blog/${id}`);
  },
};
