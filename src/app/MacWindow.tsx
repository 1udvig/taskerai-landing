import React, { ReactNode } from "react";

const MacBookWindow = ({ children }: { children: ReactNode }) => {
  return (
    <div className="  max-w-full sm:max-w-4xl mx-auto bg-gray-50 rounded-t-lg rounded-b-lg overflow-visible drop-shadow-2xl border">
      {/* Window header */}
      <div className="bg-gray-200 px-4 py-2 flex items-center border-x border-t border-1 border-white rounded-t-lg">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        {/* <div className="flex-grow text-center text-sm font-medium text-gray-700">
          TaskerAI
        </div> */}
      </div>

      {/* Window content */}
      <div className="p-1 sm:p-4  bg-white rounded-b-lg">{children}</div>
    </div>
  );
};

export default MacBookWindow;
