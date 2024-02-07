"use client";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <Button
      onClick={() =>
        signOut({
          callbackUrl: "/sign-in",
        })
      }
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
