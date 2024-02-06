"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Authentication, AUTHENTICATION } from "@/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// red and white and black theme
const SignIn = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AUTHENTICATION>({
    resolver: zodResolver(Authentication),
  });

  const onSubmit = (data: AUTHENTICATION) => {
    console.log(data);
  };

  return (
    <section className="min-h-screen sign-page bg-primary-foreground text-primary">
      <MaxWidthWrapper>
        <div className="items-center pt-16 max-w-[500px] mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-primary">
            Personal Video Streaming
            <br />
            <span className="text-2xl font-bold text-primary">Platform</span>
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="grid space-y-4">
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
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default SignIn;
