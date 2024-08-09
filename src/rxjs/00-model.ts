export type UserTabs = string[];
export type UserProfile = {
  name: string;
  age: number;
};
export type UserAccount = {
  email: string;
  phoneNumber: string;
};

export type ProfileLoadState = {
  userTabs: UserTabs | "loading";
  userProfile: UserProfile | "loading";
  userAccount: UserAccount | "loading" | "n/a";
};
