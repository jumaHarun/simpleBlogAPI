// @ts-check
const Post = require("../models/Post");
const asyncHandler = require("express-async-handler");

// Get all posts
exports.getAllPosts = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: getAllPosts");
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
