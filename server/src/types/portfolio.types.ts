import type { PortfolioCategory } from "@/models/Portfolio.model.js";

export interface CreatePortfolioDTO {
  title: string;
  category: PortfolioCategory;
  description: string;
  clientName?: string;
  images: string[];
  isFeatured?: boolean;
  isActive?: boolean;
}

export type UpdatePortfolioDTO = Partial<CreatePortfolioDTO> & { order?: number };
