import { FileTreeAction, FileTreeState } from "../02-FileTree/fileTreeState";
import {
  IdeWithTabsAction,
  IdeWithTabsState,
} from "../03-IdeWithTabs/ideWithTabsState";

export type FileTreeAndIdeState = {
  fileTree: FileTreeState;
  ideWithTabs: IdeWithTabsState;
};

export type FileTreeAndIdeAction = FileTreeAction | IdeWithTabsAction;

export const fileTreeAndIdeReducer = (
  state: FileTreeAndIdeState,
  action: FileTreeAndIdeAction
): FileTreeAndIdeState => {
  // TODO: SAR2 - Implement rename action
  // You don't need to worry about edge cases such as empty string,
  //   existing name, or invalid characters.
  // Remember that if an open file is renamed, the IDE tab should also be renamed

  throw new Error("Not yet implemented");
};
