"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { TOTAL_FRAMES } from "./timelineConfig";
import { NeumanVectorLogoOverlay } from "./NeumanVectorLogoOverlay";

interface ScrollyEngineProps {
  children: (props: {
    progress: number;
    currentFrame: number;
    isLoaded: boolean;
    goToProgress: (p: number) => void;
  }) => React.ReactNode;
}

export function ScrollyEngine({ children }: ScrollyEngineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Virtual Scroll Target & Current Lerp values
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);

  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isInitialReady, setIsInitialReady] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [currentFrameState, setCurrentFrameState] = useState<number>(0);

  // Pad number to 4 digits (frame_0000.jpg to frame_0384.jpg)
  const getFrameUrl = useCallback((index: number) => {
    const pad = String(index).padStart(4, "0");
    return `/sequence/frame_${pad}.jpg`;
  }, []);

  // Draw frame on canvas with responsive placement
  const renderFrame = useCallback((targetIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, targetIndex));
    currentFrameRef.current = clampedIndex;

    // Find the closest loaded image
    let imgToDraw: HTMLImageElement | null = imagesRef.current[clampedIndex] || null;
    if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
      for (let offset = 1; offset < 45; offset++) {
        const prev = imagesRef.current[clampedIndex - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          imgToDraw = prev;
          break;
        }
        const next = imagesRef.current[clampedIndex + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          imgToDraw = next;
          break;
        }
      }
    }

    if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
      return;
    }

    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, cw, ch);

    const iw = imgToDraw.naturalWidth || 1280;
    const ih = imgToDraw.naturalHeight || 720;
    const imgRatio = iw / ih;
    const isDesktop = cw >= 1024;

    let renderW: number;
    let renderH: number;
    let renderX: number;
    let renderY: number;

    if (isDesktop) {
      // Desktop: Scale to height and bias towards center-left (giving space to right editorial column)
      renderH = ch;
      renderW = ch * imgRatio;
      if (renderW < cw) {
        renderX = (cw - renderW) * 0.22;
      } else {
        renderX = (cw - renderW) * 0.32;
      }
      renderY = 0;
    } else {
      // Mobile / Tablet portrait: Cover viewport
      const canvasRatio = cw / ch;
      if (canvasRatio > imgRatio) {
        renderW = cw;
        renderH = cw / imgRatio;
      } else {
        renderH = ch;
        renderW = ch * imgRatio;
      }
      renderX = (cw - renderW) / 2;
      renderY = (ch - renderH) / 2;
    }

    // Source bounds: images are pre-calibrated to 1920x1080 with 0 letterboxing
    const cropTop = 0;
    const cropBottom = 0;
    const sourceH = Math.max(1, ih - cropTop - cropBottom);
    ctx.drawImage(imgToDraw, 0, cropTop, iw, sourceH, renderX, renderY, renderW, renderH);

    // Warm tailor vignette overlay matching #F5E8C7
    ctx.fillStyle = "rgba(245, 232, 199, 0.04)";
    ctx.fillRect(0, 0, cw, ch);

    ctx.restore();
  }, []);

  // Resize listener and responsive stage calculation
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      renderFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
  }, [renderFrame]);

  // Preloading Strategy
  useEffect(() => {
    if (typeof window === "undefined") return;

    imagesRef.current = new Array(TOTAL_FRAMES).fill(null);
    let isMounted = true;
    let loaded = 0;

    const loadImage = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFrameUrl(index);
        img.onload = () => {
          if (!isMounted) return;
          imagesRef.current[index] = img;
          loaded++;
          setLoadedCount(loaded);
          resolve(img);
        };
        img.onerror = () => {
          resolve(img);
        };
      });
    };

    // Tier 1: Immediately load frame 0 and render
    loadImage(0).then(() => {
      if (!isMounted) return;
      renderFrame(0);
      setIsInitialReady(true);

      // Tier 1b: Load first 30 frames in parallel
      const initialBatch: Promise<HTMLImageElement>[] = [];
      for (let i = 1; i <= 30 && i < TOTAL_FRAMES; i++) {
        initialBatch.push(loadImage(i));
      }

      Promise.all(initialBatch).then(() => {
        if (!isMounted) return;

        // Tier 2: Background loader for remaining frames (31 to 384)
        let nextIndex = 31;
        const BATCH_SIZE = 8;

        const loadNextBatch = () => {
          if (!isMounted || nextIndex >= TOTAL_FRAMES) return;

          const batch: Promise<HTMLImageElement>[] = [];
          for (let b = 0; b < BATCH_SIZE && nextIndex < TOTAL_FRAMES; b++) {
            batch.push(loadImage(nextIndex));
            nextIndex++;
          }

          Promise.all(batch).then(() => {
            if (isMounted && nextIndex < TOTAL_FRAMES) {
              if (window.requestIdleCallback) {
                window.requestIdleCallback(() => loadNextBatch());
              } else {
                setTimeout(loadNextBatch, 16);
              }
            }
          });
        };

        loadNextBatch();
      });
    });

    return () => {
      isMounted = false;
    };
  }, [getFrameUrl, renderFrame]);

  // Virtual Scroll Engine (STATIC SCREEN - Viewport never moves, scroll controls animation in-place)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Wheel listener: accumulates progress without scrolling page
    const handleWheel = (e: WheelEvent) => {
      // Allow scrolling inside modal drawers if open
      const target = e.target as HTMLElement | null;
      if (target && target.closest(".allow-modal-scroll")) {
        return;
      }

      e.preventDefault();
      // Sensitivity factor: ~12-16 wheel turns for entire 384 frames
      const sensitivity = 0.00065;
      const nextTarget = targetProgressRef.current + e.deltaY * sensitivity;
      targetProgressRef.current = Math.max(0, Math.min(1, nextTarget));
    };

    // Touch listeners for mobile / tablet swiping
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest(".allow-modal-scroll")) {
        return;
      }

      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY;
      touchStartY = currentY;

      const touchSensitivity = 0.0016;
      const nextTarget = targetProgressRef.current + deltaY * touchSensitivity;
      targetProgressRef.current = Math.max(0, Math.min(1, nextTarget));
    };

    // Keyboard navigation (Arrow keys / PageUp / PageDown / Space)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        targetProgressRef.current = Math.min(1, targetProgressRef.current + 0.08);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        targetProgressRef.current = Math.max(0, targetProgressRef.current - 0.08);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    // High-performance RAF lerp loop (Inertia damping 0.09)
    let lastRenderedFrame = -1;
    const updateLoop = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;

      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current += diff * 0.09;
      } else {
        currentProgressRef.current = targetProgressRef.current;
      }

      const p = currentProgressRef.current;
      // Two-part continuous visual sequence:
      // Part 1 (Hero section: 0.00 to 0.24) -> frames 0 to 164 (flower blooming)
      // Part 2 (Continuation / Section 2: 0.24 to 0.48) -> frames 165 to 356 (threads descending)
      // Sections 3 & 4 (0.48 to 1.00) -> stays at 356 while cleanly dissolving into editorial layout
      let frame = 0;
      if (p <= 0.24) {
        const heroP = p / 0.24;
        frame = Math.min(164, Math.max(0, Math.round(heroP * 164)));
      } else if (p <= 0.48) {
        const contP = (p - 0.24) / (0.48 - 0.24);
        frame = Math.min(356, Math.max(165, 165 + Math.round(contP * (356 - 165))));
      } else {
        frame = 356;
      }

      if (frame !== lastRenderedFrame) {
        renderFrame(frame);
        lastRenderedFrame = frame;
        setCurrentFrameState(frame);
      }

      setScrollProgress(p);
      rafIdRef.current = requestAnimationFrame(updateLoop);
    };

    rafIdRef.current = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [renderFrame]);

  // Jump to specific progress programmatically
  const goToProgress = useCallback((targetProgress: number) => {
    targetProgressRef.current = Math.max(0, Math.min(1, targetProgress));
  }, []);

  // Hero logo opacity: visible in Chapter 1 Hero (0.00 to 0.22), then smoothly dissolves
  const heroLogoOpacity = scrollProgress <= 0.22 ? 1 : Math.max(0, 1 - (scrollProgress - 0.22) / 0.05);

  // Canvas visual sequence: fully active in Hero & Section 2 (0.0 to 0.47),
  // then smoothly fades to 0 as we enter Section 3 & 4 (0.47 to 0.54)
  const canvasOpacity = scrollProgress <= 0.47 ? 1 : Math.max(0, 1 - (scrollProgress - 0.47) / 0.07);

  // Background color: warm ivory for Hero and Section 2, transitioning to pure white for Sections 3 & 4
  const isWhiteBg = scrollProgress > 0.48;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-screen h-screen overflow-hidden select-none transition-colors duration-700 ease-out"
      style={{
        backgroundColor: isWhiteBg ? "#FFFFFF" : "#F5E8C7",
      }}
    >
      {/* 1. Full Viewport Canvas (Hero & Continuation Sequence) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0 transition-opacity duration-300"
        style={{
          willChange: "transform",
          opacity: canvasOpacity,
        }}
      />

      {/* 2. Razor-Sharp Vector NEUMAN Logo Overlay with CC Light Sweep */}
      <div
        className="hidden lg:block absolute pointer-events-none z-5 transition-opacity duration-500"
        style={{
          left: "clamp(48px, 6vw, 96px)",
          top: "50%",
          transform: "translateY(-50%)",
          width: "clamp(140px, 13vw, 200px)",
          aspectRatio: "238 / 346",
          opacity: isInitialReady ? heroLogoOpacity : 0,
        }}
      >
        <NeumanVectorLogoOverlay
          progress={scrollProgress}
          className="w-full h-full drop-shadow-[0_8px_24px_rgba(44,66,49,0.10)]"
        />
      </div>

      {/* 3. Soft Ambient Vignette Masks (Hero Only) */}
      <div
        className="absolute inset-0 bg-radial from-transparent via-[#F5E8C7]/15 to-[#F5E8C7]/40 pointer-events-none z-1 transition-opacity duration-500"
        style={{ opacity: heroLogoOpacity }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#F5E8C7]/90 via-[#F5E8C7]/30 to-transparent pointer-events-none lg:hidden z-2 transition-opacity duration-500"
        style={{ opacity: heroLogoOpacity }}
      />

      {/* 4. Subtle Preloader Pill (Safely placed in bottom-right) */}
      {loadedCount < TOTAL_FRAMES && (
        <div
          className={`absolute bottom-8 right-12 lg:right-16 z-30 transition-opacity duration-500 pointer-events-none ${
            loadedCount >= 30 ? "opacity-30 hover:opacity-100" : "opacity-90"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#2C4231]/15 shadow-xs text-[10px] font-mono text-[#2C4231]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7B1B1B] animate-pulse" />
            <span>Fibras en buffer: {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%</span>
          </div>
        </div>
      )}

      {/* 4. Interactive Overlay Layer (Indicator, Chapters, Modals) */}
      <div className="relative z-10 w-full h-full pointer-events-none">
        {children({
          progress: scrollProgress,
          currentFrame: currentFrameState,
          isLoaded: isInitialReady,
          goToProgress,
        })}
      </div>
    </div>
  );
}
