import React from "react";
import "./IdeWithTabs.css";
import { IdeWithTabsAction, IdeWithTabsState } from "./ideWithTabsState";

export type IdeWithTabsProps = {
  state: IdeWithTabsState;
  dispatch: (action: IdeWithTabsAction) => void;
};

export const IdeWithTabs: React.FC<IdeWithTabsProps> = ({
  state,
  dispatch,
}) => {
  const { tabs, activeTab } = state;

  return (
    <div>
      <div className="ide-with-tabs-tabs">
        {tabs.map((t) => (
          <div
            data-tab={t}
            className={
              "ide-with-tabs-tab " + (t === activeTab ? "active" : "inactive")
            }
            onClick={() => dispatch({ kind: "tabClick", tab: t })}
          >
            {t}
          </div>
        ))}
      </div>
      <div data-testid="ide-content" className="ide-content">
        Tab content will go here (not implemented)
      </div>
    </div>
  );
};
