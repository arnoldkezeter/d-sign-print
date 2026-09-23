import type { UserDocument } from "@/models/User.model.js";
import type { CreateUserDTO } from "@/types/auth.types.js";

export interface IUserRepository {
  findByEmail(email: string, withPassword?: boolean): Promise<UserDocument | null>;
  findById(id: string): Promise<UserDocument | null>;
  create(data: CreateUserDTO): Promise<UserDocument>;
  findAll(): Promise<UserDocument[]>;
}