import { z } from "zod";
import { PORTFOLIO_CATEGORIES } from "@/constants/portfolio.constant.js";

export const createPortfolioSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères").max(120),
  category: z.enum(PORTFOLIO_CATEGORIES, { errorMap: () => ({ message: "Catégorie invalide" }) }),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  clientName: z.string().max(100).optional(),
  images: z.array(z.string()).min(1, "Au moins une image est requise"),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export const updatePortfolioSchema = createPortfolioSchema.partial().extend({
  order: z.number().int().min(0).optional(),
});

export type CreatePortfolioInput = z.infer<typeof createPortfolioSchema>;
export type UpdatePortfolioInput = z.infer<typeof updatePortfolioSchema>;
