import { Router } from "express";
import {
  getPublicPortfolio,
  getFeaturedPortfolio,
  getPortfolioBySlug,
  getAdminPortfolio,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} from "@/controllers/portfolio.controller.js";
import { protect, restrictTo } from "@/middlewares/auth.middleware.js";
import { validate } from "@/middlewares/validate.middleware.js";
import { createPortfolioSchema, updatePortfolioSchema } from "@/validators/portfolio.validator.js";
import { Role } from "@/constants/roles.constant.js";

const router = Router();

router.get("/", getPublicPortfolio);
router.get("/featured", getFeaturedPortfolio);
router.get("/slug/:slug", getPortfolioBySlug);

router.get("/admin", protect, restrictTo(Role.ADMIN, Role.EDITOR), getAdminPortfolio);
router.get("/:id", protect, restrictTo(Role.ADMIN, Role.EDITOR), getPortfolioById);
router.post("/", protect, restrictTo(Role.ADMIN, Role.EDITOR), validate(createPortfolioSchema), createPortfolio);
router.patch("/:id", protect, restrictTo(Role.ADMIN, Role.EDITOR), validate(updatePortfolioSchema), updatePortfolio);
router.delete("/:id", protect, restrictTo(Role.ADMIN), deletePortfolio);

export default router;
