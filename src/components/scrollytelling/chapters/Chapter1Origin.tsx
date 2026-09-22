"use client";

import React from "react";
import { NeumanWordmarkVector } from "@/components/brand/BrandAssets";
import { Sparkles, ArrowDown, ShieldCheck, Scale } from "lucide-react";

interface ChapterProps {
  onNext?: () => void;
  onOpenDiagnostic?: () => void;
}

export function Chapter1Origin({ onNext, onOpenDiagnostic }: ChapterProps) {
  return (
    <div className="flex flex-col gap-6 select-none">
      {/* Top Capsule */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#2C4231]/15 text-[#2C4231] text-[11px] font-mono tracking-widest uppercase font-semibold shadow-xs self-start">
        <span className="w-2 h-2 rounded-full bg-[#7B1B1B] animate-pulse" />
        <span>01 / 04 • Origen & Manifiesto</span>
      </div>

      {/* Main Brand Wordmark */}
      <div className="pt-2">
        <NeumanWordmarkVector className="h-12 sm:h-16 w-auto drop-shadow-xs" color="green" />
        <p className="font-cormorant italic text-lg sm:text-xl text-[#2C4231] font-medium tracking-wide mt-1.5">
          De residuo a relato.
        </p>
      </div>

      {/* Narrative Body */}
      <p className="font-lora text-xs sm:text-sm text-[#23110E]/85 leading-relaxed">
        Somos una <strong className="font-semibold text-[#2C4231]">consultora especializada en valorización textil</strong>. Actuamos como tu analista, investigadora y estratega externa para identificar oportunidades que hoy no estás viendo, tomar mejores decisiones sobre tus residuos y excedentes, y convertirlos en activos de alto valor comercial y reputacional.
      </p>

      {/* Value Badges Grid */}
      <div className="grid grid-cols-2 gap-2.5 pt-2 font-mono text-[11px]">
        <div className="p-3 rounded-2xl bg-white/80 border border-[#2C4231]/15 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-[#2C4231] mb-1" />
          <span className="block font-bold text-[#2C4231]">Inteligencia & Estrategia</span>
          <span className="text-[#23110E]/60 text-[10px]">Diagnóstico analítico y hoja de ruta</span>
        </div>
        <div className="p-3 rounded-2xl bg-white/80 border border-[#2C4231]/15 shadow-xs">
          <Scale className="w-4 h-4 text-[#2C4231] mb-1" />
          <span className="block font-bold text-[#2C4231]">Conversión Flexible</span>
          <span className="text-[#23110E]/60 text-[10px]">Acompañamiento a producto final</span>
        </div>
      </div>

      {/* Bottom Action Prompt */}
      <div className="pt-2 flex items-center justify-between">
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#2C4231] hover:text-[#1E2E22] font-semibold transition-colors cursor-pointer group"
        >
          <span>Desliza para ver la metamorfosis</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
