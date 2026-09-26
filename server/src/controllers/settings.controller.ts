import type { Request, Response, NextFunction } from "express";
import { SettingsService } from "@/services/settings.service.js";
import { SettingsRepository } from "@/repositories/settings.repository.js";

const settingsService = new SettingsService(new SettingsRepository());

// Public : toute personne visitant le site doit pouvoir lire les coordonnées de l'entreprise
export async function getSettings(_req: Request, res: Response, next: NextFunction) {
  try {
    const settings = await settingsService.get();
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
}

// Admin uniquement
export async function updateSettings(req: Request, res: Response, next: NextFunction) {
  try {
    const settings = await settingsService.update(req.body);
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
}
