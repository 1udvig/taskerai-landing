"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const DownloadButton = ({ fileName = "file.pdf", fileUrl = "#" }) => {
  const handleDownload = () => {
    // In a real scenario, you would handle the actual download here
    // For demonstration, we'll just log a message
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });

    // Simulating a download by opening the URL in a new tab
    // window.open(fileUrl, "_blank");
  };

  return (
    <div className="hidden sm:block ">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              onClick={handleDownload}
              className=" w-auto mt-10"
            >
              <Download className="mr-2 h-4 w-4" />
              <span>Download Now</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Subscribe to get notified when we release v.1.0</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default DownloadButton;
