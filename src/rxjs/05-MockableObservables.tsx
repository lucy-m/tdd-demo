// This file demonstrates how an observable source can be mocked via a service
//   to allow for complex async behaviour to be tested independently of
//   rendering tests.

import { createContext, useContext, useEffect, useState } from "react";
import { Observable } from "rxjs";
import { ProfileLoadState } from "./00-model";

// Here, this service is used to abstract the async profile loading state
//   from the component. No implementation of getProfileState is provided here
//   but you can use your imagination as to how complex it could be, such as:
//     - having multiple dependent API calls with error/refectch logic
//     - debouncing the value so that it only emits when stable for 1s
//     - receiving push data from the server to show live updates
//     - polling for a value using an exponential backoff
type ObservableProfileService = {
  getProfileState: () => Observable<ProfileLoadState>;
};

export const ObservableProfileServiceContext = createContext<
  ObservableProfileService | undefined
>(undefined);
const useService = () => {
  const service = useContext(ObservableProfileServiceContext);

  if (!service) {
    throw new Error("ObservableProfileServiceContext has not been initiated");
  }

  return service;
};

export const UserProfile: React.FC = () => {
  const service = useService();
  const [state, setState] = useState<ProfileLoadState>({
    userAccount: "loading",
    userProfile: "loading",
    userTabs: "loading",
  });

  useEffect(() => {
    // This component doesn't care where the data comes from, only that
    //   there is a stream of data it needs to render and react to.
    const s = service.getProfileState().subscribe((value) => {
      setState(value);
    });
    // Need to unsubscribe from observables to stop listening
    //   when the component unmounts
    return () => s.unsubscribe();
  }, [service]);

  return <div>{JSON.stringify(state)}</div>;
};
