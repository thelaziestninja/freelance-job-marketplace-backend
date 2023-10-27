import mongoose from "mongoose";
import { IUser } from "./user";

export interface IProfile {
  user: IUser & mongoose.Document;
  skills: string[];
  description: string;
  hourly_rate: number;
  languages?: string[];
}

export interface ProfileDocument extends mongoose.Document, IProfile {}

export interface ProfileInput {
  skills?: string[];
  description?: string;
  hourly_rate?: number;
  languages?: string[];
}
