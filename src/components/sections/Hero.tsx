"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, ShieldCheck, Sparkles, Scissors, BarChart3 } from "lucide-react";
import { NeumanWordmarkVector } from "@/components/brand/BrandAssets";
import { InteractiveClothCanvas } from "@/components/canvas/InteractiveClothCanvas";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const scrollToNext = () => {
    const el = document.getElementById("problema");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#F5E8C7] text-[#23110E] pt-28 pb-12 select-none"
    >
      {/* Three.js Translucent Luxury Cloth Wave Canvas */}
      <InteractiveClothCanvas />

      {/* Atmospheric Soft Light Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#F5E8C7]/20 to-[#FAF5E8]/40 pointer-events-none z-0" />

      {/* Top Status Capsule */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#2C4231]/15 text-[#2C4231] text-xs font-mono tracking-[0.25em] uppercase font-semibold shadow-sm"
        >
          {/* Specific red tailor detail */}
          <span className="w-2 h-2 rounded-full bg-[#7B1B1B] shadow-sm shadow-[#7B1B1B] animate-pulse" />
          <span>New world needs neuman</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex items-center gap-2 text-xs font-mono tracking-[0.22em] uppercase text-[#2C4231]/75 font-medium"
        >
          <span>Consultora B2B de Economía Circular</span>
          <span>•</span>
          <span>Bogotá D.C.</span>
        </motion.div>
      </div>

      {/* Central Brand & Value Proposition */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-12 flex-grow flex flex-col justify-center items-center text-center my-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 flex flex-col items-center"
        >
          {/* Official Pure SVG Wordmark in Verde Bosque */}
          <div className="w-full flex justify-center items-center py-2 select-none">
            <NeumanWordmarkVector
              className="h-20 sm:h-28 md:h-36 lg:h-44 max-w-[90vw] w-auto drop-shadow-sm"
              color="green"
            />
          </div>

          {/* Slogan & Tagline */}
          <div className="space-y-3 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#2C4231]/40" />
              <p className="font-cormorant italic text-2xl sm:text-4xl text-[#2C4231] font-semibold tracking-wide">
                De residuo a relato.
              </p>
              <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#2C4231]/40" />
            </div>

            <p className="font-lora text-sm sm:text-base md:text-lg text-[#23110E]/85 font-normal max-w-2xl leading-relaxed mx-auto">
              Grupo consultor B2B enfocado en analizar los residuos textiles de producción de tu marca para rentabilizarlos: creamos{" "}
              <strong className="text-[#2C4231] font-semibold underline decoration-[#7B1B1B] decoration-2 underline-offset-4">
                insumos 1:1 y líneas de producto
              </strong>
              , monetizamos excedentes de materia prima y estructuramos tu comunicación de sostenibilidad.
            </p>
          </div>

          {/* Dual CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a href="#diagnostico">
              <Button
                variant="forest"
                size="lg"
                className="font-lora text-sm uppercase tracking-wider bg-[#2C4231] text-[#F5E8C7] hover:bg-[#1E2E22] shadow-xl shadow-[#2C4231]/20 border border-[#2C4231]"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Solicitar Diagnóstico B2B
              </Button>
            </a>
            <a href="#impacto">
              <Button
                variant="outline"
                size="lg"
                className="font-lora text-sm uppercase tracking-wider border-[#2C4231]/40 text-[#2C4231] hover:bg-[#2C4231]/10 bg-white/40 backdrop-blur-sm"
              >
                Calcular Rendimiento
              </Button>
            </a>
          </div>

          {/* 4 Value Pillars Pills */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 max-w-4xl mx-auto w-full text-left">
            <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-[#2C4231]/15 flex items-start gap-2.5 shadow-sm hover:border-[#2C4231]/35 transition-all">
              <ShieldCheck className="w-4 h-4 text-[#2C4231] shrink-0 mt-0.5" />
              <div>
                <span className="block font-cormorant text-base font-bold text-[#2C4231] leading-none">
                  Trazabilidad 1:1
                </span>
                <span className="text-[11px] font-lora text-[#23110E]/75">
                  Tus propios retazos vuelven a tu prenda
                </span>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-[#2C4231]/15 flex items-start gap-2.5 shadow-sm hover:border-[#2C4231]/35 transition-all">
              <Scissors className="w-4 h-4 text-[#2C4231] shrink-0 mt-0.5" />
              <div>
                <span className="block font-cormorant text-base font-bold text-[#2C4231] leading-none">
                  Cero Insumo Virgen
                </span>
                <span className="text-[11px] font-lora text-[#23110E]/75">
                  Marquillas satín, hangtags y sesgos
                </span>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-[#2C4231]/15 flex items-start gap-2.5 shadow-sm hover:border-[#2C4231]/35 transition-all">
              <Sparkles className="w-4 h-4 text-[#2C4231] shrink-0 mt-0.5" />
              <div>
                <span className="block font-cormorant text-base font-bold text-[#2C4231] leading-none">
                  Monetización
                </span>
                <span className="text-[11px] font-lora text-[#23110E]/75">
                  Brokerage y venta de deadstock noble
                </span>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-[#2C4231]/15 flex items-start gap-2.5 shadow-sm hover:border-[#2C4231]/35 transition-all">
              <BarChart3 className="w-4 h-4 text-[#2C4231] shrink-0 mt-0.5" />
              <div>
                <span className="block font-cormorant text-base font-bold text-[#2C4231] leading-none">
                  Reportes ESG
                </span>
                <span className="text-[11px] font-lora text-[#23110E]/75">
                  Métricas certificadas de agua y CO₂
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col items-center justify-center">
        <button
          onClick={scrollToNext}
          className="flex flex-col items-center gap-2 group cursor-pointer focus:outline-none"
        >
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#2C4231]/75 group-hover:text-[#2C4231] transition-colors font-semibold">
            Descubrir el Manifiesto
          </span>
          <div className="w-8 h-8 rounded-full border border-[#2C4231]/30 group-hover:border-[#2C4231] flex items-center justify-center bg-white/70 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-1 shadow-xs">
            <ArrowDown className="w-3.5 h-3.5 text-[#2C4231]" />
          </div>
        </button>
      </div>
    </section>
  );
}
