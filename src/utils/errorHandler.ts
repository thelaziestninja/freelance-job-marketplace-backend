import { IAppError } from "../types";

export const handleError = (error: IAppError): void => {
  console.error(`Error (${error.errorCode ?? "unknown"}): ${error.message}`);
  process.exit(1); // Exit process with failure
};
