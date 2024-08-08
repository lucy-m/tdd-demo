import { fileTreePageObjectModel } from "../02-FileTree/FileTree.pom";
import { ideWithTabsPageObjectModel } from "../03-IdeWithTabs/IdeWithTabs.pom";
import { FileTreeAndIde } from "./FileTreeAndIde";
import {
  FileTreeAndIdeAction,
  fileTreeAndIdeReducer,
  FileTreeAndIdeState,
} from "./fileTreeAndIdeState";

describe("FileTreeAndIde", () => {
  describe("pom tests", () => {
    beforeEach(() => {
      cy.mount(<FileTreeAndIde />);
    });

    describe("clicking a file in the file tree", () => {
      beforeEach(() => {
        fileTreePageObjectModel.getEntry("foo").click();
      });

      it("opens entry in ide", () => {
        ideWithTabsPageObjectModel.getTab("foo");

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
    });
  });
});

describe("fileTreeAndIdeReducer", () => {
  describe("rename", () => {
    it("works", () => {
      // Simple case here
      // You would want to add more test cases to check for edge cases

      const initialState: FileTreeAndIdeState = {
        fileTree: {
          nodes: [
            {
              name: "folder",
              children: [
                { name: "file1.txt", children: [] },
                { name: "file2.txt", children: [] },
              ],
            },
            { name: "zugzug", children: [] },
          ],
        },
        ideWithTabs: {
          activeTab: "file1.txt",
          tabs: ["file1.txt"],
        },
      };

      const action: FileTreeAndIdeAction = {
        kind: "rename",
        node: { name: "file1.txt", children: [] },
        newName: "new name.txt",
      };

      const expected: FileTreeAndIdeState = {
        fileTree: {
          nodes: [
            {
              name: "folder",
              children: [
                { name: "file1.txt", children: [] },
                { name: "file2.txt", children: [] },
              ],
            },
            { name: "zugzug", children: [] },
          ],
        },
        ideWithTabs: {
          activeTab: "new name.txt",
          tabs: ["new name.txt"],
        },
      };

      expect(fileTreeAndIdeReducer(initialState, action)).to.eq(expected);
    });
  });
});
