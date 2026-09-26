import { Schema, model, type Document } from "mongoose";
import { PORTFOLIO_CATEGORIES } from "@/constants/portfolio.constant.js";

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

export interface PortfolioDocument extends Document {
  title: string;
  slug: string;
  category: PortfolioCategory;
  description: string;
  clientName: string;
  images: string[];
  isFeatured: boolean;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const portfolioSchema = new Schema<PortfolioDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, enum: PORTFOLIO_CATEGORIES, required: true },
    description: { type: String, required: true, trim: true },
    clientName: { type: String, default: "", trim: true },
    images: { type: [String], default: [], validate: (v: string[]) => v.length > 0 },
    isFeatured: { type: Boolean, default: false }, // mis en avant sur la page d'accueil
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

portfolioSchema.index({ title: "text", description: "text" });

export const PortfolioModel = model<PortfolioDocument>("Portfolio", portfolioSchema);
