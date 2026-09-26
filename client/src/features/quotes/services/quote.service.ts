import { api } from "@/lib/axios";
import type { Quote, PaginatedResponse, QuoteStatus } from "@/features/quotes/types/quote.types";
import type { QuoteRequestFormValues } from "@/features/quotes/schemas/quote.schema";

export const quoteApi = {
  async create(payload: QuoteRequestFormValues): Promise<Quote> {
    const { data } = await api.post("/quotes", payload);
    return data.data;
  },

  async getAdminList(params: { page: number; limit: number; status?: string }): Promise<PaginatedResponse<Quote>> {
    const { data } = await api.get("/quotes", { params });
    return data;
  },

  async getById(id: string): Promise<Quote> {
    const { data } = await api.get(`/quotes/${id}`);
    return data.data;
  },

  async update(id: string, payload: { status?: QuoteStatus; adminNotes?: string }): Promise<Quote> {
    const { data } = await api.patch(`/quotes/${id}`, payload);
    return data.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/quotes/${id}`);
  },
};
