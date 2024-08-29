import swaggerJsdoc, { OAS3Options } from "swagger-jsdoc";
import { version } from "package.json";

const swaggerOptions: OAS3Options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Simple Blog API",
      version: version,
      description:
        "This is a RESTful API designed for managing blog posts. This project provides basic CRUD (Create, Read, Update, Delete) operations for blog posts using MongoDB with Mongoose as the Object Data Modeling (ODM) library. The API is built with TypeScript and Node.js, and aims to help me gain a solid understanding of MongoDB CRUD operations, Mongoose schema setup, and REST API development and documentation.",
      contact: {
        name: "Juma Harun",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    tags: [
      {
        name: "posts",
        description: "The Blog Posts Managing API.",
      },
    ],
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Development server",
      },
      {
        url: "TBD",
        description: "Production server",
      },
    ],
    paths: {
      "/posts": {
        post: {
          tags: ["posts"],
          summary: "Creates a new post",
          description: "Creates a new post",
          operationId: "createPost",
          requestBody: {
            description: "The post to add",
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NewPost",
                },
              },
            },
          },
          responses: {
            201: {
              description: "Successful operation",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Post",
                  },
                },
              },
            },
            default: {
              description: "Unexpected error",
              content: {
                "application/json": {
                  schema: {
                    oneOf: [
                      {
                        $ref: "#/components/schemas/Error",
                      },
                      {
                        $ref: "#/components/schemas/ValidationError",
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        get: {
          tags: ["posts"],
          summary: "Retrieves all posts",
          description: "Retrieves a list of available posts",
          operationId: "getAllPosts",
          responses: {
            200: {
              description: "Successful operation",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Post",
                    },
                  },
                },
              },
            },
            404: {
              description: "Posts not found",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Error",
                    },
                  },
                  example: [
                    {
                      message: "No posts found.",
                    },
                  ],
                },
              },
            },
            default: {
              description: "Unexpected error",
              content: {
                "application/json": {
                  schema: {
                    oneOf: [
                      {
                        $ref: "#/components/schemas/Error",
                      },
                      {
                        $ref: "#/components/schemas/ValidationError",
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      "/posts/{id}": {
        get: {
          tags: ["posts"],
          summary: "Find a post by ID",
          description: "Retrieves a single post",
          operationId: "getPostById",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "ID of the post to retrieve",
              required: true,
              schema: {
                type: "string",
              },
              example: "605c72b6b5d6e2b3f4e5b1c4",
            },
          ],
          responses: {
            200: {
              description: "Successful operation",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Post",
                  },
                },
              },
            },
            400: {
              description: "Invalid ID supplied",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ValidationError",
                  },
                  example: {
                    errors: [
                      {
                        type: "field",
                        value: "asd",
                        msg: "Invalid post ID. Please provide a valid ObjectId",
                        path: "id",
                        location: "param",
                      },
                    ],
                  },
                },
              },
            },
            404: {
              description: "Post not found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                  example: {
                    message: "Post with ID 705c72b6b5d6e2b3f4e5b1c4 not found",
                  },
                },
              },
            },
            default: {
              description: "Unexpected error",
              content: {
                "application/json": {
                  schema: {
                    oneOf: [
                      {
                        $ref: "#/components/schemas/Error",
                      },
                      {
                        $ref: "#/components/schemas/ValidationError",
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        patch: {
          tags: ["posts"],
          summary: "Updates a post found by ID",
          description: "Updates a single post partially or completely",
          operationId: "updatePost",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "ID of the post to retrieve",
              required: true,
              schema: {
                type: "string",
              },
              example: "605c72b6b5d6e2b3f4e5b1c4",
            },
          ],

          requestBody: {
            description: "Updates the title of a post",
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      example: "A day in the life",
                    },
                  },
                },
              },
            },
          },

          responses: {
            200: {
              description: "Successful operation",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Post",
                  },
                  example: {
                    _id: "605c72b6b5d6e2b3f4e5b1c4",
                    title: "A day in the life",
                    content:
                      "Here's what a day in the life of a Backend Developer is like...",
                    author: "John Doe",
                    createdAt: "2024-08-24T12:34:56.789Z",
                    updatedAt: new Date(),
                  },
                },
              },
            },
            400: {
              description: "Invalid ID supplied",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ValidationError",
                  },
                  example: {
                    errors: [
                      {
                        type: "field",
                        value: "asd",
                        msg: "Invalid post ID. Please provide a valid ObjectId",
                        path: "id",
                        location: "param",
                      },
                    ],
                  },
                },
              },
            },
            404: {
              description: "Post not found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                  example: {
                    message: "Post with ID 705c72b6b5d6e2b3f4e5b1c4 not found",
                  },
                },
              },
            },
            default: {
              description: "Unexpected error",
              content: {
                "application/json": {
                  schema: {
                    oneOf: [
                      {
                        $ref: "#/components/schemas/Error",
                      },
                      {
                        $ref: "#/components/schemas/ValidationError",
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ["posts"],
          summary: "Delete a post",
          description: "Deletes a post found by ID",
          operationId: "deletePost",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "ID of the post to retrieve",
              required: true,
              schema: {
                type: "string",
              },
              example: "605c72b6b5d6e2b3f4e5b1c4",
            },
          ],
          responses: {
            200: {
              description: "Successful operation",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                  example: {
                    message: "Post deleted",
                  },
                },
              },
            },
            400: {
              description: "Invalid ID supplied",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ValidationError",
                  },
                  example: {
                    errors: [
                      {
                        type: "field",
                        value: "asd",
                        msg: "Invalid post ID. Please provide a valid ObjectId",
                        path: "id",
                        location: "param",
                      },
                    ],
                  },
                },
              },
            },
            404: {
              description: "Post not found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                  example: {
                    message: "Post with ID 705c72b6b5d6e2b3f4e5b1c4 not found",
                  },
                },
              },
            },
            default: {
              description: "Unexpected error",
              content: {
                "application/json": {
                  schema: {
                    oneOf: [
                      {
                        $ref: "#/components/schemas/Error",
                      },
                      {
                        $ref: "#/components/schemas/ValidationError",
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Post: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "Auto-generated unique identifier for the post.",
              example: "605c72b6b5d6e2b3f4e5b1c4",
            },
            title: {
              type: "string",
              description: "Title of the post",
              example: "A day in the life of a Backend Developer",
            },
            content: {
              type: "string",
              description: "Content of the post",
              example:
                "Here's what a day in the life of a Backend Developer is like...",
            },
            author: {
              type: "string",
              description: "Author of the post",
              example: "John Doe",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Date when the post was created",
              example: "2024-08-24T12:34:56.789Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Date when the post was last updated",
              example: "2024-08-24T12:34:56.789Z",
            },
          },
        },

        NewPost: {
          type: "object",
          required: ["title", "content", "author"],
          properties: {
            title: {
              type: "string",
              description: "Title of the post",
              example: "A day in the life of a Backend Developer",
            },
            content: {
              type: "string",
              description: "Content of the post",
              example:
                "Here's what a day in the life of a Backend Developer is like...",
            },
            author: {
              type: "string",
              description: "Author of the post",
              example: "John Doe",
            },
          },
        },

        Error: {
          type: "object",
          required: ["message"],
          properties: {
            message: {
              type: "string",
            },
          },
        },

        ValidationError: {
          type: "object",
          properties: {
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  type: {
                    type: "string",
                  },
                  value: {
                    type: "string",
                  },
                  msg: {
                    type: "string",
                  },
                  path: {
                    type: "string",
                  },
                  location: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts"],
};

export const swaggerDocsSpecs = swaggerJsdoc(swaggerOptions);
