import { useReducer } from "react";
import { FileTree } from "../02-FileTree";
import { IdeWithTabs } from "../03-IdeWithTabs/IdeWithTabs";
import {
  fileTreeAndIdeReducer,
  FileTreeAndIdeState,
} from "./fileTreeAndIdeState";

const initialState: FileTreeAndIdeState = {
  fileTree: {
    nodes: [
      {
        name: "folder",
        children: [
          { name: "file1.txt", children: [] },
          { name: "file2.txt", children: [] },
        ],
      },
      { name: "zugzug", children: [] },
    ],
  },
  ideWithTabs: {
    activeTab: "zugzug",
    tabs: ["zugzug"],
  },
};

export const FileTreeAndIde: React.FC = () => {
  const [state, dispatch] = useReducer(fileTreeAndIdeReducer, initialState);

  return (
    <div>
      <>
        <FileTree state={state.fileTree} dispatch={dispatch} />
        <IdeWithTabs state={state.ideWithTabs} dispatch={dispatch} />
      </>
    </div>
  );
};
