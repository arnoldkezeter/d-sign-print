import type { PORTFOLIO_CATEGORIES } from "@/constants/portfolio.constant";

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

export interface PortfolioItem {
  _id: string;
  title: string;
  slug: string;
  category: PortfolioCategory;
  description: string;
  clientName: string;
  images: string[];
  isFeatured: boolean;
  isActive: boolean;
  order: number;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}
