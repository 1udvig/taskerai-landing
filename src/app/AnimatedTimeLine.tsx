"use client";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import {
  Cpu,
  Icon,
  CircleDot,
  ListPlus,
  Code,
  BadgeCheck,
  GitPullRequest,
  ArrowDown,
} from "lucide-react";
import AnimatedSpecification from "./AnimatedSpecification";
import MacBookWindow from "./MacWindow";
import FileSearchAnimation from "./AnimatedIssue";

import MonacoEditor from "./AnimatedCodeGeneration";
import FileExplorer from "./AnimatedFileSearch";
import TestCompletionAnimation from "./AnimatedTests";
import KanbanBoard from "./AnimatedKanban";

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

interface ProgressIconProps {
  color: string;
}

interface AnimationProps {
  shouldAnimate: boolean;
}

const StepCard = ({
  icon,
  title,
  description,
  isVisible,
  isCentered,
  animation,
}: {
  icon?: ReactElement;
  title: string;
  description: string;
  isVisible: boolean;
  isCentered: boolean;
  animation?: ({ shouldAnimate }: { shouldAnimate: boolean }) => ReactElement;
}) => (
  // <div className="bg-gray-50 border border-white rounded-lg p-6 flex flex-col items-center text-center hover:border-slate-200">
  <div
    className={`
      bg-gray-50
      border-2
      rounded-lg 
      p-6
      ml-4
      border-white
      hover:border-slate-200
      transition-all duration-500 ease-out  ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
      }
      ${isCentered ? "ml-8 bg-slate-300 drop-shadow-xl" : "bg-slate-100"}`}
  >
    <div className="w-full justify-between flex">
      <h3 className="text-xl font-semibold text-gray-800  mb-2">{title}</h3>
      {icon && icon}
    </div>
    <p className="text-gray-600">{description}</p>
    {/* <MacBookWindow>
      <AnimatedSpecification shouldAnimate={isCentered} />
    </MacBookWindow> */}
    <div className="py-10">
      {animation && animation({ shouldAnimate: isCentered })}
    </div>
  </div>
);

const timelineEvents = [
  {
    title: "Issue",
    description:
      "Pick a user story from your project management system or just formulate a new functionality",
    icon: <TrelloIcon width="20" height="20" />,
    animation: (props: AnimationProps) => (
      <MacBookWindow>
        {/* <FileSearchAnimation {...props} /> */}
        {/* <FileExplorer {...props} /> */}
        <KanbanBoard {...props} />
      </MacBookWindow>
    ),
    progressIcon: (props: ProgressIconProps) => <CircleDot {...props} />,
  },
  {
    title: "Specification",
    description:
      "LLM analyzes the issue and generates a detailed specification for the functionality based on the file context and the principles of your codebase and tech stack.",
    animation: (props: AnimationProps) => (
      <MacBookWindow>
        <AnimatedSpecification {...props} />
      </MacBookWindow>
    ),
    progressIcon: (props: ProgressIconProps) => <ListPlus {...props} />,
  },
  {
    title: "Coding",
    description:
      "The LLM writes the code for the functionality and shows you the diff. Here you can review the code and make changes.",
    animation: (props: AnimationProps) => (
      <MacBookWindow>
        {/* <div>Minacoplaceholder</div> */}
        <MonacoEditor {...props} />
      </MacBookWindow>
    ),

    progressIcon: (props: ProgressIconProps) => <Code {...props} />,
  },
  {
    title: "Automated testing and test creation",
    description:
      "If the code implmentation passed the tests, LLM will continue to also write tests for the the new functionality",
    progressIcon: (props: ProgressIconProps) => <BadgeCheck {...props} />,
    animation: (props: AnimationProps) => (
      <MacBookWindow>
        <TestCompletionAnimation {...props} />
      </MacBookWindow>
    ),
  },
  {
    title: "Commiting and syncing your changes",
    description:
      "When the implementation is done, LLM will commit the changes and create a pull request for you. Contributing to the project is easier than ever",
    progressIcon: (props: ProgressIconProps) => <GitPullRequest {...props} />,
  },
];

const TimelineEvent = ({
  title,
  description,
  isVisible,
  isCentered,
  icon,
  animation,
  progressIcon,
}: {
  title: string;
  description: string;
  isVisible: boolean;
  isCentered: boolean;
  icon?: any;
  animation?: any;
  progressIcon: any;
}) => (
  <div
    id="animated-timeline"
    className={`
      flex items-center 
    
    `}
  >
    <div className="flex flex-col items-center border-l  p-4">
      {/* <div className="bg-black w-1 flex-1"> </div> */}
      <div
        className={`
     rounded-full  absolute left-0 -translate-x-1/2 overflow-visible transition-transform duration-500 
    ${isCentered ? " scale-110  bg-green-400" : "scale-100"}
  `}
      >
        {/* <CircleDot color={isCentered ? "white" : "gray"} /> */}
        <div className="p-2">
          {progressIcon({ color: isCentered ? "white" : "gray" })}
          <div className=" absolute mt-12 animate-bouncepp ">
            {/* <div className=" mt-12 absolute transform  cursor-pointer animate-bounce"> */}
            <ArrowDown color="gray" />
          </div>
        </div>
      </div>

      {isVisible && (
        <StepCard
          title={title}
          description={description}
          icon={icon}
          animation={animation}
          isVisible={isVisible}
          isCentered={isCentered}
        />
      )}
    </div>
  </div>
);

// The rest of the AnimatedTimeline component remains unchanged.

const AnimatedTimeline = () => {
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [visibleEvents, setVisibleEvents] = useState<{
    [key: number]: boolean;
  }>({});
  const [centeredEventIndex, setCenteredEventIndex] = useState<number | null>(
    null
  );

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
    <div className="container mx-auto px-24">
      <div className="relative">
        {timelineEvents.map((event, index) => (
          // <div ref={(el) => (observerRefs.current[index] = el)} key={index}>
          <div
            ref={(el) => {
              observerRefs.current[index] = el;
            }}
            key={index}
          >
            <TimelineEvent
              {...event}
              isVisible={visibleEvents[index]}
              isCentered={index === centeredEventIndex}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedTimeline;
