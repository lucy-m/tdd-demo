import { useEffect, useState } from "react";
import { ProfileLoadState } from "./00-model";
import { useProfileService } from "./01-ProfileService";

// Hook that fetches profile data using promises
// Note that since this is a hook it must follow the rules of hooks.
// This means it cannot be used outside of a component, is not easy
//   to mock, and is not an effective way to move complexity out of
//   components.
export const usePromiseFetcher = (id: string): ProfileLoadState => {
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
        // TODO: Hook1 - Simulate debouncing on the user account
        // Comment out line immediately below
        // Uncomment lines below
        service.getUserAccount(id).then(setUserAccount);
        // service.getUserAccount(id).then((account) => {
        //   setTimeout(() => {
        //     setUserAccount(account)
        //   }, 1000);
        // });
      } else {
        setUserAccount("n/a");
      }
    }
  }, [id, service, userProfile, userTabs]);

  return { userTabs, userAccount, userProfile };
};
