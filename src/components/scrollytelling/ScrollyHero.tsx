"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import { NeumanVectorLogoOverlay } from "./NeumanVectorLogoOverlay";
import { TOTAL_FRAMES } from "./timelineConfig";

export function ScrollyHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const editorialTextRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const cursorLightRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);

  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef<number>(0);
  const isHeroActiveRef = useRef<boolean>(true);

  // Intro reveal state
  const [mounted, setMounted] = useState(false);

  // Normalized cursor positions for smooth physics
  const targetCursorRef = useRef({ x: 0, y: 0 });
  const currentCursorRef = useRef({ x: 0, y: 0 });
  const targetPixelRef = useRef({ x: 0, y: 0 });
  const currentPixelRef = useRef({ x: 0, y: 0 });

  // Frame URL with cache buster
  const getFrameUrl = useCallback((index: number) => {
    const pad = String(index).padStart(4, "0");
    return `/hero-sequence/frame_${pad}.jpg?v=clean3`;
  }, []);

  // Draw frame on canvas: centered / aligned to camera with 2px bleed
  const renderFrame = useCallback((targetIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, targetIndex));
    currentFrameRef.current = clampedIndex;

    // Find requested image or nearest fallback
    let imgToDraw = imagesRef.current[clampedIndex];
    if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
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

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;

    ctx.save();
    ctx.scale(dpr, dpr);
    // Fill canvas background with solid tailor cream to eliminate any transparent black flash
    ctx.fillStyle = "#F5E8C7";
    ctx.fillRect(0, 0, cw, ch);

    const iw = imgToDraw.naturalWidth || 1600;
    const ih = imgToDraw.naturalHeight || 900;
    const imgRatio = iw / ih;
    const isDesktop = cw >= 1024;

    let renderW: number;
    let renderH: number;
    let renderX: number;
    let renderY: number;

    if (isDesktop) {
      // Desktop: Scale to height with 2px bleed
      renderH = ch + 4;
      renderW = renderH * imgRatio;
      renderX = (cw - renderW) / 2;
      renderY = -2;
    } else {
      // Mobile / Tablet: Cover viewport centered with 2px bleed
      const canvasRatio = cw / ch;
      if (canvasRatio > imgRatio) {
        renderW = cw + 4;
        renderH = renderW / imgRatio;
      } else {
        renderH = ch + 4;
        renderW = renderH * imgRatio;
      }
      renderX = (cw - renderW) / 2;
      renderY = (ch - renderH) / 2;
    }

    ctx.drawImage(imgToDraw, 0, 0, iw, ih, renderX, renderY, renderW, renderH);

    // Warm tailor subtle tone
    ctx.fillStyle = "rgba(245, 232, 199, 0.03)";
    ctx.fillRect(0, 0, cw, ch);

    ctx.restore();
  }, []);

  // Update canvas resolution matching viewport DPR
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }

      renderFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderFrame]);

  // Preload frames in background
  useEffect(() => {
    const total = TOTAL_FRAMES;
    imagesRef.current = new Array(total).fill(null);

    // Frame 0: immediate load
    const img0 = new Image();
    img0.src = getFrameUrl(0);
    img0.onload = () => {
      imagesRef.current[0] = img0;
      renderFrame(0);
      setMounted(true);
    };

    // Preload remaining frames
    for (let i = 1; i < total; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        imagesRef.current[i] = img;
        if (i === currentFrameRef.current) {
          renderFrame(i);
        }
      };
    }
  }, [getFrameUrl, renderFrame]);

  // Multi-Plane 3D Parallax & Cursor Ambient Lighting physics loop
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetCursorRef.current = { x: nx, y: ny };
      targetPixelRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let animId: number;

    const physicsLoop = () => {
      if (isHeroActiveRef.current) {
        const { x: cx, y: cy } = currentCursorRef.current;
        const { x: tcx, y: tcy } = targetCursorRef.current;
        const { x: px, y: py } = currentPixelRef.current;
        const { x: tpx, y: tpy } = targetPixelRef.current;

        const nextCx = cx + (tcx - cx) * 0.05;
        const nextCy = cy + (tcy - cy) * 0.05;
        currentCursorRef.current = { x: nextCx, y: nextCy };

        const nextPx = px + (tpx - px) * 0.07;
        const nextPy = py + (tpy - py) * 0.07;
        currentPixelRef.current = { x: nextPx, y: nextPy };

        // Layer 1: Canvas Parallax (moves subtly opposite to cursor for depth)
        if (canvasWrapperRef.current) {
          canvasWrapperRef.current.style.transform = `translate3d(${(nextCx * -14).toFixed(2)}px, ${(nextCy * -10).toFixed(2)}px, 0)`;
        }

        // Layer 2: Editorial Logo & Typography (moves slightly with cursor)
        if (logoWrapperRef.current) {
          logoWrapperRef.current.style.transform = `translate3d(${(nextCx * 11).toFixed(2)}px, calc(-50% + ${(nextCy * 8).toFixed(2)}px), 0)`;
        }

        // Layer 3: Warm Ambient Cursor Light Beam
        if (cursorLightRef.current) {
          cursorLightRef.current.style.background = `radial-gradient(750px circle at ${nextPx.toFixed(1)}px ${nextPy.toFixed(1)}px, rgba(255, 252, 245, 0.45), rgba(245, 232, 199, 0.15) 45%, transparent 75%)`;
        }
      }

      animId = requestAnimationFrame(physicsLoop);
    };

    animId = requestAnimationFrame(physicsLoop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Native window scroll tracking: Direct, 100% reliable frame calculation with RAF throttling
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const scrollableDist = rect.height - window.innerHeight;
            if (scrollableDist > 0) {
              const p = Math.min(1, Math.max(0, -rect.top / scrollableDist));
              isHeroActiveRef.current = rect.bottom > 0;

              // Phase 1 (0.00 to 0.80): Flower blooms smoothly from frame 0 to 165
              // Phase 2 (0.80 to 1.00): Flower stays steady & camera-aligned on frame 165
              let targetFrame = 0;
              if (p <= 0.80) {
                targetFrame = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round((p / 0.80) * (TOTAL_FRAMES - 1))));
              } else {
                targetFrame = TOTAL_FRAMES - 1;
              }

              if (targetFrame !== currentFrameRef.current) {
                renderFrame(targetFrame);
              }

              // Fast fade-out for editorial typography (0.00 to 0.14)
              const textOpacity = Math.max(0, 1 - p / 0.14);
              const textTranslateY = -p * 140;
              if (editorialTextRef.current) {
                editorialTextRef.current.style.opacity = textOpacity.toFixed(3);
                editorialTextRef.current.style.transform = `translateY(${textTranslateY.toFixed(1)}px)`;
                editorialTextRef.current.style.pointerEvents = textOpacity <= 0 ? "none" : "auto";
              }

              // Fast fade-out for left scroll indicator (0.00 to 0.05)
              const indicatorOpacity = Math.max(0, 1 - p / 0.05);
              if (scrollIndicatorRef.current) {
                scrollIndicatorRef.current.style.opacity = indicatorOpacity.toFixed(3);
              }

              // Direct, seamless transition: Hero stays 100% visible while pinned.
              // As soon as the user scrolls past the flower, the next section (<main>)
              // immediately slides up like a luxury editorial card over the hero.
              let heroOpacity = 1;
              let scaleTransform = "scale(1)";
              if (rect.bottom < window.innerHeight) {
                const exitProgress = Math.max(0, Math.min(1, 1 - rect.bottom / window.innerHeight));
                heroOpacity = Math.max(0, 1 - exitProgress * 1.4);
                scaleTransform = `scale(${1 - exitProgress * 0.04})`;
              }

              const opacityStr = heroOpacity.toFixed(3);

              if (logoWrapperRef.current) logoWrapperRef.current.style.opacity = opacityStr;
              if (vignetteRef.current) vignetteRef.current.style.opacity = opacityStr;
              if (cursorLightRef.current) cursorLightRef.current.style.opacity = opacityStr;
              if (canvasRef.current) {
                canvasRef.current.style.opacity = opacityStr;
                canvasRef.current.style.transform = scaleTransform;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [renderFrame]);

  return (
    <div
      ref={containerRef}
      id="hero"
      className="relative w-full h-[220vh] bg-[#F5E8C7] select-none"
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#F5E8C7]">
        {/* 1. Interactive Cursor Ambient Light */}
        <div
          ref={cursorLightRef}
          className="absolute inset-0 pointer-events-none z-1 transition-opacity duration-300"
          style={{ willChange: "background" }}
        />

        {/* 2. Canvas with flower sculpture centered and aligned to camera + 3D Parallax */}
        <div
          ref={canvasWrapperRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-2 will-change-transform"
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain bg-[#F5E8C7]"
            style={{ willChange: "opacity, transform", opacity: 1, backgroundColor: "#F5E8C7" }}
          />
        </div>

        {/* 3. Editorial Anchor: Logo + Craft Manifesto (Desktop: Left) */}
        <div
          ref={logoWrapperRef}
          className={`hidden lg:flex flex-col justify-center absolute pointer-events-none z-10 will-change-transform transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            left: "clamp(48px, 6vw, 96px)",
            top: "50%",
            transform: "translateY(-50%)",
            maxWidth: "340px",
          }}
        >
          {/* Razor-sharp NEUMAN Vector Logo */}
          <div
            style={{
              width: "clamp(125px, 11vw, 165px)",
              aspectRatio: "238 / 346",
            }}
          >
            <NeumanVectorLogoOverlay
              progress={0}
              className="w-full h-full drop-shadow-[0_8px_24px_rgba(44,66,49,0.06)]"
            />
          </div>

          {/* Editorial Typography Block (Fast fade on scroll 0% -> 14%) */}
          <div
            ref={editorialTextRef}
            className="mt-6 flex flex-col gap-2.5 transition-opacity duration-150 will-change-transform will-change-opacity pointer-events-auto"
          >
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2C4231] animate-ping" />
              <span className="font-mono text-[9px] tracking-[0.26em] uppercase text-[#2C4231]/80 font-semibold">
                Estudio de Economía Circular · Bogotá
              </span>
            </div>

            <h1 className="font-cormorant text-3xl lg:text-[34px] font-bold text-[#23110E] leading-[1.08] tracking-tight">
              De residuo <span className="italic font-normal text-[#2C4231]">a relato</span>.
            </h1>

            <p className="font-lora text-[12.5px] text-[#23110E]/75 leading-relaxed max-w-[280px]">
              Ingeniería circular 1:1 que transforma mermas de corte en nuevos insumos nobles de confección.
            </p>
          </div>
        </div>

        {/* Mobile Header: Logo + Micro Manifesto */}
        <div
          className={`lg:hidden absolute top-8 left-6 right-6 z-10 pointer-events-none flex flex-col gap-3 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <div style={{ width: "85px", aspectRatio: "238 / 346" }}>
            <NeumanVectorLogoOverlay progress={0} className="w-full" />
          </div>
          <div className="flex flex-col gap-1 max-w-[260px]">
            <span className="font-mono text-[8.5px] tracking-[0.24em] uppercase text-[#2C4231]/80 font-semibold">
              Circularidad 1:1 · Bogotá
            </span>
            <span className="font-cormorant text-xl font-bold text-[#23110E]">
              De residuo <span className="italic font-normal text-[#2C4231]">a relato</span>.
            </span>
          </div>
        </div>

        {/* 4. Left-Aligned Tailor Scroll Inciter with Floating Arrow */}
        <div
          ref={scrollIndicatorRef}
          className={`absolute bottom-8 z-10 pointer-events-none flex items-center gap-2.5 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={{
            left: "clamp(48px, 6vw, 96px)",
          }}
        >
          <span className="font-mono text-xs text-[#2C4231]/80 font-bold inline-block animate-tailor-bounce">
            ↓
          </span>
          <span className="font-mono text-[9px] tracking-[0.28em] uppercase text-[#2C4231]/80 font-semibold">
            Scroll para transformar
          </span>
        </div>

        {/* 5. Soft Ambient Lighting */}
        <div
          ref={vignetteRef}
          className="absolute inset-0 bg-radial from-transparent via-[#F5E8C7]/15 to-[#F5E8C7]/40 pointer-events-none z-1 transition-opacity duration-150"
          style={{ willChange: "opacity", opacity: 1 }}
        />
      </div>
    </div>
  );
}
