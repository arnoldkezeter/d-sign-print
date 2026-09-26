import { z } from "zod";

export const createBlogPostSchema = z.object({
  title: z.string().min(5, "Le titre doit contenir au moins 5 caractères").max(150),
  excerpt: z.string().min(10, "Le résumé doit contenir au moins 10 caractères").max(250),
  content: z.string().min(30, "Le contenu doit contenir au moins 30 caractères"),
  coverImageUrl: z.string().optional(),
  tags: z.array(z.string()).optional(),
  authorName: z.string().max(100).optional(),
  isPublished: z.boolean().optional(),
});

export const updateBlogPostSchema = createBlogPostSchema.partial();

export type CreateBlogPostInput = z.infer<typeof createBlogPostSchema>;
export type UpdateBlogPostInput = z.infer<typeof updateBlogPostSchema>;
