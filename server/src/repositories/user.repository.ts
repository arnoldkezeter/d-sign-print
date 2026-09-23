import { UserModel, type UserDocument } from "@/models/User.model.js";
import type { IUserRepository } from "@/interfaces/repositories/IUserRepository.js";
import type { CreateUserDTO } from "@/types/auth.types.js";

export class UserRepository implements IUserRepository {
  async findByEmail(email: string, withPassword = false): Promise<UserDocument | null> {
    const query = UserModel.findOne({ email });
    if (withPassword) query.select("+password");
    return query.exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return UserModel.findById(id).exec();
  }

  async create(data: CreateUserDTO): Promise<UserDocument> {
    return UserModel.create(data);
  }

  async findAll(): Promise<UserDocument[]> {
    return UserModel.find().exec();
  }
}