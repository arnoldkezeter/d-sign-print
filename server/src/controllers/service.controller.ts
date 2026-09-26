import type { Request, Response, NextFunction } from "express";
import { ServiceService } from "@/services/service.service.js";
import { ServiceRepository } from "@/repositories/service.repository.js";
import { parsePagination, buildPaginationMeta } from "@/utils/pagination.js";

const serviceService = new ServiceService(new ServiceRepository());

// --- Public ---

export async function getPublicServices(_req: Request, res: Response, next: NextFunction) {
  try {
    const services = await serviceService.getPublicList();
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    next(error);
  }
}

export async function getServiceBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const service = await serviceService.getBySlug(req.params.slug);
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
}

// --- Admin ---

export async function getAdminServices(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const search = typeof req.query.search === "string" ? req.query.search : undefined;

    const { data, total } = await serviceService.getAdminList({ skip, limit, search });

    res.status(200).json({
      success: true,
      data,
      meta: buildPaginationMeta(total, page, limit),
    });
  } catch (error) {
    next(error);
  }
}

export async function getServiceById(req: Request, res: Response, next: NextFunction) {
  try {
    const service = await serviceService.getById(req.params.id);
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
}

export async function createService(req: Request, res: Response, next: NextFunction) {
  try {
    const service = await serviceService.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
}

export async function updateService(req: Request, res: Response, next: NextFunction) {
  try {
    const service = await serviceService.update(req.params.id, req.body);
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
}

export async function deleteService(req: Request, res: Response, next: NextFunction) {
  try {
    await serviceService.delete(req.params.id);
    res.status(200).json({ success: true, message: "Service supprimé" });
  } catch (error) {
    next(error);
  }
}