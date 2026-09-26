import { Schema, model, type Document, type Types } from "mongoose";
import { QUOTE_STATUSES } from "@/constants/quote.constant.js";

export type QuoteStatus = (typeof QUOTE_STATUSES)[number];

export interface QuoteDocument extends Document {
  fullName: string;
  email: string;
  phone: string;
  service: Types.ObjectId | null;
  serviceLabel: string;
  quantity: number;
  description: string;
  deadline: string;
  attachments: string[];
  status: QuoteStatus;
  adminNotes: string;
  createdAt: Date;
  updatedAt: Date;
}

const quoteSchema = new Schema<QuoteDocument>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    service: { type: Schema.Types.ObjectId, ref: "Service", default: null },
    serviceLabel: { type: String, required: true, trim: true }, // libellé texte, gardé même si le service est supprimé plus tard
    quantity: { type: Number, min: 1, default: 1 },
    description: { type: String, required: true, trim: true },
    deadline: { type: String, default: "" }, // délai souhaité, saisi librement par le client
    attachments: { type: [String], default: [] },
    status: { type: String, enum: QUOTE_STATUSES, default: "en_attente" },
    adminNotes: { type: String, default: "" },
  },
  { timestamps: true }
);

export const QuoteModel = model<QuoteDocument>("Quote", quoteSchema);
