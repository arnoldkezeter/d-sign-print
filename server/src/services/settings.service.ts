import type { ISettingsRepository } from "@/interfaces/repositories/ISettingsRepository.js";
import type { UpdateSettingsDTO } from "@/types/settings.types.js";
import type { SettingsDocument } from "@/models/Settings.model.js";

export class SettingsService {
  constructor(private readonly settingsRepository: ISettingsRepository) {}

  async get(): Promise<SettingsDocument> {
    return this.settingsRepository.getSingleton();
  }

  async update(dto: UpdateSettingsDTO): Promise<SettingsDocument> {
    return this.settingsRepository.update(dto);
  }
}
