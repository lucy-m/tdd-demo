import React from "react";
import "./04-IdeWithTabs.css";

export type IdeWithTabsProps = {
  tabs: string[];
  activeTab: string;
  tabContent: string;
  onTabClick: (t: string) => void;
};

export const IdeWithTabs: React.FC<IdeWithTabsProps> = ({
  tabs,
  activeTab,
  tabContent,
}) => {
  return (
    <div>
      <div className="ide-with-tabs-tabs">
        {tabs.map((t) => (
          <div
            data-tab={t}
            className={
              "ide-with-tabs-tab " + (t === activeTab ? "active" : "inactive")
            }
          >
            {t}
          </div>
        ))}
      </div>
      <div className="ide-content">{tabContent}</div>
    </div>
  );
};
