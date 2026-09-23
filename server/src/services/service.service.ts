import type { IServiceRepository } from "@/interfaces/repositories/IServiceRepository.js";
import type { CreateServiceDTO, UpdateServiceDTO } from "@/types/service.types.js";
import type { ServiceDocument } from "@/models/Service.model.js";
import { NotFoundError } from "@/utils/AppError.js";
import { slugify } from "@/utils/slugify.js";

export class ServiceService {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  async getPublicList(): Promise<ServiceDocument[]> {
    return this.serviceRepository.findAllActive();
  }

  async getAdminList(params: { skip: number; limit: number; search?: string }) {
    return this.serviceRepository.findAllPaginated(params);
  }

  async getById(id: string): Promise<ServiceDocument> {
    const service = await this.serviceRepository.findById(id);
    if (!service) throw new NotFoundError("Service");
    return service;
  }

  async getBySlug(slug: string): Promise<ServiceDocument> {
    const service = await this.serviceRepository.findBySlug(slug);
    if (!service) throw new NotFoundError("Service");
    return service;
  }

  async create(dto: CreateServiceDTO): Promise<ServiceDocument> {
    const slug = await this.generateUniqueSlug(dto.title);
    const order = await this.serviceRepository.countAll();

    return this.serviceRepository.create({ ...dto, slug, order });
  }

  async update(id: string, dto: UpdateServiceDTO): Promise<ServiceDocument> {
    await this.getById(id); // vérifie l'existence, lève 404 sinon

    // Si le titre change, on régénère un slug unique ; sinon on ne touche pas au slug existant
    const updateData: UpdateServiceDTO & { slug?: string } = { ...dto };
    if (dto.title) {
      updateData.slug = await this.generateUniqueSlug(dto.title);
    }

    const updated = await this.serviceRepository.update(id, updateData);
    if (!updated) throw new NotFoundError("Service");
    return updated;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.serviceRepository.delete(id);
    if (!deleted) throw new NotFoundError("Service");
  }

  private async generateUniqueSlug(title: string): Promise<string> {
    const baseSlug = slugify(title);
    let slug = baseSlug;
    let counter = 1;

    while (await this.serviceRepository.findBySlug(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  }
}