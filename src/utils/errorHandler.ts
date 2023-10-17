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

const handleError = (error: AppError, res: any): void => {
  if (res) {
    res.status(error.statusCode ?? 500).json({ error: error.message });
  } else {
    console.error(`Error (${error.errorCode ?? "unknown"}): ${error.message}`);
  }
};

export { AppError, ValidationError, handleError };
