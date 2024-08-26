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
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts"],
};

export const swaggerDocsSpecs = swaggerJsdoc(swaggerOptions);
