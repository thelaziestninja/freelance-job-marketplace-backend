import { ApplicationM } from "../models/application";
import { JobM } from "../models/job";
import { IApplication } from "../types/application";
import { AppError } from "../utils/errorHandler";

export const createApplication = async (applicationData: IApplication) => {
  const existingApplication = await ApplicationM.findOne({
    freelancer_id: applicationData.freelancer_id,
    job_id: applicationData.job_id,
  });

  if (existingApplication) {
    throw new AppError("You've already applied for this job.", 400, 400);
  }

  const application = new ApplicationM(applicationData);
  await application.save();
  return application.toObject();
};

export const fetchApplicationsForJob = async (
  clientId: string,
  jobId: string
) => {
  // Ensure the job belongs to the client
  const job = await JobM.findById(jobId);
  if (!job || job.client_id.toString() !== clientId) {
    return null;
  }

  // Fetch applications for the job
  return ApplicationM.find({ job_id: jobId });
};
