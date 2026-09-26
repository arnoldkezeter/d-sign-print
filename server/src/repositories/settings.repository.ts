import { SettingsModel, type SettingsDocument } from "@/models/Settings.model.js";
import type { ISettingsRepository } from "@/interfaces/repositories/ISettingsRepository.js";
import type { UpdateSettingsDTO } from "@/types/settings.types.js";

export class SettingsRepository implements ISettingsRepository {
  // Crée le document par défaut s'il n'existe pas encore (première visite en base vierge)
  async getSingleton(): Promise<SettingsDocument> {
    const existing = await SettingsModel.findOne().exec();
    if (existing) return existing;
    return SettingsModel.create({});
  }

  async update(data: UpdateSettingsDTO): Promise<SettingsDocument> {
    const settings = await this.getSingleton();
    Object.assign(settings, data);
    await settings.save();
    return settings;
  }
}
