"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthenticationSignUp, AUTHENTICATIONSIGNUP } from "@/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Toaster, toast } from "sonner";
import Link from "next/link";

import { useRouter } from "next/router";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AUTHENTICATIONSIGNUP>({
    resolver: zodResolver(AuthenticationSignUp),
  });

  //   const router = useRouter();

  const onSubmit = async (data: AUTHENTICATIONSIGNUP) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      const json = await res.json();
      if (json.user) {
        toast.success("Signed up successfully");
        // router.push("/sign-in");
      } else {
        toast.error("Error in signing up");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="min-h-screen sign-page bg-primary-foreground text-primary">
      <Toaster />
      <MaxWidthWrapper>
        <div className="items-center pt-16 max-w-[500px] mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-primary">
            Personal Video Streaming
            <br />
            <span className="text-2xl font-bold text-primary">Platform</span>
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="grid space-y-4">
            <div className="">
              <Label htmlFor="email">Username</Label>
              <Input
                type="text"
                id="username"
                placeholder="Your username"
                {...register("username")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.username?.message}
                </p>
              )}
            </div>
            <div className="">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Your email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                {...register("password")}
                placeholder="Your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Link href="/sign-in" className="text-sm text-end">
              <span>Already have an account? Sign In</span>
            </Link>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default SignUp;
