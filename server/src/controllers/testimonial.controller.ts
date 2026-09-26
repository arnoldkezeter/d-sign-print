import type { Request, Response, NextFunction } from "express";
import { TestimonialService } from "@/services/testimonial.service.js";
import { TestimonialRepository } from "@/repositories/testimonial.repository.js";
import { parsePagination, buildPaginationMeta } from "@/utils/pagination.js";

const testimonialService = new TestimonialService(new TestimonialRepository());

export async function getPublicTestimonials(_req: Request, res: Response, next: NextFunction) {
  try {
    const testimonials = await testimonialService.getPublicList();
    res.status(200).json({ success: true, data: testimonials });
  } catch (error) {
    next(error);
  }
}

export async function getAdminTestimonials(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const { data, total } = await testimonialService.getAdminList({ skip, limit });
    res.status(200).json({ success: true, data, meta: buildPaginationMeta(total, page, limit) });
  } catch (error) {
    next(error);
  }
}

export async function getTestimonialById(req: Request, res: Response, next: NextFunction) {
  try {
    const testimonial = await testimonialService.getById(req.params.id);
    res.status(200).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
}

export async function createTestimonial(req: Request, res: Response, next: NextFunction) {
  try {
    const testimonial = await testimonialService.create(req.body);
    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
}

export async function updateTestimonial(req: Request, res: Response, next: NextFunction) {
  try {
    const testimonial = await testimonialService.update(req.params.id, req.body);
    res.status(200).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
}

export async function deleteTestimonial(req: Request, res: Response, next: NextFunction) {
  try {
    await testimonialService.delete(req.params.id);
    res.status(200).json({ success: true, message: "Témoignage supprimé" });
  } catch (error) {
    next(error);
  }
}
