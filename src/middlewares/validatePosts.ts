import { body, param, ValidationChain } from "express-validator";
import mongoose from "mongoose";

export const validatePostId: ValidationChain[] = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid post ID. Please provide a valid ObjectId."),
];

export const validateCreatePost: ValidationChain[] = [
  body("title")
    .exists({ values: "falsy" })
    .withMessage("Title is required.")
    .isString()
    .withMessage("Title must be a string.")
    .isLength({ min: 5 })
    .withMessage("Title must be at least 5 characters long"),
  body("content")
    .exists({ values: "falsy" })
    .withMessage("Content is required.")
    .isString()
    .withMessage("Content must be a string.")
    .isLength({ min: 20 })
    .withMessage("Content must be at least 20 characters long"),
  body("author")
    .exists({ values: "falsy" })
    .withMessage("Author is required.")
    .isString()
    .withMessage("Author must be a string."),
];

export const validateUpdatePost: ValidationChain[] = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid post ID. Please provide a valid ObjectId."),
  body()
    .custom((value) => {
      const { title, content, author } = value;
      if (!title && !content && !author) {
        throw new Error(
          "Please provide at least one of title, content, or author."
        );
      }
      return true;
    })
    .withMessage("Please provide at least one of title, content, or author."),
];
