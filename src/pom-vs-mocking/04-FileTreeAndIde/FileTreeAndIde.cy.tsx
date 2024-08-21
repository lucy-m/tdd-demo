import { FileTreeProps } from "../02-FileTree";
import { fileTreePageObjectModel } from "../02-FileTree/FileTree.pom";
import { ideWithTabsPageObjectModel } from "../03-IdeWithTabs/IdeWithTabs.pom";
import { ComponentInjectorProvider } from "./ComponentInjector";
import { FileTreeAndIde } from "./FileTreeAndIde";

describe("FileTreeAndIde", () => {
  beforeEach(() => {
    // Setting up some API intercepts to mimic API calling
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
  });

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

      // TODO: POM2 - Add tests for deleting
    });
  });

  // TODO: Mock1 - Focus this test suite
  describe("with file tree mock", () => {
    beforeEach(() => {
      const mockFileTree = (props: FileTreeProps) => {
        return (
          <div>
            Mock file tree
            <button
              onClick={() => {
                props.onNodeClick({
                  name: "someNode",
                  children: [],
                });
              }}
            >
              onNodeClick someNode
            </button>
          </div>
        );
      };

      cy.mount(
        <ComponentInjectorProvider overrides={{ FileTree: mockFileTree }}>
          <FileTreeAndIde />
        </ComponentInjectorProvider>
      );
    });

    describe("clicking a node in the file tree", () => {
      beforeEach(() => {
        cy.contains("button", "onNodeClick someNode").click();
      });

      it("opens file in IDE", () => {
        ideWithTabsPageObjectModel.getTab("someNode");
      });

      // TODO: Mock2 - Add a test for node renaming behaviour
      // Renaming the open node "someNode" should also rename the IDE tab
      describe("renaming someNode", () => {
        beforeEach(() => {
          // TODO: Write a command to click on the "rename" button in the mock
        });

        it("IDE tab is renamed", () => {
          // TODO: Use the page object model to check that the old name tab
          //   does not exist and the new name tab does exist
        });
      });

      // TODO: Mock3 - Add a test for delete behaviour
      // Deleting the open node "someNode" should also delete the IDE tab
      // This behaviour is not yet implemented
    });
  });
});
