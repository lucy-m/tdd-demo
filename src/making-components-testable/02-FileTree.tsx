import { useState } from "react";
import { Button } from "./00-Button";
import "./02-FileTree.css";

export type TreeNode = {
  name: string;
  children?: TreeNode[];
};

export type FileTreeProps = {
  nodes: TreeNode[];
  onChange: (newNodes: TreeNode[]) => void;
};

const TreeNodeDisplay: React.FC<{
  node: TreeNode;
  onRename: (node: TreeNode, newName: string) => void;
}> = ({ node, onRename }) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(node.name);

  return (
    <div className="tree-node-display">
      <div className="tree-node-name-wrapper" data-name={node.name}>
        <div className="tree-node-icon">{node.children ? "📁" : "📝"}</div>
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
            </div>
          </>
        )}
      </div>
      {node.children && (
        <div>
          <div className="tree-node-spacer"></div>
          <div className="tree-node-children-wrapper">
            {node.children.map((c) => (
              <TreeNodeDisplay key={c.name} node={c} onRename={onRename} />
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
        const children = n.children
          ? { children: renameNodes(n.children) }
          : {};

        return { name, ...children };
      });
    };

    const renamed = renameNodes(nodes);

    onChange(renamed);
  };

  return (
    <div>
      {nodes.map((n) => (
        <TreeNodeDisplay key={n.name} node={n} onRename={onRename} />
      ))}
    </div>
  );
};
