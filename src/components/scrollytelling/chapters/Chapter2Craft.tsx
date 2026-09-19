"use client";

import React from "react";
import { Scissors, RefreshCw, BarChart3, ArrowDown } from "lucide-react";

interface ChapterProps {
  onNext?: () => void;
}

export function Chapter2Craft({ onNext }: ChapterProps) {
  const steps = [
    {
      num: "01",
      title: "Auditoría en Mesa de Corte",
      desc: "Caracterizamos el gramaje, mezcla y orillos directamente en tus instalaciones de corte.",
    },
    {
      num: "02",
      title: "Co-Diseño o Monetización B2B",
      desc: "Estructuramos una nueva línea de producto según el nicho de tu marca o comercializamos los excedentes.",
    },
    {
      num: "03",
      title: "Transformación & Pasaporte Digital",
      desc: "Desfibrado mecánico sin químicos y re-tejido en insumos con trazabilidad 1:1 verificable.",
    },
  ];

  return (
    <div className="flex flex-col gap-5 select-none">
      {/* Top Capsule */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#2C4231]/15 text-[#2C4231] text-[11px] font-mono tracking-widest uppercase font-semibold shadow-xs self-start">
        <Scissors className="w-3.5 h-3.5 text-[#2C4231]" />
        <span>02 / 04 • La Metamorfosis</span>
      </div>

      <div>
        <h2 className="font-cormorant text-lg sm:text-xl font-bold text-[#23110E] leading-tight">
          El costo oculto de cortar tela <span className="italic font-normal text-[#2C4231]">convertido en activo</span>.
        </h2>
        <p className="font-lora text-xs sm:text-sm text-[#23110E]/80 mt-1.5 leading-relaxed">
          Entre el 15% y el 25% de la materia prima noble termina en sacos desechados. En NEUMAN reemplazamos la fuga de capital por un protocolo de ingeniería circular:
        </p>
      </div>

      {/* 3 Step Pipeline Cards */}
      <div className="flex flex-col gap-2.5 pt-1">
        {steps.map((step) => (
          <div
            key={step.num}
            className="p-3 rounded-2xl bg-white/85 border border-[#2C4231]/15 shadow-xs flex items-start gap-3"
          >
            <span className="px-2 py-0.5 rounded-md bg-[#2C4231] text-[#F5E8C7] font-mono text-[10px] font-bold mt-0.5 shrink-0">
              {step.num}
            </span>
            <div>
              <h3 className="font-cormorant text-sm font-bold text-[#23110E] leading-snug">
                {step.title}
              </h3>
              <p className="font-lora text-[11px] text-[#23110E]/75 leading-relaxed mt-0.5">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Action Prompt */}
      <div className="pt-2 flex items-center justify-between">
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#2C4231] hover:text-[#1E2E22] font-semibold transition-colors cursor-pointer group"
        >
          <span>Avanzar a productos e impacto</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
