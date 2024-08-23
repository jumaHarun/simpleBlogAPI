import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
    minLength: [5, "Title must be at least 5 characters long"],
    trim: true,
  },
  content: {
    type: String,
    required: [true, "Content is required."],
    minLength: [20, "Content must be at least 20 characters long"],
  },
  author: {
    type: String,
    required: [true, "Author is required."],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the `updatedAt` field before saving
PostSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Virtual for blog's URL
PostSchema.virtual("url").get(function () {
  return `/posts/${this._id}`;
});

export default mongoose.model("Post", PostSchema);
