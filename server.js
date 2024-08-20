// @ts-check
const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./routes/postRoutes");

require("dotenv").config();

const app = express();
app.use(express.json());

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

app.use("/api", postRoutes);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
