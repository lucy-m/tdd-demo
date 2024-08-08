import React from "react";
import "./IdeWithTabs.css";

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
  onTabClick,
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
            onClick={() => onTabClick(t)}
          >
            {t}
          </div>
        ))}
      </div>
      <div data-testid="ide-content" className="ide-content">
        {tabContent}
      </div>
    </div>
  );
};
