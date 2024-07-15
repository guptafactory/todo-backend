import mongoose from "mongoose";

function connectDb() {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "todo6pp" })
    .then((c) => console.log(`Database connected with ${c.connection.host}`))
    .catch((err) => console.error(err));
}

export default connectDb;
