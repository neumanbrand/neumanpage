"use client";

import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface SectionMeta {
  id: string;
  num: string;
  title: string;
}

export const SECTIONS_META: SectionMeta[] = [
  { id: "desafio",      num: "01", title: "El Desafío" },
  { id: "metodologia",  num: "02", title: "Metodología & Entregables" },
  { id: "rutas",        num: "03", title: "Rutas de Valorización" },
  { id: "trazabilidad", num: "04", title: "Trazabilidad & Confianza" },
  { id: "diagnostico",  num: "05", title: "Diagnóstico & Impacto" },
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
  const prevSection  = currentIndex > 0 ? SECTIONS_META[currentIndex - 1] : null;
  const nextSection  = currentIndex < SECTIONS_META.length - 1
    ? SECTIONS_META[currentIndex + 1]
    : null;

  return (
    <footer className="w-full mt-24 pt-10 border-t border-[#2C4231]/15">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">

        {/* Left: Previous */}
        <div className="flex-1 flex justify-start">
          {prevSection ? (
            <button
              onClick={() => onSelectSection(prevSection.id)}
              className="group inline-flex items-center gap-3 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#2C4231] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1" />
              <span className="flex flex-col items-start">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#23110E]/40">
                  Anterior
                </span>
                <span className="font-lora text-sm text-[#23110E]/70 group-hover:text-[#2C4231] transition-colors duration-200 leading-tight">
                  {prevSection.title}
                </span>
              </span>
            </button>
          ) : (
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#23110E]/30">
              Inicio del recorrido
            </span>
          )}
        </div>

        {/* Center: Step Numerals */}
        <div className="flex items-center gap-1.5">
          {SECTIONS_META.map((sec) => {
            const isActive = sec.id === currentId;
            return (
              <button
                key={sec.id}
                onClick={() => onSelectSection(sec.id)}
                title={sec.title}
                className="relative flex flex-col items-center gap-0.5 px-2 py-1 cursor-pointer group"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-5 h-0.5 bg-[#2C4231]"
                      : "w-2 h-0.5 bg-[#2C4231]/20 group-hover:bg-[#2C4231]/50"
                  }`}
                />
                <span
                  className={`font-mono text-[9px] font-bold transition-colors duration-200 ${
                    isActive ? "text-[#2C4231]" : "text-[#23110E]/30 group-hover:text-[#2C4231]/60"
                  }`}
                >
                  {sec.num}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Next / CTA */}
        <div className="flex-1 flex justify-end">
          {nextSection ? (
            <button
              onClick={() => onSelectSection(nextSection.id)}
              className="group inline-flex items-center gap-3 cursor-pointer"
            >
              <span className="flex flex-col items-end">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#23110E]/40">
                  Siguiente
                </span>
                <span className="font-lora text-sm text-[#23110E]/70 group-hover:text-[#2C4231] transition-colors duration-200 leading-tight">
                  {nextSection.title}
                </span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-[#2C4231] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
            </button>
          ) : (
            <button
              onClick={onOpenDiagnostic}
              className="group inline-flex items-center gap-2.5 cursor-pointer"
            >
              <span className="font-lora text-sm font-semibold text-[#7B1B1B] relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#7B1B1B] group-hover:after:w-full after:transition-[width] after:duration-300">
                Solicitar Diagnóstico Técnico
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-[#7B1B1B] transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          )}
        </div>

      </div>
    </footer>
  );
}
