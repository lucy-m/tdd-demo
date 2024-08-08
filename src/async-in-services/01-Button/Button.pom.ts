export const buttonPageObjectModel = {
  get: (label: string) => cy.get(`[aria-label="${label}"]`),
};
