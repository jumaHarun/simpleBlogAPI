// @ts-check
const express = require("express");
const mongoose = require("mongoose");
const postRouter = require("./routes/posts");

require("dotenv").config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
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
  res.redirect("/api/posts");
});

app.use("/api", postRouter);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
