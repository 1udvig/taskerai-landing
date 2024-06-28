"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription } from "@/components/ui/alert";

const EmailSubscriptionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    setIsSubmitting(false);
    setSubmitSuccess(true);
    // Here you would typically send the data to your backend
    reset(); // This clears the form fields
    // Clear success message after 3 seconds
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 p-4">
        <Input
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          className="flex-grow"
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
      {errors.email && (
        <p className="text-red-500 text-sm mt-1 px-4">{errors.email.message}</p>
      )}
      {submitSuccess && (
        <Alert className="mt-4">
          <AlertDescription>Thank you for subscribing!</AlertDescription>
        </Alert>
      )}
    </form>
  );
};

export default EmailSubscriptionForm;
