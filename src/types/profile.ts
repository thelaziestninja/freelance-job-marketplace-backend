import mongoose from "mongoose";

export interface IProfile {
  user: mongoose.Types.ObjectId;
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
