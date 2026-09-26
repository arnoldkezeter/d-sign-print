import { z } from "zod";
import { PORTFOLIO_CATEGORIES } from "@/constants/portfolio.constant";

export const portfolioFormSchema = z.object({
  title: z.string().min(3, "Minimum 3 caractères").max(120),
  category: z.enum(PORTFOLIO_CATEGORIES),
  description: z.string().min(10, "Minimum 10 caractères"),
  clientName: z.string().max(100).optional(),
  images: z.array(z.string()).min(1, "Au moins une image est requise"),
  isFeatured: z.boolean(),
  isActive: z.boolean(),
});

export type PortfolioFormValues = z.infer<typeof portfolioFormSchema>;
