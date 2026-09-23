import type { Role } from "@/constants/roles.constant.js";

export interface LoginDTO {
  email: string;
  password: string;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role?: Role;
}

export interface AuthTokenPayload {
  userId: string;
  role: Role;
}

// Représentation sûre d'un utilisateur, sans le mot de passe, renvoyée au client
export interface SafeUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}