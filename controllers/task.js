import { mongoose } from "mongoose";
import Task from "../models/task.js";
import ErrorHandler from "../utils/errorHandler.js";

export async function newTask(req, res, next) {
  const { title, description } = req.body;

  if (!title || !description)
    return next(
      new ErrorHandler("Title or description is invalid. Try Again!", 400)
    );

  const task = await Task.create({
    title,
    description,
    user: req.user,
  });

  return res.status(201).json({
    success: true,
    message: "Task created successfully",
    task,
  });
}

export async function getAllTasks(req, res) {
  const userId = req.user._id;

  const allTasks = await Task.find({ user: userId });

  return res.status(200).json({
    success: true,
    message: "All Tasks fetched successfully",
    allTasks,
  });
}

export async function modifyTaskDetails(req, res) {
  const userId = req.user._id;
  const { title, description } = req.body;
  const { taskId } = req.params;

  if (!taskId || !mongoose.Types.ObjectId.isValid(taskId)) {
    return next(new ErrorHandler("Invalid Task Id. Try Again!", 400));
  }

  const task = await Task.findById(taskId);
  const sameUser = task?.user.toString() === userId.toString(); // convert object to string

  if (!title || !description || !sameUser)
    return next(
      new ErrorHandler("Task can't be updated! Provide valid details.", 400)
    );

  // update logic
  task.title = title;
  task.description = description;

  await task.save();

  return res.status(201).json({
    success: true,
    message: "Task details updated successfully",
    task,
  });
}

export async function modifyTaskStatus(req, res, next) {
  const userId = req.user._id;
  const { taskId } = req.params;

  if (!taskId || !mongoose.Types.ObjectId.isValid(taskId)) {
    return next(new ErrorHandler("Invalid Task Id. Try Again!", 400));
  }

  const task = await Task.findById(taskId);
  const sameUser = task?.user.toString() === userId.toString(); // convert object to string

  if (!task || !sameUser)
    return next(new ErrorHandler("Invalid Task Id. Try Again!", 400));

  task.isCompleted = !task.isCompleted;
  await task.save();

  return res.status(201).json({
    success: true,
    message: "Task status updated successfully",
    task,
  });
}

export async function deleteTask(req, res, next) {
  const userId = req.user._id;
  const { taskId } = req.params;

  if (!taskId || !mongoose.Types.ObjectId.isValid(taskId)) {
    return next(new ErrorHandler("Invalid Task Id. Try Again!", 400));
  }

  const task = await Task.findById(taskId);
  const sameUser = task?.user.toString() === userId.toString(); // convert object to string

  if (!task || !sameUser)
    return next(new ErrorHandler("Invalid Task Id. Try Again!", 400));

  await task.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
}
