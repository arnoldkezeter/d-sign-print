export interface Service {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ServiceListParams {
  page?: number;
  limit?: number;
  search?: string;
}