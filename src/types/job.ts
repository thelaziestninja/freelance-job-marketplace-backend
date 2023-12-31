import mongoose from "mongoose";

export interface IJob {
  client_id: mongoose.Types.ObjectId | string;
  title: string;
  description: string;
  budget: number;
  deadline: Date;
}

export interface JobInput {
  title: string;
  description: string;
  budget: number;
  deadline: Date;
}
