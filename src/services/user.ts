import bcrypt from "bcryptjs";
import { UserM } from "../models/user";
import { LoginInput, UserInput } from "../types";

export const registerUser = async (input: UserInput) => {
  try {
    const hashed_password = await bcrypt.hash(input.password, 10);
    const newUser = new UserM({
      ...input,
      hashed_password,
    });
    await newUser.save();
    return newUser;
  } catch (e: any) {
    throw new Error(e);
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
  } catch (e: any) {
    throw new Error(e);
  }
};
