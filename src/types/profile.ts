import mongoose from "mongoose";
import { IUser } from "./user";

export interface IProfile {
  user: IUser & mongoose.Document;
  name: string;
  skills: string[];
  description: string;
  hourly_rate: number;
  languages?: string[];
}

export interface ProfileDocument extends mongoose.Document, IProfile {}

export interface ProfileInput {
  name?: string;
  skills?: string[];
  description?: string;
  hourly_rate?: number;
  languages?: string[];
}
