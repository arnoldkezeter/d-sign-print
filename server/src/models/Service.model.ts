import { Schema, model, type Document } from "mongoose";

export interface ServiceDocument extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<ServiceDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    shortDescription: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true, trim: true },
    icon: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Index texte pour la recherche admin (title + shortDescription)
serviceSchema.index({ title: "text", shortDescription: "text" });

export const ServiceModel = model<ServiceDocument>("Service", serviceSchema);