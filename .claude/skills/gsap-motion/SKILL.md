---
name: gsap-motion
description: Master-level GreenSock Animation Platform (GSAP 3+) guide for high-performance creative web animations, ScrollTrigger, Flip plugin, SplitText, SVG morphing, scrub timelines, smooth scrolling (Lenis integration), canvas/WebGL animation loops, and React/Next.js hook lifecycles (useGSAP).
---

# GSAP (GreenSock) Animation Production Guide

GSAP is the industry standard for robust, high-performance, and complex timeline-driven web animations.

---

## 1. Setup in Next.js & React (`useGSAP`)

Always use `@gsap/react` (`useGSAP`) for automatic cleanup and scoping to avoid memory leaks during route changes and component unmounting.

```tsx
"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HeroTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

      tl.from(".hero-badge", { y: -20, opacity: 0, duration: 0.6 })
        .from(".hero-title", { y: 60, opacity: 0, duration: 1.2 }, "-=0.3")
        .from(".hero-sub", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".hero-btn", { scale: 0.9, opacity: 0, duration: 0.5 }, "-=0.4");
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative min-h-screen flex flex-col justify-center">
      <div className="hero-badge">Circular Textile Platform</div>
      <h1 className="hero-title font-serif text-8xl font-bold">NEUMAN</h1>
      <p className="hero-sub">De residuo textil a insumo de valor.</p>
      <button className="hero-btn">Explorar</button>
    </div>
  );
}
```

---

## 2. ScrollTrigger Best Practices

1. **Scrubbing & Pinning**:
   ```tsx
   useGSAP(() => {
     gsap.to(".thread-progress", {
       height: "100%",
       ease: "none",
       scrollTrigger: {
         trigger: "#main-track",
         start: "top top",
         end: "bottom bottom",
         scrub: 1,
       },
     });
   }, { scope: containerRef });
   ```

2. **Batch Scroll Triggers**:
   ```tsx
   ScrollTrigger.batch(".card-reveal", {
     onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
     onLeaveBack: (batch) => gsap.to(batch, { opacity: 0, y: 30, overwrite: true }),
   });
   ```

---

## 3. Smooth Scrolling (GSAP + Lenis Integration)

```ts
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
  return lenis;
}
```

---

## 4. Key Performance Rules
- Set `willChange: "transform"` on heavy animated layers.
- Avoid animating `filter: blur()` on full-screen containers.
- Prefer `xPercent` and `yPercent` over manual pixel calculations.
