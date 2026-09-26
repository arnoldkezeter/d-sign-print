import type { TestimonialDocument } from "@/models/Testimonial.model.js";
import type { CreateTestimonialDTO, UpdateTestimonialDTO } from "@/types/testimonial.types.js";

export interface ITestimonialRepository {
  findAllPublished(): Promise<TestimonialDocument[]>;
  findAllPaginated(params: { skip: number; limit: number }): Promise<{ data: TestimonialDocument[]; total: number }>;
  findById(id: string): Promise<TestimonialDocument | null>;
  create(data: CreateTestimonialDTO): Promise<TestimonialDocument>;
  update(id: string, data: UpdateTestimonialDTO): Promise<TestimonialDocument | null>;
  delete(id: string): Promise<boolean>;
}
