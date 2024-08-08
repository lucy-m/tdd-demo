import { buttonPageObjectModel } from "../01-Button/Button.pom";

export const fileTreePageObjectModel = {
  getEntry: (name: string) => cy.get(`[data-name='${name}']`),
  getRenameInput: () => cy.get("input"),
  getRenameButton: () => buttonPageObjectModel.get("Rename"),
  getDeleteButton: () => buttonPageObjectModel.get("Delete"),
  getAcceptButton: () => buttonPageObjectModel.get("Accept"),
  getCancelButton: () => buttonPageObjectModel.get("Cancel"),

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

  delete: (nodeName: string) => {
    // TODO: POM1 - Implement POM methods for deleting
  },
};
