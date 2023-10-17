import { Response } from "express";
import { getAllJobs, getJobsByClientId } from "../services/job";
import { Request, BaseResponse } from "../types";
import { handleUnknownError } from "../utils/errorHandler";

export const getAllJobsHandler = async (
  req: Request<{}>,
  res: Response<BaseResponse>
): Promise<void> => {
  try {
    const jobs = await getAllJobs();
    res.status(200).json({ jobs });
  } catch (error) {
    handleUnknownError(error, res);
  }
};

export const getJobsByClientHandler = async (
  req: Request<{}>,
  res: Response<BaseResponse>
): Promise<void> => {
  try {
    const clientId = req.user?.userId; // Assuming the client ID is stored in the token
    if (!clientId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const jobs = await getJobsByClientId(clientId);
    res.status(200).json({ jobs });
  } catch (error) {
    handleUnknownError(error, res);
  }
};
