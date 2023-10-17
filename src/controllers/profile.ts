import {
  AppError,
  handleError,
  handleUnknownError,
  isValidationError,
} from "../utils/errorHandler";
import { Response } from "express";
import { Request } from "../types";
import { createProfile } from "../services/profile";
import { BaseResponse, ProfileInput } from "../types";

export const createProfileHandler = async (
  req: Request<ProfileInput>,
  res: Response<BaseResponse>
): Promise<void> => {
  try {
    const userId = req.user?.userId; // Assuming `req.user` contains the authenticated user's info
    if (!userId) {
      handleError(new AppError("Unauthorized", 401, 401), res);
      return;
    }
    const newProfile = await createProfile(userId, req.body);
    res
      .status(201)
      .json({ message: "Profile created successfully", profile: newProfile });
  } catch (error) {
    if (isValidationError(error)) {
      // ValidationErrors are handled here
      handleError(new AppError(error.message, 400, 400), res);
    } else {
      // All other errors are handled here
      handleUnknownError(error, res);
    }
  }
};
