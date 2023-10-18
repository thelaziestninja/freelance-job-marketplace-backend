import { ApplicationM } from "../models/application";
import { JobM } from "../models/job";
import { IApplication } from "../types/application";

export const createApplication = async (applicationData: IApplication) => {
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
