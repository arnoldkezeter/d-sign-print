import { z } from "zod";

export const createTestimonialSchema = z.object({
  clientName: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  clientRole: z.string().max(150).optional(),
  content: z.string().min(10, "Le témoignage doit contenir au moins 10 caractères").max(500),
  avatarUrl: z.string().optional(),
  rating: z.number().int().min(1).max(5).optional(),
  isPublished: z.boolean().optional(),
});

export const updateTestimonialSchema = createTestimonialSchema.partial().extend({
  order: z.number().int().min(0).optional(),
});

export type CreateTestimonialInput = z.infer<typeof createTestimonialSchema>;
export type UpdateTestimonialInput = z.infer<typeof updateTestimonialSchema>;
