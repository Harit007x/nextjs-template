"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ---------------------- Zod Schema ----------------------
const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ---------------------- React Hook Form ----------------------
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // ---------------------- Submit ----------------------
  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setIsLoading(true);

    try {
      console.log("Password reset requested for:", values.email);

      // Simulate API call to send reset email
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success message
      setIsSubmitted(true);
    } catch (error) {
      console.error("Password reset failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full">
      <div className="flex min-h-screen flex-col lg:grid lg:grid-cols-2">
        {/* LEFT SECTION */}
        <div className="flex items-center justify-center gap-2 bg-primary text-white p-8">
          <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-[0px_1px_15px_-3px_rgba(255,_255,_255,_1)]">
            A
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            Axoracomp
          </span>
        </div>

        {/* RIGHT SECTION */}
        <div className="relative flex flex-col items-center justify-center bg-background px-6 py-10 min-h-screen">
          {/* <div className="absolute top-4 right-4 flex gap-2">
            <Link
              href="/login"
              className="text-sm text-foreground hover:text-foreground hover:bg-muted rounded-md px-3 py-2 transition tracking-wide"
            >
              Login
            </Link>
          </div> */}

          <div className="w-full max-w-sm space-y-4">
            {/* Header */}
            <div className="text-left space-y-2">
              <p className="text-lg font-bold text-foreground">
                Forgot Password?
              </p>
              <p className="text-sm font-light text-foreground opacity-80">
                {!isSubmitted
                  ? "Enter your email address and we'll send you a link to reset your password"
                  : "Check your email for the password reset link"}
              </p>
            </div>

            {/* FORM */}
            {!isSubmitted ? (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 py-2"
              >
                <div className="space-y-4">

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                    <Label>Email Address</Label>
                    <Input
                        placeholder="Enter your email"
                        type="email"
                        {...register("email")}
                        disabled={isLoading}
                        autoComplete="email"
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500">
                        {errors.email.message}
                        </p>
                    )}
                    </div>

                    {/* Submit Button */}
                    <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <>
                        <span className="mr-2 h-4 w-4 animate-spin">⚪</span>
                        Sending Reset Link...
                        </>
                    ) : (
                        "Send Reset Link"
                    )}
                    </Button>
                </div>

                {/* Back to Login */}
                <div className="text-center">
                    <Link
                        href="/login"
                        className="inline-flex items-center text-sm text-primary hover:underline gap-1"
                    >
                        <Icons.chevronLeft className="h-4 w-4" />
                        Back to Login
                    </Link>
                </div>
              </form>
            ) : (
              /* Success Message */
              <div className="space-y-4 py-2">
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-3">
                    <div className="size-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-green-600 dark:text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-green-800 dark:text-green-300 mb-2">
                    Reset link sent successfully!
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mb-4">
                    Please check your email inbox for instructions to reset your
                    password.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push("/login")}
                    className="mt-2"
                  >
                    Return to Login
                  </Button>
                </div>

                <div className="text-center mt-4">
                  <p className="text-xs text-muted-foreground">
                    Didn't receive the email?{" "}
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-primary hover:underline font-medium"
                    >
                      Try again
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
