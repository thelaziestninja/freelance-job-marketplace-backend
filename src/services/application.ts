import { ApplicationM } from "../models/application";
import { IApplication } from "../types/application";

export const createApplication = async (applicationData: IApplication) => {
  const application = new ApplicationM(applicationData);
  await application.save();
  return application.toObject();
};
