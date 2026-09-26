export interface CreateContactMessageDTO {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}
