import type { IQuoteRepository } from "@/interfaces/repositories/IQuoteRepository.js";
import type { CreateQuoteDTO, UpdateQuoteDTO } from "@/types/quote.types.js";
import type { QuoteDocument } from "@/models/Quote.model.js";
import { NotFoundError } from "@/utils/AppError.js";

export class QuoteService {
  constructor(private readonly quoteRepository: IQuoteRepository) {}

  async create(dto: CreateQuoteDTO): Promise<QuoteDocument> {
    return this.quoteRepository.create(dto);
  }

  async getAdminList(params: { skip: number; limit: number; status?: string }) {
    return this.quoteRepository.findAllPaginated(params);
  }

  async getById(id: string): Promise<QuoteDocument> {
    const quote = await this.quoteRepository.findById(id);
    if (!quote) throw new NotFoundError("Demande de devis");
    return quote;
  }

  async update(id: string, dto: UpdateQuoteDTO): Promise<QuoteDocument> {
    const updated = await this.quoteRepository.update(id, dto);
    if (!updated) throw new NotFoundError("Demande de devis");
    return updated;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.quoteRepository.delete(id);
    if (!deleted) throw new NotFoundError("Demande de devis");
  }

  async getStatusCounts(): Promise<Record<string, number>> {
    return this.quoteRepository.countByStatus();
  }

  async countAll(): Promise<number> {
    return this.quoteRepository.countAll();
  }
}
