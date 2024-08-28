import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { swaggerDocsSpecs } from "./swaggerOptions.ts";
import postRouter from "./routes/posts.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";

dotenv.config();

const app: Application = express();
app.use(express.json());

const port = process.env.PORT || 3000;
/**
 * Please include the database you are using in the URL.
 * E.g., "mongodb://localhost:27017/testDB"
 */
const uri = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

main().catch((err) => {
  console.error(err);
});
async function main() {
  if (!uri) {
    throw new Error("Please provide your MongoDB database URL.");
  }
  await mongoose.connect(uri);
}

app.get("/", (req: Request, res: Response) => {
  res.redirect("/api/posts");
});

app.use("/api", postRouter);
app.use(errorHandler);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(
    swaggerDocsSpecs /*, {
    customCssUrl:
      "https://cdn.jsdelivr.net/npm/[email protected]/themes/3.x/theme-newspaper.css",
  }*/
  )
);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
