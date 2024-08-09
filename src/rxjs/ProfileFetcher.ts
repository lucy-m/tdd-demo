import { useEffect, useState } from "react";
import { ProfileLoadState } from "./00-model";
import { useProfileService } from "./01-ProfileService";

export const useProfileFetcher = (id: string): ProfileLoadState => {
  const service = useProfileService();

  const [userTabs, setUserTabs] =
    useState<ProfileLoadState["userTabs"]>("loading");
  const [userProfile, setUserProfile] =
    useState<ProfileLoadState["userProfile"]>("loading");
  const [userAccount, setUserAccount] =
    useState<ProfileLoadState["userAccount"]>("loading");

  useEffect(() => {
    service.getUserTabs(id).then(setUserTabs);
  }, [id, service]);

  useEffect(() => {
    service.getUserProfile(id).then(setUserProfile);
  }, [id, service]);

  useEffect(() => {
    if (userProfile !== "loading" && userTabs !== "loading") {
      if (userTabs.includes("account")) {
        service.getUserAccount(id).then(setUserAccount);
      } else {
        setUserAccount("n/a");
      }
    }
  }, [id, service, userProfile, userTabs]);

  return { userTabs, userAccount, userProfile };
};
