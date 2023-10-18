import { ProfileM } from "../models/profile";
import { ReviewM } from "../models/review";

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
