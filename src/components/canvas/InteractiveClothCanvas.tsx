"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function InteractiveClothCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    let animationFrameId: number;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 4.2;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.0));
    container.appendChild(renderer.domElement);

    // 3. Custom GLSL Shader for Luxury Cloth Drape
    // Base: #2C4231 (Verde Bosque), Highlight: #3D5A44 / #F5E8C7 (Crema sastre)
    const vertexShader = `
      uniform float uTime;
      uniform vec2 uPointer;
      uniform float uFrequency;
      varying vec2 vUv;
      varying float vElevation;

      void main() {
        vUv = uv;
        vec3 pos = position;

        // Fluid cloth wave calculations
        float dist = distance(uv, uPointer);
        float wave = sin(pos.x * uFrequency + uTime * 1.1) * cos(pos.y * (uFrequency * 0.8) + uTime * 0.9);
        float ripple = sin(dist * 12.0 - uTime * 2.5) * exp(-dist * 3.2) * 0.12;

        pos.z += (wave * 0.12 + ripple);
        vElevation = pos.z;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      uniform vec3 uBaseColor;
      uniform vec3 uHighlightColor;
      uniform vec3 uDeepShadow;
      varying vec2 vUv;
      varying float vElevation;

      void main() {
        // Shading based on cloth fold elevation
        float depth = smoothstep(-0.15, 0.25, vElevation);
        vec3 color = mix(uDeepShadow, uBaseColor, depth);
        color = mix(color, uHighlightColor, smoothstep(0.12, 0.28, vElevation) * 0.45);

        // Subtle micro-thread weave texture
        float weave = sin(vUv.x * 450.0) * sin(vUv.y * 450.0) * 0.035;
        color += weave;

        gl_FragColor = vec4(color, 0.22);
      }
    `;

    const uniforms = {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uFrequency: { value: 2.8 },
      uDeepShadow: { value: new THREE.Color("#1B2B1F") },    // Sombra verde muy oscura
      uBaseColor: { value: new THREE.Color("#2C4231") },     // Verde Bosque Imperial Oficial
      uHighlightColor: { value: new THREE.Color("#446B4C") },// Reflejo sastre
    };

    const geometry = new THREE.PlaneGeometry(6.5, 4.5, 70, 70);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -0.35;
    scene.add(mesh);

    // 4. Pointer Interaction
    const targetPointer = new THREE.Vector2(0.5, 0.5);

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      targetPointer.set(x, y);
    };

    window.addEventListener("pointermove", onPointerMove);

    // 5. Resize Handling
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", onResize);

    // 6. Apple Energy & Accessibility: prefers-reduced-motion check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let isVisible = true;

    // 7. IntersectionObserver: Pause WebGL GPU loop when Hero is scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !prefersReducedMotion) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 8. Animation Loop
    const startTime = performance.now();
    const animate = () => {
      if (!isVisible || prefersReducedMotion) {
        renderer.render(scene, camera);
        return;
      }
      const elapsedTime = (performance.now() - startTime) * 0.001;
      material.uniforms.uTime.value = elapsedTime;

      // Smooth interpolation for pointer physics
      material.uniforms.uPointer.value.lerp(targetPointer, 0.05);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initial render
    renderer.render(scene, camera);
    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(animate);
    }

    // Cleanup
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    />
  );
}
