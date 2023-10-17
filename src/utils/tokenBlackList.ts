import { BlacklistedTokenM } from "../models/blacklistedToken";

export const addTokenToBlacklist = async (token: string) => {
  const blacklistedToken = new BlacklistedTokenM({ token });
  await blacklistedToken.save();
};

export const isTokenBlacklisted = async (token: string) => {
  const blacklistedToken = await BlacklistedTokenM.findOne({ token });
  return !!blacklistedToken;
};
