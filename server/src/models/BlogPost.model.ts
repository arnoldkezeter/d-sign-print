import { Schema, model, type Document } from "mongoose";

export interface BlogPostDocument extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  tags: string[];
  authorName: string;
  isPublished: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const blogPostSchema = new Schema<BlogPostDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, required: true, trim: true, maxlength: 250 },
    content: { type: String, required: true },
    coverImageUrl: { type: String, default: "" },
    tags: { type: [String], default: [] },
    authorName: { type: String, default: "D-sign Print" },
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

blogPostSchema.index({ title: "text", excerpt: "text", content: "text" });

export const BlogPostModel = model<BlogPostDocument>("BlogPost", blogPostSchema);
