export type IdeWithTabsState = {
  tabs: string[];
  activeTab: string;
};

export type IdeWithTabsAction = {
  kind: "tabClick";
  tab: string;
};

export const ideWithTabsReducer = (
  state: IdeWithTabsState,
  action: IdeWithTabsAction
): IdeWithTabsState => {
  throw new Error("Not yet implemented");
};
