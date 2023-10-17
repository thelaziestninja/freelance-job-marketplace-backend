import { Response } from "express";
import { createJob, getAllJobs, getJobsByClientId } from "../services/job";
import { Request, BaseResponse, IJob, JobInput } from "../types";
import {
  AppError,
  handleError,
  handleUnknownError,
} from "../utils/errorHandler";
import mongoose from "mongoose";

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

export const createJobHandler = async (
  req: Request<{}>,
  res: Response<BaseResponse>
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      handleError(new AppError("Unauthorized", 401, 401), res);
      return;
    }

    const jobData = req.body as JobInput;

    // Add client_id from the authenticated user
    const fullJobData: IJob = {
      ...jobData,
      client_id: userId,
    };

    const job = await createJob(fullJobData);
    res.status(201).json({ jobs: [job] });
  } catch (error) {
    handleUnknownError(error, res);
  }
};
