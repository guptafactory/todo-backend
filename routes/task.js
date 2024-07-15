import express from "express";

import isAuthenticated from "../middlewares/auth.js";
import {
  newTask,
  getAllTasks,
  modifyTaskDetails,
  modifyTaskStatus,
  deleteTask,
} from "../controllers/task.js";

const router = express.Router();

router.post("/new", isAuthenticated, newTask);

router.get("/all", isAuthenticated, getAllTasks);

router.put("/modify/:taskId", isAuthenticated, modifyTaskDetails);

router.put("/changeStatus/:taskId", isAuthenticated, modifyTaskStatus);

router.get("/remove/:taskId", isAuthenticated, deleteTask);

export default router;
