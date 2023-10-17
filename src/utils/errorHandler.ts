import { BaseResponse, Response } from "../types";

const handleError = (error: AppError, res: any): void => {
  console.error(`Error (${error.errorCode ?? "unknown"}): ${error.message}`);
  if (res) {
    res.status(error.statusCode ?? 500).json({ error: error.message });
  } else {
    console.error(`Error (${error.errorCode ?? "unknown"}): ${error.message}`);
  }
};

const isValidationError = (error: any): error is ValidationError => {
  console.error(`Error (${error.errorCode ?? "unknown"}): ${error.message}`);
  return error && error.name === "ValidationError";
};

const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

const handleUnknownError = (error: any, res: Response<BaseResponse>) => {
  if (error instanceof Error) {
    handleError(new AppError(error.message, 500, 500), res);
  } else {
    handleError(new AppError("An unknown error occurred", 500, 500), res);
  }
  const e = error as Error;
  handleError(new AppError(e.message || "Unknown error", 500, 500), res);
  console.error(`Error (${error.errorCode ?? "unknown"}): ${error.message}`);
};

class AppError extends Error {
  public readonly errorCode: number;
  public readonly statusCode: number;

  constructor(message: string, errorCode: number, statusCode: number) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype); // Set the prototype explicitly, to make instanceof work
  }
}

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}
export {
  isError,
  AppError,
  handleError,
  ValidationError,
  isValidationError,
  handleUnknownError,
};
