import mongoose from "mongoose";
import { UserDocument } from "../types";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
        },
        hashed_password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        user_type: {  // validation
            type: String,
            required: true,
            enum: ['freelancer', 'client'], // Only allow these two values for user_type
        },
    },
    {
        timestamps: true,  // Adds createdAt and updatedAt timestamps
    },
);

const UserM = mongoose.model<UserDocument>('User', userSchema);
export default UserM;