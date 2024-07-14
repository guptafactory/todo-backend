import mongoose from "mongoose";

function connectDb() {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "todo6pp" })
    .then(() => console.log("Database connected"))
    .catch((err) => console.error(err));
}

export default connectDb;
