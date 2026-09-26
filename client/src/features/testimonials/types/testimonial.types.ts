export interface Testimonial {
  _id: string;
  clientName: string;
  clientRole: string;
  content: string;
  avatarUrl: string;
  rating: number;
  isPublished: boolean;
  order: number;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}
