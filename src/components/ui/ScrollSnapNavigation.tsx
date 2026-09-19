"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";

interface SectionMeta {
  id: string;
  num: string;
  label: string;
  category: string;
  storyTitle: string;
  renderIcon: () => React.ReactNode;
}

// 9 Custom Tailor-Craft Vector Icons matching the NEUMAN brand logo style
const sections: SectionMeta[] = [
  { 
    id: "hero", 
    num: "01", 
    label: "Inicio", 
    category: "Manifesto",
    storyTitle: "Identidad NEUMAN",
    renderIcon: () => (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#2C4231" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" stroke="#2C4231" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" fill="#2C4231" />
        <circle cx="12" cy="12" r="1.2" fill="#7B1B1B" />
      </svg>
    )
  },
  { 
    id: "problema", 
    num: "02", 
    label: "El Desafío", 
    category: "Diagnóstico",
    storyTitle: "Tijeras de Corte de Sastre",
    renderIcon: () => (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#24120C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="20" y1="4" x2="8.12" y2="15.88" />
        <line x1="14.47" y1="14.48" x2="20" y2="20" />
        <line x1="8.12" y1="8.12" x2="12" y2="12" />
        <circle cx="12" cy="12" r="1" fill="#C86D51" stroke="none" />
      </svg>
    )
  },
  { 
    id: "ciclo", 
    num: "03", 
    label: "Circuito Cerrado", 
    category: "Proceso",
    storyTitle: "Circuito de Hilatura y Telar",
    renderIcon: () => (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#24120C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 21 12 A 9 9 0 0 0 6 5.3 L 3 8" />
        <polyline points="3 3 3 8 8 8" />
        <path d="M 3 12 A 9 9 0 0 0 18 18.7 L 21 16" />
        <polyline points="21 21 21 16 16 16" />
        <circle cx="12" cy="12" r="2" fill="#C86D51" stroke="none" />
      </svg>
    )
  },
  { 
    id: "productos", 
    num: "04", 
    label: "Aplicaciones", 
    category: "Catálogo",
    storyTitle: "Marquilla y Etiqueta Tejida",
    renderIcon: () => (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#24120C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.4 2.4 0 0 0 3.394 0l5.828-5.828a2.4 2.4 0 0 0 0-3.394l-7.926-7.482Z" />
        <circle cx="7.5" cy="7.5" r="1.5" fill="#C86D51" stroke="none" />
      </svg>
    )
  },
  { 
    id: "impacto", 
    num: "05", 
    label: "Calculadora", 
    category: "Retorno ESG",
    storyTitle: "Balanza de Pesaje de Retazos",
    renderIcon: () => (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#24120C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18" />
        <path d="M6 7l6-3 6 3" />
        <path d="M3 13a3 3 0 0 0 6 0l-3-6-3 6Z" fill="#C86D51" fillOpacity="0.25" />
        <path d="M15 13a3 3 0 0 0 6 0l-3-6-3 6Z" fill="#C86D51" fillOpacity="0.25" />
        <path d="M9 21h6" />
      </svg>
    )
  },
  { 
    id: "certificado", 
    num: "06", 
    label: "Trazabilidad", 
    category: "Garantía",
    storyTitle: "Sello de Custodia y QR",
    renderIcon: () => (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#24120C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#C86D51" fillOpacity="0.2" />
        <polyline points="9 12 11 14 15 10" stroke="#C86D51" strokeWidth="1.8" />
      </svg>
    )
  },
  { 
    id: "diagnostico", 
    num: "07", 
    label: "Diagnóstico B2B", 
    category: "Auditoría",
    storyTitle: "Cinta Métrica de Sastre",
    renderIcon: () => (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#24120C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0l12.6 12.6z" />
        <line x1="7" y1="4" x2="9" y2="6" stroke="#C86D51" />
        <line x1="10" y1="7" x2="13" y2="10" stroke="#C86D51" />
        <line x1="14" y1="11" x2="16" y2="13" stroke="#C86D51" />
        <line x1="17" y1="14" x2="20" y2="17" stroke="#C86D51" />
      </svg>
    )
  },
  { 
    id: "faq", 
    num: "08", 
    label: "Preguntas", 
    category: "Soporte",
    storyTitle: "Consultas Frecuentes B2B",
    renderIcon: () => (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#24120C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M4 10h16" strokeDasharray="2 2" stroke="#C86D51" />
        <path d="M9 10v4a3 3 0 0 0 6 0v-4" />
        <circle cx="12" cy="14" r="1" fill="#C86D51" stroke="none" />
      </svg>
    )
  },
  { 
    id: "contacto", 
    num: "09", 
    label: "Contacto & Hub", 
    category: "Alianza",
    storyTitle: "Alfiler en Mapa / Hub Bogotá",
    renderIcon: () => (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#24120C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" fill="#C86D51" fillOpacity="0.2" />
        <circle cx="12" cy="9" r="2.5" fill="#C86D51" stroke="none" />
      </svg>
    )
  },
];

