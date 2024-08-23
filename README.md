# Simple Blog API

## Project Overview

The Simple Blog API is a RESTful API designed for managing blog posts. This project provides basic CRUD (Create, Read, Update, Delete) operations for blog posts using MongoDB with Mongoose as the Object Data Modeling (ODM) library. The API is built with Node.js and aims to help me gain a solid understanding of MongoDB CRUD operations, Mongoose schema setup, and REST API development.

## Features

- **Create**: Add new blog posts.
- **Read**: Retrieve existing blog posts.
- **Update**: Modify existing blog posts.
- **Delete**: Remove blog posts.

## Technologies

- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for Node.js to handle routing and middleware.
- **MongoDB**: NoSQL database for storing blog posts.
- **Mongoose**: ODM library for MongoDB and Node.js.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
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

- **Endpoint**: `POST /posts`
- **Description**: Create a new blog post.
- **Request Body**:

  ```json
  {
    "title": "Post Title",
    "content": "Post content goes here.",
    "author": "Author Name"
  }
  ```

- **Response**:

  ```json
  {
    "_id": "post_id",
    "title": "Post Title",
    "content": "Post content goes here.",
    "author": "Author Name",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```

### Get All Posts

- **Endpoint**: `GET /posts`
- **Description**: Retrieve all blog posts.
- **Response**:

  ```json
  [
    {
      "_id": "post_id",
      "title": "Post Title",
      "content": "Post content goes here.",
      "author": "Author Name",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    },
    ...
  ]
  ```

### Get a Single Post

- **Endpoint**: `GET /posts/:id`
- **Description**: Retrieve a blog post by its ID.
- **Response**:

  ```json
  {
    "_id": "post_id",
    "title": "Post Title",
    "content": "Post content goes here.",
    "author": "Author Name",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```

### Update a Post

- **Endpoint**: `PUT /posts/:id`
- **Description**: Update a blog post by its ID.
- **Request Body**:

  ```json
  {
    "title": "Updated Post Title",
    "content": "Updated content.",
    "author": "Updated Author Name"
  }
  ```

- **Response**:

  ```json
  {
    "_id": "post_id",
    "title": "Updated Post Title",
    "content": "Updated content.",
    "author": "Updated Author Name",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```

### Delete a Post

- **Endpoint**: `DELETE /posts/:id`
- **Description**: Delete a blog post by its ID.
- **Response**:

  ```json
  {
    "message": "Post deleted successfully."
  }
  ```

## Folder Structure

```text
/simpleBlogAPI
│
├── /models
│   └── post.js
│
├── /routes
│   └── posts.js
│
├── /controllers
│   └── postController.js
│
├── server.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── LICENSE
└── README.md
```

## Contributing

Feel free to open issues or submit pull requests to contribute to the project. For major changes or feature requests, please discuss them via an issue before submitting a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
