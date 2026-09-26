import { Router } from "express";
import { login, logout, me, register, refresh, listUsers, setUserActive, deleteUser } from "@/controllers/auth.controller.js";
import { protect, restrictTo } from "@/middlewares/auth.middleware.js";
import { validate } from "@/middlewares/validate.middleware.js";
import { loginSchema, createUserSchema } from "@/validators/auth.validator.js";
import { Role } from "@/constants/roles.constant.js";

const router = Router();

router.post("/login", validate(loginSchema), login);
router.post("/refresh", refresh); // pas de `protect` ici : lit le refresh token lui-même
router.post("/logout", logout);
router.get("/me", protect, me);

router.post("/register", protect, restrictTo(Role.ADMIN), validate(createUserSchema), register);
router.get("/users", protect, restrictTo(Role.ADMIN), listUsers);
router.patch("/users/:id/active", protect, restrictTo(Role.ADMIN), setUserActive);
router.delete("/users/:id", protect, restrictTo(Role.ADMIN), deleteUser);

export default router;