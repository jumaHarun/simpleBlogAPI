// @ts-check
const Post = require("../models/Post");
const asyncHandler = require("express-async-handler");

// Get all posts
exports.getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find();

  if (!posts) {
    const err = new Error("No posts found.");
    err.status = 404;
    return next(err);
  } else if (posts.length < 1) {
    res.status(204).send("No blog posts to show.");
  } else {
    res.status(200).json(posts);
  }
});

// Get a specific post
exports.getPostById = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: getPostById: ${req.params.id}`);
});

// Create a post
exports.createPost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: createPost");
});

// Update a post
exports.updatePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: updatePost");
});

// Delete a post
exports.deletePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: deletePost");
});
