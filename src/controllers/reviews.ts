import {
  AppError,
  handleError,
  handleUnknownError,
} from "../utils/errorHandler";
import { Request, Response, BaseResponse, ReviewInput } from "../types";
import { createReview, getReviewsByFreelancerId } from "../services/review";

export const getReviewsHandler = async (
  req: Request<{ profileId: string }>,
  res: Response<BaseResponse>
): Promise<void> => {
  try {
    const profileId = req.params.profileId;

    const reviews = await getReviewsByFreelancerId(profileId);

    if (reviews === null) {
      res
        .status(404)
        .json({ message: "Freelancer not found or not a freelancer" });
    } else if (reviews.length === 0) {
      res.status(200).json({ message: "No reviews found for this freelancer" });
    } else {
      res.status(200).json({ reviews });
    }
  } catch (error) {
    handleUnknownError(error, res);
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
