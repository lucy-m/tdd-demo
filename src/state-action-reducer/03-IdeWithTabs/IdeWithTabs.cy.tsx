import { IdeWithTabs } from "./IdeWithTabs";
import { ideWithTabsPageObjectModel } from "./IdeWithTabs.pom";

describe("IdeWithTabs", () => {
  beforeEach(() => {
    cy.mount(
      <IdeWithTabs
        state={{
          tabs: ["foo.ts", "bar.h", "xyz.txt"],
          activeTab: "xyz.txt",
        }}
        dispatch={cy.spy().as("dispatch")}
      />
    );
  });

  it("shows all tabs", () => {
    ideWithTabsPageObjectModel.getTab("foo.ts");
    ideWithTabsPageObjectModel.getTab("bar.h");
    ideWithTabsPageObjectModel.getTab("xyz.txt");
  });

  describe("selecting a tab", () => {
    beforeEach(() => {
      ideWithTabsPageObjectModel.selectTab("foo.ts");
    });

    it("dispatches action", () => {
      cy.get("@dispatch").should("have.been.calledWith", {
        kind: "tabClick",
        tab: "foo.ts",
      });
    });
  });
});
