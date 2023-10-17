import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { isTokenBlacklisted } from "../utils/tokenBlackList";
import { AppError, handleError } from "../utils/errorHandler";

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
    console.log(req.headers);
    if (authHeader) {
      const token = authHeader.split(" ")[1]; // Bearer <token>
      isTokenBlacklisted(token).then((isBlacklisted) => {
        if (isBlacklisted) {
          next(new AppError("Token has been invalidated", 401, 1002));
          return;
        }
        jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
          if (err) {
            next(new AppError("Forbidden", 403, 1001));
            return;
          }
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'user' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs>'.
          req.user = user;
          next();
        });
      });
    } else {
      next(new AppError("Unauthorized", 401, 1000));
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
