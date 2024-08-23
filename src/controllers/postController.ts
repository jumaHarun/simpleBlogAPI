import { Request, Response } from "express";
import mongoose from "mongoose";
import Post from "../models/Post.ts";
import asyncHandler from "express-async-handler";

// Get all posts
export const getAllPosts = asyncHandler(
  async (req: Request, res: Response, next) => {
    const posts = await Post.find();

    if (posts.length < 1) {
      res.status(404).json({ message: "No blog posts to show." });
    } else {
      // The first item is `postCount: ${posts.length}`
      res.status(200).json([`postCount: ${posts.length}`, ...posts]);
    }
  }
);

// Get a specific post
export const getPostById = asyncHandler(
  async (req: Request, res: Response, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid Post ID. Please provide a valid Post ID.");
    }

    const post = await Post.findById(id);

    if (!post) {
      res.status(404);
      throw new Error("Post not found");
    }

    res.status(200).json(post);
  }
);

// Create a post
export const createPost = asyncHandler(
  async (req: Request, res: Response, next) => {
    const { title, content, author } = req.body;

    if (!title || !author || !content) {
      res.status(400).json({ message: "Please add all required fields" });
      return;
    }

    const post = new Post({
      title,
      content,
      author,
    });

    const newPost = await post.save();

    res.status(201).json(newPost);
  }
);

// Update a post
export const updatePost = asyncHandler(
  async (req: Request, res: Response, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid Post ID. Please provide a valid Post ID.");
    }

    const updatedData = {
      ...req.body,
      updatedAt: Date.now(),
    };

    const updatedPost = await Post.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedPost) {
      res.status(404);
      throw new Error("Post not found");
    }

    res.status(200).json(updatedPost);
  }
);

// Delete a post
export const deletePost = asyncHandler(
  async (req: Request, res: Response, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid Post ID. Please provide a valid Post ID.");
    }

    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      res.status(404);
      throw new Error("Post not found");
    }

    res.status(200).json({ message: "Post deleted." });
  }
);
