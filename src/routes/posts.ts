import express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.ts";

const router = express.Router();

router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostById);
router.post("/posts", createPost);
router.patch("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

export default router;
