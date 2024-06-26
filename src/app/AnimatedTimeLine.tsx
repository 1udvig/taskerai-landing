"use client";
import React, { useEffect, useRef, useState } from "react";

const timelineEvents = [
  { year: 2020, title: "Event 1", description: "Description for Event 1" },
  { year: 2021, title: "Event 2", description: "Description for Event 2" },
  { year: 2022, title: "Event 3", description: "Description for Event 3" },
  { year: 2023, title: "Event 4", description: "Description for Event 4" },
  { year: 2024, title: "Event 5", description: "Description for Event 5" },
];

const TimelineEvent = ({ year, title, description, isVisible, isCentered }) => (
  <div
    className={`
      flex items-center mb-10 transition-all duration-500 ease-out
      ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}
      ${isCentered ? "ml-12" : ""}
    `}
  >
    <div className="flex flex-col items-center mr-4">
      <div className="w-1 h-24 bg-blue-300"></div>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
          isCentered ? "bg-red-500 scale-125" : "bg-blue-500"
        }`}
      >
        <span className="text-white font-bold">{year}</span>
      </div>
    </div>
    <div
      className={`bg-white p-4 rounded shadow-md transition-all duration-300 ${
        isCentered ? "bg-blue-50 shadow-lg" : ""
      }`}
    >
      <h3 className="text-lg font-bold">{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);

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
      <h2 className="text-2xl font-bold mb-4">Animated Timeline</h2>
      <div className="relative">
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
  );
};

export default AnimatedTimeline;
