import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, Circle, CircleX } from "lucide-react";

const TestCompletionAnimation = ({
  shouldAnimate,
}: {
  shouldAnimate: boolean;
}) => {
  const totalTests = 5;
  const testNames = [
    "geometry",
    "game loop cycle",
    "highscore tracking",
    "modules-loading",
    "misc",
  ]; // Example test names
  const initialTestStates = Array(totalTests).fill("gray"); // All tests start as gray
  const [testStates, setTestStates] = useState(initialTestStates);

  useEffect(() => {
    if (!shouldAnimate) return;
    const interval = setInterval(() => {
      setTestStates((prevStates) => {
        const nextStates = [...prevStates];
        const firstGrayIndex = nextStates.findIndex(
          (state) => state === "gray"
        );
        if (firstGrayIndex !== -1) {
          nextStates[firstGrayIndex] = Math.random() < 0.8 ? "green" : "red";
        }
        return nextStates;
      });
    }, 250);

    return () => clearInterval(interval);
  }, [shouldAnimate]);

  return (
    <div className="flex flex-col bg-gray-100">
      <div className="flex flex-col">
        {testStates.map((state, index) => (
          <div
            key={index}
            className="transition-all duration-300 ease-in-out p-4 flex items-center"
          >
            {state === "gray" && <Circle className="text-gray-300 w-6 h-6" />}
            {state === "green" && (
              <CheckCircle className="text-green-500 w-6 h-6" />
            )}
            {state === "red" && <CircleX className="text-red-500 w-6 h-6" />}
            <div className="mx-4 text-sm font-light">{testNames[index]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestCompletionAnimation;
