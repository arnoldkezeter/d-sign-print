import type { ServiceDocument } from "@/models/Service.model.js";
import type { CreateServiceDTO, UpdateServiceDTO } from "@/types/service.types.js";

export interface IServiceRepository {
  findAllActive(): Promise<ServiceDocument[]>;
  findAllPaginated(params: {
    skip: number;
    limit: number;
    search?: string;
  }): Promise<{ data: ServiceDocument[]; total: number }>;
  findById(id: string): Promise<ServiceDocument | null>;
  findBySlug(slug: string): Promise<ServiceDocument | null>;
  countAll(): Promise<number>;
  create(data: CreateServiceDTO & { slug: string; order: number }): Promise<ServiceDocument>;
  update(id: string, data: UpdateServiceDTO): Promise<ServiceDocument | null>;
  delete(id: string): Promise<boolean>;
}