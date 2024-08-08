import { fileTreePageObjectModel } from "../02-FileTree/FileTree.pom";
import { ideWithTabsPageObjectModel } from "../03-IdeWithTabs/IdeWithTabs.pom";
import { FileTreeAndIde } from "./FileTreeAndIde";

describe("FileTreeAndIde", () => {
  beforeEach(() => {
    cy.intercept(
      {
        url: "/fileTree",
      },
      {
        body: [
          { name: "foo", children: [] },
          {
            name: "mocks",
            children: [
              { name: "source1.txt", children: [] },
              { name: "source2.txt", children: [] },
            ],
          },
        ],
      }
    ).as("getFileTree");

    cy.intercept(
      {
        url: /\/content/,
      },
      (request) => {
        const filename = request.url.split("/").pop();

        request.reply({
          body: "Content for " + filename,
        });
      }
    ).as("getFileContent");

    cy.mount(<FileTreeAndIde />);
  });

  describe("clicking a file in the file tree", () => {
    beforeEach(() => {
      fileTreePageObjectModel.getEntry("foo").click();
    });

    it("opens entry in ide", () => {
      ideWithTabsPageObjectModel.getTab("foo");

      // Check API was called
      cy.wait("@getFileContent");

      ideWithTabsPageObjectModel.hasContent("Content for foo");
    });

    describe("renaming foo to bar", () => {
      beforeEach(() => {
        fileTreePageObjectModel.rename("foo", "bar");
      });

      it("renames tabs", () => {
        ideWithTabsPageObjectModel.getTab("foo").should("not.exist");
        ideWithTabsPageObjectModel.getTab("bar");
      });
    });

    // TODO: Add tests for deleting
  });
});
