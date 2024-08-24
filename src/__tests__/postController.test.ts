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

describe("POST /posts", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testDB");
  });

  afterEach(async () => {
    await Post.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create and save a post to the database", async () => {
    const response = await request(app).post("/api/posts").send({
      title: "Post 1",
      content: "This is content for Post 1",
      author: "Author 1",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body["title"]).toBe("Post 1");
    expect(response.body["content"]).toBe("This is content for Post 1");
    expect(response.body["author"]).toBe("Author 1");
  });
});

describe("PATCH /posts/:id", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testDB");
  });

  afterEach(async () => {
    await Post.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should update a post partially", async () => {
    const post1 = new Post({
      title: "Post 1",
      content: "This is content for Post 1",
      author: "Author 1",
    });

    await post1.save();

    const response = await request(app).patch(`/api/posts/${post1._id}`).send({
      title: "Updated Post 1",
    });

    expect(response.status).toBe(200);
    expect(response.body["title"]).toBe("Updated Post 1");
  });

  it("should update a post completely", async () => {
    const post1 = new Post({
      title: "Post 1",
      content: "This is content for Post 1",
      author: "Author 1",
    });

    await post1.save();

    const response = await request(app).patch(`/api/posts/${post1._id}`).send({
      title: "Updated Post 1",
      content: "This is the updated content for Post 1",
      author: "Updated Author 1",
    });

    expect(response.status).toBe(200);
    expect(response.body["title"]).toBe("Updated Post 1");
    expect(response.body["content"]).toBe(
      "This is the updated content for Post 1"
    );
    expect(response.body["author"]).toBe("Updated Author 1");
  });

  it("should update the updatedAt field when a post is updated", async () => {
    const post = new Post({
      title: "Post 1",
      content: "This is content for Post 1",
      author: "Author 1",
    });

    await post.save();

    // Use `getTime()` since toBeGreaterThan expects type `number | bigint`
    const initialupdatedAt = post.updatedAt.getTime();

    // Wait a moment to ensure the updatedAt field will change
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update the post
    await Post.findByIdAndUpdate(post._id, { title: "Updated Post 1" });

    // Retrieve the updated post
    const updatedPost = await Post.findById(post._id);
    const newUpdatedAt = updatedPost!.updatedAt.getTime();

    expect(newUpdatedAt).not.toEqual(initialupdatedAt);
    expect(newUpdatedAt).toBeGreaterThan(initialupdatedAt);
  });
});
