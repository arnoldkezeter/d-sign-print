import { api } from "@/lib/axios";
import type { DashboardStats } from "@/features/dashboard/types/dashboard.types";

export const dashboardApi = {
  async getStats(): Promise<DashboardStats> {
    const { data } = await api.get("/dashboard/stats");
    return data.data;
  },
};
