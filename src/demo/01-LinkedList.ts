export type LinkedListNode = Readonly<{
  value: number;
  next?: LinkedListNode;
}>;

export const makeNode = (
  value: number,
  next?: LinkedListNode
): LinkedListNode => ({
  value,
  next,
});

export type LinkedList = Readonly<{
  head?: LinkedListNode;
}>;

export const makeLinkedList = (head?: LinkedListNode): LinkedList => ({
  head,
});

export const prettyPrint = (list: LinkedList): string => {
  throw new Error("Not implemented");
};

export const insertAtIndex = (
  list: LinkedList,
  value: number,
  index: number
): LinkedList => {
  throw new Error("Not implemented");
};
