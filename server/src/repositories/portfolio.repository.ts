import { PortfolioModel, type PortfolioDocument } from "@/models/Portfolio.model.js";
import type { IPortfolioRepository } from "@/interfaces/repositories/IPortfolioRepository.js";
import type { CreatePortfolioDTO, UpdatePortfolioDTO } from "@/types/portfolio.types.js";

export class PortfolioRepository implements IPortfolioRepository {
  async findAllActive(params: { category?: string }): Promise<PortfolioDocument[]> {
    const filter = { isActive: true, ...(params.category ? { category: params.category } : {}) };
    return PortfolioModel.find(filter).sort({ order: 1, createdAt: -1 }).exec();
  }

  async findFeatured(limit: number): Promise<PortfolioDocument[]> {
    return PortfolioModel.find({ isActive: true, isFeatured: true }).sort({ order: 1 }).limit(limit).exec();
  }

  async findAllPaginated(params: {
    skip: number;
    limit: number;
    search?: string;
  }): Promise<{ data: PortfolioDocument[]; total: number }> {
    const filter = params.search ? { $text: { $search: params.search } } : {};

    const [data, total] = await Promise.all([
      PortfolioModel.find(filter).sort({ order: 1, createdAt: -1 }).skip(params.skip).limit(params.limit).exec(),
      PortfolioModel.countDocuments(filter).exec(),
    ]);

    return { data, total };
  }

  async findById(id: string): Promise<PortfolioDocument | null> {
    return PortfolioModel.findById(id).exec();
  }

  async findBySlug(slug: string): Promise<PortfolioDocument | null> {
    return PortfolioModel.findOne({ slug, isActive: true }).exec();
  }

  async countAll(): Promise<number> {
    return PortfolioModel.countDocuments().exec();
  }

  async create(data: CreatePortfolioDTO & { slug: string; order: number }): Promise<PortfolioDocument> {
    return PortfolioModel.create(data);
  }

  async update(id: string, data: UpdatePortfolioDTO): Promise<PortfolioDocument | null> {
    return PortfolioModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await PortfolioModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
