import type { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError.js";
import { env } from "@/config/env.js";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Erreur applicative connue
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Erreur de validation Mongoose
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Données invalides",
      details: err.message,
    });
  }

  // Erreur inconnue / bug → log complet côté serveur
  console.error("💥 Erreur non gérée :", err);

  return res.status(500).json({
    success: false,
    message: "Erreur interne du serveur",
    ...(env.NODE_ENV === "development" && { stack: err.stack }),
  });
}

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} introuvable`,
  });
}