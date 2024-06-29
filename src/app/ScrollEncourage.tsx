"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY;
  //     const windowHeight = window.innerHeight;
  //     setIsVisible(scrollPosition < windowHeight * 0.5);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // const scrollToTimeline = () => {
  //   const timelineElement = document.getElementById("animated-timeline");
  //   if (timelineElement) {
  //     timelineElement.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  if (!isVisible) return null;

  return (
    <div
      className="  cursor-pointer mt-24 translate-y-2  animate-bounce2"
      // onClick={scrollToTimeline}
    >
      {/* <div className="bg-white p-3 rounded-full shadow-lg flex">
        <ChevronDown className="text-gray-600" size={24} />
        <p className="text-sm text-gray-600 mt-2 ">Scroll to explore</p>
      </div> */}
      <div className=" text-center ">
        <p className="text-lg font-light text-foreground mb-2">
          Experience the workflow
        </p>
        <ChevronDown size={32} className="mx-auto text-gray-950" />
      </div>
    </div>
  );
};

export default ScrollIndicator;
