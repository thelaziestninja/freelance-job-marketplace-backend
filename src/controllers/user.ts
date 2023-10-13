import { Request, Response } from "express";
import { registerUser } from "../services/user";
import { BaseResponse, UserInput } from "../types";

export const registerHandler = async (req: Request<UserInput>, res: Response<BaseResponse>): Promise<void> => {
    try {
      const newUser = await registerUser(req.body);
      res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };