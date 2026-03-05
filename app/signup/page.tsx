"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

// ---------------------- Zod Schema ----------------------

const SignupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),

  lastName: z.string().min(1, "Last name is required"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9]{10,15}$/, "Enter a valid phone number"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type SignupFormValues = z.infer<typeof SignupSchema>;

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);

  // ---------------------- React Hook Form ----------------------

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupSchema),
  });

  // ---------------------- Submit ----------------------

  const onSubmit = async (values: SignupFormValues) => {
    setIsLoading(true);

    try {
      console.log("Signup values:", values);

      // await signupMutation.mutateAsync(values)
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full">
      <div className="flex min-h-screen flex-col lg:grid lg:grid-cols-2">
        {/* LEFT SECTION */}
        <div className="flex items-center justify-center gap-2 bg-primary text-white p-8 ">
          {" "}
          <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-[0px_1px_15px_-3px_rgba(255,_255,_255,_1)]">
            A
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            Axoracomp
          </span>
        </div>

        {/* RIGHT SECTION */}
        <div className="relative flex flex-col items-center justify-center bg-background px-6 py-10 min-h-screen">
          <Link href="/login" className="absolute top-4 right-4 text-sm text-foreground hover:text-foreground hover:bg-muted rounded-md px-3 py-2 transition tracking-wide">
            Login
          </Link>
          <div className="w-full max-w-sm space-y-4">
            {/* Header */}
            <div className="text-left space-y-1">
              <p className="text-lg font-bold text-foreground">
                Create Admin Account
              </p>
              <p className="text-sm font-light text-foreground opacity-80">
                Please fill the details to create your account
              </p>
            </div>

            {/* FORM */}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
              {/* First Name + Last Name */}

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <Label>First Name</Label>
                  <Input
                    placeholder="First name"
                    {...register("firstName")}
                    disabled={isLoading}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <Label>Last Name</Label>
                  <Input
                    placeholder="Last name"
                    {...register("lastName")}
                    disabled={isLoading}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}

              <div className="flex flex-col gap-1">
                <Label>Email</Label>
                <Input
                  placeholder="Enter your email"
                  {...register("email")}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}

              <div className="flex flex-col gap-1">
                <Label>Phone Number</Label>
                <Input
                  placeholder="Enter phone number"
                  {...register("phone")}
                  disabled={isLoading}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>

              {/* Password */}

              <div className="flex flex-col gap-1">
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...register("password")}
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}

              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin">⚪</span>
                    Creating Account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
