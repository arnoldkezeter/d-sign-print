import { Router } from "express";
import {
  createContactMessage,
  getAdminContactMessages,
  markContactMessageAsRead,
  deleteContactMessage,
} from "@/controllers/contact.controller.js";
import { protect, restrictTo } from "@/middlewares/auth.middleware.js";
import { validate } from "@/middlewares/validate.middleware.js";
import { createContactMessageSchema } from "@/validators/contact.validator.js";
import { Role } from "@/constants/roles.constant.js";

const router = Router();

// Public : formulaire de contact du site vitrine
router.post("/", validate(createContactMessageSchema), createContactMessage);

// Admin
router.get("/", protect, restrictTo(Role.ADMIN, Role.EDITOR), getAdminContactMessages);
router.patch("/:id/read", protect, restrictTo(Role.ADMIN, Role.EDITOR), markContactMessageAsRead);
router.delete("/:id", protect, restrictTo(Role.ADMIN), deleteContactMessage);

export default router;
