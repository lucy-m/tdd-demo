import { CoolCalc } from "./05-CoolCalc";

describe("<CoolCalc />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CoolCalc />);
  });
});
