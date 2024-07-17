import { FileTree } from "./02-FileTree";

const fileTreePageObjectModel = {
  getEntry: (name: string) => cy.get(`[data-name='${name}']`),
  getRenameInput: () => cy.get("input"),
  getRenameButton: () => cy.get("[aria-label='Rename']"),
  getAcceptButton: () => cy.get("[aria-label='Accept']"),
  getCancelButton: () => cy.get("[aria-label='Cancel']"),

  hasEntry: (type: "folder" | "file", name: string) =>
    fileTreePageObjectModel.getEntry(name).within(() => {
      cy.contains(type === "folder" ? "📁" : "📝");
    }),

  rename: (fromName: string, toName: string) => {
    fileTreePageObjectModel
      .getEntry(fromName)
      .realHover()
      .within(() => {
        fileTreePageObjectModel.getRenameButton().click();
        fileTreePageObjectModel.getRenameInput().clear().type(toName);
        fileTreePageObjectModel.getAcceptButton().click();
      });
  },
};

describe("FileTree", () => {
  const getOnChangeSpy = () => cy.get("@onChangeSpy");

  beforeEach(() => {
    cy.mount(
      <FileTree
        nodes={[
          {
            name: "foo",
            children: [{ name: "bar.h" }, { name: "bar.c" }],
          },
          {
            name: "myfile.txt",
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
              children: [{ name: "new name" }, { name: "bar.c" }],
            },
            {
              name: "myfile.txt",
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

    describe("fileTreePageObjectModel methods", () => {
      it("rename", () => {
        fileTreePageObjectModel.rename("myfile.txt", "newname.txt");

        getOnChangeSpy().should("have.been.calledWith", [
          {
            name: "foo",
            children: [{ name: "bar.h" }, { name: "bar.c" }],
          },
          {
            name: "newname.txt",
          },
        ]);
      });
    });
  });
});
