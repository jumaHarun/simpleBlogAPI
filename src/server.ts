import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRouter from "./routes/posts.ts";

dotenv.config();

const app: Application = express();
app.use(express.json());

const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI!;

mongoose.set("strictQuery", false);

main().catch((err) => {
  console.error(err);
});
async function main() {
  await mongoose.connect(uri);
}

app.get("/", (req: Request, res: Response) => {
  res.redirect("/api/posts");
});

app.use("/api", postRouter);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
