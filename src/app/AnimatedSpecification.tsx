import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const AnimatedInput = ({
  value,
  onChange,
  onRemove,
  shouldAnimate,
  onAnimationComplete,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (shouldAnimate && currentCharIndex < value.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + value[currentCharIndex]);
        setCurrentCharIndex((prev) => prev + 1);
      }, Math.random() * 25 + 10);

      return () => clearTimeout(timer);
    } else if (shouldAnimate && currentCharIndex === value.length) {
      onAnimationComplete(); // Notify parent component that animation is complete
    }
  }, [currentCharIndex, value, shouldAnimate, onAnimationComplete]);

  return (
    <li className="flex items-center">
      <input
        className="text-md font-light outline-none w-full mr-2 hover:bg-gray-300 p-2 bg-gray-200 my-2 rounded-md"
        value={displayText}
        onChange={onChange}
        readOnly={currentCharIndex < value.length}
      />
      <Button onClick={onRemove}>-</Button>
    </li>
  );
};

const AnimatedSpecification = ({
  shouldAnimate,
}: {
  shouldAnimate: boolean;
}) => {
  const [specification, setSpecification] = useState({
    current: [
      { text: "Game reset functionality after the player loses", index: 0 },
      { text: "Display of score", index: 1 },
      { text: "Collision detection for walls and snake body", index: 2 },
    ],
    proposed: [
      { text: "Pause the game when the 'P' key is pressed", index: 3 },
      { text: "Resume the game when the 'P' key is pressed again", index: 4 },
      { text: "Display a pause message when the game is paused", index: 5 },
    ],
  });
  const [animatingIndex, setAnimatingIndex] = useState(0); // New state to track animating item index

  const handleAnimationComplete = () => {
    setAnimatingIndex((prevIndex) => prevIndex + 1); // Move to the next item
  };

  return (
    <>
      {Object.entries(specification).map(([key, values]) => (
        <div key={key} className="mb-2">
          <h2 className="text-md font-medium outline-none pb-2">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </h2>
          <ul>
            {values.length > 0 &&
              values.map((value, index) => (
                <AnimatedInput
                  key={index}
                  value={value.text}
                  onChange={(event) => handleBlur(key, index, event)}
                  onRemove={() => {
                    setSpecification((prevSpecification) => {
                      const newValues = [...prevSpecification[key]];
                      newValues.splice(index, 1);
                      return {
                        ...prevSpecification,
                        [key]: newValues,
                      };
                    });
                  }}
                  shouldAnimate={
                    animatingIndex === value.index && shouldAnimate
                  } // Only animate if it's the current item's turn
                  onAnimationComplete={handleAnimationComplete}
                />
              ))}
          </ul>
          {(key === "current" || key === "proposed") && (
            <div className="py-2">
              <Button
                variant="secondary"
                onClick={() => {
                  setSpecification((prevSpecification) => {
                    return {
                      ...prevSpecification,
                      [key]: [...prevSpecification[key], ""],
                    };
                  });
                }}
              >
                + Add Item
              </Button>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default AnimatedSpecification;
