---
name: framer-motion
description: Master-level Framer Motion and Motion (v12+) guidance for production web applications, React, Next.js, and Tailwind CSS. Covers spring physics, layout animations (layoutId, layout="position"), exit animations (AnimatePresence), gesture-driven interactions, scroll-driven motion (useScroll, useTransform, useMotionValue, useVelocity), SVG path morphing, performance optimization (hardware-acceleration, will-change, GPU compositing), and accessible reduced-motion support.
---

# Framer Motion & Motion (v12+) Production Guide

This skill provides expert-level architecture, recipes, and best practices for creating fluid, high-performance, and delightful animations using **Framer Motion** and modern **Motion** in React and Next.js applications.

---

## 1. Core Principles of Physical Motion

1. **Springs over Easing for Interaction**:
   - For user-initiated actions (clicks, drags, hovers, navigation), use springs (`type: "spring"`), not linear or arbitrary ease curves.
   - Recommended spring presets:
     - **Snappy/Tactile (Buttons, Badges, Toggles):** `{ stiffness: 400, damping: 30, mass: 0.8 }`
     - **Smooth/Editorial (Modals, Drawers, Cards):** `{ stiffness: 220, damping: 25, mass: 1 }`
     - **Gentle/Subtle (Tooltips, Dropdowns):** `{ stiffness: 180, damping: 22, mass: 1.2 }`
     - **Bouncy/Playful:** `{ stiffness: 300, damping: 15, mass: 0.6 }`

2. **Only Animate GPU-Composited Properties**:
   - Animate `transform` (`x`, `y`, `scale`, `scaleX`, `scaleY`, `rotate`) and `opacity`.
   - Never animate layout properties directly (`width`, `height`, `top`, `left`, `margin`, `padding`) without `layout` prop.

3. **Layout Animations (`layout` and `layoutId`)**:
   - Use `layout` for automatic FLIP animations when size/position changes.
   - Use `layoutId` for shared element transitions between distinct component states or tab indicators.
   - Example tab indicator:
     ```tsx
     {isActive && (
       <motion.div
         layoutId="activeTabIndicator"
         className="absolute inset-0 bg-[#C86D51] rounded-full"
         transition={{ type: "spring", stiffness: 350, damping: 30 }}
       />
     )}
     ```

---

## 2. AnimatePresence & Exit Transitions

Always provide unique, stable keys to children inside `AnimatePresence`.

```tsx
import { AnimatePresence, motion } from "framer-motion";

<AnimatePresence mode="wait" initial={false}>
  {isOpen && (
    <motion.div
      key="modal-content"
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="bg-[#24120C] text-[#F7F3EE] p-6 rounded-2xl shadow-2xl"
    >
      {children}
    </motion.div>
  )}
</AnimatePresence>
```

---

## 3. Scroll-Linked & Viewport Animations

1. **Reveal on Scroll (Viewport Once)**:
   ```tsx
   <motion.div
     initial={{ opacity: 0, y: 25 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
     transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
   >
     {content}
   </motion.div>
   ```

2. **Continuous Scroll Progress (`useScroll`, `useTransform`)**:
   ```tsx
   const { scrollYProgress } = useScroll();
   const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
   const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
   ```

---

## 4. Gestures & Micro-Interactions

```tsx
<motion.button
  whileHover={{ scale: 1.03, y: -2 }}
  whileTap={{ scale: 0.97, y: 0 }}
  transition={{ type: "spring", stiffness: 400, damping: 20 }}
  className="px-5 py-2.5 rounded-xl bg-[#C86D51] text-white font-medium shadow-md"
>
  Confirmar Acción
</motion.button>
```

---

## 5. Accessibility & Reduced Motion

Always respect `prefers-reduced-motion`:
```tsx
import { useReducedMotion } from "framer-motion";

export function AccessibleComponent() {
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 220, damping: 25 };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
    />
  );
}
```
