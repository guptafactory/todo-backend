import bcrypt from "bcrypt";

import User from "../models/user.js";
import sendCookie from "./../utils/features.js";
import ErrorHandler from "../utils/errorHandler.js";

export async function registerUser(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return next(new ErrorHandler("User credentials are not complete.", 404));

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User already registered", 404));

    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    sendCookie(res, user, "User registered successfully", 201);
  } catch (error) {
    next(error);
  }
}

export async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new ErrorHandler("User credentials are not complete.", 404));

    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return next(
        new ErrorHandler("User not registered! Register first.", 404)
      );

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Incorrect password! Try again.", 404));

    return sendCookie(res, user, `Welcome back ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
}

export function logoutUser(req, res) {
  res
    .status(204)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      // sameSite: "lax", // default
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    }) // deleting the cookie
    .json({
      success: true,
      message: "User logged out successfully.",
    });
}

export function getUser(req, res) {
  res.status(200).json({
    success: true,
    message: "User details fetched successfully",
    user: req.user,
  });
}

export async function getAllUsers(req, res) {
  const allUsers = await User.find({});

  return res.status(200).json({
    success: true,
    message: "All Users fetched successfully",
    allUsers,
  });
}

export async function updateUser(req, res) {
  const { name, email, password } = req.body;
  const userId = req.user._id;

  let updatedObj = {};
  if (name) updatedObj.name = name;
  if (email) updatedObj.email = email;
  if (password) updatedObj.password = await bcrypt.hash(password, 10);

  if (!updatedObj)
    return next(
      new ErrorHandler(
        "User details can't be updated! Provide valid credentials.",
        404
      )
    );

  const user = await User.findByIdAndUpdate(userId, updatedObj, {
    returnDocument: "after",
  });

  res.status(201).json({
    success: true,
    message: "User details updated successfully",
    user,
  });
}

export async function deleteUser(req, res) {
  const userId = req.user._id;

  await User.findByIdAndDelete(userId);

  res
    .status(204)
    .cookie("token", "", { expires: new Date(Date.now()) }) // deleting the cookie
    .json({
      success: true,
      message: "User deleted successfully",
    });
}
