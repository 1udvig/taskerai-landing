import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const AnimatedInput = ({ value, onChange, onRemove }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentCharIndex < value.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + value[currentCharIndex]);
        setCurrentCharIndex((prev) => prev + 1);
      }, Math.random() * 50 + 50);

      return () => clearTimeout(timer);
    }
  }, [currentCharIndex, value]);

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

const AnimatedSpecification = () => {
  const [specification, setSpecification] = useState({
    current: ["Item 1", "Item 2", "Item 3"],
    proposed: ["Item 1", "Item 2", "Item 3"],
  });
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
                  value={value}
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
