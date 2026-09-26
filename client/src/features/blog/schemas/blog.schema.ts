import { z } from "zod";

export const blogPostFormSchema = z.object({
  title: z.string().min(5, "Minimum 5 caractères").max(150),
  excerpt: z.string().min(10, "Minimum 10 caractères").max(250),
  content: z.string().min(30, "Minimum 30 caractères"),
  coverImageUrl: z.string().optional(),
  tags: z.array(z.string()).optional(),
  authorName: z.string().max(100).optional(),
  isPublished: z.boolean(),
});

export type BlogPostFormValues = z.infer<typeof blogPostFormSchema>;
