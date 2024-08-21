// @ts-check
const mongoose = require("mongoose");
const Post = require("../models/Post");
const asyncHandler = require("express-async-handler");

// Get all posts
exports.getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find();

  if (posts.length < 1) {
    res.status(404).json({ message: "No blog posts to show." });
  } else {
    res.status(200).json(posts);
  }
});

// Get a specific post
exports.getPostById = asyncHandler(async (req, res, next) => {
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
});

// Create a post
exports.createPost = asyncHandler(async (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !author || !content) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const post = new Post({
    title,
    content,
    author,
  });

  const newPost = await post.save();

  res.status(201).json(newPost);
});

// Update a post
exports.updatePost = asyncHandler(async (req, res, next) => {
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
});

// Delete a post
exports.deletePost = asyncHandler(async (req, res, next) => {
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
});
