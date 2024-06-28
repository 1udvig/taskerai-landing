import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const userStories = [
  { id: 1, title: "User Registration", status: "To Do" },
  { id: 2, title: "Login Functionality", status: "In Progress" },
  { id: 3, title: "Dashboard Design", status: "In Progress" },
  { id: 4, title: "API Integration", status: "To Do" },
  { id: 5, title: "User Profile Page", status: "Done" },
];

const KanbanBoard = ({ shouldAnimate }: { shouldAnimate: boolean }) => {
  const [currentStory, setCurrentStory] = useState(0);

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % userStories.length);
  };

  const prevStory = () => {
    setCurrentStory(
      (prev) => (prev - 1 + userStories.length) % userStories.length
    );
  };

  useEffect(() => {
    if (!shouldAnimate) return;
    const timer = setInterval(nextStory, 1000);
    return () => clearInterval(timer);
  }, [shouldAnimate]);

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
      <div className="flex justify-between w-full max-w-3xl mb-4">
        <button
          onClick={prevStory}
          className="p-2 bg-blue-500 text-white rounded"
        >
          <ArrowLeft size={24} />
        </button>
        <button
          onClick={nextStory}
          className="p-2 bg-blue-500 text-white rounded"
        >
          <ArrowRight size={24} />
        </button>
      </div> */}
      <div className="flex justify-between w-full max-w-3xl">
        {["To Do", "In Progress", "Done"].map((column) => (
          <div key={column} className="bg-gray-200 p-4 rounded-lg w-1/3 mx-2">
            <h2 className="font-semibold mb-2">{column}</h2>
            {userStories.map((story, index) => (
              <div
                key={story.id}
                className={` p-2 rounded mb-2 transition-all duration-300 border-2
                     ${story.status === column ? "opacity-100 " : "opacity-0 "} 
                ${
                  index === currentStory
                    ? "border-2 border-slate-400 bg-green-200"
                    : "bg-white"
                }`}
              >
                {story.title}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
