import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  freelancer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming the freelancer's ID is from the User model
    required: true,
  },
  cover_letter: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export const ApplicationM = mongoose.model("Application", applicationSchema);
