import { Router } from "express";
import { getDashboardStats } from "@/controllers/dashboard.controller.js";
import { protect, restrictTo } from "@/middlewares/auth.middleware.js";
import { Role } from "@/constants/roles.constant.js";

const router = Router();

router.get("/stats", protect, restrictTo(Role.ADMIN, Role.EDITOR), getDashboardStats);

export default router;
