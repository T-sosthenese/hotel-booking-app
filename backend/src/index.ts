import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";

// dotenv.config(); // Load environment variables from .env file

if (process.env.NODE_ENV === "e2e") {
  dotenv.config({ path: ".env.e2e" });
} else {
  dotenv.config(); // This will load .env by default
}

// const uri = process.env.MONGODB_CONNECTION_STRING;
// if (!uri) {
//   throw new Error(
//     "Please define the MONGODB_CONNECTION_STRING environment variable"
//   );
// }

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(7000, () => {
  console.log("Server is listening on localhost:7000");
});
