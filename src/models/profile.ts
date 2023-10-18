import mongoose from "mongoose";
import { ProfileDocument } from "../types";

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // Ensure each user can only have one profile
  },
  skills: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  hourly_rate: {
    type: Number,
    required: true,
  },
  languages: {
    type: [String],
  },
});

export const ProfileM = mongoose.model<ProfileDocument>(
  "Profile",
  profileSchema
);
/* I am not adding types to this model as there  aren't any instance methods I need to define
 */
