import { Schema, model, type Document } from "mongoose";

export interface TestimonialDocument extends Document {
  clientName: string;
  clientRole: string;
  content: string;
  avatarUrl: string;
  rating: number;
  isPublished: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const testimonialSchema = new Schema<TestimonialDocument>(
  {
    clientName: { type: String, required: true, trim: true },
    clientRole: { type: String, default: "", trim: true }, // ex: "Gérante, Boutique XYZ"
    content: { type: String, required: true, trim: true, maxlength: 500 },
    avatarUrl: { type: String, default: "" },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    isPublished: { type: Boolean, default: false }, // modération avant publication sur le site public
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const TestimonialModel = model<TestimonialDocument>("Testimonial", testimonialSchema);
