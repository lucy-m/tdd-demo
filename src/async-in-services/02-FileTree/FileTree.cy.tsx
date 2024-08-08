import { FileTree } from "./FileTree";
import { fileTreePageObjectModel } from "./FileTree.pom";

// Warning that these tests are using .realHover to ensure buttons
//   are visible before clicking. Moving your mouse while the test
//   is running can cause the test to fail.

describe("FileTree", () => {
  const getOnChangeSpy = () => cy.get("@onChangeSpy");
  const getOnNodeClickSpy = () => cy.get("@onNodeClick");

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
        onNodeClick={cy.spy().as("onNodeClick")}
      />
    );
  });

  it("displays files", () => {
    fileTreePageObjectModel.hasEntry("folder", "foo");
    fileTreePageObjectModel.hasEntry("file", "bar.h");
    fileTreePageObjectModel.hasEntry("file", "bar.c");
    fileTreePageObjectModel.hasEntry("file", "myfile.txt");
  });

  describe("clicking entry", () => {
    beforeEach(() => {
      fileTreePageObjectModel.getEntry("myfile.txt").click();
    });

    it("calls onNodeClick", () => {
      getOnNodeClickSpy().should("have.been.calledWith", {
        name: "myfile.txt",
        children: [],
      });
    });
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

      it("does not call onNodeClick", () => {
        getOnNodeClickSpy().should("not.have.been.called");
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
          getOnChangeSpy().should(
            "have.been.calledWith",
            [
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
            ],
            {
              kind: "rename",
              newName: "new name",
              oldNode: { name: "bar.h", children: [] },
            }
          );
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

      it("does not emit onNodeClick", () => {
        getOnNodeClickSpy().should("not.have.been.called");
      });

      it("emits new file tree", () => {
        getOnChangeSpy().should(
          "have.been.calledWith",
          [
            {
              name: "foo",
              children: [{ name: "bar.c", children: [] }],
            },
            {
              name: "myfile.txt",
              children: [],
            },
          ],
          {
            kind: "delete",
            node: { name: "bar.h", children: [] },
          }
        );
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
