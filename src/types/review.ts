import mongoose from "mongoose";

export interface IReview {
  freelancer_id: mongoose.Types.ObjectId;
  client_id: mongoose.Types.ObjectId;
  rating: number;
  review_text: string;
  timestamp: Date;
}

export interface ReviewInput {
  rating?: number;
  review_text?: string;
}
