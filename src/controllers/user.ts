import {
  AppError,
  handleError,
  handleUnknownError,
  isValidationError,
} from "../utils/errorHandler";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { blacklistToken, loginUser, registerUser } from "../services/user";
import {
  BaseResponse,
  IUser,
  LoginInput,
  UserInput,
  UserReturn,
} from "../types";

export const registerHandler = async (
  req: Request<UserInput>,
  res: Response<BaseResponse>
): Promise<void> => {
  try {
    const newUser = await registerUser(req.body);
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    if (isValidationError(error)) {
      // Now TypeScript knows error is a ValidationError within this block
      handleError(new AppError(error.message, 400, 400), res);
    } else {
      handleUnknownError(error, res);
    }
  }
};

interface LoginRequest extends Request {
  body: LoginInput;
}

export const loginHandler = async (
  req: LoginRequest,
  res: Response<BaseResponse>
): Promise<void> => {
  try {
    const user = await loginUser(req.body);
    const token = jwt.sign(
      { username: user.username, userId: user._id, userType: user.user_type },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    if (isValidationError(error)) {
      handleError(new AppError(error.message, 400, 400), res);
    } else {
      const e = error as Error;
      handleError(new AppError(e.message || "Unknown error", 500, 500), res);
    }
  }
};

export const logoutHandler = async (
  req: Request,
  res: Response<BaseResponse>
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1]; // Bearer <token>
      await blacklistToken(token);
    }
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    handleUnknownError(error, res);
  }
};
