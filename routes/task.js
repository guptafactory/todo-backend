import express from "express";

import isAuthenticated from "../middlewares/auth.js";
import { newTask } from "../controllers/task.js";

const router = express.Router();

router.post("/new", isAuthenticated, newTask);

export default router;
