import jwt from "jsonwebtoken";

function sendCookie(res, user, message, statuscode = 201) {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res
    .status(statuscode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15 mins
    })
    .json({
      success: true,
      message,
    });
}

export default sendCookie;
