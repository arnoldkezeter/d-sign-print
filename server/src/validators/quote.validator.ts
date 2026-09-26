import { z } from "zod";
import { QUOTE_STATUSES } from "@/constants/quote.constant.js";

export const createQuoteSchema = z.object({
  fullName: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  email: z.string().email("Email invalide"),
  phone: z.string().min(6, "Numéro de téléphone invalide").max(30),
  service: z.string().optional().nullable(),
  serviceLabel: z.string().min(2, "Le type de prestation est requis").max(150),
  quantity: z.number().int().min(1).optional(),
  description: z.string().min(10, "Merci de décrire votre besoin (10 caractères minimum)").max(2000),
  deadline: z.string().max(100).optional(),
  attachments: z.array(z.string()).optional(),
});

export const updateQuoteSchema = z.object({
  status: z.enum(QUOTE_STATUSES, { errorMap: () => ({ message: "Statut invalide" }) }).optional(),
  adminNotes: z.string().max(2000).optional(),
});

export type CreateQuoteInput = z.infer<typeof createQuoteSchema>;
export type UpdateQuoteInput = z.infer<typeof updateQuoteSchema>;
