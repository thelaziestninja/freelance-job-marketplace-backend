import bcrypt from "bcryptjs";
import { UserM } from "../models/user";
import { LoginInput, UserInput } from "../types";
import { addTokenToBlacklist } from "../utils/tokenBlackList";
import { AppError } from "../utils/errorHandler";

export const registerUser = async (input: UserInput) => {
  try {
    const hashed_password = await bcrypt.hash(input.password, 10);
    const newUser = new UserM({
      ...input,
      hashed_password,
    });
    await newUser.save();
    return newUser;
  } catch (e) {
    if (e instanceof Error) {
      throw new AppError(e.message, 500, 500);
    } else {
      throw new AppError("An unknown error occurred", 500, 500);
    }
  }
};

export const loginUser = async (input: LoginInput) => {
  try {
    const user = await UserM.findOne({ username: input.username });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(
      input.password,
      user.hashed_password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    return user;
  } catch (e) {
    if (e instanceof Error) {
      throw new AppError(e.message, 500, 500);
    } else {
      throw new AppError("An unknown error occurred", 500, 500);
    }
  }
};

export const blacklistToken = async (token: string): Promise<void> => {
  try {
    await addTokenToBlacklist(token);
  } catch (e) {
    // e is implicitly of type 'unknown'
    if (e instanceof Error) {
      // Now TypeScript knows e is an Error object within this block
      throw new AppError(e.message, 500, 500);
    } else {
      throw new AppError("An unknown error occurred", 500, 500);
    }
  }
};
