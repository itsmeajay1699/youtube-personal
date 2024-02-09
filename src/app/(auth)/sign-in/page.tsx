"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Authentication, AUTHENTICATION } from "@/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/lib/toast";
import { EyeOff, Eye } from "lucide-react";
import { useState } from "react";

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

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { showToast } = useToast();

  const onSubmit = async (data: AUTHENTICATION) => {
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (!res?.ok) {
        showToast("Invalid credentials", "error");
        return;
      }
      showToast("Signed in successfully", "success", 1000, "top-right");
      router.push("/");
      router.refresh();
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
            </div>
            <Link href="/sign-up" className="text-sm text-end">
              <span>Don&apos;t have an account? Sign Up</span>
            </Link>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Sign In"}
            </Button>
          </form>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default SignIn;
