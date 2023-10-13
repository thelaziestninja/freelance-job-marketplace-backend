import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { IUser } from "../types";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    user_type: {
      // validation
      type: String,
      required: true,
      enum: ["freelancer", "client"], // Only allow these two values for user_type
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

const comparePassword: (
  this: UserDocument,
  candidatePassword: string
) => Promise<boolean> = async function (
  this: UserDocument,
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.hashed_password);
};

userSchema.methods.comparePassword = comparePassword;

export interface UserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export const UserM = mongoose.model<UserDocument>("User", userSchema);