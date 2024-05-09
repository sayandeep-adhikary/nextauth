import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Database connected successfully");
    });
    connection.on("error", (error) => {
      console.log("Something went wrong with the database connection", error);
      process.exit(1);
    });
  } catch (error) {
    console.log("Something went wrong with the database connection", error);
  }
}
