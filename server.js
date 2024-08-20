// @ts-check
const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

const port = process.env.PORT;
const uri = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

main().catch((err) => {
  console.error(err);
});
async function main() {
  if (uri) {
    await mongoose.connect(uri);
  } else {
    throw new Error("Please provide a link to your MongoDB database");
  }
}

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
