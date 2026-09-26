import { z } from "zod";

export const updateSettingsSchema = z.object({
  companyName: z.string().min(2).max(100).optional(),
  tagline: z.string().max(200).optional(),
  logoUrl: z.string().optional(),
  email: z.string().email("Email invalide").optional(),
  phone: z.string().min(6).max(30).optional(),
  whatsapp: z.string().min(6).max(30).optional(),
  address: z.string().max(200).optional(),
  city: z.string().max(100).optional(),
  businessHours: z.string().max(200).optional(),
  facebookUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  mapUrl: z.string().optional(),
});

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
