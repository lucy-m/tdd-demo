import { useEffect, useState } from "react";
import { FileTree, FileTreeChangeEvent, TreeNode } from "../02-FileTree";
import { IdeWithTabs } from "../03-IdeWithTabs/IdeWithTabs";

// Uses a promise to simulate async behaviour
const getCachedFileTree = (): Promise<TreeNode[]> => {
  return new Promise((resolve, reject) => {
    const storageValue = window.localStorage.getItem("fileTree");

    if (storageValue) {
      resolve(JSON.parse(storageValue));
    } else {
      reject("Not found");
    }
  });
};

export const FileTreeAndIde: React.FC = () => {
  const [fileTree, setFileTree] = useState<TreeNode[] | undefined>();
  const [activeTab, setActiveTab] = useState<string | undefined>();
  const [tabs, setTabs] = useState<string[]>([]);
  const [activeContent, setActiveContent] = useState<string | undefined>();

  useEffect(() => {
    getCachedFileTree()
      .catch(() => fetch("/fileTree").then((response) => response.json()))
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
