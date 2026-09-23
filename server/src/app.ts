import express, { type Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { env } from "@/config/env.js";
import { errorHandler, notFoundHandler } from "@/middlewares/errorHandler.js";
import healthRoutes from "@/routes/health.route.js";
import authRoutes from "@/routes/auth.routes.js";
import serviceRoutes from "@/routes/service.routes.js";

export function createApp(): Application {
  const app = express();

  // Sécurité HTTP headers
  app.use(helmet());

  // CORS — restreint au frontend uniquement
  app.use(
    cors({
      origin: env.CLIENT_URL,
      credentials: true,
    })
  );

  // Parsing
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(env.COOKIE_SECRET));

  // Logs HTTP (désactivés en test)
  if (env.NODE_ENV !== "test") {
    app.use(morgan("dev"));
  }

  // Routes
  app.use("/api", healthRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/services", serviceRoutes);
  // Les futures routes (auth, services, portfolio, etc.) seront montées ici

  // 404 + gestion d'erreurs globale (toujours en dernier)
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}