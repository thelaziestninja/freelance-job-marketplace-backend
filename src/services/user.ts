import bcrypt from "bcryptjs";
import { UserInput } from "../types";
import { UserM } from "../models/user";


export async function registerUser(input: UserInput) {
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
}