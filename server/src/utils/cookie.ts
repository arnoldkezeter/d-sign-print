import type { Response } from "express";
import { env } from "@/config/env.js";
import { COOKIE_NAMES } from "@/constants/cookies.constant.js";

const FIFTEEN_MIN_MS = 15 * 60 * 1000;
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

function baseOptions() {
  return {
    httpOnly: true,
    secure: env.COOKIE_SECURE,
    sameSite: "strict" as const,
  };
}

export function setAuthCookies(res: Response, accessToken: string, refreshToken: string): void {
  res.cookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
    ...baseOptions(),
    maxAge: FIFTEEN_MIN_MS,
  });

  res.cookie(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
    ...baseOptions(),
    maxAge: THIRTY_DAYS_MS,
    path: "/api/auth/refresh", // le cookie n'est envoyé que sur cette route précise
  });
}

export function clearAuthCookies(res: Response): void {
  res.clearCookie(COOKIE_NAMES.ACCESS_TOKEN, baseOptions());
  res.clearCookie(COOKIE_NAMES.REFRESH_TOKEN, { ...baseOptions(), path: "/api/auth/refresh" });
}