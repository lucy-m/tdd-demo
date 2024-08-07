import { FileTree } from "./FileTree";
import { fileTreePageObjectModel } from "./FileTree.pom";

// Warning that these tests are using .realHover to ensure buttons
//   are visible before clicking. Moving your mouse while the test
//   is running can cause the test to fail.

describe("FileTree", () => {
  const getOnChangeSpy = () => cy.get("@onChangeSpy");

  beforeEach(() => {
    cy.mount(
      <FileTree
        nodes={[
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
        ]}
        onChange={cy.spy().as("onChangeSpy")}
      />
    );
  });

  it("displays files", () => {
    fileTreePageObjectModel.hasEntry("folder", "foo");
    fileTreePageObjectModel.hasEntry("file", "bar.h");
    fileTreePageObjectModel.hasEntry("file", "bar.c");
    fileTreePageObjectModel.hasEntry("file", "myfile.txt");
  });

  describe("hovering entry", () => {
    const entryElement = () => fileTreePageObjectModel.getEntry("bar.h");

    beforeEach(() => {
      entryElement().realHover();
    });

    it("rename is visible", () => {
      entryElement().within(() => {
        fileTreePageObjectModel.getRenameButton().should("be.visible");
      });
    });

    describe("clicking rename", () => {
      beforeEach(() => {
        entryElement().within(() => {
          fileTreePageObjectModel.getRenameButton().click();
        });
      });

      it("initiates rename", () => {
        fileTreePageObjectModel.getRenameInput().should("have.value", "bar.h");
      });

      it("has buttons", () => {
        fileTreePageObjectModel.getAcceptButton();
        fileTreePageObjectModel.getCancelButton();
      });

      describe("renaming and accepting", () => {
        beforeEach(() => {
          fileTreePageObjectModel.getRenameInput().clear().type("new name");

          fileTreePageObjectModel.getAcceptButton().click();
        });

        it("emits new file tree", () => {
          getOnChangeSpy().should("have.been.calledWith", [
            {
              name: "foo",
              children: [
                { name: "new name", children: [] },
                { name: "bar.c", children: [] },
              ],
            },
            {
              name: "myfile.txt",
              children: [],
            },
          ]);
        });
      });

      describe("cancelling", () => {
        it("does not emit", () => {
          getOnChangeSpy().should("not.have.been.called");
        });
      });
    });

    describe("clicking delete", () => {
      beforeEach(() => {
        entryElement().within(() => {
          fileTreePageObjectModel.getDeleteButton().click();
        });
      });

      it("emits new file tree", () => {
        getOnChangeSpy().should("have.been.calledWith", [
          {
            name: "foo",
            children: [{ name: "bar.c", children: [] }],
          },
          {
            name: "myfile.txt",
            children: [],
          },
        ]);
      });
    });
  });

  describe("fileTreePageObjectModel methods", () => {
    it("rename", () => {
      fileTreePageObjectModel.rename("myfile.txt", "newname.txt");

      getOnChangeSpy().should("have.been.calledWith", [
        {
          name: "foo",
          children: [
            { name: "bar.h", children: [] },
            { name: "bar.c", children: [] },
          ],
        },
        {
          name: "newname.txt",
          children: [],
        },
      ]);
    });
  });
});
