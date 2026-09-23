import { Router } from "express";
import {
  getPublicServices,
  getServiceBySlug,
  getAdminServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "@/controllers/service.controller.js";
import { protect, restrictTo } from "@/middlewares/auth.middleware.js";
import { validate } from "@/middlewares/validate.middleware.js";
import { createServiceSchema, updateServiceSchema } from "@/validators/service.validator.js";
import { Role } from "@/constants/roles.constant.js";

const router = Router();

// Routes publiques
router.get("/", getPublicServices);
router.get("/slug/:slug", getServiceBySlug);

// Routes admin (ordre important : /admin AVANT /:id pour éviter que Express
// interprète "admin" comme un id)
router.get("/admin", protect, getAdminServices);
router.get("/:id", protect, getServiceById);
router.post("/", protect, restrictTo(Role.ADMIN, Role.EDITOR), validate(createServiceSchema), createService);
router.patch("/:id", protect, restrictTo(Role.ADMIN, Role.EDITOR), validate(updateServiceSchema), updateService);
router.delete("/:id", protect, restrictTo(Role.ADMIN), deleteService);

export default router;