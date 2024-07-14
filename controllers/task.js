import Task from "../models/task.js";
import jwt from "jsonwebtoken";

export async function newTask(req, res) {
  const { title, description } = req.body;

  const task = await Task.create({
    title,
    description,
    user: req.user,
  });

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    task,
  });
}
