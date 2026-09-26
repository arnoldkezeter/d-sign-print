import { api } from "@/lib/axios";
import type { PortfolioItem, PaginatedResponse } from "@/features/portfolio/types/portfolio.types";
import type { PortfolioFormValues } from "@/features/portfolio/schemas/portfolio.schema";

export const portfolioApi = {
  async getPublicList(category?: string): Promise<PortfolioItem[]> {
    const { data } = await api.get("/portfolio", { params: category ? { category } : {} });
    return data.data;
  },

  async getFeatured(): Promise<PortfolioItem[]> {
    const { data } = await api.get("/portfolio/featured");
    return data.data;
  },

  async getBySlug(slug: string): Promise<PortfolioItem> {
    const { data } = await api.get(`/portfolio/slug/${slug}`);
    return data.data;
  },

  async getAdminList(params: { page: number; limit: number; search?: string }): Promise<PaginatedResponse<PortfolioItem>> {
    const { data } = await api.get("/portfolio/admin", { params });
    return data;
  },

  async getById(id: string): Promise<PortfolioItem> {
    const { data } = await api.get(`/portfolio/${id}`);
    return data.data;
  },

  async create(payload: PortfolioFormValues): Promise<PortfolioItem> {
    const { data } = await api.post("/portfolio", payload);
    return data.data;
  },

  async update(id: string, payload: Partial<PortfolioFormValues>): Promise<PortfolioItem> {
    const { data } = await api.patch(`/portfolio/${id}`, payload);
    return data.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/portfolio/${id}`);
  },
};
