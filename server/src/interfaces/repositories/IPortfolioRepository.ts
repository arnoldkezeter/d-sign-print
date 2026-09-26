import type { PortfolioDocument } from "@/models/Portfolio.model.js";
import type { CreatePortfolioDTO, UpdatePortfolioDTO } from "@/types/portfolio.types.js";

export interface IPortfolioRepository {
  findAllActive(params: { category?: string }): Promise<PortfolioDocument[]>;
  findFeatured(limit: number): Promise<PortfolioDocument[]>;
  findAllPaginated(params: { skip: number; limit: number; search?: string }): Promise<{ data: PortfolioDocument[]; total: number }>;
  findById(id: string): Promise<PortfolioDocument | null>;
  findBySlug(slug: string): Promise<PortfolioDocument | null>;
  countAll(): Promise<number>;
  create(data: CreatePortfolioDTO & { slug: string; order: number }): Promise<PortfolioDocument>;
  update(id: string, data: UpdatePortfolioDTO): Promise<PortfolioDocument | null>;
  delete(id: string): Promise<boolean>;
}
