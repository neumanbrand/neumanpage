"use client";

import React, { useEffect, useRef } from "react";

interface Fiber {
  x: number;
  y: number;
  length: number;
  angle: number;
  speedY: number;
  speedX: number;
  rotSpeed: number;
  baseOpacity: number;
  colorRgb: string;
  glowColor: string;
  thickness: number;
  twinkleOffset: number;
  isSpark: boolean;
}

export function TextileParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Color palettes with distinct vibrant glows
    const palette = [
      { rgb: "200, 109, 81", glow: "#C86D51" },   // Terracotta
      { rgb: "226, 138, 110", glow: "#E28A6E" },  // Coral Flame
      { rgb: "247, 243, 238", glow: "#DFD3C3" },  // Warm Cream
      { rgb: "212, 175, 55", glow: "#FFD700" },   // Golden Thread
      { rgb: "220, 120, 70", glow: "#FF8C00" },   // Amber Spark
    ];

    // Create 45 vibrant reactive fibers & sparks
    const fiberCount = 45;
    const fibers: Fiber[] = Array.from({ length: fiberCount }, (_, idx) => {
      const p = palette[idx % palette.length];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        length: 5 + Math.random() * 14,
        angle: Math.random() * Math.PI * 2,
        speedY: 0.3 + Math.random() * 0.6,
        speedX: (Math.random() - 0.5) * 0.4,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        baseOpacity: 0.2 + Math.random() * 0.35,
        colorRgb: p.rgb,
        glowColor: p.glow,
        thickness: 1 + Math.random() * 1.5,
        twinkleOffset: Math.random() * Math.PI * 2,
        isSpark: Math.random() > 0.4,
      };
    });

    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let scrollEnergy = 0; // 0 to 1 intensity

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      scrollVelocity = delta * 0.12;
      scrollEnergy = Math.min(1.5, scrollEnergy + Math.abs(delta) * 0.02 + 0.3);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    let time = 0;

    // Main animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      time += 0.03;
      // Decay velocity and energy smoothly
      scrollVelocity *= 0.90;
      scrollEnergy *= 0.93;

      fibers.forEach((fiber) => {
        // Boost motion when scrolling
        const currentSpeedY = fiber.speedY + scrollVelocity * (0.8 + Math.random() * 0.4);
        const currentSpeedX = fiber.speedX + Math.sin(time + fiber.twinkleOffset) * 0.4;

        fiber.y += currentSpeedY;
        fiber.x += currentSpeedX;
        fiber.angle += fiber.rotSpeed + scrollVelocity * 0.005;

        // Wrap around viewport
        if (fiber.y > height + 25) {
          fiber.y = -20;
          fiber.x = Math.random() * width;
        } else if (fiber.y < -25) {
          fiber.y = height + 20;
          fiber.x = Math.random() * width;
        }

        if (fiber.x > width + 25) {
          fiber.x = -20;
        } else if (fiber.x < -25) {
          fiber.x = width + 20;
        }

        // Dynamic Glow and Opacity based on scroll energy & twinkle
        const twinkle = (Math.sin(time * 3 + fiber.twinkleOffset) + 1) * 0.2;
        const currentOpacity = Math.min(1, fiber.baseOpacity + scrollEnergy * 0.6 + twinkle);
        const currentGlowBlur = 2 + scrollEnergy * 18;

        ctx.save();
        ctx.translate(fiber.x, fiber.y);
        ctx.rotate(fiber.angle);

        // Colored Glow Shadow
        ctx.shadowColor = fiber.glowColor;
        ctx.shadowBlur = currentGlowBlur;

        if (fiber.isSpark) {
          // Sparkling Diamond Filament
          ctx.beginPath();
          const sparkSize = (fiber.thickness * 1.8) * (1 + scrollEnergy * 0.8);
          ctx.arc(0, 0, sparkSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${fiber.colorRgb}, ${currentOpacity})`;
          ctx.fill();

          // Spark Cross Light
          if (scrollEnergy > 0.15) {
            ctx.strokeStyle = `rgba(${fiber.colorRgb}, ${currentOpacity * 0.8})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(-sparkSize * 2.5, 0);
            ctx.lineTo(sparkSize * 2.5, 0);
            ctx.moveTo(0, -sparkSize * 2.5);
            ctx.lineTo(0, sparkSize * 2.5);
            ctx.stroke();
          }
        } else {
          // Curved Glowing Textile Thread
          ctx.beginPath();
          ctx.moveTo(-fiber.length / 2, 0);
          ctx.quadraticCurveTo(0, Math.sin(fiber.angle * 2) * 3, fiber.length / 2, 0);
          ctx.strokeStyle = `rgba(${fiber.colorRgb}, ${currentOpacity})`;
          ctx.lineWidth = fiber.thickness * (1 + scrollEnergy * 0.5);
          ctx.lineCap = "round";
          ctx.stroke();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 opacity-90"
    />
  );
}
