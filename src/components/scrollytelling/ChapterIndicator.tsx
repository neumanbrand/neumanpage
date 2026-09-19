"use client";

import React from "react";
import { CHAPTERS } from "./timelineConfig";

interface ChapterIndicatorProps {
  progress: number;
  goToProgress: (p: number) => void;
}

export function ChapterIndicator({ progress, goToProgress }: ChapterIndicatorProps) {
  // Determine current active chapter
  const currentChapterIndex = CHAPTERS.findIndex(
    (c) => progress >= c.startProgress && progress <= c.endProgress
  );
  const activeIdx = currentChapterIndex !== -1 ? currentChapterIndex : progress > 0.8 ? 3 : 0;
  const isVisible = progress > 0.12;

  return (
    <nav
      aria-label="Navegación de Capítulos"
      className={`hidden lg:flex fixed bottom-8 lg:bottom-10 items-center gap-3 z-20 select-none transition-all duration-500 ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{
        left: "clamp(48px, 6vw, 96px)",
      }}
    >
      {/* Chapter Pills Capsule */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#2C4231]/15 shadow-lg shadow-[#2C4231]/5">
        {CHAPTERS.map((chap, idx) => {
          const isActive = idx === activeIdx;

          return (
            <button
              key={chap.id}
              onClick={() => goToProgress(chap.peakProgress)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer text-[11px] font-mono tracking-wider focus:outline-hidden ${
                isActive
                  ? "bg-[#2C4231] text-[#F5E8C7] font-semibold shadow-xs"
                  : "text-[#2C4231]/55 hover:text-[#2C4231] hover:bg-[#2C4231]/8"
              }`}
              title={`${chap.num}. ${chap.title}`}
            >
              <span className={isActive ? "text-[#F5E8C7]/75 font-mono text-[10px]" : "text-[#2C4231]/40"}>
                {chap.num}
              </span>
              {isActive && (
                <span className="whitespace-nowrap transition-all duration-300 font-lora">
                  {chap.title}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Progress percentage pill */}
      <div className="px-3 py-2 rounded-full bg-white/85 backdrop-blur-md border border-[#2C4231]/15 text-[11px] font-mono text-[#2C4231] font-semibold tracking-wider shadow-sm">
        {Math.round(progress * 100)}%
      </div>
    </nav>
  );
}
