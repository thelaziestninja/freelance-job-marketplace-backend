import { JobM } from "../models/job";
import { IJob } from "../types";

export const getAllJobs = async () => {
  return JobM.find();
};

export const getJobsByClientId = async (clientId: string) => {
  return JobM.find({ client_id: clientId });
};

export const createJob = async (jobData: IJob) => {
  const job = new JobM(jobData);
  await job.save();
  return job.toObject();
};
