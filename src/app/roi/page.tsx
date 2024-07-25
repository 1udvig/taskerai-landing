"use client";
import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ROICalculator = () => {
  const [costPerHour, setCostPerHour] = useState(25);
  const [timePerIssue, setTimePerIssue] = useState(30);
  const [costPerAutomatedIssue, setCostPerAutomatedIssue] = useState(10);
  const [roi, setRoi] = useState(0);

  useEffect(() => {
    const manualCost = costPerHour * (timePerIssue / 60);
    const savings = manualCost - costPerAutomatedIssue;
    const calculatedRoi = (savings / costPerAutomatedIssue) * 100;
    setRoi(calculatedRoi.toFixed(2));
  }, [costPerHour, timePerIssue, costPerAutomatedIssue]);

  const sliderClasses = "w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer dark:bg-zinc-700 focus:outline-none focus:ring-0 focus:shadow-none";

  return (
    <div className="p-8 mt-16">
      <section className="text-center flex flex-col items-center mb-8">
        <h1 className="text-foreground text-center text-4xl font-medium tracking-tighter md:text-4xl lg:leading-[1.1] text-balance mb-4">
          ROI Calculator
        </h1>
        <span className="max-w-[750px] text-center text-lg font-light text-foreground">
          Calculate the return on investment for AI-powered issue solving
        </span>
      </section>

      <Card className="w-full max-w-md mx-auto border-zinc-700 animate-background-shine bg-white dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] transition-colors">
        <CardHeader className="pb-8 pt-4">
          <CardTitle className="text-zinc-700 dark:text-zinc-300 text-lg">
            
          </CardTitle>
          <div className="flex gap-0.5">
            <h3 className="text-3xl font-bold">{roi}%</h3>
            <span className="flex flex-col justify-end text-sm mb-1">ROI</span>
          </div>
          <CardDescription className="pt-1.5 h-12">
            Estimated return on investment based on your inputs
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <SliderItem
            label="Cost per hour (human developer)"
            value={costPerHour}
            onChange={setCostPerHour}
            min={25}
            max={200}
            step={5}
            prefix="$"
          />
          <SliderItem
            label="Time per issue (minutes)"
            value={timePerIssue}
            onChange={setTimePerIssue}
            min={30}
            max={180}
            step={1}
            suffix="min"
          />
          <SliderItem
            label="Cost per automated issue"
            value={costPerAutomatedIssue}
            onChange={setCostPerAutomatedIssue}
            min={1}
            max={10}
            step={0.25}
            prefix="$"
          />
          <div className="flex flex-col gap-2 mt-4">
            <CheckItem text="Reduced development time" />
            <CheckItem text="Increased efficiency" />
            <CheckItem text="Cost-effective solution" />
          </div>
          {/* <Button className="relative inline-flex w-full items-center justify-center rounded-md bg-black text-white dark:bg-white px-6 font-medium dark:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mt-4">
            <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
            Calculate Savings
          </Button> */}
        </CardContent>
      </Card>
    </div>
  );
};

const SliderItem = ({ label, value, onChange, min, max, step, prefix, suffix }) => (
  <div>
    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
      {label}: {prefix}{value}{suffix}
    </label>
    <Slider
      className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer dark:bg-zinc-700 focus:outline-none focus:ring-0 focus:shadow-none"
      min={min}
      max={max}
      step={step}
      value={[value]}
      onValueChange={(newValue) => onChange(newValue[0])}
    />
  </div>
);

const CheckItem = ({ text }) => (
  <div className="flex gap-2">
    <CheckCircle2 size={18} className="my-auto text-green-400" />
    <p className="pt-0.5 text-zinc-700 dark:text-zinc-300 text-sm">{text}</p>
  </div>
);

export default ROICalculator;