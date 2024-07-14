import express from "express";

import isAuthenticated from "./../middlewares/auth.js";
import {
  register,
  login,
  logout,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.js";

const router = express.Router();

router.post("/new", register);

router.post("/login", login);

router.get("/logout", isAuthenticated, logout);

router.get("/me", isAuthenticated, getUser);

router.get("/all", isAuthenticated, getAllUsers); ////TODO - to remove later

router.put("/modify", isAuthenticated, updateUser);

router.get("/remove", isAuthenticated, deleteUser);

export default router;
