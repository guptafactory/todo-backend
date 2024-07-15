import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";

import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import cors from "cors";

const app = express();

config({
  path: "./data/config.env",
});

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Using routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

app.use(errorMiddleware);

export default app;
