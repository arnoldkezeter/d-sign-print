import type { QUOTE_STATUSES } from "@/constants/quote.constant";

export type QuoteStatus = (typeof QUOTE_STATUSES)[number];

export interface Quote {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  service: { _id: string; title: string } | null;
  serviceLabel: string;
  quantity: number;
  description: string;
  deadline: string;
  attachments: string[];
  status: QuoteStatus;
  adminNotes: string;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}
