import { api } from "@/lib/axios";
import type { AuthUser, LoginPayload } from "@/features/auth/types/auth.types";

export const authService = {
  async login(payload: LoginPayload): Promise<AuthUser> {
    const { data } = await api.post("/auth/login", payload);
    return data.data;
  },

  async logout(): Promise<void> {
    await api.post("/auth/logout");
  },

  async getMe(): Promise<AuthUser> {
    const { data } = await api.get("/auth/me");
    return data.data;
  },
};