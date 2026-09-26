import { api } from "@/lib/axios";
import type { ManagedUser } from "@/features/users/types/user.types";
import type { CreateUserFormValues } from "@/features/users/schemas/user.schema";

export const userApi = {
  async getAll(): Promise<ManagedUser[]> {
    const { data } = await api.get("/auth/users");
    return data.data;
  },

  async create(payload: CreateUserFormValues): Promise<ManagedUser> {
    const { data } = await api.post("/auth/register", payload);
    return data.data;
  },

  async setActive(id: string, isActive: boolean): Promise<ManagedUser> {
    const { data } = await api.patch(`/auth/users/${id}/active`, { isActive });
    return data.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/auth/users/${id}`);
  },
};
