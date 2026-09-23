export interface CreateServiceDTO {
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  isActive?: boolean;
}

export type UpdateServiceDTO = Partial<CreateServiceDTO> & { order?: number };