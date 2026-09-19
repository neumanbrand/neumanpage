import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "bone" | "cream" | "chocolate" | "forest";
  bordered?: boolean;
}

export function Card({
  variant = "bone",
  bordered = true,
  className,
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    bone: "bg-[#ECE3D6] text-[#24120C]",
    cream: "bg-[#F7F3EE] text-[#24120C]",
    chocolate: "bg-[#24120C] text-[#F7F3EE]",
    forest: "bg-[#2D3A2F] text-[#F7F3EE]"
  };

  return (
    <div
      className={cn(
        "rounded-2xl p-6 sm:p-8 transition-all duration-300",
        bordered && (variant === "chocolate" || variant === "forest" ? "border border-[#DFD3C3]/15" : "border border-[#DFD3C3]"),
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
