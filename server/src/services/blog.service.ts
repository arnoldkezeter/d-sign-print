import type { IBlogRepository } from "@/interfaces/repositories/IBlogRepository.js";
import type { CreateBlogPostDTO, UpdateBlogPostDTO } from "@/types/blog.types.js";
import type { BlogPostDocument } from "@/models/BlogPost.model.js";
import { NotFoundError } from "@/utils/AppError.js";
import { slugify } from "@/utils/slugify.js";

export class BlogService {
  constructor(private readonly blogRepository: IBlogRepository) {}

  async getPublicList(params: { skip: number; limit: number }) {
    return this.blogRepository.findAllPublished(params);
  }

  async getAdminList(params: { skip: number; limit: number; search?: string }) {
    return this.blogRepository.findAllPaginated(params);
  }

  async getById(id: string): Promise<BlogPostDocument> {
    const post = await this.blogRepository.findById(id);
    if (!post) throw new NotFoundError("Article");
    return post;
  }

  async getBySlug(slug: string): Promise<BlogPostDocument> {
    const post = await this.blogRepository.findBySlug(slug, true);
    if (!post) throw new NotFoundError("Article");
    return post;
  }

  async create(dto: CreateBlogPostDTO): Promise<BlogPostDocument> {
    const slug = await this.generateUniqueSlug(dto.title);
    const publishedAt = dto.isPublished ? new Date() : null;
    return this.blogRepository.create({ ...dto, slug, publishedAt });
  }

  async update(id: string, dto: UpdateBlogPostDTO): Promise<BlogPostDocument> {
    const existing = await this.getById(id);

    const updateData: UpdateBlogPostDTO & { slug?: string; publishedAt?: Date | null } = { ...dto };
    if (dto.title) {
      updateData.slug = await this.generateUniqueSlug(dto.title);
    }
    // On horodate la première publication, sans écraser la date si l'article était déjà publié
    if (dto.isPublished && !existing.publishedAt) {
      updateData.publishedAt = new Date();
    } else if (dto.isPublished === false) {
      updateData.publishedAt = null;
    }

    const updated = await this.blogRepository.update(id, updateData);
    if (!updated) throw new NotFoundError("Article");
    return updated;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.blogRepository.delete(id);
    if (!deleted) throw new NotFoundError("Article");
  }

  private async generateUniqueSlug(title: string): Promise<string> {
    const baseSlug = slugify(title);
    let slug = baseSlug;
    let counter = 1;
    while (await this.blogRepository.findBySlug(slug, false)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    return slug;
  }
}
