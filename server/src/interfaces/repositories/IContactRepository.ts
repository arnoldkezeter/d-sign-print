import type { ContactMessageDocument } from "@/models/ContactMessage.model.js";
import type { CreateContactMessageDTO } from "@/types/contact.types.js";

export interface IContactRepository {
  create(data: CreateContactMessageDTO): Promise<ContactMessageDocument>;
  findAllPaginated(params: {
    skip: number;
    limit: number;
    isRead?: boolean;
  }): Promise<{ data: ContactMessageDocument[]; total: number }>;
  findById(id: string): Promise<ContactMessageDocument | null>;
  markAsRead(id: string): Promise<ContactMessageDocument | null>;
  countUnread(): Promise<number>;
  delete(id: string): Promise<boolean>;
}
