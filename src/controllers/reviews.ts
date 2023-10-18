import { getReviewsByFreelancerId } from "../services/review";
import { Request, Response, BaseResponse } from "../types";
import { handleUnknownError } from "../utils/errorHandler";

export const getReviewsHandler = async (
  req: Request<{ id: string }>,
  res: Response<BaseResponse>
): Promise<void> => {
  try {
    const freelancerId = req.params.id;
    const reviews = await getReviewsByFreelancerId(freelancerId);
    res.status(200).json({ reviews });
  } catch (error) {
    handleUnknownError(error, res);
  }
};
