import React, { useState, useEffect } from "react";
import { RefreshCcw, RefreshCw } from "lucide-react";

const AnimatingGit = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRotation((prevRotation) => (prevRotation + 5) % 360);
    }, 25);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex justify-center items-center text-sm">
      <RefreshCw
        style={{ transform: `rotate(${rotation}deg)` }}
        size={24}
        className=" text-green-500"
      />
      <p className="ml-2 font-light text-sm">Syncing 1 change</p>
    </div>
  );
};

export default AnimatingGit;
