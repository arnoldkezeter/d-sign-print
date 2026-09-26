import type { BlogPostDocument } from "@/models/BlogPost.model.js";
import type { CreateBlogPostDTO, UpdateBlogPostDTO } from "@/types/blog.types.js";

export interface IBlogRepository {
  findAllPublished(params: { skip: number; limit: number }): Promise<{ data: BlogPostDocument[]; total: number }>;
  findAllPaginated(params: { skip: number; limit: number; search?: string }): Promise<{ data: BlogPostDocument[]; total: number }>;
  findById(id: string): Promise<BlogPostDocument | null>;
  findBySlug(slug: string, onlyPublished?: boolean): Promise<BlogPostDocument | null>;
  create(data: CreateBlogPostDTO & { slug: string; publishedAt: Date | null }): Promise<BlogPostDocument>;
  update(id: string, data: UpdateBlogPostDTO & { publishedAt?: Date | null }): Promise<BlogPostDocument | null>;
  delete(id: string): Promise<boolean>;
}
