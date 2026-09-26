import type { IContactRepository } from "@/interfaces/repositories/IContactRepository.js";
import type { CreateContactMessageDTO } from "@/types/contact.types.js";
import type { ContactMessageDocument } from "@/models/ContactMessage.model.js";
import { NotFoundError } from "@/utils/AppError.js";

export class ContactService {
  constructor(private readonly contactRepository: IContactRepository) {}

  async create(dto: CreateContactMessageDTO): Promise<ContactMessageDocument> {
    return this.contactRepository.create(dto);
  }

  async getAdminList(params: { skip: number; limit: number; isRead?: boolean }) {
    return this.contactRepository.findAllPaginated(params);
  }

  async markAsRead(id: string): Promise<ContactMessageDocument> {
    const message = await this.contactRepository.markAsRead(id);
    if (!message) throw new NotFoundError("Message");
    return message;
  }

  async countUnread(): Promise<number> {
    return this.contactRepository.countUnread();
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.contactRepository.delete(id);
    if (!deleted) throw new NotFoundError("Message");
  }
}
