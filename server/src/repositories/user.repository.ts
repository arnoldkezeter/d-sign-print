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
    return UserModel.find().sort({ createdAt: -1 }).exec();
  }

  async setActive(id: string, isActive: boolean): Promise<UserDocument | null> {
    return UserModel.findByIdAndUpdate(id, { isActive }, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await UserModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
