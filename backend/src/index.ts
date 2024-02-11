import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config(); // Load environment variables from .env file

const uri = process.env.MONGODB_CONNECTION_STRING;
if (!uri) {
  throw new Error(
    "Please define the MONGODB_CONNECTION_STRING environment variable"
  );
}

mongoose.connect(uri);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "Hello from express endpoint" });
});

app.listen(7000, () => {
  console.log("Server is listening on localhost:7000");
});
