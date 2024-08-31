# Simple Blog API

## Project Overview

The Simple Blog API is a RESTful API designed for managing blog posts. This project provides basic CRUD (Create, Read, Update, Delete) operations for blog posts using MongoDB with Mongoose as the Object Data Modeling (ODM) library. The API is built with Node.js with TypeScript, and aims to help me gain a solid understanding of MongoDB CRUD operations, Mongoose schema setup, and REST API development.

## Features

- **Create**: Add new blog posts.
- **Read**: Retrieve existing blog posts.
- **Update**: Modify existing blog posts.
- **Delete**: Remove blog posts.

## Technologies

- **Node.js**: JavaScript runtime for building the server.
- **TypeScript**: Typed superset of JavaScript that adds Type safety.
- **Express**: Web framework for Node.js to handle routing and middleware.
- **MongoDB**: NoSQL database for storing blog posts.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **Jest**: Testing library.
- **Swagger**: API Documentation.
- **express-async-handler**: Express Library to handle asynchronous code.
- **express-validator**: Express Library to validate incoming data from requests.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 22 or higher)
- [MongoDB](https://www.mongodb.com/) (local installation or cloud-based service like MongoDB Atlas)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/jumaHarun/simpleBlogAPI.git
   cd simpleBlogAPI
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory of the project and add the following environment variables:

   ```.env
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   ```

   Replace `your_mongodb_connection_string` with your actual MongoDB connection string. If using MongoDB Atlas, you can find this in your MongoDB Atlas dashboard.

4. **Start the server**

   ```bash
   npm start
   ```

   The server will start on port 3000 by default, or the port specified in the `.env` file.

## API Endpoints

### Create a Post

- **Endpoint**: `POST /api/posts`

### Get All Posts

- **Endpoint**: `GET /api/posts`

### Get a Single Post

- **Endpoint**: `GET /api/posts/:id`

### Update a Post

- **Endpoint**: `PUT /api/posts/:id`

### Delete a Post

- **Endpoint**: `DELETE /api/posts/:id`

### API Documentation

The documentation for the features implemented is available at `/api-docs`

## Folder Structure

```text
/simpleBlogAPI
│
├── /node_modules
├── /src
├──── /__tests__
│     └── postController.test.ts
│
├──── /controllers
│     └── postController.ts
│
├──── /middlewares
│     └── errorHandler.ts
│     └── handleValidationError.ts
│     └── validatePosts.ts
│
├──── /models
│     └── Post.ts
│
├──── /routes
│     └── posts.ts│
│
├──── server.ts
├──── swaggerOptions.ts
│
├── .env
├── .gitignore
├── jest.config.js
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

## Contributing

Feel free to open issues or submit pull requests to contribute to the project. For major changes or feature requests, please discuss them via an issue before submitting a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
