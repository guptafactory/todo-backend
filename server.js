import app from "./app.js";
import connectDb from "./data/database.js";

connectDb();

app.listen(
  process.env.PORT,
  "localhost",
  console.log(`Server is listening on port ${process.env.PORT}`),
);
