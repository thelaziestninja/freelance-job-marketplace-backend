import { ReviewM } from "../models/review";

export const getReviewsByFreelancerId = async (freelancerId: string) => {
  return ReviewM.find({ freelancer_id: freelancerId });
};
