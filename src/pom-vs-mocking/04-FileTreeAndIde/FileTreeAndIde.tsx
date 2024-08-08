import { useEffect, useState } from "react";
import { FileTreeChangeEvent, TreeNode } from "../02-FileTree";
import { useComponentInjector } from "./ComponentInjector";

export const FileTreeAndIde: React.FC = () => {
  const { FileTree, IdeWithTabs } = useComponentInjector();

  const [fileTree, setFileTree] = useState<TreeNode[] | undefined>();
  const [activeTab, setActiveTab] = useState<string | undefined>();
  const [tabs, setTabs] = useState<string[]>([]);
  const [activeContent, setActiveContent] = useState<string | undefined>();

  useEffect(() => {
    fetch("/fileTree")
      .then((response) => response.json())
      .then((data) => {
        setFileTree(data);
      });
  }, []);

  useEffect(() => {
    if (activeTab) {
      fetch("/content/" + activeTab)
        .then((response) => response.text())
        .then((data) => {
          setActiveContent(data);
        });
    }
  });

  const onChange = (newNodes: TreeNode[], changeEvent: FileTreeChangeEvent) => {
    setFileTree(newNodes);

    if (changeEvent.kind === "rename") {
      const renamedTabs = tabs.map((t) =>
        t === changeEvent.oldNode.name ? changeEvent.newName : t
      );
      setTabs(renamedTabs);

      if (activeTab === changeEvent.oldNode.name) {
        setActiveTab(changeEvent.newName);
      }
    }

    // TODO: POM3 - Implement correct change handling for delete
    // TODO: Mock4
  };

  return (
    <div>
      {!fileTree ? (
        <div>Loading</div>
      ) : (
        <>
          <FileTree
            nodes={fileTree}
            onNodeClick={(node) => {
              setActiveTab(node.name);
              setTabs([...tabs, node.name]);
            }}
            onChange={onChange}
          />
          {activeTab ? (
            <IdeWithTabs
              activeTab={activeTab}
              tabs={tabs}
              onTabClick={(t) => setActiveTab(t)}
              tabContent={activeContent ?? "Loading..."}
            />
          ) : (
            <div>Open a file to get started</div>
          )}
        </>
      )}
    </div>
  );
};
