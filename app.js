import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";

import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

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
app.use(errorMiddleware);

// Using routes
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

app.get("/", (req, res) => {
  res.send("<p>API working!</p>");
});

export default app;
