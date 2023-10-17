import mongoose from "mongoose";

export interface IApplication {
  job_id: mongoose.Types.ObjectId;
  freelancer_id: mongoose.Types.ObjectId;
  cover_letter: string;
  timestamp: Date;
}

export interface ApplicationInput {
  cover_letter?: string;
}
