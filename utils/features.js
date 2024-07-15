import jwt from "jsonwebtoken";

function sendCookie(res, user, message, statuscode = 201) {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res
    .status(statuscode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15 mins
      // sameSite: "lax", // default
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
}

export default sendCookie;
