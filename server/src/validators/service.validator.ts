import { z } from "zod";
import { ALLOWED_ICONS } from "@/constants/icons.constant.js";

export const createServiceSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères").max(100),
  shortDescription: z.string().min(10, "La description courte doit contenir au moins 10 caractères").max(200),
  description: z.string().min(20, "La description doit contenir au moins 20 caractères"),
  icon: z.enum(ALLOWED_ICONS, { errorMap: () => ({ message: "Icône invalide" }) }),
  isActive: z.boolean().optional(),
});

export const updateServiceSchema = createServiceSchema.partial().extend({
  order: z.number().int().min(0).optional(),
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;