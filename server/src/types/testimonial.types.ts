export interface CreateTestimonialDTO {
  clientName: string;
  clientRole?: string;
  content: string;
  avatarUrl?: string;
  rating?: number;
  isPublished?: boolean;
}

export type UpdateTestimonialDTO = Partial<CreateTestimonialDTO> & { order?: number };
