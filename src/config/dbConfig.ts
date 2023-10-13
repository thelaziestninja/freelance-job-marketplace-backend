import mongoose from "mongoose";
import dotenv from "dotenv";
import { handleError } from "../utils/errorHandler";
import { IAppError } from "../types/error";

dotenv.config();

const isIAppError = (error: any): error is IAppError => {
  return error && typeof error.message === "string";
};

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error(
        "MONGODB_URI must be defined in the environment variables."
      );
    }
    await mongoose.connect(process.env.MONGODB_URI!); // process.env.MONGODB_URI! non-null and non-undefined
    console.log("Connected to MongoDB");
  } catch (error) {
    if (isIAppError(error)) {
      handleError(error);
    } else {
      console.error("An unknown error occurred:", error);
    }
  }
};

export default connectDB;
