import bcrypt from "bcrypt";

import User from "../models/user.js";
import sendCookie from "./../utils/features.js";

export async function register(req, res) {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });

  if (user)
    return res.status(404).json({
      success: false,
      message: "User already registered",
    });

  const hashPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  sendCookie(res, user, "User registered successfully", 201);
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user)
    return res.status(404).json({
      success: false,
      message: "User not registered! Register first.",
    });

  const isMatch = bcrypt.compare(password, user.password);

  if (!isMatch)
    return res.status(404).json({
      success: false,
      message: "Incorrect password! Try again.",
    });

  sendCookie(res, user, `Welcome back ${user.name}`, 200);
}

export function logout(req, res) {
  res
    .status(200)
    .cookie("token", "", { expires: new Date(Date.now()) }) // deleting the cookie
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
  const id = req.user._id;

  let updatedObj = {};
  if (name) updatedObj.name = name;
  if (email) updatedObj.email = email;
  if (password) updatedObj.password = await bcrypt.hash(password, 10);

  if (!updatedObj)
    return res.status(404).json({
      success: false,
      message: "User details can't be updated! Provide valid credentials.",
    });

  const user = await User.findByIdAndUpdate(id, updatedObj, {
    returnDocument: "after",
  });
  // update logic
  res.status(200).json({
    success: true,
    message: "User details updated successfully",
    user,
  });
}

export async function deleteUser(req, res) {
  const id = req.user._id;

  await User.findByIdAndDelete(id);
  // delete logic
  res
    .status(201)
    .cookie("token", "", { expires: new Date(Date.now()) }) // deleting the cookie
    .json({
      success: true,
      message: "User deleted successfully",
    });
}