export function ScrollSnapNavigation() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down");
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [showAutoTooltip, setShowAutoTooltip] = useState<boolean>(true);
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef<number>(0);

  // Height and coordinate constants
  const TRACK_HEIGHT = 380;
  const TOP_OFFSET = 16;

  // Spring physics for smooth medallion descent
  const targetY = useMotionValue(TOP_OFFSET);
  const medallionY = useSpring(targetY, { stiffness: 220, damping: 24, mass: 0.85 });
  
  // Realistic physical 3D coin spin and pop scale
  const coinPopScale = useSpring(1, { stiffness: 380, damping: 18 });
  const coinTiltX = useSpring(0, { stiffness: 320, damping: 20 });

  // Update position and trigger realistic coin flip
  useEffect(() => {
    const fraction = activeIndex / (sections.length - 1);
    const newY = TOP_OFFSET + fraction * TRACK_HEIGHT;
    targetY.set(newY);

    // Ephemeral Tooltip timer (1.6s auto-hide)
    setShowAutoTooltip(true);
    if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
    tooltipTimeoutRef.current = setTimeout(() => {
      setShowAutoTooltip(false);
    }, 1600);

    // Realistic Coin Pop & Settle: Expand to 1.35x, tilt on momentum, settle gently
    coinPopScale.set(1.35);
    coinTiltX.set(scrollDirection === "down" ? 18 : -18);

    const settleTimer = setTimeout(() => {
      coinPopScale.set(1);
      coinTiltX.set(0);
    }, 220);

    return () => {
      if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
      clearTimeout(settleTimer);
    };
  }, [activeIndex, scrollDirection]);

  // Scroll and Keyboard Listeners
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      if (delta > 2) {
        setScrollDirection("down");
      } else if (delta < -2) {
        setScrollDirection("up");
      }
      lastScrollY.current = currentScrollY;

      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      const scrollPosition = window.scrollY + window.innerHeight / 2.5;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveIndex(i);
            break;
          }
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        setScrollDirection("down");
        const nextIdx = Math.min(activeIndex + 1, sections.length - 1);
        scrollToSection(sections[nextIdx].id);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        setScrollDirection("up");
        const prevIdx = Math.max(activeIndex - 1, 0);
        scrollToSection(sections[prevIdx].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(scrollTimeout);
    };
  }, [activeIndex]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const currentSection = sections[activeIndex];
  const progressFraction = activeIndex / (sections.length - 1);
  const currentProgressPercent = progressFraction * 100;

  return (
    <div className="fixed right-4 sm:right-7 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center select-none pointer-events-auto">
      
      {/* Navigation Track Container */}
      <div className="relative w-12 h-[412px] flex flex-col items-center justify-start">
        
        {/* 1. EL HILO DE SASTRE VERTICAL */}
        <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-[#DFD3C3]/15 rounded-full">
          {/* Hilo Activo Iluminado con Gradiente Terracota-Oro */}
          <motion.div
            className="w-full bg-gradient-to-b from-[#C86D51] via-[#E28A6E] to-[#DFD3C3] rounded-full origin-top shadow-[0_0_8px_rgba(200,109,81,0.6)]"
            animate={{ height: `${currentProgressPercent}%` }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
          />

          {/* Nudo Superior */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#C86D51]" />
          {/* Nudo Inferior */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#DFD3C3]/40" />
        </div>

        {/* 2. 9 PUNTADAS DISCRETAS EN EL HILO */}
        {sections.map((section, idx) => {
          const fraction = idx / (sections.length - 1);
          const stitchY = TOP_OFFSET + fraction * TRACK_HEIGHT;
          const isActive = activeIndex === idx;
          const isPassed = activeIndex >= idx;
          const shouldShowTooltip = hoveredIdx === idx || (isActive && showAutoTooltip && !isScrolling);

          return (
            <div
              key={section.id}
              style={{ position: "absolute", top: `${stitchY}px`, left: "50%", transform: "translate(-50%, -50%)" }}
              className="z-20 flex items-center justify-center"
            >
              <button
                onClick={() => scrollToSection(section.id)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="w-7 h-7 cursor-pointer focus:outline-none flex items-center justify-center relative"
                aria-label={`Ir a sección ${section.num} ${section.label}`}
              >
                {/* Ephemeral Tailor Linen Marbete (Tooltip 1.6s) */}
                <AnimatePresence>
                  {shouldShowTooltip && (
                    <motion.div
                      initial={{ opacity: 0, x: 12, scale: 0.94 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 8, scale: 0.94 }}
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      className="absolute right-9 pointer-events-none whitespace-nowrap z-50 flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#FAF7F2] text-[#24120C] shadow-2xl border border-[#C86D51]/50"
                    >
                      {/* Pespunte interior */}
                      <div className="absolute inset-1 rounded-lg border border-dashed border-[#C86D51]/30 pointer-events-none" />

                      <span className="font-mono text-[10px] font-bold text-[#C86D51]">
                        {section.num}
                      </span>
                      <div className="h-2.5 w-[1px] bg-[#D5C7B5]" />
                      <div className="flex flex-col text-left">
                        <span className="font-mono text-[8px] uppercase tracking-wider text-[#8C7A6B] leading-none">
                          {section.category}
                        </span>
                        <span className="font-serif text-xs font-bold text-[#24120C] leading-tight">
                          {section.label}
                        </span>
                      </div>

                      {/* Flecha indicadora */}
                      <div className="w-1.5 h-1.5 bg-[#FAF7F2] border-r border-t border-[#C86D51]/50 rotate-45 absolute -right-1 top-1/2 -translate-y-1/2" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Puntada Ojal */}
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 flex items-center justify-center ${
                    isActive
                      ? "bg-transparent ring-2 ring-[#C86D51] ring-offset-1 ring-offset-[#1A0D08] scale-125"
                      : isPassed
                      ? "bg-[#C86D51] shadow-xs"
                      : "bg-[#DFD3C3]/30 group-hover:bg-[#DFD3C3]/80 group-hover:scale-110"
                  }`}
                >
                  <div
                    className={`w-0.5 h-0.5 rounded-full ${
                      isActive ? "bg-[#C86D51]" : isPassed ? "bg-[#F7F3EE]" : "bg-transparent"
                    }`}
                  />
                </div>
              </button>
            </div>
          );
        })}

        {/* 3. MONEDA DE SASTRE CON GIRO 3D REALISTA & ACOMODACIÓN FÍSICA */}
        <motion.div
          className="absolute pointer-events-none z-30 flex items-center justify-center"
          style={{
            left: "50%",
            top: medallionY,
            transform: "translate(-50%, -50%)",
            perspective: 1000,
          }}
        >
          {/* Contenedor con física de inercia y pop */}
          <motion.div
            style={{
              scale: coinPopScale,
              rotateX: coinTiltX,
            }}
            className="relative flex items-center justify-center"
          >
            {/* Aureola Cálida Suave */}
            <div className="absolute -inset-2 bg-gradient-to-br from-[#C86D51]/50 to-[#DFD3C3]/30 rounded-full blur-md animate-pulse" />

            {/* Medallón de Marfil Claro con Bisel Terracota y Profundidad 3D */}
            <div className="relative w-8 h-8 rounded-full bg-[#FAF7F2] border-2 border-[#C86D51] shadow-[0_4px_16px_rgba(0,0,0,0.4),0_0_0_1px_rgba(200,109,81,0.3)] flex items-center justify-center p-1.5 backdrop-blur-md overflow-hidden">
              
              {/* Animación de Moneda Realista: Giro 3D Completo con rebote de asentamiento */}
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={currentSection.id}
                  initial={{
                    rotateY: scrollDirection === "down" ? 180 : -180,
                    rotateZ: scrollDirection === "down" ? 14 : -14,
                    scale: 0.7,
                    opacity: 0,
                  }}
                  animate={{
                    rotateY: 0,
                    rotateZ: 0,
                    scale: 1,
                    opacity: 1,
                  }}
                  exit={{
                    rotateY: scrollDirection === "down" ? -180 : 180,
                    rotateZ: scrollDirection === "down" ? -14 : 14,
                    scale: 0.7,
                    opacity: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    mass: 0.8,
                  }}
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    backfaceVisibility: "hidden",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {currentSection.renderIcon()}
                </motion.div>
              </AnimatePresence>

              {/* Destello de brillo especular dinámico que cruza la moneda al girar */}
              <motion.div
                key={`sheen-${currentSection.id}`}
                initial={{ x: "-120%", opacity: 0 }}
                animate={{ x: "140%", opacity: [0, 0.7, 0] }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute inset-y-0 w-3 bg-gradient-to-r from-transparent via-white/80 to-transparent transform -skew-x-25 pointer-events-none"
              />

            </div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
