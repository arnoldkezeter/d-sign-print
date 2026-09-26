import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z.string().min(2, "Minimum 2 caractères").max(100),
  email: z.string().email("Email invalide"),
  phone: z.string().max(30).optional(),
  subject: z.string().min(3, "Minimum 3 caractères").max(150),
  message: z.string().min(10, "Minimum 10 caractères").max(2000),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
