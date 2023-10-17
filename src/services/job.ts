import { JobM } from "../models/job";

export const getAllJobs = async () => {
  return JobM.find();
};

export const getJobsByClientId = async (clientId: string) => {
  return JobM.find({ client_id: clientId });
};
