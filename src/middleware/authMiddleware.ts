import jwt, { TokenExpiredError } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { isTokenBlacklisted } from "../utils/tokenBlackList";
import { AppError, handleError, isError } from "../utils/errorHandler";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    // console.log(req.headers);
    if (authHeader) {
      const token = authHeader.split(" ")[1]; // Bearer <token>
      isTokenBlacklisted(token).then((isBlacklisted) => {
        if (isBlacklisted) {
          next(new AppError("Token has been invalidated", 401, 401));
          return;
        }
        jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
          if (err) {
            if (err instanceof TokenExpiredError) {
              next(new AppError("Unauthorized", 401, 401));
            } else {
              next(new AppError("Forbidden", 403, 403));
            }
            return;
          }
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'user' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs>'.
          req.user = user;
          // console.log("Error in authenticateJWT:", err);
          // next(err);
          next();
        });
      });
    } else {
      next(new AppError("Unauthorized", 401, 401));
    }
  } catch (error) {
    // console.error("Error:", error);
    // console.error("Request headers:", req.headers);
    if (isError(error)) {
      const appError = new AppError(error.message, 500, 2000);
      handleError(appError, res);
    } else {
      const unknownError = new AppError("An unknown error occurred", 500, 2000);
      handleError(unknownError, res);
    }
  }
};
export const ensureFreelancer = (
  req: Request & { user?: { userType: string } },
  res: Response,
  next: NextFunction
) => {
  if (req.user?.userType !== "freelancer") {
    return res
      .status(403)
      .json({ error: "Access forbidden for non-freelancers" });
  }
  next();
};

export const ensureClient = (
  req: Request & { user?: { userType: string } },
  res: Response,
  next: NextFunction
) => {
  if (req.user?.userType !== "client") {
    return res.status(403).json({ error: "Access forbidden for non-clients" });
  }
  next();
};
