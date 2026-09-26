import { z } from "zod";

export const settingsFormSchema = z.object({
  companyName: z.string().min(2).max(100),
  tagline: z.string().max(200),
  logoUrl: z.string().optional(),
  email: z.string().email("Email invalide"),
  phone: z.string().min(6).max(30),
  whatsapp: z.string().min(6).max(30),
  address: z.string().max(200),
  city: z.string().max(100),
  businessHours: z.string().max(200),
  facebookUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  mapUrl: z.string().optional(),
});

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;
