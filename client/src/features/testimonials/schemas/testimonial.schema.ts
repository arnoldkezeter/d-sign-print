import { z } from "zod";

export const testimonialFormSchema = z.object({
  clientName: z.string().min(2, "Minimum 2 caractères").max(100),
  clientRole: z.string().max(150).optional(),
  content: z.string().min(10, "Minimum 10 caractères").max(500),
  avatarUrl: z.string().optional(),
  rating: z.number().int().min(1).max(5),
  isPublished: z.boolean(),
});

export type TestimonialFormValues = z.infer<typeof testimonialFormSchema>;
