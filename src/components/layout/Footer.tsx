"use client";

import React from "react";
import { motion } from "framer-motion";
import { NeumanWordmarkVector } from "@/components/brand/BrandAssets";
import { Mail, MessageSquare, ArrowUpRight, ShieldCheck, MapPin, ArrowUp, Users } from "lucide-react";

export function Footer() {
  const whatsappUrl = "https://wa.me/573001234567?text=Hola%20NEUMAN,%20quiero%20información%20sobre%20el%20diagnóstico%20de%20residuos%20textiles%20para%20mi%20marca.";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const teamMembers = [
    { name: "Pablo", role: "CEO & Co-Fundador", focus: "Estrategia Circular & Visión Global" },
    { name: "Jerónimo", role: "CPO (Chief Product Officer)", focus: "Ingeniería de Insumos & Calidad Textil" },
    { name: "Santiago", role: "CFO (Chief Financial Officer)", focus: "Estructuración Financiera & Rentabilidad B2B" },
    { name: "Amalia", role: "CMO (Chief Marketing Officer)", focus: "Posicionamiento de Marca & Relato Sostenible" },
  ];

  return (
    <footer
      id="contacto"
      className="relative bg-[#2C4231] text-[#F5E8C7] pt-20 pb-10 px-6 sm:px-12 lg:px-20 border-t border-[#F5E8C7]/15 overflow-hidden select-none"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#23110E]/50 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-[400px] h-[400px] bg-[#7B1B1B]/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Visible Top Bar */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-[#F5E8C7]/15 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7B1B1B] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#F5E8C7] font-bold">
            Hub de Economía Circular B2B • Bogotá D.C.
          </span>
        </div>
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#23110E]/60 hover:bg-[#7B1B1B] text-[#F5E8C7] text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border border-[#F5E8C7]/20 shadow-md"
        >
          <span>Volver Arriba</span>
          <ArrowUp className="w-3.5 h-3.5 text-[#F5E8C7]" />
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full py-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Brand & Direct Contact */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          <div className="flex items-center gap-3.5">
            <NeumanWordmarkVector className="h-7 sm:h-8 w-auto" color="cream" />
          </div>

          <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5E8C7] leading-tight max-w-lg">
            Inicia la transición circular <span className="italic font-normal underline decoration-[#7B1B1B] decoration-2 underline-offset-8">de tu confección</span>.
          </h2>

          <p className="font-lora text-xs sm:text-sm text-[#F5E8C7]/80 leading-relaxed max-w-md">
            Transformamos los descartes textiles de tu marca en insumos de alta costura, monetización directa de deadstock y trazabilidad certificada en Bogotá y Colombia.
          </p>

          {/* Contact Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#F5E8C7] text-[#2C4231] font-lora font-semibold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-lg shadow-black/20 group border border-[#F5E8C7]"
            >
              <MessageSquare className="w-4 h-4 text-[#2C4231]" />
              <span>WhatsApp Directo B2B</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href="mailto:contacto@neuman.co"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#23110E]/60 border border-[#F5E8C7]/20 hover:bg-[#23110E] transition-all text-[#F5E8C7] text-xs font-mono"
            >
              <Mail className="w-4 h-4 text-[#F5E8C7]" />
              <span>contacto@neuman.co</span>
            </a>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#F5E8C7]/70 pt-2">
            <MapPin className="w-4 h-4 text-[#F5E8C7] shrink-0" />
            <span>Bogotá D.C., Colombia • Consultora B2B de Economía Circular Textil</span>
          </div>
        </div>

        {/* Right Column: Leadership Team & Quick Links */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Executive Leadership Team Panel */}
          <div className="bg-[#23110E]/85 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-[#F5E8C7]/20 shadow-2xl">
            <div className="flex items-center gap-2.5 border-b border-[#F5E8C7]/15 pb-3 mb-4">
              <Users className="w-4 h-4 text-[#F5E8C7]" />
              <h4 className="font-cormorant text-xl font-bold text-[#F5E8C7]">
                Equipo Líder NEUMAN
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {teamMembers.map((member, mIdx) => (
                <div
                  key={mIdx}
                  className="bg-[#2C4231]/35 p-3 rounded-xl border border-[#F5E8C7]/15"
                >
                  <div className="font-cormorant text-base font-bold text-[#F5E8C7]">
                    {member.name}
                  </div>
                  <div className="font-mono text-[10px] text-[#F5E8C7]/90 font-bold uppercase tracking-wider mt-0.5">
                    {member.role}
                  </div>
                  <p className="font-lora text-[11px] text-[#F5E8C7]/70 mt-1 leading-snug">
                    {member.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Nav Links & Badges */}
          <div className="grid grid-cols-3 gap-2 text-xs font-lora text-[#F5E8C7]/80">
            <a href="#problema" className="p-2 rounded-xl bg-[#23110E]/50 hover:bg-[#23110E] hover:text-[#F5E8C7] transition-all text-center border border-[#F5E8C7]/10">
              El Desafío
            </a>
            <a href="#ciclo" className="p-2 rounded-xl bg-[#23110E]/50 hover:bg-[#23110E] hover:text-[#F5E8C7] transition-all text-center border border-[#F5E8C7]/10">
              El Circuito
            </a>
            <a href="#productos" className="p-2 rounded-xl bg-[#23110E]/50 hover:bg-[#23110E] hover:text-[#F5E8C7] transition-all text-center border border-[#F5E8C7]/10">
              Insumos 1:1
            </a>
            <a href="#impacto" className="p-2 rounded-xl bg-[#23110E]/50 hover:bg-[#23110E] hover:text-[#F5E8C7] transition-all text-center border border-[#F5E8C7]/10">
              Calculadora
            </a>
            <a href="#certificado" className="p-2 rounded-xl bg-[#23110E]/50 hover:bg-[#23110E] hover:text-[#F5E8C7] transition-all text-center border border-[#F5E8C7]/10">
              Trazabilidad
            </a>
            <a href="#diagnostico" className="p-2 rounded-xl bg-[#F5E8C7] hover:bg-white text-[#2C4231] transition-all text-center font-bold shadow-xs">
              Diagnóstico
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Legal Bar */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#F5E8C7]/60 font-mono border-t border-[#F5E8C7]/15 pt-6 relative z-10">
        <p>© {new Date().getFullYear()} NEUMAN. Todos los derechos reservados.</p>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-[#F5E8C7]/80">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F5E8C7]" /> Trazabilidad Textil 1:1
          </span>
          <span>•</span>
          <span>Cero Insumo Virgen</span>
        </div>
      </div>
    </footer>
  );
}
