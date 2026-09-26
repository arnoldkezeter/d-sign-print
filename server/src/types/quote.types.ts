import type { QuoteStatus } from "@/models/Quote.model.js";

export interface CreateQuoteDTO {
  fullName: string;
  email: string;
  phone: string;
  service?: string | null;
  serviceLabel: string;
  quantity?: number;
  description: string;
  deadline?: string;
  attachments?: string[];
}

export interface UpdateQuoteDTO {
  status?: QuoteStatus;
  adminNotes?: string;
}
