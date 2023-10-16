import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
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
  language: {
    type: [String],
  },
});

export const ProfileM = mongoose.model("Profile", profileSchema);
/* I am not adding types to this model as there  aren't any instance methods I need to define
 */
