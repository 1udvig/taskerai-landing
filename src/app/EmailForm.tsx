"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Alert, AlertDescription } from "@/components/ui/alert";

type FormValues = {
  email: string;
};

const EmailSubscriptionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(formData.email); // Access the email field from formData
    setIsSubmitting(false);
    setSubmitSuccess(true);
    reset(); // This clears the form fields
    // Clear success message after 3 seconds
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto">
      <div className="text-lg font-light text-foreground mb-6">
        Subscribe to be notified when we launch
      </div>
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
