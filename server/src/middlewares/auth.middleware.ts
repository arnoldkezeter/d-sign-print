import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "@/utils/jwt.js";
import { UnauthorizedError, ForbiddenError } from "@/utils/AppError.js";
import { COOKIE_NAMES } from "@/constants/cookies.constant.js";
import type { Role } from "@/constants/roles.constant.js";

export function protect(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.[COOKIE_NAMES.ACCESS_TOKEN];

  if (!token) {
    return next(new UnauthorizedError("Vous devez être connecté"));
  }

  try {
    req.user = verifyAccessToken(token);
    next();
  } catch {
    next(new UnauthorizedError("Session invalide ou expirée"));
  }
}

export function restrictTo(...roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ForbiddenError("Vous n'avez pas les droits pour cette action"));
    }
    next();
  };
}