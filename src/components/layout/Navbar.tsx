"use client";

import React, { useState, useEffect } from "react";
import { NeumanWordmarkVector } from "@/components/brand/BrandAssets";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export interface NavSection {
  id: string;
  num: string;
  shortTitle: string;
  fullTitle: string;
}

export const NAV_SECTIONS: NavSection[] = [
  { id: "desafio", num: "01", shortTitle: "El Desafío", fullTitle: "01. El Desafío" },
  { id: "metodologia", num: "02", shortTitle: "Metodología", fullTitle: "02. Metodología" },
  { id: "rutas", num: "03", shortTitle: "Rutas", fullTitle: "03. Rutas" },
  { id: "trazabilidad", num: "04", shortTitle: "Trazabilidad", fullTitle: "04. Trazabilidad" },
  { id: "diagnostico", num: "05", shortTitle: "Diagnóstico", fullTitle: "05. Diagnóstico" },
];

interface NavbarProps {
  visible?: boolean;
  activeSectionId?: string;
  onSelectSection?: (id: string) => void;
  onOpenDiagnostic?: () => void;
  onLogoClick?: () => void;
}

export function Navbar({
  visible = true,
  activeSectionId = "desafio",
  onSelectSection,
  onOpenDiagnostic,
  onLogoClick,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-lora ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-4 pointer-events-none"
      } ${
        scrolled
          ? "bg-[#FAF4E6]/95 backdrop-blur-md py-3 shadow-md border-b border-[#2C4231]/15"
          : "bg-[#FAF4E6]/90 backdrop-blur-sm py-4 border-b border-[#2C4231]/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
        {/* Left: Official NEUMAN Wordmark */}
        <button
          onClick={onLogoClick}
          className="flex flex-col group py-0.5 text-left shrink-0 cursor-pointer"
          title="Volver al inicio"
        >
          <NeumanWordmarkVector className="h-5 sm:h-6 w-auto" color="green" />
          <span className="text-[9px] uppercase tracking-[0.25em] font-mono text-[#2C4231]/80 mt-0.5 font-semibold">
            Consultora Textil
          </span>
        </button>

        {/* Center: The 5 Dedicated Section Titles */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {NAV_SECTIONS.map((sec) => {
            const isActive = activeSectionId === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => onSelectSection?.(sec.id)}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#2C4231] text-[#F5E8C7] font-bold shadow-xs"
                    : "text-[#23110E]/75 hover:text-[#2C4231] hover:bg-[#2C4231]/5 font-medium"
                }`}
              >
                <span>{sec.fullTitle}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-[#7B1B1B] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Mini Tabs: Quick Switcher */}
        <div className="flex md:hidden items-center gap-1 overflow-x-auto no-scrollbar py-1">
          {NAV_SECTIONS.map((sec) => {
            const isActive = activeSectionId === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => onSelectSection?.(sec.id)}
                className={`px-2 py-1 rounded text-[10px] font-mono whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[#2C4231] text-[#F5E8C7] font-bold"
                    : "text-[#23110E]/70 hover:bg-[#2C4231]/5"
                }`}
              >
                {sec.num}. {sec.shortTitle}
              </button>
            );
          })}
        </div>

        {/* Right: Primary B2B Action Button */}
        <div className="shrink-0 flex items-center">
          <Button
            variant="forest"
            size="sm"
            onClick={() => {
              if (onSelectSection) {
                onSelectSection("diagnostico");
              } else if (onOpenDiagnostic) {
                onOpenDiagnostic();
              }
            }}
            className="font-lora tracking-wider uppercase text-[11px] bg-[#2C4231] text-[#F5E8C7] hover:bg-[#1E2E22] shadow-sm shadow-[#2C4231]/20 border border-[#2C4231] cursor-pointer"
            icon={<ArrowRight className="w-3.5 h-3.5 text-[#F5E8C7]" />}
          >
            <span className="hidden sm:inline">Solicitar Diagnóstico</span>
            <span className="sm:hidden">Diagnóstico</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
