import {
  AppError,
  handleError,
  handleUnknownError,
} from "../utils/errorHandler";
import { Request, Response, BaseResponse, ReviewInput } from "../types";
import { createReview, getReviewsByFreelancerId } from "../services/review";

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

export const postReviewHandler = async (
  req: Request<{ id: string }, ReviewInput>,
  res: Response<BaseResponse>
): Promise<void> => {
  try {
    const clientId = req.user?.userId;
    if (!clientId) {
      handleError(new AppError("Unauthorized", 401, 401), res);
      return;
    }

    const freelancerId = req.params.id;
    const review = await createReview(clientId, freelancerId, req.body);
    res.status(201).json({ review });
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      handleUnknownError(error, res);
    }
  }
};
