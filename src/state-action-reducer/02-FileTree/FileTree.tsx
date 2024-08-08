import { useState } from "react";
import { Button } from "../01-Button/Button";
import "./FileTree.css";
import { FileTreeAction, FileTreeState, TreeNode } from "./fileTreeState";

export type FileTreeProps = {
  state: FileTreeState;
  dispatch: (action: FileTreeAction) => void;
};

const TreeNodeDisplay: React.FC<{
  node: TreeNode;
  onClick: (node: TreeNode) => void;
  onRename: (node: TreeNode, newName: string) => void;
  onDelete: (node: TreeNode) => void;
}> = ({ node, onRename, onDelete, onClick }) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(node.name);

  const hasChildren = node.children.length > 0;

  return (
    <div
      className="tree-node-display"
      onClick={(e) => {
        onClick(node);
        e.stopPropagation();
      }}
    >
      <div className="tree-node-name-wrapper" data-name={node.name}>
        <div className="tree-node-icon">{hasChildren ? "📁" : "📝"}</div>
        {isRenaming ? (
          <>
            <input
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onClick={(e) => e.stopPropagation()}
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
                onClick={onClick}
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

export const FileTree: React.FC<FileTreeProps> = ({ state, dispatch }) => {
  const nodes = state.nodes;

  return (
    <div>
      {nodes.map((n) => (
        <TreeNodeDisplay
          key={n.name}
          node={n}
          onClick={() => dispatch({ kind: "nodeClick", node: n })}
          onRename={(node, newName) =>
            dispatch({
              kind: "rename",
              node,
              newName,
            })
          }
          onDelete={(node) =>
            dispatch({
              kind: "delete",
              node,
            })
          }
        />
      ))}
    </div>
  );
};
