import React from "react";
import { SquirrelIsotype } from "@/components/brand/BrandAssets";
import { cn } from "@/lib/utils";

export function SquirrelBadge({
  text = "Economía Circular Textil B2B",
  className = ""
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECE3D6] border border-[#DFD3C3] text-[#24120C] text-xs font-medium tracking-wide shadow-xs",
        className
      )}
    >
      <SquirrelIsotype className="w-4 h-4" animated={false} />
      <span>{text}</span>
    </div>
  );
}
