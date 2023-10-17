import { ProfileM } from "../models/profile";
import { UserM } from "../models/user";
import { ProfileInput } from "../types";

export const createProfile = async (
  userId: string,
  profileInput: ProfileInput
) => {
  const existingProfile = await ProfileM.findOne({ user: userId });
  if (existingProfile) {
    throw new Error(
      "Profile already exists for this user. Please proceed to updated ur profile"
    );
  }

  const newProfile = new ProfileM({
    ...profileInput,
    user: userId, // Assuming the profile schema has a `user` field to store the associated user's ID
  });

  await newProfile.save();
  return newProfile;
};

export const getProfileByUserId = async (userId: string) => {
  return ProfileM.findOne({ user: userId });
};

export const getAllProfiles = async (userType?: string) => {
  if (userType && (userType === "freelancer" || userType === "client")) {
    const users = await UserM.find({ user_type: userType });
    const userIds = users.map((user) => user._id);
    return ProfileM.find({ user: { $in: userIds } });
  }
  return ProfileM.find();
};

export const updateProfileByUserId = async (
  userId: string,
  updatedData: ProfileInput
) => {
  const result = ProfileM.findOneAndUpdate({ user: userId }, updatedData, {
    new: true,
    runValidators: true,
  });
  // console.log("Update Result:", result);
  return result;
};
