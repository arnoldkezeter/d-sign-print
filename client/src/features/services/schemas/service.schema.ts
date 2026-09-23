import { z } from "zod";
import { ALLOWED_ICONS } from "@/constants/icons.constant";

export const serviceFormSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères").max(100),
  shortDescription: z.string().min(10, "Minimum 10 caractères").max(200),
  description: z.string().min(20, "Minimum 20 caractères"),
  icon: z.enum(ALLOWED_ICONS),
  isActive: z.boolean(),
});

export type ServiceFormValues = z.infer<typeof serviceFormSchema>;