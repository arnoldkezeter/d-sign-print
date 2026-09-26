import { z } from "zod";

export const createContactMessageSchema = z.object({
  fullName: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  email: z.string().email("Email invalide"),
  phone: z.string().max(30).optional(),
  subject: z.string().min(3, "Le sujet doit contenir au moins 3 caractères").max(150),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères").max(2000),
});

export type CreateContactMessageInput = z.infer<typeof createContactMessageSchema>;
