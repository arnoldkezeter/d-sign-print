import { api } from "@/lib/axios";
import type { ContactMessage, PaginatedResponse } from "@/features/contact/types/contact.types";
import type { ContactFormValues } from "@/features/contact/schemas/contact.schema";

export const contactApi = {
  async send(payload: ContactFormValues): Promise<void> {
    await api.post("/contact", payload);
  },

  async getAdminList(params: { page: number; limit: number; isRead?: boolean }): Promise<PaginatedResponse<ContactMessage>> {
    const { data } = await api.get("/contact", { params });
    return data;
  },

  async markAsRead(id: string): Promise<ContactMessage> {
    const { data } = await api.patch(`/contact/${id}/read`);
    return data.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/contact/${id}`);
  },
};
