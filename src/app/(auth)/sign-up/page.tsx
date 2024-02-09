"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthenticationSignUp, AUTHENTICATIONSIGNUP } from "@/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/lib/toast";
import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AUTHENTICATIONSIGNUP>({
    resolver: zodResolver(AuthenticationSignUp),
  });

  const { showToast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: AUTHENTICATIONSIGNUP) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      const json = await res.json();
      if (json.user) {
        showToast("Signed up successfully", "success", 3000, "top-right");
        router.push("/sign-in");
      } else {
        showToast(json.error, "error");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <section className="sign-page bg-primary-foreground text-primary pb-12">
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
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password")}
                  placeholder="Your password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
                <div
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Link href="/sign-in" className="text-sm text-end">
              <span>Already have an account? Sign In</span>
            </Link>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Sign up"}
            </Button>
          </form>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default SignUp;
