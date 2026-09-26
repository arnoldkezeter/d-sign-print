import { z } from "zod";

export const quoteRequestFormSchema = z.object({
  fullName: z.string().min(2, "Minimum 2 caractères").max(100),
  email: z.string().email("Email invalide"),
  phone: z.string().min(6, "Numéro invalide").max(30),
  service: z.string().optional().nullable(),
  serviceLabel: z.string().min(2, "Merci de préciser le type de prestation").max(150),
  quantity: z.number().int().min(1).optional(),
  description: z.string().min(10, "Merci de décrire votre besoin (10 caractères minimum)").max(2000),
  deadline: z.string().max(100).optional(),
  attachments: z.array(z.string()).optional(),
});

export type QuoteRequestFormValues = z.infer<typeof quoteRequestFormSchema>;
