"use client";
import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ROICalculator = () => {
  const [costPerHour, setCostPerHour] = useState(100);
  const [timePerIssue, setTimePerIssue] = useState(30);
  const [costPerAutomatedIssue, setCostPerAutomatedIssue] = useState(10);
  const [roi, setRoi] = useState("0");

  useEffect(() => {
    const manualCost = costPerHour * (timePerIssue / 60);
    const savings = manualCost - costPerAutomatedIssue;
    const calculatedRoi = (savings / costPerAutomatedIssue) * 100;
    setRoi(calculatedRoi.toFixed(2));
  }, [costPerHour, timePerIssue, costPerAutomatedIssue]);

  return (
    <div className="p-8 mt-16">
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          ROI Calculator for AI-Powered Issue Solving
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cost per hour (human developer): ${costPerHour}
          </label>
          <Slider
            min={25}
            max={100}
            step={1}
            // value={[costPerHour]}
            defaultValue={[costPerHour]}
            onValueChange={(value) => setCostPerHour(value[0])}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time per issue (minutes): {timePerIssue}
          </label>
          <Slider
          
            min={30}
            max={120}
            step={1}
            value={[timePerIssue]}
            onValueChange={(value) => setTimePerIssue(value[0])}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cost per automated issue: ${costPerAutomatedIssue}
          </label>
          <Slider
            min={1}
            max={25}
            step={1}
            value={[costPerAutomatedIssue]}
            onValueChange={(value) => setCostPerAutomatedIssue(value[0])}
          />
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-center">Calculated ROI</h3>
          <p className="text-3xl font-bold text-center text-green-600">{roi}%</p>
        </div>
      </CardContent>
    </Card>
    </div>
  );
};

export default ROICalculator;