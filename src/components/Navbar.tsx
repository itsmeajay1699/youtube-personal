import React from "react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { buttonVariants } from "./ui/button";
const Navbar = async () => {
  const session = await getServerSession();
  return (
    <div className="w-full bg-primary py-2">
      {/* icon */}
      <MaxWidthWrapper className="max-w-5xl">
        <div className="flex justify-between">
          <div className="relative w-28 h-10">
            <Image src="/logo.png" alt="logo" fill />
          </div>
          <div className="">
            {session ? (
              <div className="flex items-center gap-4">
                <Link
                  className={buttonVariants({
                    className: "bg-primary-foreground text-[red]",
                    variant: "ghost",
                  })}
                  href="/dashboard"
                >
                  Dashboard
                </Link>

                <LogoutButton />
              </div>
            ) : (
              <Link
                href="/sign-in"
                className={buttonVariants({
                  className: "bg-primary-foreground text-[red]",
                  variant: "ghost",
                })}
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
