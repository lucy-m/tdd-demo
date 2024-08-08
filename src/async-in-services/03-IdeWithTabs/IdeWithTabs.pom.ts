export const ideWithTabsPageObjectModel = {
  getTab: (name: string) => cy.get(`[data-tab='${name}']`),
  selectTab: (name: string) => ideWithTabsPageObjectModel.getTab(name).click(),
  hasContent: (content: string) =>
    cy.get(`[data-testid='ide-content']`).should("contain", content),
};
