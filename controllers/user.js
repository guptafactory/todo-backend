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
  const { token } = req.cookies;

  if (!token)
    return res.status(404).json({
      success: false,
      message: "User not registered or Already logged out.",
    });

  res
    .status(200)
    .cookie("token", "", { expires: new Date(Date.now()) })
    .json({
      success: true,
      message: "User logged out successfully.",
    });
}

export function getMyDetails(req, res) {
  res.status(200).json({
    success: true,
    message: "User details fetched successfully",
    user: req.user,
  });
}

export async function getAllUsers(req, res) {
  const user = await User.find({});

  return res.status(200).json({
    success: true,
    message: "All Users fetched successfully",
    user,
  });
}

// export async function updateUser(req, res) {
//   const { id } = req.params;
//   const { newName } = req.body;
//   console.log(req.body);

//   await User.findByIdAndUpdate(id, { name: newName });
//   // update logic
//   res.json({
//     success: true,
//     message: "User details updated successfully",
//   });
// }

// export async function deleteUser(req, res) {
//   const { id } = req.params;

//   await User.findByIdAndDelete(id);
//   // delete logic
//   res.json({
//     success: true,
//     message: "User deleted successfully",
//   });
// }
