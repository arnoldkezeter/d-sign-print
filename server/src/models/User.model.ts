import { Schema, model, type Document } from "mongoose";
import { Role } from "@/constants/roles.constant.js";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, select: false }, // jamais renvoyé par défaut dans les requêtes
    role: { type: String, enum: Object.values(Role), default: Role.EDITOR },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const UserModel = model<UserDocument>("User", userSchema);