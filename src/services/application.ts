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
  const job = await JobM.findById(jobId);
  if (!job) {
    console.error("Job not found for job ID:", jobId);
    return null;
  }

  if (job.client_id.toString() !== clientId) {
    console.error(
      "Job does not belong to the client. Job's client ID:",
      job.client_id,
      "Requesting client ID:",
      clientId
    );
    return null;
  }

  const applications = await ApplicationM.find({ job_id: jobId });
  console.log("Applications fetched for job ID:", jobId, ":", applications);
  return applications;
};
