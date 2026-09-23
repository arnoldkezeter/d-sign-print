import { ServiceModel, type ServiceDocument } from "@/models/Service.model.js";
import type { IServiceRepository } from "@/interfaces/repositories/IServiceRepository.js";
import type { CreateServiceDTO, UpdateServiceDTO } from "@/types/service.types.js";

export class ServiceRepository implements IServiceRepository {
  async findAllActive(): Promise<ServiceDocument[]> {
    return ServiceModel.find({ isActive: true }).sort({ order: 1 }).exec();
  }

  async findAllPaginated(params: {
    skip: number;
    limit: number;
    search?: string;
  }): Promise<{ data: ServiceDocument[]; total: number }> {
    const filter = params.search ? { $text: { $search: params.search } } : {};

    const [data, total] = await Promise.all([
      ServiceModel.find(filter).sort({ order: 1 }).skip(params.skip).limit(params.limit).exec(),
      ServiceModel.countDocuments(filter).exec(),
    ]);

    return { data, total };
  }

  async findById(id: string): Promise<ServiceDocument | null> {
    return ServiceModel.findById(id).exec();
  }

  async findBySlug(slug: string): Promise<ServiceDocument | null> {
    return ServiceModel.findOne({ slug, isActive: true }).exec();
  }

  async countAll(): Promise<number> {
    return ServiceModel.countDocuments().exec();
  }

  async create(data: CreateServiceDTO & { slug: string; order: number }): Promise<ServiceDocument> {
    return ServiceModel.create(data);
  }

  async update(id: string, data: UpdateServiceDTO): Promise<ServiceDocument | null> {
    return ServiceModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await ServiceModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}