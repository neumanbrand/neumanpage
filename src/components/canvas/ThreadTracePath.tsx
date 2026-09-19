"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ThreadTracePath() {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
      onUpdate: (self) => {
        const draw = length * (1 - self.progress);
        gsap.set(path, { strokeDashoffset: draw });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div className="fixed inset-y-0 right-4 sm:right-10 w-8 pointer-events-none z-30 hidden lg:block">
      <svg
        ref={svgRef}
        viewBox="0 0 40 1000"
        preserveAspectRatio="none"
        className="w-full h-full opacity-60"
      >
        <path
          ref={pathRef}
          d="M 20 0 Q 38 250 15 500 T 25 750 T 20 1000"
          fill="none"
          stroke="#7B1B1B"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
