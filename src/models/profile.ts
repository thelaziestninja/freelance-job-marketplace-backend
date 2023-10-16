import mongoose from "mongoose";
// import { IProfile } from "../types/profile";

const profileSchema = new mongoose.Schema({
  skills: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  hourly_rate: {
    type: Number,
    required: true,
  },
  language: {
    type: [String],
  },
});

//Ex:
// export interface ProfileDocument extends IProfile, Document {
//     // Define any instance methods here
//   }

// Define any instance methods here, for example:
// profileSchema.methods.getSkills = function(): string[] {
//     return this.skills;
//   };
// export const ProfileM = mongoose.model<ProfileDocument>("Profile", profileSchema);

export const ProfileM = mongoose.model("Profile", profileSchema);
/* I am not adding types to this model as there  aren't any instance methods I need to define
 */
