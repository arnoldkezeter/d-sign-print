import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";
import { BadRequestError } from "@/utils/AppError.js";

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.errors.map((e) => e.message).join(", ");
      return next(new BadRequestError(message));
    }

    req.body = result.data;
    next();
  };
}