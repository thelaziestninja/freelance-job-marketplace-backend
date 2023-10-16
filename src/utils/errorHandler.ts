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

const handleError = (error: AppError, res: any): void => {
  if (res) {
    res.status(error.statusCode ?? 500).json({ error: error.message });
  } else {
    process.exit(1); // Exit process with failure
  }
};

export { AppError, handleError };

/* In this updated errorHandler.ts file:

A custom AppError class is defined which extends the built-in Error class, adding errorCode and statusCode properties.
The handleError function is updated to accept both an AppError instance and the response object res. It then sends a JSON response with the status code and error message contained in the AppError instance.
Now, you can use the AppError class to create new error instances with custom messages, error codes, and status codes, and pass them to the handleError function whenever an error is encountered in your application. 

*/
