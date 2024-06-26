import Image from "next/image";
import React, { ReactElement, ReactSVGElement, useState } from "react";
import { ArrowRight, Code, Zap, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedTimeline from "./AnimatedTimeLine";

const LandingPage = () => {
  return (
    // <div className="bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col items-center justify-center p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Tasker
          <span className="bg-gray-700 text-yellow-300 py-1 px-2 ml-1 rounded-md ">
            AI
          </span>
        </h1>
        <p className="text-xl text-gray-600">
          Revolutionize Your Coding Process with AI
        </p>
      </header>

      <main className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 ">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<FileCode className="w-12 h-12 text-blue-500" />}
              title="Define Functionality"
              description="Describe the features you want to implement in your codebase."
            />
            <FeatureCard
              icon={<Zap className="w-12 h-12 text-yellow-500" />}
              title="AI-Powered Analysis"
              description="Our LLM analyzes your requirements and existing code."
            />
            <FeatureCard
              icon={<Code className="w-12 h-12 text-green-500" />}
              title="Code Generation"
              description="Receive tailored code implementations for your project."
            />
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Ready to Supercharge Your Development?
          </h2>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-300">
            Get Started <ArrowRight className="ml-2" />
          </Button>
        </section>
        <AnimatedTimeline />
      </main>

      <footer className="mt-12 text-center text-gray-600">
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
