import { Schema, model, type Document } from "mongoose";

export interface ContactMessageDocument extends Document {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

const contactMessageSchema = new Schema<ContactMessageDocument>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const ContactMessageModel = model<ContactMessageDocument>("ContactMessage", contactMessageSchema);
