import User from "../models/user.js";
import jwt from "jsonwebtoken";

async function isAuthenticated(req, res, next) {
  const { token } = req.cookies;

  if (!token)
    return res.status(404).json({
      success: false,
      message: "Login first.",
    });

  const decoded = jwt.decode(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded._id);
  next();
}

export default isAuthenticated;
