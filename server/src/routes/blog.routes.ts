import { Router } from "express";
import {
  getPublicBlogPosts,
  getBlogPostBySlug,
  getAdminBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "@/controllers/blog.controller.js";
import { protect, restrictTo } from "@/middlewares/auth.middleware.js";
import { validate } from "@/middlewares/validate.middleware.js";
import { createBlogPostSchema, updateBlogPostSchema } from "@/validators/blog.validator.js";
import { Role } from "@/constants/roles.constant.js";

const router = Router();

router.get("/", getPublicBlogPosts);
router.get("/slug/:slug", getBlogPostBySlug);

router.get("/admin", protect, restrictTo(Role.ADMIN, Role.EDITOR), getAdminBlogPosts);
router.get("/:id", protect, restrictTo(Role.ADMIN, Role.EDITOR), getBlogPostById);
router.post("/", protect, restrictTo(Role.ADMIN, Role.EDITOR), validate(createBlogPostSchema), createBlogPost);
router.patch("/:id", protect, restrictTo(Role.ADMIN, Role.EDITOR), validate(updateBlogPostSchema), updateBlogPost);
router.delete("/:id", protect, restrictTo(Role.ADMIN), deleteBlogPost);

export default router;
