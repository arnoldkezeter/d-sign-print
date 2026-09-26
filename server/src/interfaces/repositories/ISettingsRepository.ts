import type { SettingsDocument } from "@/models/Settings.model.js";
import type { UpdateSettingsDTO } from "@/types/settings.types.js";

export interface ISettingsRepository {
  getSingleton(): Promise<SettingsDocument>;
  update(data: UpdateSettingsDTO): Promise<SettingsDocument>;
}
