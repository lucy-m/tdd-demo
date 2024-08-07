import { useState } from "react";
import { Button } from "../01-Button/Button";
import "./FileTree.css";

export type TreeNode = {
  name: string;
  children: TreeNode[];
};

export type FileTreeProps = {
  nodes: TreeNode[];
  onChange: (newNodes: TreeNode[]) => void;
};

const TreeNodeDisplay: React.FC<{
  node: TreeNode;
  onRename: (node: TreeNode, newName: string) => void;
  onDelete: (node: TreeNode) => void;
}> = ({ node, onRename, onDelete }) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(node.name);

  const hasChildren = node.children.length > 0;

  return (
    <div className="tree-node-display">
      <div className="tree-node-name-wrapper" data-name={node.name}>
        <div className="tree-node-icon">{hasChildren ? "📁" : "📝"}</div>
        {isRenaming ? (
          <>
            <input
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
            ></input>
            <div className="tree-node-interactions">
              <Button
                label="Accept"
                icon="tick"
                type="success"
                onClick={() => {
                  setIsRenaming(false);
                  onRename(node, renameValue);
                }}
              />
              <Button
                label="Cancel"
                icon="cross"
                type="warning"
                onClick={() => setIsRenaming(false)}
              />
            </div>
          </>
        ) : (
          <>
            <div>{node.name}</div>
            <div className="tree-node-interactions">
              <Button
                label="Rename"
                icon="pencil"
                type="neutral"
                onClick={() => setIsRenaming(true)}
              />
              <Button
                label="Delete"
                icon="cross"
                type="warning"
                onClick={() => onDelete(node)}
              />
            </div>
          </>
        )}
      </div>
      {hasChildren && (
        <div>
          <div className="tree-node-spacer"></div>
          <div className="tree-node-children-wrapper">
            {node.children.map((c) => (
              <TreeNodeDisplay
                key={c.name}
                node={c}
                onRename={onRename}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const FileTree: React.FC<FileTreeProps> = ({ nodes, onChange }) => {
  const onRename = (node: TreeNode, newName: string) => {
    const renameNodes = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map((n) => {
        const name = n === node ? newName : n.name;
        const children = renameNodes(n.children);

        return { name, children };
      });
    };

    const renamed = renameNodes(nodes);

    onChange(renamed);
  };

  const onDelete = (node: TreeNode) => {
    const deleteNode = (nodes: TreeNode[]): TreeNode[] => {
      return nodes
        .filter((n) => n !== node)
        .map((n) => {
          const children = deleteNode(n.children);

          return { name: n.name, children };
        });
    };

    const deleted = deleteNode(nodes);

    onChange(deleted);
  };

  return (
    <div>
      {nodes.map((n) => (
        <TreeNodeDisplay
          key={n.name}
          node={n}
          onRename={onRename}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
