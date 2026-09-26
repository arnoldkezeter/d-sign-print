import type { IPortfolioRepository } from "@/interfaces/repositories/IPortfolioRepository.js";
import type { CreatePortfolioDTO, UpdatePortfolioDTO } from "@/types/portfolio.types.js";
import type { PortfolioDocument } from "@/models/Portfolio.model.js";
import { NotFoundError } from "@/utils/AppError.js";
import { slugify } from "@/utils/slugify.js";

export class PortfolioService {
  constructor(private readonly portfolioRepository: IPortfolioRepository) {}

  async getPublicList(category?: string): Promise<PortfolioDocument[]> {
    return this.portfolioRepository.findAllActive({ category });
  }

  async getFeatured(limit = 6): Promise<PortfolioDocument[]> {
    return this.portfolioRepository.findFeatured(limit);
  }

  async getAdminList(params: { skip: number; limit: number; search?: string }) {
    return this.portfolioRepository.findAllPaginated(params);
  }

  async getById(id: string): Promise<PortfolioDocument> {
    const item = await this.portfolioRepository.findById(id);
    if (!item) throw new NotFoundError("Réalisation");
    return item;
  }

  async getBySlug(slug: string): Promise<PortfolioDocument> {
    const item = await this.portfolioRepository.findBySlug(slug);
    if (!item) throw new NotFoundError("Réalisation");
    return item;
  }

  async create(dto: CreatePortfolioDTO): Promise<PortfolioDocument> {
    const slug = await this.generateUniqueSlug(dto.title);
    const order = await this.portfolioRepository.countAll();
    return this.portfolioRepository.create({ ...dto, slug, order });
  }

  async update(id: string, dto: UpdatePortfolioDTO): Promise<PortfolioDocument> {
    await this.getById(id);

    const updateData: UpdatePortfolioDTO & { slug?: string } = { ...dto };
    if (dto.title) {
      updateData.slug = await this.generateUniqueSlug(dto.title);
    }

    const updated = await this.portfolioRepository.update(id, updateData);
    if (!updated) throw new NotFoundError("Réalisation");
    return updated;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.portfolioRepository.delete(id);
    if (!deleted) throw new NotFoundError("Réalisation");
  }

  private async generateUniqueSlug(title: string): Promise<string> {
    const baseSlug = slugify(title);
    let slug = baseSlug;
    let counter = 1;

    while (await this.portfolioRepository.findBySlug(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  }
}
