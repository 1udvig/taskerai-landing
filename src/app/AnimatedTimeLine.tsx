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
  RefreshCcw,
} from "lucide-react";
import AnimatedSpecification from "./AnimatedSpecification";
import MacBookWindow from "./MacWindow";
import FileSearchAnimation from "./AnimatedIssue";

import MonacoEditor from "./AnimatedCodeGeneration";
import FileExplorer from "./AnimatedFileSearch";
import TestCompletionAnimation from "./AnimatedTests";
import KanbanBoard from "./AnimatedKanban";
import Image from "next/image";
import GitIssue from "./AnimatedIssue";
import ScrollingGitIssues from "./AnimatedIssue";
import AnimatingGit from "./AnimatedGit";

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

const AnimationContainer = ({ children }: { children: ReactElement }) => {
  return <div className=" p-2 bg-white rounded-md">{children}</div>;
};

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
      p-3 sm:p-6
      ml-0 sm:ml-4
      my-2 sm:my-0
      border-white
      hover:border-slate-200
      transition-all duration-500 ease-out  
      
      ${
        isCentered
          ? " sm:translate-x-6 bg-green-200 sm:bg-slate-300 drop-shadow-xl"
          : "bg-slate-100"
      }`}
  >
    <div className="w-full justify-between flex">
      <h3 className="text-md sm:text-xl font-semibold text-gray-800  mb-2">
        {title}
      </h3>
      {icon && icon}
    </div>
    <p className="text-gray-600 text-sm sm:text-md">{description}</p>
    {/* <MacBookWindow>
      <AnimatedSpecification shouldAnimate={isCentered} />
    </MacBookWindow> */}
    <div className="pt-6">
      {animation && animation({ shouldAnimate: isCentered })}
    </div>
  </div>
);

const timelineEvents = [
  {
    title: "Issue",
    description:
      "Pick a user story from your project management system or just formulate a new functionality",
    icon: (
      <div className="flex items-center gap-2">
        {" "}
        <TrelloIcon width="20" height="20" />
        <Image src={"/jira.svg"} width={20} height={20} alt="jira.svg"></Image>
      </div>
    ),
    animation: (props: AnimationProps) => (
      <AnimationContainer>
        {/* <KanbanBoard {...props} /> */}
        <ScrollingGitIssues />
      </AnimationContainer>
    ),
    progressIcon: (props: ProgressIconProps) => <CircleDot {...props} />,
  },
  {
    title: "Specification",
    description:
      "LLM analyzes the issue and generates a detailed specification for the functionality based on the file context and the principles of your codebase and tech stack.",
    animation: (props: AnimationProps) => (
      <AnimationContainer>
        <AnimatedSpecification {...props} />
      </AnimationContainer>
    ),
    progressIcon: (props: ProgressIconProps) => <ListPlus {...props} />,
  },
  {
    title: "Coding",
    description:
      "The LLM writes the code for the functionality and shows you the diff. Here you can review the code and make changes.",
    animation: (props: AnimationProps) => (
      <AnimationContainer>
        <MonacoEditor {...props} />
      </AnimationContainer>
    ),

    progressIcon: (props: ProgressIconProps) => <Code {...props} />,
  },
  {
    title: "Automated testing and test creation",
    description:
      "If the code implmentation passed the tests, LLM will continue to also write tests for the the new functionality",
    progressIcon: (props: ProgressIconProps) => <BadgeCheck {...props} />,
    animation: (props: AnimationProps) => (
      <AnimationContainer>
        <TestCompletionAnimation {...props} />
      </AnimationContainer>
    ),
  },
  {
    title: "Commiting and syncing your changes",
    description:
      "When the implementation is done, LLM will commit the changes and create a pull request for you. Contributing to the project is easier than ever",
    progressIcon: (props: ProgressIconProps) => <GitPullRequest {...props} />,
    animation: (props: AnimationProps) => (
      <AnimationContainer>
        <AnimatingGit />
      </AnimationContainer>
    ),
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
    <div className="flex flex-col items-center sm:border-l  p-1 sm:p-4">
      {/* <div className="bg-black w-1 flex-1"> </div> */}
      <div
        className={`
               rounded-full  absolute sm:left-0 sm:-translate-x-1/2 overflow-visible transition-transform duration-500 
              ${isCentered ? " sm:scale-110  bg-green-400" : "sm:scale-100"}
              `}
      >
        {/* <CircleDot color={isCentered ? "white" : "gray"} /> */}
        <div className="hidden sm:block p-1 sm:p-2  sm:relative">
          {progressIcon({ color: isCentered ? "white" : "gray" })}
          <div className=" absolute mt-12 animate-bouncepp ">
            {/* <div className=" mt-12 absolute transform  cursor-pointer animate-bounce"> */}
            <ArrowDown color="gray" />
          </div>
        </div>
      </div>

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
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [visibleEvents, setVisibleEvents] = useState<{
    [key: number]: boolean;
  }>({});
  const [centeredEventIndex, setCenteredEventIndex] = useState<number | null>(
    null
  );
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const observers = observerRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleEvents((prev) => ({ ...prev, [index]: true }));
          }
        },
        { threshold: 0.8 }
      );

      if (ref) {
        observer.observe(ref);
      }

      return observer;
    });

    const handleScroll = () => {
      console.log("handleScroll triggerd");
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

      if (!hasScrolled) {
        setHasScrolled(true);
      }

      if (hasScrolled) {
        setCenteredEventIndex(closestIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // handleScroll(); // Initial call to set the centered event

    return () => {
      observers.forEach((observer) => observer.disconnect());
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled]);

  return (
    <div className="container mx-0 sm:mx-auto px-1 sm:px-24">
      <div className="relative">
        {timelineEvents.map((event, index) => (
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
