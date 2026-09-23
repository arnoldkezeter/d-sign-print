import type { AuthTokenPayload } from "@/types/auth.types.js";

declare global {
  namespace Express {
    interface Request {
      user?: AuthTokenPayload;
    }
  }
}