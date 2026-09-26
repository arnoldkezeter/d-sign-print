import type { Request, Response, NextFunction } from "express";
import { QuoteService } from "@/services/quote.service.js";
import { QuoteRepository } from "@/repositories/quote.repository.js";
import { parsePagination, buildPaginationMeta } from "@/utils/pagination.js";

const quoteService = new QuoteService(new QuoteRepository());

// Public : formulaire de demande de devis du site vitrine
export async function createQuote(req: Request, res: Response, next: NextFunction) {
  try {
    const quote = await quoteService.create(req.body);
    res.status(201).json({
      success: true,
      message: "Votre demande de devis a été envoyée. Nous vous répondrons rapidement.",
      data: quote,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAdminQuotes(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const status = typeof req.query.status === "string" ? req.query.status : undefined;
    const { data, total } = await quoteService.getAdminList({ skip, limit, status });
    res.status(200).json({ success: true, data, meta: buildPaginationMeta(total, page, limit) });
  } catch (error) {
    next(error);
  }
}

export async function getQuoteById(req: Request, res: Response, next: NextFunction) {
  try {
    const quote = await quoteService.getById(req.params.id);
    res.status(200).json({ success: true, data: quote });
  } catch (error) {
    next(error);
  }
}

export async function updateQuote(req: Request, res: Response, next: NextFunction) {
  try {
    const quote = await quoteService.update(req.params.id, req.body);
    res.status(200).json({ success: true, data: quote });
  } catch (error) {
    next(error);
  }
}

export async function deleteQuote(req: Request, res: Response, next: NextFunction) {
  try {
    await quoteService.delete(req.params.id);
    res.status(200).json({ success: true, message: "Demande supprimée" });
  } catch (error) {
    next(error);
  }
}
