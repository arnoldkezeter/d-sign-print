import type { Request, Response, NextFunction } from "express";
import { AuthService } from "@/services/auth.service.js";
import { UserRepository } from "@/repositories/user.repository.js";
import { setAuthCookies, clearAuthCookies } from "@/utils/cookie.js";
import { UnauthorizedError } from "@/utils/AppError.js";
import { COOKIE_NAMES } from "@/constants/cookies.constant.js";

const authService = new AuthService(new UserRepository());
const userRepository = new UserRepository();

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { accessToken, refreshToken, user } = await authService.login(req.body);
    setAuthCookies(res, accessToken, refreshToken);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.[COOKIE_NAMES.REFRESH_TOKEN];
    if (!token) throw new UnauthorizedError("Aucune session à renouveler");

    const { accessToken, refreshToken } = await authService.refresh(token);
    setAuthCookies(res, accessToken, refreshToken);
    res.status(200).json({ success: true, message: "Session renouvelée" });
  } catch (error) {
    next(error);
  }
}

export function logout(_req: Request, res: Response) {
  clearAuthCookies(res);
  res.status(200).json({ success: true, message: "Déconnexion réussie" });
}

export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) throw new UnauthorizedError();
    const user = await userRepository.findById(req.user.userId);
    if (!user) throw new UnauthorizedError();

    res.status(200).json({
      success: true,
      data: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    next(error);
  }
}

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}

export async function listUsers(_req: Request, res: Response, next: NextFunction) {
  try {
    const users = await authService.listUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
}

export async function setUserActive(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await authService.setUserActive(req.params.id, req.body.isActive);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    await authService.deleteUser(req.params.id);
    res.status(200).json({ success: true, message: "Utilisateur supprimé" });
  } catch (error) {
    next(error);
  }
}