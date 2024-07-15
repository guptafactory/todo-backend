import express from "express";

import isAuthenticated from "./../middlewares/auth.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.js";

const router = express.Router();

router.post("/new", registerUser);

router.post("/login", loginUser);

router.get("/logout", isAuthenticated, logoutUser);

router.get("/me", isAuthenticated, getUser);

router.get("/all", isAuthenticated, getAllUsers); ////TODO - to remove later

router.put("/modify", isAuthenticated, updateUser);

router.get("/remove", isAuthenticated, deleteUser);

export default router;
