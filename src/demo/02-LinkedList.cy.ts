import {
  insertAtIndex,
  makeLinkedList,
  makeNode,
  prettyPrint,
} from "./01-LinkedList";

describe("LinkedListNode", () => {
  describe("prettyPrint", () => {
    it("empty list", () => {
      const list = makeLinkedList();
      expect(prettyPrint(list)).to.equal("[]");
    });

    it("[1]", () => {
      const list = makeLinkedList(makeNode(1));
      expect(prettyPrint(list)).to.equal("[1]");
    });

    it("[1, 2]", () => {
      // TODO: Fill in
    });

    it("[4,3,2,1]", () => {
      // TODO: Fill in
    });
  });

  describe("insertAtIndex", () => {
    describe("list [1,2,3]", () => {
      const list = makeLinkedList(makeNode(1, makeNode(2, makeNode(3))));

      it("inserting at index 0 will insert at the start of the list", () => {
        insertAtIndex(list, 7, 0);
        expect(prettyPrint(list)).to.equal("[7,1,2,3]");
      });

      it("inserting at index in the list inserts at the correct location", () => {
        insertAtIndex(list, 7, 1);
        expect(prettyPrint(list)).to.equal("[1,7,2,3]");
      });

      // TODO: What other test cases are there for this?
    });

    // TODO: We should probably include some tests for other lists too!
  });
});
