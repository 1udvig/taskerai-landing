import React, { useRef, useEffect } from "react";
import * as monaco from "monaco-editor";

//Continue here
const MonacoDiffEditor = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Use props for original and modified text
      const originalModel = monaco.editor.createModel(
        'print("Hello World!)',
        "python"
      );
      const modifiedModel = monaco.editor.createModel(
        'print("Hello World!)',
        "python"
      );

      // Create the diff editor
      const diffEditor = monaco.editor.createDiffEditor(containerRef.current, {
        renderSideBySide: false,
        // useInlineViewWhenSpaceIsLimited: false,
      });

      // Set the original and modified models
      diffEditor.setModel({
        original: originalModel,
        modified: modifiedModel,
      });

      // Clean up on unmount
      return () => {
        originalModel.dispose();
        modifiedModel.dispose();
        diffEditor.dispose();
      };
    }
  }, []); // Add props as dependencies

  return <div ref={containerRef} className=" w-96 h-72" />;
};

export default MonacoDiffEditor;
