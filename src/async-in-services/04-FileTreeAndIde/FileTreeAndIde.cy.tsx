import { fileTreePageObjectModel } from "../02-FileTree/FileTree.pom";
import { FileTreeAndIde } from "./FileTreeAndIde";

describe("FileTreeAndIde", () => {
  beforeEach(() => {
    // Setting up some API intercepts to mimic API calling
    cy.intercept(
      {
        url: "/fileTree",
      },
      {
        body: [{ name: "apiResponse", children: [] }],
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

  it("local storage value", () => {
    cy.window().then((w) => {
      w.localStorage.setItem(
        "fileTree",
        JSON.stringify([{ name: "localStorage", children: [] }])
      );
    });

    cy.mount(<FileTreeAndIde />);

    fileTreePageObjectModel.getEntry("localStorage");
  });

  it("no local storage value", () => {
    cy.mount(<FileTreeAndIde />);

    fileTreePageObjectModel.getEntry("apiResponse");
  });
});
