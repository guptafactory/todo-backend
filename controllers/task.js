import Task from "../models/task.js";
import ErrorHandler from "../utils/errorHandler.js";

export async function newTask(req, res, next) {
  const { title, description } = req.body;

  if (!title || !description)
    return next(
      new ErrorHandler("Title or description is invalid. Try Again!", 404)
    );

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
  const { taskId } = req.params;
  const { title, description } = req.body;

  const task = await Task.findById(taskId);
  const sameUser = task?.user.toString() === userId.toString(); // convert object to string

  if (!title || !description || !task || !sameUser)
    return res.status(404).json({
      success: false,
      message: "Task can't be updated! Provide valid details.",
    });

  // update logic
  task.title = title;
  task.description = description;

  await task.save();

  res.status(201).json({
    success: true,
    message: "Task details updated successfully",
    task,
  });
}

export async function modifyTaskStatus(req, res) {
  const userId = req.user._id;
  const { taskId } = req.params;

  const task = await Task.findById(taskId);
  const sameUser = task?.user.toString() === userId.toString(); // convert object to string

  if (!task || !sameUser)
    return res.status(404).json({
      success: false,
      message: "Invalid Task Id. Try Again!",
    });

  task.isCompleted = !task.isCompleted;
  await task.save();

  res.status(201).json({
    success: true,
    message: "Task status updated successfully",
    task,
  });
}

export async function deleteTask(req, res) {
  const userId = req.user._id;
  const { taskId } = req.params;

  const task = await Task.findById(taskId);
  const sameUser = task?.user.toString() === userId.toString(); // convert object to string

  if (!task || !sameUser)
    return res.status(404).json({
      success: false,
      message: "Invalid Task Id. Try Again!",
    });

  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
}
