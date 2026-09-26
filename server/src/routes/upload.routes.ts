import { Router } from "express";
import { uploadImage } from "@/controllers/upload.controller.js";
import { protect, restrictTo } from "@/middlewares/auth.middleware.js";
import { upload } from "@/middlewares/upload.middleware.js";
import { Role } from "@/constants/roles.constant.js";

const router = Router();

router.post("/image", protect, restrictTo(Role.ADMIN, Role.EDITOR), upload.single("file"), uploadImage);

export default router;
