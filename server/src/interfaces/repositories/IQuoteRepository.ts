import type { QuoteDocument } from "@/models/Quote.model.js";
import type { CreateQuoteDTO, UpdateQuoteDTO } from "@/types/quote.types.js";

export interface IQuoteRepository {
  create(data: CreateQuoteDTO): Promise<QuoteDocument>;
  findAllPaginated(params: { skip: number; limit: number; status?: string }): Promise<{ data: QuoteDocument[]; total: number }>;
  findById(id: string): Promise<QuoteDocument | null>;
  update(id: string, data: UpdateQuoteDTO): Promise<QuoteDocument | null>;
  delete(id: string): Promise<boolean>;
  countByStatus(): Promise<Record<string, number>>;
  countAll(): Promise<number>;
}
