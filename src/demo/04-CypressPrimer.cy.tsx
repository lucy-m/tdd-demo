import { CypressPrimer } from "./03-CypressPrimer";

describe("<CypressPrimer />", () => {
  describe("step = 1", () => {
    beforeEach(() => {
      // Mounts the component with the given props
      cy.mount(<CypressPrimer step={1} />);
    });

    it("displays value 1", () => {
      // cy.get can select any value via its css selector
      // For this session we will use IDs only
      cy.get("#value-input")
        // You can assert the value of inputs by chaining
        //   .should("have.value", value);
        .should("have.value", "1");

      cy.get("#value-display")
        // For text elements, you can use "have.text" to assert on content
        .should("have.text", "This number is 1");
    });

    // For any interactions that change state, I recommend wrapping them in
    //   their own describe block. This allows you to separate the setup
    //   from the assertions.
    describe("clicking increment button", () => {
      beforeEach(() => {
        cy.get("#increment")
          // Chaining '.click()' will click the element
          .click();
      });
      it("displays value 2", () => {
        // TODO: Assert the value and display are correct
      });
    });

    describe("clicking decrement button", () => {
      beforeEach(() => {
        // TODO: Find the #decrement button and click it
      });

      it("displays value 0", () => {
        // TODO: Assert the value and display are correct
      });
    });
  });

  // TODO: Write tests for step = 2
});
