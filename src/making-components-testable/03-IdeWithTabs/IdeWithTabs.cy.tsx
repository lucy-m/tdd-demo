import { IdeWithTabs } from "./IdeWithTabs";
import { ideWithTabsPageObjectModel } from "./IdeWithTabs.pom";

describe("IdeWithTabs", () => {
  beforeEach(() => {
    cy.mount(
      <IdeWithTabs
        tabs={["foo.ts", "bar.h", "xyz.txt"]}
        activeTab="xyz.txt"
        tabContent="hello!"
        onTabClick={cy.spy().as("onTabClick")}
      />
    );
  });

  it("shows all tabs", () => {
    ideWithTabsPageObjectModel.getTab("foo.ts");
    ideWithTabsPageObjectModel.getTab("bar.h");
    ideWithTabsPageObjectModel.getTab("xyz.txt");
  });

  it("shows selected tab", () => {
    ideWithTabsPageObjectModel
      .getTab("foo.ts")
      .should("not.have.class", "active");

    ideWithTabsPageObjectModel.getTab("xyz.txt").should("have.class", "active");
  });

  it("has correct content", () => {
    ideWithTabsPageObjectModel.hasContent("hello!");
  });

  it("clicking a tab", () => {
    ideWithTabsPageObjectModel.selectTab("foo.ts");
    cy.get("@onTabClick").should("have.been.calledWith", "foo.ts");
  });
});
