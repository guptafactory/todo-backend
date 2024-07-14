import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";

import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";

const app = express();

config({
  path: "./data/config.env",
});

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Using routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

export default app;
