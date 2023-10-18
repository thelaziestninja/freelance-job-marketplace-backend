import { ApplicationM } from "../models/application";
import { ProfileM } from "../models/profile";
import { ReviewM } from "../models/review";
import { ReviewInput } from "../types";
import { AppError } from "../utils/errorHandler";

export const getReviewsByFreelancerId = async (freelancerId: string) => {
  const freelancerProfile = await ProfileM.findOne({ user: freelancerId });

  // Using type assertion
  const profileType = (freelancerProfile as any).type;

  // Check if the user has a profile and is a freelancer
  if (!freelancerProfile || profileType !== "freelancer") {
    throw new Error(
      "User is either not a freelancer or doesn't have a profile."
    );
  }

  return ReviewM.find({ freelancer_id: freelancerId });
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
