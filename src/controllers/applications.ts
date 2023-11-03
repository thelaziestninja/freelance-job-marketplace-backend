import { Response } from "express";
import {
  createApplication,
  fetchApplicationsForJob,
} from "../services/application";
import {
  Request,
  BaseResponse,
  IApplication,
  ApplicationInput,
} from "../types";
import {
  AppError,
  handleUnknownError,
  handleError,
} from "../utils/errorHandler";
import mongoose from "mongoose";

export const applyForJobHandler = async (
  req: Request<{ id: string }, ApplicationInput>, // Adjusted the generic arguments
  res: Response<BaseResponse>
): Promise<void> => {
  try {
    const freelancerId = req.user?.userId;
    if (!freelancerId) {
      handleError(new AppError("Unauthorized", 401, 401), res);
      return;
    }

    const jobId = new mongoose.Types.ObjectId(req.params.id); // Convert to ObjectId
    const { cover_letter } = req.body;

    if (!cover_letter) {
      handleError(new AppError("Cover letter is required", 400, 400), res);
      return;
    }

    const applicationData: IApplication = {
      job_id: jobId,
      freelancer_id: new mongoose.Types.ObjectId(freelancerId), // Convert to ObjectId
      cover_letter,
      timestamp: new Date(),
    };

    const application = await createApplication(applicationData);
    res.status(201).json({ application });
  } catch (error) {
    handleUnknownError(error, res);
  }
};

export const getApplicationsForJobHandler = async (
  req: Request<{ id: string }>,
  res: Response<BaseResponse>
): Promise<void> => {
  try {
    const clientId = req.user?.userId;

    if (!clientId) {
      console.error("Unauthorized: No client ID found in request");
      handleError(new AppError("Unauthorized", 401, 401), res);
      return;
    }

    const jobId = req.params.id;
    console.log(
      "Fetching applications for job ID:",
      jobId,
      "and client ID:",
      clientId
    );

    const applications = await fetchApplicationsForJob(clientId, jobId);

    if (!applications) {
      console.error(
        "No applications found or not authorized for job ID:",
        jobId,
        "and client ID:",
        clientId
      );
      handleError(
        new AppError("No applications found or not authorized", 404, 404),
        res
      );
      return;
    }

    console.log("Applications fetched:", applications);
    res.status(200).json({ applications });
  } catch (error) {
    console.error("Error in getApplicationsForJobHandler:", error);
    handleUnknownError(error, res);
  }
};
