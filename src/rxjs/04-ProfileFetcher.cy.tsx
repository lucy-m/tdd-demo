import {
  ProfileLoadState,
  UserAccount,
  UserProfile,
  UserTabs,
} from "./00-model";
import {
  makeTriggerablePromise,
  TriggerablePromise,
} from "./00-triggerable-promise";
import { ProfileServiceContext } from "./01-ProfileService";
import { usePromiseFetcher } from "./02-PromiseFetcher";

// There's no way to test hooks by themselves in Cypress so
//   we are mounting it into a test helper component
// If you really want to test custom hooks you can use
//   jest and @testing-library/react-hooks
const TestHelper: React.FC<{
  id: string;
}> = ({ id }) => {
  const { userTabs, userProfile, userAccount } = usePromiseFetcher(id);

  // Note that useObservableFetcher has the same behaviour as usePromiseFetcher
  // You can uncomment this line and comment above and tests will pass
  // const { userTabs, userProfile, userAccount } = useObservableFetcher(id);

  return (
    <dl>
      <dt>User tabs</dt>
      <dd data-testid="user-tabs">{JSON.stringify(userTabs)}</dd>

      <dt>User profile</dt>
      <dd data-testid="user-profile">{JSON.stringify(userProfile)}</dd>

      <dt>User account</dt>
      <dd data-testid="user-account">{JSON.stringify(userAccount)}</dd>
    </dl>
  );
};

describe("ProfileFetcher", () => {
  let getUserTabs: TriggerablePromise<UserTabs>;
  let getUserAccount: TriggerablePromise<UserAccount>;
  let getUserProfile: TriggerablePromise<UserProfile>;

  const assertUserTabs = (userTabs: ProfileLoadState["userTabs"]) =>
    cy
      .get("[data-testid='user-tabs']")
      .should("have.text", JSON.stringify(userTabs));

  const assertUserProfile = (userProfile: ProfileLoadState["userProfile"]) =>
    cy
      .get("[data-testid='user-profile'")
      .should("have.text", JSON.stringify(userProfile));

  const assertUserAccount = (userAccount: ProfileLoadState["userAccount"]) =>
    cy
      .get("[data-testid='user-account'")
      .should("have.text", JSON.stringify(userAccount));

  const getUserTabsSpy = () => cy.get<sinon.SinonSpy>("@getUserTabs");
  const getUserAccountSpy = () => cy.get<sinon.SinonSpy>("@getUserAccount");
  const getUserProfileSpy = () => cy.get<sinon.SinonSpy>("@getUserProfile");

  beforeEach(() => {
    getUserTabs = makeTriggerablePromise<UserTabs>();
    getUserAccount = makeTriggerablePromise<UserAccount>();
    getUserProfile = makeTriggerablePromise<UserProfile>();

    cy.mount(
      <ProfileServiceContext.Provider
        value={{
          getUserTabs: cy.stub().as("getUserTabs").returns(getUserTabs.promise),
          getUserAccount: cy
            .stub()
            .as("getUserAccount")
            .returns(getUserAccount.promise),
          getUserProfile: cy
            .stub()
            .as("getUserProfile")
            .returns(getUserProfile.promise),
        }}
      >
        <TestHelper id="id" />
      </ProfileServiceContext.Provider>
    );
  });

  it("shows loading", () => {
    assertUserTabs("loading");
    assertUserProfile("loading");
    assertUserAccount("loading");
  });

  it("calls correct APIs", () => {
    getUserTabsSpy().should("have.been.calledOnce");
    getUserProfileSpy().should("have.been.calledOnce");
    getUserAccountSpy().should("not.have.been.called");
  });

  describe("userProfile resolves", () => {
    const profile: UserProfile = { name: "Lucy", age: 68 };

    beforeEach(() => {
      getUserProfile.resolve(profile);
    });

    it("shows correct data", () => {
      assertUserTabs("loading");
      assertUserProfile(profile);
      assertUserAccount("loading");
    });

    it("does not call getUserAccount", () => {
      getUserAccountSpy().should("not.have.been.called");
    });

    describe("userTabs resolves with account", () => {
      const tabs = ["profile", "account", "notifications"];

      beforeEach(() => {
        getUserTabs.resolve(tabs);
      });

      it("shows correct data", () => {
        assertUserTabs(tabs);
        assertUserProfile(profile);
        assertUserAccount("loading");
      });

      it("calls getUserAccount", () => {
        getUserAccountSpy().should("have.been.called");
      });

      describe("userAccount resolves", () => {
        const account: UserAccount = {
          email: "lucy@example.com",
          phoneNumber: "9.geo9.2g9",
        };

        beforeEach(() => {
          getUserAccount.resolve(account);
        });

        it("shows correct data", () => {
          assertUserTabs(tabs);
          assertUserProfile(profile);
          assertUserAccount(account);
        });
      });
    });

    describe("userTabs resolves without account", () => {
      const tabs = ["profile"];

      beforeEach(() => {
        getUserTabs.resolve(tabs);
      });

      it("shows correct data", () => {
        assertUserTabs(tabs);
        assertUserProfile(profile);
        assertUserAccount("n/a");
      });

      it("does not call getUserAccount", () => {
        getUserAccountSpy().should("not.have.been.called");
      });
    });
  });
});
