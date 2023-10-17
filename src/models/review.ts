import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  freelancer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming the freelancer's ID is from the User model
    required: true,
  },
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming the client's ID is from the User model
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5, // Assuming a 5-star rating system
  },
  review_text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export const ReviewM = mongoose.model("Review", reviewSchema);
