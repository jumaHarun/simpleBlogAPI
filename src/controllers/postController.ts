import { Request, Response } from "express";
import Post from "../models/Post.ts";
import asyncHandler from "express-async-handler";

// Get all posts
export const getAllPosts = asyncHandler(
  async (req: Request, res: Response, next) => {
    const posts = await Post.find();

    if (posts.length < 1) {
      res.status(404).json([{ message: `No posts found.` }]);
    }

    res.status(200).json(posts);
  }
);

// Get a specific post
export const getPostById = asyncHandler(
  async (req: Request, res: Response, next) => {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      res.status(404).json({ message: `Post with ID ${id} not found.` });
    }

    res.status(200).json(post);
  }
);

// Create a post
export const createPost = asyncHandler(
  async (req: Request, res: Response, next) => {
    const { title, content, author } = req.body;

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

    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedPost) {
      res.status(404).json({ message: `Post with ID ${id} not found.` });
    }

    res.status(200).json(updatedPost);
  }
);

// Delete a post
export const deletePost = asyncHandler(
  async (req: Request, res: Response, next) => {
    const { id } = req.params;

    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      res.status(404).json({ message: `Post with ID ${id} not found.` });
    }

    res.status(200).json({ message: "Post deleted." });
  }
);
