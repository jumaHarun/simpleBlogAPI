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
        name: "posts/",
        description: "No url parameter required.",
      },
      {
        name: "posts/:id",
        description: "Requires the url parameter id to be passed.",
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
      "/api/posts": {
        post: {
          tags: ["posts/"],
          summary: "Creates a new post.",
          operationId: "createPost",
          requestBody: {
            description: "Post to add to the database",
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
              description: "The post was created successfully.",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Post",
                  },
                },
              },
            },
            default: {
              description: "unexpected error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                },
              },
            },
          },
        },
        get: {
          tags: ["posts/"],
          summary: "Retrieves a list of posts.",
          operationId: "getAllPosts",
          responses: {
            200: {
              description: "A list of all available posts.",
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
              description: "No posts are available.",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                  example: {
                    message: "No posts found.",
                  },
                },
              },
            },
            default: {
              description: "unexpected error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                },
              },
            },
          },
        },
      },
      "/api/posts/{id}": {
        get: {
          tags: ["posts/:id"],
          summary: "Retrieves a specific post by ID.",
          operationId: "getPostById",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "the id of the post",
              required: true,
              schema: {
                type: "string",
              },
              example: "605c72b6b5d6e2b3f4e5b1c4",
            },
          ],
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
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts"],
};

export const swaggerDocsSpecs = swaggerJsdoc(swaggerOptions);
