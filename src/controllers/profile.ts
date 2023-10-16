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
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const newProfile = await createProfile(userId, req.body);
    res
      .status(201)
      .json({ message: "Profile created successfully", profile: newProfile });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
