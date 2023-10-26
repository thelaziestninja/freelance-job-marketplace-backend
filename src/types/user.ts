import { Types } from "mongoose";
//an interface is a way to define a contract for a class without implementing any behavior.
export interface IUser {
  _id: Types.ObjectId;
  username: string;
  hashed_password: string;
  email: string;
  user_type: UserType;
}

export interface UserReturn {
  _id: Types.ObjectId;
  username: string;
  hashed_password: string;
  email: string;
  user_type: UserType;
}

export interface UserInput {
  username: string;
  password: string; // Note: not hashed
  email: string;
  user_type?: UserType; // I even might not request from the userInput to tell me what type he is
}

export interface LoginInput {
  username: string;
  password: string;
}

export type UserType = "freelancer" | "client";
