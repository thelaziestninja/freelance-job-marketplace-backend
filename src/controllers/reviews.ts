import { getReviewsByFreelancerId } from "../services/review";
import { Request, Response, BaseResponse } from "../types";
import { handleUnknownError } from "../utils/errorHandler";

export const getReviewsHandler = async (
  req: Request<{ id: string }>,
  res: Response<BaseResponse>
): Promise<void> => {
  try {
    const freelancerId = req.params.id;

    // This service fetches reviews based on the freelancer's ID
    const reviews = await getReviewsByFreelancerId(freelancerId);

    if (!reviews) {
      res
        .status(404)
        .json({ message: "Reviews not found for this freelancer" });
      return;
    }

    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};
