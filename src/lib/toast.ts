import React from "react";
import { toast } from "sonner";

export const useToast = () => {
  const showToast = (
    message: string,
    type: "success" | "error",
    duration: number = 5000,
    position:
      | "top-right"
      | "top-left"
      | "bottom-right"
      | "bottom-left" = "top-right"
  ) => {
    toast[type](message, {
      duration: duration,
      position: position,
    });
  };

  return { showToast };
};
