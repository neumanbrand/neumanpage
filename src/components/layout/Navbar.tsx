"use client";

import React, { useState, useEffect } from "react";
import { NeumanWordmarkVector } from "@/components/brand/BrandAssets";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function Navbar({
  onOpenDiagnostic,
  visible = true,
}: {
  onOpenDiagnostic?: () => void;
  visible?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
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
          ? "apple-glass py-3.5 shadow-xs"
          : "bg-transparent py-5 sm:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
        {/* Left: Official NEUMAN Branding */}
        <a href="#" className="flex flex-col group py-0.5">
          <NeumanWordmarkVector className="h-5 sm:h-6 w-auto" color="green" />
          <span className="text-[9px] uppercase tracking-[0.28em] font-mono text-[#2C4231]/80 mt-0.5 font-semibold">
            De residuo a relato
          </span>
        </a>

        {/* Center: Traditional Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-[12px] font-mono uppercase tracking-wider text-[#2C4231]/75">
          <a href="#problema" className="hover:text-[#2C4231] transition-colors">
            El Desafío
          </a>
          <a href="#ciclo" className="hover:text-[#2C4231] transition-colors">
            Metodología
          </a>
          <a href="#productos" className="hover:text-[#2C4231] transition-colors">
            Oportunidades
          </a>
          <a href="#impacto" className="hover:text-[#2C4231] transition-colors">
            Impacto
          </a>
          <a href="#faq" className="hover:text-[#2C4231] transition-colors">
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-3">
          {onOpenDiagnostic ? (
            <Button
              variant="forest"
              size="sm"
              onClick={onOpenDiagnostic}
              className="font-lora tracking-wider uppercase text-[11px] bg-[#2C4231] text-[#F5E8C7] hover:bg-[#1E2E22] shadow-sm shadow-[#2C4231]/20 border border-[#2C4231] cursor-pointer"
              icon={<ArrowRight className="w-3.5 h-3.5 text-[#F5E8C7]" />}
            >
              Solicitar Diagnóstico
            </Button>
          ) : (
            <a href="#diagnostico">
              <Button
                variant="forest"
                size="sm"
                className="font-lora tracking-wider uppercase text-[11px] bg-[#2C4231] text-[#F5E8C7] hover:bg-[#1E2E22] shadow-sm shadow-[#2C4231]/20 border border-[#2C4231]"
                icon={<ArrowRight className="w-3.5 h-3.5 text-[#F5E8C7]" />}
              >
                Solicitar Diagnóstico
              </Button>
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
