import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/user";
import { BaseResponse, LoginInput, UserInput } from "../types";

export const registerHandler = async (
  req: Request<UserInput>,
  res: Response<BaseResponse>
): Promise<void> => {
  try {
    const newUser = await registerUser(req.body);
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
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
      { username: user.username, userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
