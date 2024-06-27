import React, { useState, useEffect } from "react";
import { Folder, File, ChevronRight, ChevronDown } from "lucide-react";

const FileExplorer = ({ shouldAnimate }: { shouldAnimate: boolean }) => {
  const [expandedFolders, setExpandedFolders] = useState({});

  const fileStructure = [
    {
      id: 1,
      name: "snakegame",
      type: "folder",
      children: [
        { id: 2, name: "snakegame.py", type: "file" },
        { id: 3, name: "gamelogic.py", type: "file" },
      ],
    },
    {
      id: 4,
      name: "Images",
      type: "folder",
      children: [
        { id: 5, name: "Photo1.jpg", type: "file" },
        { id: 6, name: "Photo2.png", type: "file" },
      ],
    },
    { id: 7, name: "config.json", type: "file" },
  ];

  const toggleFolder = (folderId) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  useEffect(() => {
    if (!shouldAnimate) return;
    const folderIds = fileStructure
      .filter((item) => item.type === "folder")
      .map((folder) => folder.id);

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      toggleFolder(folderIds[currentIndex]);
      currentIndex = (currentIndex + 1) % folderIds.length;
    }, 2000); // Toggle a folder every 2 seconds

    return () => clearInterval(intervalId);
  }, [shouldAnimate]);

  const renderItem = (item) => {
    const isExpanded = expandedFolders[item.id];

    return (
      <div key={item.id} className="my-2">
        {item.type === "folder" ? (
          <div>
            <div className="flex items-center ">
              {isExpanded ? (
                <ChevronDown size={20} />
              ) : (
                <ChevronRight size={20} />
              )}
              <Folder size={20} className="mr-2" />
              {item.name}
            </div>
            <div
              className={`ml-6 mt-2 border-l-2 border-gray-200 pl-4 overflow-hidden transition-all duration-500 ease-in-out ${
                isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {item.children.map(renderItem)}
            </div>
          </div>
        ) : (
          <div className="flex items-center text-gray-700">
            <File size={20} className="mr-2" />
            {item.name}
          </div>
        )}
      </div>
    );
  };

  return <div className=" h-64">{fileStructure.map(renderItem)}</div>;
};

export default FileExplorer;
