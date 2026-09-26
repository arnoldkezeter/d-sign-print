import type { Request, Response, NextFunction } from "express";
import { ContactService } from "@/services/contact.service.js";
import { ContactRepository } from "@/repositories/contact.repository.js";
import { parsePagination, buildPaginationMeta } from "@/utils/pagination.js";

const contactService = new ContactService(new ContactRepository());

export async function createContactMessage(req: Request, res: Response, next: NextFunction) {
  try {
    await contactService.create(req.body);
    res.status(201).json({ success: true, message: "Message envoyé avec succès" });
  } catch (error) {
    next(error);
  }
}

export async function getAdminContactMessages(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const isRead = req.query.isRead === "true" ? true : req.query.isRead === "false" ? false : undefined;

    const { data, total } = await contactService.getAdminList({ skip, limit, isRead });

    res.status(200).json({ success: true, data, meta: buildPaginationMeta(total, page, limit) });
  } catch (error) {
    next(error);
  }
}

export async function markContactMessageAsRead(req: Request, res: Response, next: NextFunction) {
  try {
    const message = await contactService.markAsRead(req.params.id);
    res.status(200).json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
}

export async function deleteContactMessage(req: Request, res: Response, next: NextFunction) {
  try {
    await contactService.delete(req.params.id);
    res.status(200).json({ success: true, message: "Message supprimé" });
  } catch (error) {
    next(error);
  }
}
