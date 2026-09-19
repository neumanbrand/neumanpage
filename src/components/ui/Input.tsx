import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-[#24120C]/80">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "w-full bg-[#F7F3EE] border border-[#DFD3C3] rounded-xl px-4 py-3 text-[#24120C] placeholder-[#24120C]/40 text-sm focus:outline-none focus:border-[#C86D51] focus:ring-2 focus:ring-[#C86D51]/20 transition-all",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-600 font-medium mt-0.5">{error}</span>}
    </div>
  );
}
