import { BlogPostModel, type BlogPostDocument } from "@/models/BlogPost.model.js";
import type { IBlogRepository } from "@/interfaces/repositories/IBlogRepository.js";
import type { CreateBlogPostDTO, UpdateBlogPostDTO } from "@/types/blog.types.js";

export class BlogRepository implements IBlogRepository {
  async findAllPublished(params: { skip: number; limit: number }): Promise<{ data: BlogPostDocument[]; total: number }> {
    const filter = { isPublished: true };
    const [data, total] = await Promise.all([
      BlogPostModel.find(filter).sort({ publishedAt: -1 }).skip(params.skip).limit(params.limit).exec(),
      BlogPostModel.countDocuments(filter).exec(),
    ]);
    return { data, total };
  }

  async findAllPaginated(params: {
    skip: number;
    limit: number;
    search?: string;
  }): Promise<{ data: BlogPostDocument[]; total: number }> {
    const filter = params.search ? { $text: { $search: params.search } } : {};
    const [data, total] = await Promise.all([
      BlogPostModel.find(filter).sort({ createdAt: -1 }).skip(params.skip).limit(params.limit).exec(),
      BlogPostModel.countDocuments(filter).exec(),
    ]);
    return { data, total };
  }

  async findById(id: string): Promise<BlogPostDocument | null> {
    return BlogPostModel.findById(id).exec();
  }

  async findBySlug(slug: string, onlyPublished = true): Promise<BlogPostDocument | null> {
    const filter = onlyPublished ? { slug, isPublished: true } : { slug };
    return BlogPostModel.findOne(filter).exec();
  }

  async create(data: CreateBlogPostDTO & { slug: string; publishedAt: Date | null }): Promise<BlogPostDocument> {
    return BlogPostModel.create(data);
  }

  async update(id: string, data: UpdateBlogPostDTO & { publishedAt?: Date | null }): Promise<BlogPostDocument | null> {
    return BlogPostModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await BlogPostModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
