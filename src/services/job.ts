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

export const updateJob = async (
  clientId: string,
  jobId: string,
  updatedData: Pick<IJob, "title" | "description" | "budget" | "deadline">
) => {
  return JobM.findOneAndUpdate(
    { _id: jobId, client_id: clientId },
    updatedData,
    {
      new: true,
    }
  );
};

export const deleteJob = async (clientId: string, jobId: string) => {
  return JobM.findOneAndDelete({ _id: jobId, client_id: clientId });
};
