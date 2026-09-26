import { Router } from "express";
import {
  createQuote,
  getAdminQuotes,
  getQuoteById,
  updateQuote,
  deleteQuote,
} from "@/controllers/quote.controller.js";
import { protect, restrictTo } from "@/middlewares/auth.middleware.js";
import { validate } from "@/middlewares/validate.middleware.js";
import { createQuoteSchema, updateQuoteSchema } from "@/validators/quote.validator.js";
import { Role } from "@/constants/roles.constant.js";

const router = Router();

router.post("/", validate(createQuoteSchema), createQuote);

router.get("/", protect, restrictTo(Role.ADMIN, Role.EDITOR), getAdminQuotes);
router.get("/:id", protect, restrictTo(Role.ADMIN, Role.EDITOR), getQuoteById);
router.patch("/:id", protect, restrictTo(Role.ADMIN, Role.EDITOR), validate(updateQuoteSchema), updateQuote);
router.delete("/:id", protect, restrictTo(Role.ADMIN), deleteQuote);

export default router;
