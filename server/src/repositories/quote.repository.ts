import { QuoteModel, type QuoteDocument } from "@/models/Quote.model.js";
import type { IQuoteRepository } from "@/interfaces/repositories/IQuoteRepository.js";
import type { CreateQuoteDTO, UpdateQuoteDTO } from "@/types/quote.types.js";
import { QUOTE_STATUSES } from "@/constants/quote.constant.js";

export class QuoteRepository implements IQuoteRepository {
  async create(data: CreateQuoteDTO): Promise<QuoteDocument> {
    return QuoteModel.create(data);
  }

  async findAllPaginated(params: {
    skip: number;
    limit: number;
    status?: string;
  }): Promise<{ data: QuoteDocument[]; total: number }> {
    const filter = params.status ? { status: params.status } : {};

    const [data, total] = await Promise.all([
      QuoteModel.find(filter)
        .populate("service", "title")
        .sort({ createdAt: -1 })
        .skip(params.skip)
        .limit(params.limit)
        .exec(),
      QuoteModel.countDocuments(filter).exec(),
    ]);

    return { data, total };
  }

  async findById(id: string): Promise<QuoteDocument | null> {
    return QuoteModel.findById(id).populate("service", "title").exec();
  }

  async update(id: string, data: UpdateQuoteDTO): Promise<QuoteDocument | null> {
    return QuoteModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await QuoteModel.findByIdAndDelete(id).exec();
    return !!result;
  }

  async countByStatus(): Promise<Record<string, number>> {
    const results = await QuoteModel.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]).exec();

    const counts: Record<string, number> = Object.fromEntries(QUOTE_STATUSES.map((s) => [s, 0]));
    for (const r of results) counts[r._id] = r.count;
    return counts;
  }

  async countAll(): Promise<number> {
    return QuoteModel.countDocuments().exec();
  }
}
