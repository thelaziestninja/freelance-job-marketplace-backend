import { Document } from "mongoose";

//an interface is a way to define a contract for a class without implementing any behavior.
export interface IUser {
  username: string;
  hashed_password: string;
  email: string;
  user_type: UserType;
}

// a Document in Mongoose is an instance of a model.
export interface UserDocument extends IUser, Document {}

export type UserType = "freelancer" | "client";
