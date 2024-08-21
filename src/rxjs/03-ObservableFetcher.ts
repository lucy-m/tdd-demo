import { useEffect, useState } from "react";
import {
  combineLatest,
  from,
  map,
  merge,
  Observable,
  of,
  scan,
  switchMap,
} from "rxjs";
import { ProfileLoadState } from "./00-model";
import { ProfileService, useProfileService } from "./01-ProfileService";

const initial: ProfileLoadState = {
  userAccount: "loading",
  userProfile: "loading",
  userTabs: "loading",
};

// Function that sets up an observable of the ProfileLoadState
// This function can be used outside of a component and is easily
//   extracted into a mockable service.
const observableFetcher =
  (service: ProfileService) =>
  (id: string): Observable<ProfileLoadState> => {
    // Fetches the tabs and converts to Partial<ProfileLoadState>
    const tabs$ = from(service.getUserTabs(id)).pipe(
      map((userTabs) => ({ userTabs }))
    );

    // Fetches the profile and converts to Partial<ProfileLoadState>
    const profile$ = from(service.getUserProfile(id)).pipe(
      map((userProfile) => ({ userProfile }))
    );

    const account$ =
      // combineLatest will emit only when both observables have emitted
      combineLatest([tabs$, profile$]).pipe(
        // switchMap can be used when mapping from an observable emission
        //   to another observable. It is similar to flatMap
        switchMap(([{ userTabs }]) => {
          if (userTabs.includes("account")) {
            // Fetches the profile and converts to Partial<ProfileLoadState>
            return from(service.getUserAccount(id)).pipe(
              map((userAccount) => ({ userAccount }))
            );
          } else {
            // If the account should not be loaded, returns this value immediately
            // "of" is the Observable equivalent to Promise.resolve
            return of({ userAccount: "n/a" as const });
          }
        })
      );

    // Merges all the fetched Partial<ProfileLoadState> into a ProfileLoadState by
    //   using scan, equivalent to array.reduce
    const state$ = merge(tabs$, profile$, account$).pipe(
      scan<Partial<ProfileLoadState>, ProfileLoadState>(
        (state, next) => ({ ...state, ...next }),
        initial
      )
    );

    return state$;
  };

// Hook that uses observableFetcher above and loads emissions into React state
// This is an example of how it would be used in a component
// This has the same signature and behaviour as usePromiseFetcher in 02-PromiseFetcher
export const useObservableFetcher = (id: string): ProfileLoadState => {
  const service = useProfileService();
  const [state, setState] = useState<ProfileLoadState>(initial);

  useEffect(() => {
    const sub = observableFetcher(service)(id).subscribe((value) => {
      setState(value);
    });
    return () => sub.unsubscribe();
  }, [id, service]);

  return state;
};
