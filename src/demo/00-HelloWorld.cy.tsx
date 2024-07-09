export const HelloWorld: React.FC = () => {
  return <div>HelloWorld</div>;
};

describe("HelloWorld", () => {
  it("runs code tests", () => {
    expect([4, 3, 2, 1]).to.contain(2);
  });

  it("runs render tests", () => {
    cy.mount(<HelloWorld />);
    cy.contains("HelloWorld");
  });
});
