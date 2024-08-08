export type TreeNode = {
  name: string;
  children: TreeNode[];
};

export type FileTreeState = {
  nodes: TreeNode[];
};

export type FileTreeAction =
  | {
      kind: "rename";
      node: TreeNode;
      newName: string;
    }
  | {
      kind: "delete";
      node: TreeNode;
    }
  | {
      kind: "nodeClick";
      node: TreeNode;
    };

export const fileTreeReducer = (
  state: FileTreeState,
  action: FileTreeAction
): FileTreeState => {
  // TODO: SAR1 - Implement behaviour for rename action
  // You don't need to worry about edge cases such as empty string,
  //   existing name, or invalid characters.
  // You can look at pom-vs-mocking/FileTree.tsx for implementation

  throw new Error("Not yet implemented");
};
