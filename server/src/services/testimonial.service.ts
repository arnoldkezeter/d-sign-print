import type { ITestimonialRepository } from "@/interfaces/repositories/ITestimonialRepository.js";
import type { CreateTestimonialDTO, UpdateTestimonialDTO } from "@/types/testimonial.types.js";
import type { TestimonialDocument } from "@/models/Testimonial.model.js";
import { NotFoundError } from "@/utils/AppError.js";

export class TestimonialService {
  constructor(private readonly testimonialRepository: ITestimonialRepository) {}

  async getPublicList(): Promise<TestimonialDocument[]> {
    return this.testimonialRepository.findAllPublished();
  }

  async getAdminList(params: { skip: number; limit: number }) {
    return this.testimonialRepository.findAllPaginated(params);
  }

  async getById(id: string): Promise<TestimonialDocument> {
    const testimonial = await this.testimonialRepository.findById(id);
    if (!testimonial) throw new NotFoundError("Témoignage");
    return testimonial;
  }

  async create(dto: CreateTestimonialDTO): Promise<TestimonialDocument> {
    return this.testimonialRepository.create(dto);
  }

  async update(id: string, dto: UpdateTestimonialDTO): Promise<TestimonialDocument> {
    const updated = await this.testimonialRepository.update(id, dto);
    if (!updated) throw new NotFoundError("Témoignage");
    return updated;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.testimonialRepository.delete(id);
    if (!deleted) throw new NotFoundError("Témoignage");
  }
}
