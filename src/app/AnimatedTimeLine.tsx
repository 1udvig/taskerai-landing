"use client";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Cpu, Icon } from "lucide-react";
import AnimatedSpecification from "./AnimatedSpecification";

const TrelloIcon = ({ width, height }: { width: string; height: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#fff"
    viewBox="0 0 512 512"
    width={width}
    height={height}
  >
    <rect fill="#0079bf" height="512" rx="15%" width="512" />
    <rect height="188" rx="23" width="132" x="284" y="95" />
    <rect height="296" rx="23" width="132" x="97" y="95" />
  </svg>
);

const StepCard = ({
  icon,
  title,
  description,
  isVisible,
  isCentered,
  animation,
}: {
  icon: ReactElement;
  title: string;
  description: string;
  isVisible: boolean;
  isCentered: boolean;
  animation?: ReactElement;
}) => (
  // <div className="bg-gray-50 border border-white rounded-lg p-6 flex flex-col items-center text-center hover:border-slate-200">
  <div
    className={`
      bg-gray-50
      border
      rounded-lg 
      p-6
      ml-4
      border-white
      hover:border-slate-200
      transition-all duration-500 ease-out  ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
      }
      ${
        isCentered
          ? "ml-8 bg-yellow-200"
          : isVisible
          ? "bg-green-200"
          : "bg-gray-200"
      }`}
  >
    <div className="w-full justify-between flex">
      <h3 className="text-xl font-semibold text-gray-800  mb-2">{title}</h3>
      {icon}
    </div>
    <p className="text-gray-600">{description}</p>
    {animation && animation}
  </div>
);

const timelineEvents = [
  {
    title: "Issue",
    description:
      "Pick a user story from your project management system or just formulate a new functionality",
    icon: <TrelloIcon width="20" height="20" />,
  },
  {
    title: "Specification",
    description:
      "LLM analyzes the issue and generates a detailed specification for the functionality based on the file context and the principles of your codebase and tech stack.",
    animation: <AnimatedSpecification />,
  },
  { title: "Event 3", description: "Description for Event 3" },
  { title: "Event 4", description: "Description for Event 4" },
  { title: "Event 5", description: "Description for Event 5" },
];

const TimelineEvent = ({
  title,
  description,
  isVisible,
  isCentered,
  icon,
  animation,
}) => (
  <div
    className={`
      flex items-center mb-10 
    
    `}
  >
    <div
      className={`${isCentered ? "border-yellow-300 border-2" : ""}
      bg-black rounded-full p-4 absolute -left-1 overflow-visible`}
    ></div>
    <div
      className={`flex flex-row items-center 
        
       
      `}
    >
      <StepCard
        title={title}
        description={description}
        icon={icon}
        animation={animation}
        isVisible={isVisible}
        isCentered={isCentered}
      />
    </div>
  </div>
);

// The rest of the AnimatedTimeline component remains unchanged.

const AnimatedTimeline = () => {
  const observerRefs = useRef([]);
  const [visibleEvents, setVisibleEvents] = useState({});
  const [centeredEventIndex, setCenteredEventIndex] = useState(null);

  useEffect(() => {
    const observers = observerRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleEvents((prev) => ({ ...prev, [index]: true }));
          }
        },
        { threshold: 0.5 }
      );

      if (ref) {
        observer.observe(ref);
      }

      return observer;
    });

    const handleScroll = () => {
      const centerY = window.innerHeight / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      observerRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const distance = Math.abs(rect.top + rect.height / 2 - centerY);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        }
      });

      setCenteredEventIndex(closestIndex);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call to set the centered event

    return () => {
      observers.forEach((observer) => observer.disconnect());
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* <h2 className="text-2xl font-bold mb-4"></h2> */}
      <div className="relative">
        <div className="border-l-4">
          {timelineEvents.map((event, index) => (
            <div key={index} ref={(el) => (observerRefs.current[index] = el)}>
              <TimelineEvent
                {...event}
                isVisible={visibleEvents[index]}
                isCentered={index === centeredEventIndex}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedTimeline;
