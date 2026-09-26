import type { Request, Response, NextFunction } from "express";
import { PortfolioService } from "@/services/portfolio.service.js";
import { PortfolioRepository } from "@/repositories/portfolio.repository.js";
import { parsePagination, buildPaginationMeta } from "@/utils/pagination.js";

const portfolioService = new PortfolioService(new PortfolioRepository());

export async function getPublicPortfolio(req: Request, res: Response, next: NextFunction) {
  try {
    const category = typeof req.query.category === "string" ? req.query.category : undefined;
    const items = await portfolioService.getPublicList(category);
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
}

export async function getFeaturedPortfolio(_req: Request, res: Response, next: NextFunction) {
  try {
    const items = await portfolioService.getFeatured(6);
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
}

export async function getPortfolioBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await portfolioService.getBySlug(req.params.slug);
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
}

export async function getAdminPortfolio(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const search = typeof req.query.search === "string" ? req.query.search : undefined;
    const { data, total } = await portfolioService.getAdminList({ skip, limit, search });
    res.status(200).json({ success: true, data, meta: buildPaginationMeta(total, page, limit) });
  } catch (error) {
    next(error);
  }
}

export async function getPortfolioById(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await portfolioService.getById(req.params.id);
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
}

export async function createPortfolio(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await portfolioService.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
}

export async function updatePortfolio(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await portfolioService.update(req.params.id, req.body);
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
}

export async function deletePortfolio(req: Request, res: Response, next: NextFunction) {
  try {
    await portfolioService.delete(req.params.id);
    res.status(200).json({ success: true, message: "Réalisation supprimée" });
  } catch (error) {
    next(error);
  }
}
