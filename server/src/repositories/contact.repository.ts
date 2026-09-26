import { ContactMessageModel, type ContactMessageDocument } from "@/models/ContactMessage.model.js";
import type { IContactRepository } from "@/interfaces/repositories/IContactRepository.js";
import type { CreateContactMessageDTO } from "@/types/contact.types.js";

export class ContactRepository implements IContactRepository {
  async create(data: CreateContactMessageDTO): Promise<ContactMessageDocument> {
    return ContactMessageModel.create(data);
  }

  async findAllPaginated(params: {
    skip: number;
    limit: number;
    isRead?: boolean;
  }): Promise<{ data: ContactMessageDocument[]; total: number }> {
    const filter = params.isRead !== undefined ? { isRead: params.isRead } : {};

    const [data, total] = await Promise.all([
      ContactMessageModel.find(filter).sort({ createdAt: -1 }).skip(params.skip).limit(params.limit).exec(),
      ContactMessageModel.countDocuments(filter).exec(),
    ]);

    return { data, total };
  }

  async findById(id: string): Promise<ContactMessageDocument | null> {
    return ContactMessageModel.findById(id).exec();
  }

  async markAsRead(id: string): Promise<ContactMessageDocument | null> {
    return ContactMessageModel.findByIdAndUpdate(id, { isRead: true }, { new: true }).exec();
  }

  async countUnread(): Promise<number> {
    return ContactMessageModel.countDocuments({ isRead: false }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await ContactMessageModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
