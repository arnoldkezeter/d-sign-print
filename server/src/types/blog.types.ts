export interface CreateBlogPostDTO {
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl?: string;
  tags?: string[];
  authorName?: string;
  isPublished?: boolean;
}

export type UpdateBlogPostDTO = Partial<CreateBlogPostDTO>;
