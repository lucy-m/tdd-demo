// Injectable service that would be used for doing fetches

import { createContext, useContext } from "react";
import { UserAccount, UserProfile, UserTabs } from "./00-model";

export type ProfileService = {
  getUserTabs: (id: string) => Promise<UserTabs>;
  getUserProfile: (id: string) => Promise<UserProfile>;
  getUserAccount: (id: string) => Promise<UserAccount>;
};

export const ProfileServiceContext = createContext<ProfileService | undefined>(
  undefined
);

export const useProfileService = () => {
  const value = useContext(ProfileServiceContext);

  if (!value) {
    throw new Error("ProfileService must be initialised");
  }

  return value;
};
