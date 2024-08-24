import request from "supertest";
import express, { Application } from "express";
import mongoose from "mongoose";
import Post from "../models/Post.ts";
import postRouter from "../routes/posts.ts";

const app: Application = express();
app.use(express.json());
app.use("/api", postRouter);

describe("GET /posts", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testDB");
  });

  afterEach(async () => {
    await Post.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should return all posts", async () => {
    const post1 = new Post({
      title: "Post 1",
      content: "This is content for Post 1",
      author: "Author 1",
    });
    const post2 = new Post({
      title: "Post 2",
      content: "This is content for Post 2",
      author: "Author 2",
    });

    await post1.save();
    await post2.save();

    const response = await request(app).get("/api/posts");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(3);
    expect(response.body[1].title).toBe(post1.title);
    expect(response.body[2].title).toBe(post2.title);
  });
});

describe("GET /posts/:id", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testDB");
  });

  afterEach(async () => {
    await Post.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should find and return a specific post using its _id", async () => {
    const post1 = new Post({
      title: "Post 1",
      content: "This is content for Post 1",
      author: "Author 1",
    });

    await post1.save();

    const response = await request(app).get(`/api/posts/${post1._id}`);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(post1.title);
    expect(response.body.author).toBe(post1.author);
    expect(response.body.content).toBe(post1.content);
  });
});