import { JobM } from "../models/job";

export const getAllJobs = async () => {
  return JobM.find();
};
