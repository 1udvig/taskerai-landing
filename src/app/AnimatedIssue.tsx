import React, { useState, useEffect } from "react";
import { Folder, File, Search } from "lucide-react";

const FileSearchAnimation = () => {
  const [searchPosition, setSearchPosition] = useState(0);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSearchPosition((prev) => (prev + 1) % 3);
      if (searchPosition === 2) {
        setCurrentFileIndex((prev) => (prev + 1) % 5);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [searchPosition]);

  const files = [
    { name: "Document.pdf", color: "text-red-500" },
    { name: "Image.jpg", color: "text-blue-500" },
    { name: "Spreadsheet.xlsx", color: "text-green-500" },
    { name: "Presentation.pptx", color: "text-orange-500" },
    { name: "Notes.txt", color: "text-purple-500" },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg p-4">
      <div className="relative mb-8">
        <Folder className="w-16 h-16 text-yellow-500" />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            transform: `translate(-50%, -50%) translateX(${
              searchPosition * 20
            }px)`,
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <Search className="w-8 h-8 text-gray-600" />
        </div>
      </div>
      <div className="flex space-x-4">
        {files.map((file, index) => (
          <div
            key={file.name}
            className={`flex flex-col items-center ${
              index === currentFileIndex ? "scale-110" : "scale-100"
            } transition-transform duration-300`}
          >
            <File className={`w-8 h-8 ${file.color}`} />
            <span className="text-xs mt-1">{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileSearchAnimation;
