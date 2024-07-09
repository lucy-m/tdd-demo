import { CoolCalc } from "./99-CoolCalc";

describe("<CoolCalc />", () => {
  beforeEach(() => {
    cy.mount(<CoolCalc />);
  });

  describe("initial state", () => {
    it("has three input elements", () => {
      // TODO: Add assertion that the expected inputs exist
      // Should be one for the first input, one for the second input, and one for the result
      // For this demo, use IDs to select elements
    });

    it("has all input buttons", () => {
      // TODO: Add assertion that the expected buttons exist
      // For this demo, use IDs to select elements
    });

    it("first input is focused", () => {
      // TODO: Add assertion that the first input is focused
    });

    describe("clicking on 1", () => {
      beforeEach(() => {
        // TODO: Add a command to click on 1 button
      });

      it("sets 1 in the first input", () => {
        // TODO
      });

      it("focuses the second input", () => {
        // TODO
        // Hint - you can assert focus using .should("have.focus");
      });

      describe("clicking on 4", () => {
        beforeEach(() => {
          // TODO: Add a command to click on 4 button
        });

        it("sets 4 in the second input", () => {
          // TODO
        });

        it("focuses the first input", () => {
          // TODO
        });

        it("sets 5 in the result", () => {
          // TODO
        });
      });
    });
  });

  describe("no inputs are focused", () => {
    beforeEach(() => {
      // TODO: Add a command to make sure no inputs are focused
      // Hint - you can click on the body element
    });

    describe("clicking on a number", () => {
      beforeEach(() => {
        // TODO
      });

      it("does not set value in inputs", () => {
        // TODO
      });
    });
  });

  // Some additional scenarios for writing tests.
  // These are left as an exercise for you to come up with a
  // specification and implement via TDD.

  // What happens when:
  // - the user enters input 2 before input 1?
  // - the keyboard is used as input?
  //     Consider the case of valid (e.g. single number) and invalid input (e.g. multiple numbers, letters)
  // - both inputs are entered and the user clicks a number?
  // - input 1 is filled, then the user clicks input 1, then they click a number?
});
