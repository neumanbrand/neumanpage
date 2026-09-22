"use client";

import React from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

export interface SectionMeta {
  id: string;
  num: string;
  title: string;
}

export const SECTIONS_META: SectionMeta[] = [
  { id: "desafio", num: "01", title: "El Desafío" },
  { id: "metodologia", num: "02", title: "Metodología & Entregables" },
  { id: "rutas", num: "03", title: "Rutas de Valorización" },
  { id: "trazabilidad", num: "04", title: "Trazabilidad & Confianza" },
  { id: "diagnostico", num: "05", title: "Diagnóstico & Impacto" },
];

interface SectionFooterNavProps {
  currentId: string;
  onSelectSection: (id: string) => void;
  onOpenDiagnostic?: () => void;
}

export function SectionFooterNav({
  currentId,
  onSelectSection,
  onOpenDiagnostic,
}: SectionFooterNavProps) {
  const currentIndex = SECTIONS_META.findIndex((s) => s.id === currentId);
  const prevSection = currentIndex > 0 ? SECTIONS_META[currentIndex - 1] : null;
  const nextSection =
    currentIndex < SECTIONS_META.length - 1
      ? SECTIONS_META[currentIndex + 1]
      : null;

  return (
    <div className="w-full mt-16 pt-8 border-t border-[#2C4231]/15">
      {/* Editorial Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left: Previous Section */}
        <div className="w-full sm:w-auto flex justify-start">
          {prevSection ? (
            <button
              onClick={() => onSelectSection(prevSection.id)}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#23110E]/70 hover:text-[#2C4231] transition-colors py-2 group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#2C4231] group-hover:-translate-x-1 transition-transform" />
              <span>
                {prevSection.num}. {prevSection.title}
              </span>
            </button>
          ) : (
            <div className="text-xs font-mono uppercase tracking-wider text-[#23110E]/40">
              Inicio del recorrido
            </div>
          )}
        </div>

        {/* Center: Progress Index Dots */}
        <div className="flex items-center gap-2">
          {SECTIONS_META.map((sec, idx) => {
            const isActive = sec.id === currentId;
            return (
              <button
                key={sec.id}
                onClick={() => onSelectSection(sec.id)}
                title={sec.title}
                className="group flex items-center gap-1.5 px-2 py-1 rounded-md transition-all cursor-pointer"
              >
                <span
                  className={`block transition-all duration-300 ${
                    isActive
                      ? "w-6 h-2 bg-[#2C4231] rounded-full"
                      : "w-2 h-2 bg-[#2C4231]/25 hover:bg-[#2C4231]/60 rounded-full"
                  }`}
                />
                <span
                  className={`text-[10px] font-mono font-bold ${
                    isActive ? "text-[#2C4231]" : "text-[#23110E]/40"
                  }`}
                >
                  {sec.num}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Next Section or CTA */}
        <div className="w-full sm:w-auto flex justify-end">
          {nextSection ? (
            <button
              onClick={() => onSelectSection(nextSection.id)}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#2C4231] text-[#F5E8C7] hover:bg-[#1E2E22] text-xs font-lora font-semibold uppercase tracking-wider transition-all shadow-md group cursor-pointer"
            >
              <span>Continuar a: {nextSection.title}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <button
              onClick={onOpenDiagnostic}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#7B1B1B] text-[#F5E8C7] hover:bg-[#5C1414] text-xs font-lora font-semibold uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-[#F5E8C7]" />
              <span>Solicitar Diagnóstico Técnico</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
