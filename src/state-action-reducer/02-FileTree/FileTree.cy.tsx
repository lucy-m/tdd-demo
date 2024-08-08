import { FileTree } from "./FileTree";
import { fileTreePageObjectModel } from "./FileTree.pom";
import {
  FileTreeAction,
  fileTreeReducer,
  FileTreeState,
  TreeNode,
} from "./fileTreeState";

// Warning that these tests are using .realHover to ensure buttons
//   are visible before clicking. Moving your mouse while the test
//   is running can cause the test to fail.

describe("FileTree", () => {
  const getDispatch = () => cy.get("@dispatch");

  beforeEach(() => {
    cy.mount(
      <FileTree
        state={{
          nodes: [
            {
              name: "foo",
              children: [
                { name: "bar.h", children: [] },
                { name: "bar.c", children: [] },
              ],
            },
            {
              name: "myfile.txt",
              children: [],
            },
          ],
        }}
        dispatch={cy.spy().as("dispatch")}
      />
    );
  });

  it("displays files", () => {
    fileTreePageObjectModel.hasEntry("folder", "foo");
    fileTreePageObjectModel.hasEntry("file", "bar.h");
    fileTreePageObjectModel.hasEntry("file", "bar.c");
    fileTreePageObjectModel.hasEntry("file", "myfile.txt");
  });

  describe("clicking a node", () => {
    beforeEach(() => {
      fileTreePageObjectModel.getEntry("myfile.txt").click();
    });

    it("calls dispatch", () => {
      getDispatch().should("have.been.calledWith", {
        kind: "nodeClick",
        node: {
          name: "myfile.txt",
          children: [],
        },
      });
    });
  });
});

describe("fileTreeState", () => {
  describe("rename", () => {
    it("works", () => {
      // Simple case here to check renaming implemented
      // You would want to add a lot more test cases here to check for
      //   edge cases
      const renameNode: TreeNode = {
        name: "myfile.txt",
        children: [],
      };

      const initialState: FileTreeState = {
        nodes: [
          {
            name: "foo",
            children: [
              { name: "bar.h", children: [] },
              { name: "bar.c", children: [] },
            ],
          },
          renameNode,
        ],
      };

      const action: FileTreeAction = {
        kind: "rename",
        node: renameNode,
        newName: "renamed",
      };

      const expected: FileTreeState = {
        nodes: [
          {
            name: "foo",
            children: [
              { name: "bar.h", children: [] },
              { name: "bar.c", children: [] },
            ],
          },
          {
            name: "renamed",
            children: [],
          },
        ],
      };

      expect(fileTreeReducer(initialState, action)).to.eq(expected);
    });
  });
});
