import jwt from "jsonwebtoken";
import { AppError, handleError } from "../utils/errorHandler";
import { Request, Response, NextFunction } from "express";

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1]; // Bearer <token>

      jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) {
          throw new AppError("Forbidden", 403, 1001);
        }

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'user' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs>'.
        req.user = user;
        next();
      });
    } else {
      throw new AppError("Unauthorized", 401, 1000);
    }
  } catch (error) {
    if (isError(error)) {
      const appError = new AppError(error.message, 500, 2000);
      handleError(appError, res);
    } else {
      const unknownError = new AppError("An unknown error occurred", 500, 2000);
      handleError(unknownError, res);
    }
  }
};

/* In the above code:

A type guard isError is defined to check if the error object is an instance of Error.
In your catch block, isError is used to check the type of the error object.
If the error is an instance of Error, a new AppError is created using the message from the caught error.
If the error is not an instance of Error, a new AppError is created with a generic message.
Now, you're handling both known (instances of Error) and unknown errors in a type-safe manner.
*/
