import { Button } from "./Button";

// There's nothing in these tests, mainly here so you can preview what the
//   buttons look like for this app.
// Tests in this file would assert things like e.g. for the correct type,
//   the correct background color and border is displayed

describe("Button", () => {
  beforeEach(() => {
    cy.viewport(200, 160);
  });

  it("success button", () => {
    cy.mount(<Button label="Success" type="success" onClick={() => {}} />);
  });

  it("warning button", () => {
    cy.mount(<Button label="Warning" type="warning" onClick={() => {}} />);
  });

  it("neutral button", () => {
    cy.mount(<Button label="Neutral" type="neutral" onClick={() => {}} />);
  });

  it("tick", () => {
    cy.mount(
      <Button label="Accept" type="neutral" icon="tick" onClick={() => {}} />
    );
  });

  it("cross", () => {
    cy.mount(
      <Button label="Decline" type="neutral" icon="cross" onClick={() => {}} />
    );
  });

  it("pencil", () => {
    cy.mount(
      <Button label="Edit" type="neutral" icon="pencil" onClick={() => {}} />
    );
  });
});
