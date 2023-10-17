import mongoose from "mongoose";

const blacklistedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true, // Ensure each token is only blacklisted once
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400, // Set token to expire after 1 day (86400 seconds)
  },
});

export const BlacklistedTokenM = mongoose.model(
  "BlacklistedToken",
  blacklistedTokenSchema
);
