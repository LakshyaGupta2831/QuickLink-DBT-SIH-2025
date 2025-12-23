import mongoose from "mongoose";
import { config } from "dotenv";
config();

console.log("MongoDB URI:", process.env.MONGO_URI);

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
};

export default connectdb;
