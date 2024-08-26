import express from "express";
import {
  validateCreatePost,
  validatePostId,
  validateUpdatePost,
} from "../middlewares/validatePosts.ts";
import { handleValidationErrors } from "../middlewares/handleValidationErrors.ts";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.ts";

const router = express.Router();

router.get("/posts", getAllPosts);
router.get("/posts/:id", validatePostId, handleValidationErrors, getPostById);
router.post("/posts", validateCreatePost, handleValidationErrors, createPost);
router.patch(
  "/posts/:id",
  validateUpdatePost,
  handleValidationErrors,
  updatePost
);
router.delete("/posts/:id", validatePostId, handleValidationErrors, deletePost);

export default router;
