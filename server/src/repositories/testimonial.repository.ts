import { TestimonialModel, type TestimonialDocument } from "@/models/Testimonial.model.js";
import type { ITestimonialRepository } from "@/interfaces/repositories/ITestimonialRepository.js";
import type { CreateTestimonialDTO, UpdateTestimonialDTO } from "@/types/testimonial.types.js";

export class TestimonialRepository implements ITestimonialRepository {
  async findAllPublished(): Promise<TestimonialDocument[]> {
    return TestimonialModel.find({ isPublished: true }).sort({ order: 1, createdAt: -1 }).exec();
  }

  async findAllPaginated(params: { skip: number; limit: number }): Promise<{ data: TestimonialDocument[]; total: number }> {
    const [data, total] = await Promise.all([
      TestimonialModel.find().sort({ createdAt: -1 }).skip(params.skip).limit(params.limit).exec(),
      TestimonialModel.countDocuments().exec(),
    ]);
    return { data, total };
  }

  async findById(id: string): Promise<TestimonialDocument | null> {
    return TestimonialModel.findById(id).exec();
  }

  async create(data: CreateTestimonialDTO): Promise<TestimonialDocument> {
    return TestimonialModel.create(data);
  }

  async update(id: string, data: UpdateTestimonialDTO): Promise<TestimonialDocument | null> {
    return TestimonialModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await TestimonialModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
