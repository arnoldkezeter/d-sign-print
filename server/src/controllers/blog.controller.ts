import type { Request, Response, NextFunction } from "express";
import { BlogService } from "@/services/blog.service.js";
import { BlogRepository } from "@/repositories/blog.repository.js";
import { parsePagination, buildPaginationMeta } from "@/utils/pagination.js";

const blogService = new BlogService(new BlogRepository());

export async function getPublicBlogPosts(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const { data, total } = await blogService.getPublicList({ skip, limit });
    res.status(200).json({ success: true, data, meta: buildPaginationMeta(total, page, limit) });
  } catch (error) {
    next(error);
  }
}

export async function getBlogPostBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await blogService.getBySlug(req.params.slug);
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
}

export async function getAdminBlogPosts(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const search = typeof req.query.search === "string" ? req.query.search : undefined;
    const { data, total } = await blogService.getAdminList({ skip, limit, search });
    res.status(200).json({ success: true, data, meta: buildPaginationMeta(total, page, limit) });
  } catch (error) {
    next(error);
  }
}

export async function getBlogPostById(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await blogService.getById(req.params.id);
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
}

export async function createBlogPost(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await blogService.create(req.body);
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
}

export async function updateBlogPost(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await blogService.update(req.params.id, req.body);
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
}

export async function deleteBlogPost(req: Request, res: Response, next: NextFunction) {
  try {
    await blogService.delete(req.params.id);
    res.status(200).json({ success: true, message: "Article supprimé" });
  } catch (error) {
    next(error);
  }
}
