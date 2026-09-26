import { api } from "@/lib/axios";
import type { SiteSettings } from "@/features/settings/types/settings.types";

export const settingsApi = {
  async get(): Promise<SiteSettings> {
    const { data } = await api.get("/settings");
    return data.data;
  },

  async update(payload: Partial<SiteSettings>): Promise<SiteSettings> {
    const { data } = await api.patch("/settings", payload);
    return data.data;
  },
};
