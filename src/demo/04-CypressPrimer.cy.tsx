import { CypressPrimer } from "./03-CypressPrimer";

describe("<CypressPrimer />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CypressPrimer initial={1} step={1} />);
  });
});
