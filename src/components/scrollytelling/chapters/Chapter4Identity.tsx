"use client";

import React from "react";
import { ShieldCheck, MessageSquare, ArrowUpRight, HelpCircle, FileText, MapPin } from "lucide-react";

interface ChapterProps {
  onOpenDiagnostic?: () => void;
  onOpenFaq?: () => void;
}

export function Chapter4Identity({ onOpenDiagnostic, onOpenFaq }: ChapterProps) {
  const whatsappUrl =
    "https://wa.me/573001234567?text=Hola%20NEUMAN,%20quiero%20iniciar%20el%20diagnóstico%20de%20residuos%20textiles%20para%20mi%20marca.";

  return (
    <div className="flex flex-col gap-4 select-none">
      {/* Top Capsule */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#2C4231]/15 text-[#2C4231] text-[11px] font-mono tracking-widest uppercase font-semibold shadow-xs self-start">
        <ShieldCheck className="w-3.5 h-3.5 text-[#2C4231]" />
        <span>04 / 04 • Identidad & Contacto</span>
      </div>

      <div>
        <h2 className="font-cormorant text-lg sm:text-xl font-bold text-[#23110E] leading-tight">
          Inicia la transición circular <span className="italic font-normal text-[#2C4231]">de tu confección</span>.
        </h2>
        <p className="font-lora text-xs text-[#23110E]/80 mt-1 leading-relaxed">
          Garantía contractual 1:1 sin mezclas de insumo virgen, código QR para consumidor final y expedientes auditables listos para tus reportes de sostenibilidad ESG.
        </p>
      </div>

      {/* Main Direct CTAs */}
      <div className="flex flex-col gap-2.5 pt-1">
        {/* WhatsApp Directo B2B */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-5 py-3.5 rounded-2xl bg-[#2C4231] text-[#F5E8C7] font-lora font-semibold text-xs uppercase tracking-wider hover:bg-[#1E2E22] transition-all shadow-md group border border-[#2C4231]"
        >
          <div className="flex items-center gap-2.5">
            <MessageSquare className="w-4 h-4 text-[#F5E8C7]" />
            <span>WhatsApp Directo B2B</span>
          </div>
          <ArrowUpRight className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>

        {/* Modal Buttons Grid */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onOpenDiagnostic}
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/90 hover:bg-white text-[#2C4231] border border-[#2C4231]/20 font-mono text-[11px] font-bold tracking-wider transition-all shadow-xs cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#2C4231]" />
            <span>Auditoría B2B</span>
          </button>

          <button
            onClick={onOpenFaq}
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/90 hover:bg-white text-[#2C4231] border border-[#2C4231]/20 font-mono text-[11px] font-bold tracking-wider transition-all shadow-xs cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#2C4231]" />
            <span>Preguntas FAQ</span>
          </button>
        </div>
      </div>

      {/* Footer Location & Credential */}
      <div className="pt-2 border-t border-[#2C4231]/10 flex items-center justify-between text-[10px] font-mono text-[#23110E]/60">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3 h-3 text-[#2C4231]" />
          <span>Bogotá D.C. • Hub Textil Circular</span>
        </div>
        <span className="font-semibold text-[#2C4231]">NEUMAN © 2026</span>
      </div>
    </div>
  );
}
