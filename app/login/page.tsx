"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

// ---------------------- Zod Schema ----------------------
const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),

  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  // ---------------------- React Hook Form ----------------------
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const rememberMe = watch("rememberMe");

  // ---------------------- Load saved email ----------------------
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");

    if (savedEmail) {
      setValue("email", savedEmail);
      setValue("rememberMe", true);
    }
  }, [setValue]);

  // ---------------------- Submit ----------------------
  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);

    try {
      if (values.rememberMe) {
        localStorage.setItem("savedEmail", values.email);
      } else {
        localStorage.removeItem("savedEmail");
      }

      console.log("Login values:", values);

      // await loginMutation.mutateAsync(values)
    } catch (error) {
      console.error("Login failed:", error);
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
        <div className="flex flex-col items-center justify-center bg-background px-6 py-10 min-h-screen">
          <div className="w-full max-w-sm space-y-4">
            {/* Header */}
            <div className="text-left space-y-1">
              <p className="text-lg font-bold text-foreground">
                Welcome to Axoracomp - Admin
              </p>
              <p className="text-sm font-light text-foreground opacity-80">
                Please sign in to your account to continue
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
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

              {/* Remember Me */}
              <div className="flex text-sm text-muted-foreground justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setValue("rememberMe", checked)
                    }
                    disabled={isLoading}
                  />
                  <Label>Remember me</Label>
                </div>

                <span className="hover:underline cursor-pointer">
                  Forgot Password?
                </span>
              </div>

              {/* Submit */}
              <div className="text-center space-y-2">
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin">⚪</span>
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>

                <Link
                  href="/signup"
                  className="text-sm text-primary hover:underline"
                >
                  Don't have an account? Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
