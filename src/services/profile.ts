import { ProfileM } from "../models/profile";
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
