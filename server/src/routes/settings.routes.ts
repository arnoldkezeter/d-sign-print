import { Router } from "express";
import { getSettings, updateSettings } from "@/controllers/settings.controller.js";
import { protect, restrictTo } from "@/middlewares/auth.middleware.js";
import { validate } from "@/middlewares/validate.middleware.js";
import { updateSettingsSchema } from "@/validators/settings.validator.js";
import { Role } from "@/constants/roles.constant.js";

const router = Router();

router.get("/", getSettings);
router.patch("/", protect, restrictTo(Role.ADMIN), validate(updateSettingsSchema), updateSettings);

export default router;
