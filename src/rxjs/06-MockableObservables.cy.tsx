import { Subject } from "rxjs";
import { ProfileLoadState } from "./00-model";
import {
  ObservableProfileServiceContext,
  UserProfile,
} from "./05-MockableObservables";

describe("MockableObservables", () => {
  // Subject is an Observable that has a "next" method, allowing
  //   us to explicitly pass in values
  let profileState: Subject<ProfileLoadState>;

  beforeEach(() => {
    profileState = new Subject();

    cy.mount(
      <ObservableProfileServiceContext.Provider
        value={{
          getProfileState: () => profileState,
        }}
      >
        <UserProfile />
      </ObservableProfileServiceContext.Provider>
    );
  });

  const assertState = (state: ProfileLoadState) => {
    cy.contains(JSON.stringify(state));
  };

  it("shows loading", () => {
    assertState({
      userAccount: "loading",
      userProfile: "loading",
      userTabs: "loading",
    });
  });

  describe("account and profile load", () => {
    const newState: ProfileLoadState = {
      userAccount: {
        email: "abc",
        phoneNumber: "123",
      },
      userProfile: {
        age: 99,
        name: "mimi",
      },
      userTabs: "loading",
    };

    beforeEach(() => {
      // We can pass in any data we want into the profileState via `next`
      // We don't need to worry where this data came from
      profileState.next(newState);
    });

    it("shows data", () => {
      assertState(newState);
    });
  });
});
