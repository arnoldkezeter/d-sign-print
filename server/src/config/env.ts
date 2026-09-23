import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  // Environnement
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(5000),
  CLIENT_URL: z.string().url(),

  // Database
  MONGODB_URI: z.string().min(1, "MONGODB_URI est requis"),

  // Auth (JWT — access + refresh)
  JWT_SECRET: z.string().min(10, "JWT_SECRET doit contenir au moins 10 caractères"),
  JWT_REFRESH_SECRET: z.string().min(10, "JWT_REFRESH_SECRET doit contenir au moins 10 caractères"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("30d"),

  // Cookies
  COOKIE_SECRET: z.string().min(10, "COOKIE_SECRET doit contenir au moins 10 caractères"),
  COOKIE_SECURE: z.coerce.boolean().default(false),

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
  CLOUDINARY_FOLDER: z.string().default("dsign-print"),

  // Email (Nodemailer)
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_USER: z.string().min(1),
  SMTP_PASSWORD: z.string().min(1),
  SMTP_FROM_EMAIL: z.string().email(),
  SMTP_FROM_NAME: z.string().min(1),

  // Sécurité
  BCRYPT_SALT_ROUNDS: z.coerce.number().default(10),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(900000),
  RATE_LIMIT_MAX: z.coerce.number().default(100),

  // Upload de fichiers
  MAX_FILE_SIZE: z.coerce.number().default(10485760),
  UPLOAD_DIR: z.string().default("uploads"),

  // Logs
  LOG_LEVEL: z.string().default("dev"),

  // Feature flags
  ENABLE_SWAGGER: z.coerce.boolean().default(false),
  ENABLE_EMAILS: z.coerce.boolean().default(true),

  // Seed du premier administrateur (script npm run seed:admin uniquement)
  ADMIN_NAME: z.string().default("Super Admin"),
  ADMIN_EMAIL: z.string().email().default("admin@dsignprint.com"),
  ADMIN_PASSWORD: z.string().min(8).default("ChangeMe123!"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Variables d'environnement invalides :");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;