import { Response } from "express";
import { getAllJobs } from "../services/job";
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
