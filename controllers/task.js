import Task from "../models/task.js";
import jwt from "jsonwebtoken";

export async function newTask(req, res) {
  // title, desc, user
  const { token } = req.cookies;

  if (!token)
    return res.status(404).json({
      success: false,
      message: "Unauthorised access! Login first.",
    });

  const { title, description } = req.body;

  if (!title || !description)
    return res.status(404).json({
      success: false,
      message: "Invalid title/description. Try again!",
    });

  const user = jwt.decode(token, process.env.JWT_SECRET);

  const task = await Task.create({
    title,
    description,
    user: user._id,
  });

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    task,
  });
}
