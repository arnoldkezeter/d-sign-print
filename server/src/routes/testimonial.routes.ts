import { Router } from "express";
import {
  getPublicTestimonials,
  getAdminTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/controllers/testimonial.controller.js";
import { protect, restrictTo } from "@/middlewares/auth.middleware.js";
import { validate } from "@/middlewares/validate.middleware.js";
import { createTestimonialSchema, updateTestimonialSchema } from "@/validators/testimonial.validator.js";
import { Role } from "@/constants/roles.constant.js";

const router = Router();

router.get("/", getPublicTestimonials);
router.get("/admin", protect, restrictTo(Role.ADMIN, Role.EDITOR), getAdminTestimonials);
router.get("/:id", protect, restrictTo(Role.ADMIN, Role.EDITOR), getTestimonialById);
router.post("/", protect, restrictTo(Role.ADMIN, Role.EDITOR), validate(createTestimonialSchema), createTestimonial);
router.patch("/:id", protect, restrictTo(Role.ADMIN, Role.EDITOR), validate(updateTestimonialSchema), updateTestimonial);
router.delete("/:id", protect, restrictTo(Role.ADMIN), deleteTestimonial);

export default router;
