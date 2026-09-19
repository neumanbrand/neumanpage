"use client";

import React from "react";
import { Chapter1Origin } from "./chapters/Chapter1Origin";
import { Chapter2Craft } from "./chapters/Chapter2Craft";
import { Chapter3Structure } from "./chapters/Chapter3Structure";
import { Chapter4Identity } from "./chapters/Chapter4Identity";
import { CHAPTERS } from "./timelineConfig";

interface ChapterTimelineProps {
  progress: number;
  goToProgress: (p: number) => void;
  onOpenDiagnostic: () => void;
  onOpenFaq: () => void;
}

// Smooth linear and plateau interpolation for chapters
function getChapterTransform(
  progress: number,
  start: number,
  peakStart: number,
  peakEnd: number,
  end: number,
  isFirst: boolean = false
) {
  // If it's the first chapter and we're at or near 0, stay fully visible
  if (isFirst && progress <= peakStart) {
    return { opacity: 1, y: 0, visible: true };
  }

  if (progress < start) {
    return { opacity: 0, y: 25, visible: false };
  }
  if (progress >= start && progress < peakStart) {
    const t = (progress - start) / (peakStart - start);
    return { opacity: t, y: (1 - t) * 25, visible: true };
  }
  if (progress >= peakStart && progress <= peakEnd) {
    return { opacity: 1, y: 0, visible: true };
  }
  if (progress > peakEnd && progress <= end) {
    const t = (progress - peakEnd) / (end - peakEnd);
    return { opacity: 1 - t, y: -t * 25, visible: true };
  }
  return { opacity: 0, y: -25, visible: false };
}

export function ChapterTimeline({
  progress,
  goToProgress,
  onOpenDiagnostic,
  onOpenFaq,
}: ChapterTimelineProps) {
  // Clean chapter transition intervals (Hero section from 0.0 to 0.24 is 100% card-free)
  const c1 = getChapterTransform(progress, 0.24, 0.30, 0.39, 0.45);
  const c2 = getChapterTransform(progress, 0.44, 0.50, 0.59, 0.65);
  const c3 = getChapterTransform(progress, 0.64, 0.70, 0.79, 0.85);
  const c4 = getChapterTransform(progress, 0.84, 0.90, 1.0, 1.05);

  return (
    <div className="absolute inset-0 flex items-center justify-end px-4 sm:px-8 lg:px-14 xl:px-20 pointer-events-none z-10">
      <div className="w-full max-w-xl lg:max-w-lg xl:max-w-xl relative flex flex-col justify-center min-h-[460px]">
        
        {/* Chapter 1: Origin & Manifesto */}
        <div
          style={{
            opacity: c1.opacity,
            transform: `translateY(${c1.y}px)`,
            pointerEvents: c1.opacity > 0.1 ? "auto" : "none",
            display: c1.opacity > 0.01 ? "block" : "none",
          }}
          className="w-full bg-[#FAF4E6]/95 backdrop-blur-xl border border-[#2C4231]/15 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-[#2C4231]/10 transition-transform duration-75"
        >
          <Chapter1Origin
            onNext={() => goToProgress(CHAPTERS[1].peakProgress)}
            onOpenDiagnostic={onOpenDiagnostic}
          />
        </div>

        {/* Chapter 2: Metamorphosis */}
        <div
          style={{
            opacity: c2.opacity,
            transform: `translateY(${c2.y}px)`,
            pointerEvents: c2.opacity > 0.1 ? "auto" : "none",
            display: c2.opacity > 0.01 ? "block" : "none",
          }}
          className="w-full bg-[#FAF4E6]/95 backdrop-blur-xl border border-[#2C4231]/15 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-[#2C4231]/10 transition-transform duration-75"
        >
          <Chapter2Craft
            onNext={() => goToProgress(CHAPTERS[2].peakProgress)}
          />
        </div>

        {/* Chapter 3: Form & Structure */}
        <div
          style={{
            opacity: c3.opacity,
            transform: `translateY(${c3.y}px)`,
            pointerEvents: c3.opacity > 0.1 ? "auto" : "none",
            display: c3.opacity > 0.01 ? "block" : "none",
          }}
          className="w-full bg-[#FAF4E6]/95 backdrop-blur-xl border border-[#2C4231]/15 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-[#2C4231]/10 transition-transform duration-75"
        >
          <Chapter3Structure
            onNext={() => goToProgress(CHAPTERS[3].peakProgress)}
          />
        </div>

        {/* Chapter 4: Identity & Contact */}
        <div
          style={{
            opacity: c4.opacity,
            transform: `translateY(${c4.y}px)`,
            pointerEvents: c4.opacity > 0.1 ? "auto" : "none",
            display: c4.opacity > 0.01 ? "block" : "none",
          }}
          className="w-full bg-[#FAF4E6]/95 backdrop-blur-xl border border-[#2C4231]/15 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-[#2C4231]/10 transition-transform duration-75"
        >
          <Chapter4Identity
            onOpenDiagnostic={onOpenDiagnostic}
            onOpenFaq={onOpenFaq}
          />
        </div>

      </div>
    </div>
  );
}
