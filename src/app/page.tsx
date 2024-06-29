import Image from "next/image";
import React, { ReactElement, ReactSVGElement, useState } from "react";
import { ArrowRight, Code, Zap, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedTimeline from "./AnimatedTimeLine";
import { Input } from "@/components/ui/input";
import EmailSubscriptionForm from "./EmailForm";
import ScrollIndicator from "./ScrollEncourage";

import MacBookWindow from "./MacWindow";
import DownloadButton from "@/components/DownloadButton";

const LandingPage = () => {
  return (
    // <div className="bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">

    <div className="min-h-screen w-screen  flex flex-col items-center p-3 sm:p-8">
      {/* // <div className="min-h-screen w-screen flex flex-col items-center justify-center p-8"> */}
      <div className=" flex rounded-3xl border-2 border-slate-500 bg-slate-50 p-2 justify-center items-center gap-2 mt-16">
        <h1 className="ml-2 w-auto text-xs text-foreground px-2">
          Version 1.0 Coming soon
        </h1>
        <Zap className="text-yellow-300 mr-2" />
        {/* <h1 className=" text-xs  text-foreground px-2"></h1> */}
      </div>
      <header className="px-2 pt-6 pb-2 sm:pb-8 items-center flex flex-col  ">
        {/* <h1 className="text-4xl font-bold text-gray-800 mb-4"> */}

        <h1 className="text-foreground  text-center text-4xl font-medium tracking-tighter  lg:leading-[1.1] text-balance mb-4">
          Re-imagining Software Development
        </h1>
        {/* <p className="text-xl text-gray-600">
          Revolutionize Your Software Development with LLM technology.
        </p> */}
        <span
          className="max-w-[750px] text-center text-lg font-light text-foreground"
          // data-br=":Rrfau6la:"
          // data-brr="1"
          // style="display: inline-block; vertical-align: top; text-decoration: inherit; max-width: 543px;"
        >
          Harness the power of emerging LLM technology to aid in your software
          development process. Our platform provides a workspace for carrying
          out software development tasks with ease.
        </span>
        <DownloadButton />

        <ScrollIndicator />
      </header>

      <MacBookWindow>
        <AnimatedTimeline />
      </MacBookWindow>
      <div className="mt-24">
        <EmailSubscriptionForm />
      </div>
      <footer className=" mt-24 text-center text-gray-600">
        <p>&copy; 2024 Clienture AB. All rights reserved.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: ReactElement;
  title: string;
  description: string;
}) => (
  <div className="bg-gray-50 border border-white rounded-lg p-6 flex flex-col items-center text-center hover:border-slate-200">
    {icon}
    <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default LandingPage;
