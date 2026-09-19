"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "forest";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  icon,
  onClick,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none min-h-[44px] sm:min-h-[40px]";

  const sizeStyles = {
    sm: "text-xs px-4 py-2.5 gap-1.5",
    md: "text-sm px-6 py-3 gap-2",
    lg: "text-base px-8 py-4 gap-2.5 shadow-sm min-h-[48px]"
  };

  const variantStyles = {
    primary: "bg-[#7B1B1B] text-[#F5E8C7] hover:bg-[#912020] shadow-md shadow-[#7B1B1B]/25 active:scale-[0.97] border border-[#F5E8C7]/20",
    secondary: "bg-[#23110E] text-[#F5E8C7] hover:bg-[#361B17] active:scale-[0.97] border border-[#F5E8C7]/20",
    outline: "border border-[#F5E8C7]/40 text-[#F5E8C7] hover:bg-[#F5E8C7] hover:text-[#23110E] active:scale-[0.97]",
    ghost: "text-[#F5E8C7] hover:bg-[#F5E8C7]/10 active:scale-[0.97]",
    forest: "bg-[#2C4231] text-[#F5E8C7] hover:bg-[#1E2E22] active:scale-[0.97] border border-[#2C4231]"
  };

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.015 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 450, damping: 28 }}
      type={type}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      onClick={onClick}
      disabled={disabled}
      {...(props as any)}
    >
      {children}
      {icon && <span className="shrink-0">{icon}</span>}
    </motion.button>
  );
}
