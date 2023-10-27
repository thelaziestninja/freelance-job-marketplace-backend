import mongoose from "mongoose";
import { ApplicationM } from "../models/application";
import { ProfileM } from "../models/profile";
import { ReviewM } from "../models/review";
import { ReviewInput } from "../types";
import { AppError } from "../utils/errorHandler";

export const getReviewsByFreelancerId = async (profileId: string) => {
  if (!mongoose.Types.ObjectId.isValid(profileId)) {
    console.log("Invalid ObjectId format");
    return null;
  }

  const freelancerProfile = await ProfileM.findById(profileId).populate("user");

  if (!freelancerProfile) {
    console.log("Freelancer profile not found");
    return null;
  }

  // Check if the linked user is a freelancer
  if (freelancerProfile.user.user_type !== "freelancer") {
    console.log("User is not a freelancer");
    return null;
  }

  return ReviewM.find({ freelancer_id: freelancerProfile.user._id });
};

export const createReview = async (
  clientId: string,
  freelancerId: string,
  reviewInput: ReviewInput
) => {
  const application = await ApplicationM.findOne({
    job_id: { $in: clientId },
    freelancer_id: freelancerId,
  });

  if (!application) {
    throw new AppError(
      "You can't review a freelancer who hasn't applied for one of your jobs.",
      403,
      403
    );
  }

  const existingReview = await ReviewM.findOne({
    client_id: clientId,
    freelancer_id: freelancerId,
  });

  if (existingReview) {
    throw new AppError(
      "You've already reviewed this freelancer for this job.",
      400,
      400
    );
  }

  const newReview = new ReviewM({
    ...reviewInput,
    client_id: clientId,
    freelancer_id: freelancerId,
  });

  await newReview.save();
  return newReview;
};
