import React, { PropsWithChildren } from "react";
import { FileTree } from "../02-FileTree";
import { IdeWithTabs } from "../03-IdeWithTabs/IdeWithTabs";

export type ComponentInjectorContextType = {
  FileTree: typeof FileTree;
  IdeWithTabs: typeof IdeWithTabs;
};

const defaultValue = {
  FileTree,
  IdeWithTabs,
};

export const ComponentInjectorContext =
  React.createContext<ComponentInjectorContextType>({
    FileTree,
    IdeWithTabs,
  });

export const useComponentInjector = () =>
  React.useContext(ComponentInjectorContext);

export const ComponentInjectorProvider: React.FC<
  PropsWithChildren<{ overrides: Partial<ComponentInjectorContextType> }>
> = ({ overrides, children }) => {
  return (
    <ComponentInjectorContext.Provider
      value={{ ...defaultValue, ...overrides }}
    >
      {children}
    </ComponentInjectorContext.Provider>
  );
};
