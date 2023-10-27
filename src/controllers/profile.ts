import {
  AppError,
  handleError,
  handleUnknownError,
  isValidationError,
} from "../utils/errorHandler";

import {
  createProfile,
  getAllProfiles,
  getProfileByUserId,
  updateProfileByUserId,
} from "../services/profile";
import { Response } from "express";
import { Request, BaseResponse, ProfileInput } from "../types";

export const createProfileHandler = async (
  req: Request<{}, ProfileInput>,
  res: Response<BaseResponse>
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      handleError(new AppError("Unauthorized", 401, 401), res);
      return;
    }
    if (!req.body.name) {
      handleError(new AppError("Name is required", 400, 400), res);
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

export const getProfileHandler = async (
  req: Request<{}>,
  res: Response<BaseResponse>
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      handleError(new AppError("Unauthorized", 401, 401), res);
      return;
    }
    const profile = await getProfileByUserId(userId);
    if (!profile) {
      handleError(new AppError("Profile not found", 404, 404), res);
      return;
    }
    res.status(200).json({ profile });
  } catch (error) {
    handleUnknownError(error, res);
  }
};

export const getAllProfilesHandler = async (
  req: Request<{}>,
  res: Response<BaseResponse>
): Promise<void> => {
  try {
    const userType = req.query.userType as string;
    const profiles = await getAllProfiles(userType);
    res.status(200).json({ profiles });
  } catch (error) {
    handleUnknownError(error, res);
  }
};

interface UpdateProfileRequestBody {
  name?: string;
  skills?: string[];
  description?: string;
  hourly_rate?: number;
  languages?: string[];
}

export const updateProfileHandler = async (
  req: Request<{}, ProfileInput>,
  res: Response<BaseResponse>
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      handleError(new AppError("Unauthorized", 401, 401), res);
      return;
    }
    if (!req.body.name) {
      handleError(new AppError("Name is required", 400, 400), res);
      return;
    }
    const data: ProfileInput = req.body;
    const updatedProfile = await updateProfileByUserId(userId, data);

    if (!updatedProfile) {
      handleError(new AppError("Update failed", 500, 500), res);
      return;
    }

    res.status(200).json({ profile: updatedProfile });
  } catch (error) {
    handleUnknownError(error, res);
  }
};
