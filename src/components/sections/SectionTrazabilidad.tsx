"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionFooterNav } from "@/components/ui/SectionFooterNav";
import { ShieldCheck, QrCode, Lock, ChevronDown, Check, Users } from "lucide-react";

interface SectionTrazabilidadProps {
  onSelectSection: (id: string) => void;
  onOpenDiagnostic: () => void;
}

export function SectionTrazabilidad({
  onSelectSection,
  onOpenDiagnostic,
}: SectionTrazabilidadProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const pillars = [
    {
      title: "Custodia Estricta 1:1",
      desc: "Cada lote recolectado en tu planta se procesa de forma aislada. Garantizamos contractualmente que los insumos devueltos provienen al 100% de tus propios descartes de confección.",
      tag: "Cero Mezcla",
    },
    {
      title: "Pasaporte Digital con Código QR",
      desc: "Tus prendas incorporan un código QR dinámico para que el comprador final verifique el origen del material, la reducción de huella hídrica y la historia circular de la pieza.",
      tag: "Verificación Pública",
    },
    {
      title: "Expediente Técnico para Reportes ESG",
      desc: "Entregamos métricas de impacto certificadas y auditables (litros de agua evitados, kg de CO₂ mitigados, kg desviados de vertedero) listas para memorias de sostenibilidad.",
      tag: "Rigor Corporativo",
    },
  ];

  const team = [
    { name: "Pablo", role: "CEO & Co-Fundador", focus: "Estrategia Circular & Alianzas Institucionales" },
    { name: "Jerónimo", role: "CPO (Chief Product Officer)", focus: "Ingeniería de Insumos & Calidad Textil" },
    { name: "Santiago", role: "CFO (Chief Financial Officer)", focus: "Estructuración Financiera & Rentabilidad B2B" },
    { name: "Amalia", role: "CMO (Chief Marketing Officer)", focus: "Posicionamiento de Marca & Relato Sostenible" },
  ];

  const faqs = [
    {
      q: "¿NEUMAN fabrica productos físicos o solo entrega consultoría estratégica?",
      a: "Somos una consultora especializada en inteligencia y estrategia de valorización textil. Nuestro núcleo es diagnosticar y trazar la hoja de ruta. Sin embargo, según las necesidades y el caso de tu marca, articulamos y coordinamos la conversión física de residuos en insumos técnicos (marquillas, hangtags, sesgos) o colecciones cápsula.",
    },
    {
      q: "¿Qué recibe mi empresa al culminar el proceso de consultoría?",
      a: "Entregamos 4 productos técnicos de alto impacto: 1) Mapa de Residuos Textiles (cuantificación y flujos), 2) Mapa de Oportunidades (rutas circulares), 3) Evaluación de Viabilidad Técnica y Financiera, y 4) Estrategia y Hoja de Ruta de Implementación.",
    },
    {
      q: "¿Con qué tipos de materiales, fibras o excedentes textiles trabajan?",
      a: "Analizamos retazos de mesa de corte, rollos obsoletos (deadstock), prendas con tara y saldos textiles en algodón, denim, lino, mezclas sintéticas y fibras técnicas, tanto en talleres de autor como en plantas industriales.",
    },
    {
      q: "¿Cómo garantizan la trazabilidad, confidencialidad y custodia del material?",
      a: "Trabajamos bajo acuerdos de confidencialidad industrial (NDA) y un protocolo de custodia técnica 1:1, asegurando que cada kilogramo diagnosticado y gestionado mantenga trazabilidad verificable.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full text-[#23110E]">
      {/* Swiss Editorial Header */}
      <div className="border-b border-[#2C4231]/15 pb-8 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#2C4231] text-[#F5E8C7] font-mono text-[11px] font-bold tracking-widest">
              04
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#2C4231] font-semibold">
              Trazabilidad & Confianza
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#23110E]/60 tracking-wider">
            Custodia 1:1 · Transparencia ESG · Equipo Líder
          </span>
        </div>

        <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#23110E] mt-6 max-w-3xl leading-[1.15]">
          Trazabilidad auditable. Cero afirmaciones ambiguas ni greenwashing.
        </h2>

        <p className="font-lora text-sm sm:text-base text-[#23110E]/80 mt-4 max-w-2xl leading-relaxed">
          En un mercado saturado de etiquetas genéricas, NEUMAN respalda cada proyecto con evidencia técnica, pasaporte digital y custodia estricta de principio a fin.
        </p>
      </div>

      {/* Trust & Custody Pillars + Certificate Visual */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Left Column: 3 Pillars */}
        <div className="lg:col-span-7 space-y-4">
          {pillars.map((pil, pIdx) => (
            <div
              key={pIdx}
              className="bg-white/90 p-6 rounded-2xl border border-[#2C4231]/15 shadow-sm hover:border-[#2C4231]/35 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#2C4231] font-bold bg-[#2C4231]/5 px-2.5 py-0.5 rounded">
                  {pil.tag}
                </span>
                <Check className="w-4 h-4 text-[#2C4231]" />
              </div>
              <h4 className="font-cormorant text-xl font-bold text-[#23110E]">
                {pil.title}
              </h4>
              <p className="font-lora text-xs sm:text-sm text-[#23110E]/80 mt-2 leading-relaxed">
                {pil.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Right Column: Swiss Certificate Card */}
        <div className="lg:col-span-5 bg-[#2C4231] text-[#F5E8C7] rounded-3xl p-7 border border-[#2C4231] shadow-2xl relative">
          <div className="flex items-center justify-between border-b border-[#F5E8C7]/20 pb-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F5E8C7] flex items-center justify-center text-[#2C4231]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#F5E8C7]/70 font-bold block">
                  Estándar Oficial
                </span>
                <h4 className="font-cormorant text-base font-bold text-[#F5E8C7]">
                  Certificado de Custodia 1:1
                </h4>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#7B1B1B] flex items-center justify-center text-[#F5E8C7]">
              <Lock className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="space-y-2.5 text-xs font-mono bg-white/10 p-4 rounded-xl border border-[#F5E8C7]/15 mb-5">
            <div className="flex justify-between border-b border-[#F5E8C7]/10 pb-1.5">
              <span className="text-[#F5E8C7]/70">Lote Auditable:</span>
              <span className="font-bold text-[#F5E8C7]">NM-BOG-2026-084</span>
            </div>
            <div className="flex justify-between border-b border-[#F5E8C7]/10 pb-1.5">
              <span className="text-[#F5E8C7]/70">Origen:</span>
              <span className="font-bold text-[#F5E8C7]">Mesa de Corte Confección</span>
            </div>
            <div className="flex justify-between border-b border-[#F5E8C7]/10 pb-1.5">
              <span className="text-[#F5E8C7]/70">Materia Prima:</span>
              <span className="font-bold text-[#F5E8C7]">Algodón & Denim 100%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#F5E8C7]/70">Entregables:</span>
              <span className="font-bold text-[#F5E8C7]">Hoja de Ruta + Insumos Circulares</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-white/15 p-3.5 rounded-xl border border-[#F5E8C7]/20">
            <div className="w-12 h-12 bg-[#F5E8C7] rounded-lg p-1 flex items-center justify-center shrink-0">
              <QrCode className="w-full h-full text-[#2C4231]" />
            </div>
            <div className="text-[11px] font-mono text-[#F5E8C7]/90 leading-tight">
              <span className="font-bold text-[#F5E8C7] block uppercase text-xs mb-0.5">
                Pasaporte Digital Público
              </span>
              <span>Escaneable en prenda por el consumidor final</span>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Team Panel (Authentic Human Craft) */}
      <div className="bg-[#FAF4E6] rounded-2xl p-6 sm:p-8 border border-[#2C4231]/15 mb-16">
        <div className="flex items-center justify-between border-b border-[#2C4231]/15 pb-3 mb-6">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#2C4231]" />
            <h3 className="font-cormorant text-2xl font-bold text-[#23110E]">
              Equipo Líder de Consultoría
            </h3>
          </div>
          <span className="font-mono text-[10px] text-[#2C4231] uppercase tracking-wider font-semibold">
            Bogotá D.C., Colombia
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {team.map((m, mIdx) => (
            <div
              key={mIdx}
              className="bg-white/80 p-5 rounded-xl border border-[#2C4231]/10 flex flex-col justify-between"
            >
              <div>
                <span className="font-cormorant text-lg font-bold text-[#23110E] block">
                  {m.name}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#2C4231] font-bold mt-0.5 block">
                  {m.role}
                </span>
                <p className="font-lora text-xs text-[#23110E]/70 mt-2 leading-relaxed">
                  {m.focus}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Executive FAQ Section (Accordion) */}
      <div className="mb-14">
        <div className="border-b border-[#2C4231]/15 pb-3 mb-6">
          <span className="font-mono text-[10px] text-[#7B1B1B] uppercase tracking-wider font-bold block mb-0.5">
            Claridad Comercial
          </span>
          <h3 className="font-cormorant text-2xl font-bold text-[#23110E]">
            Preguntas Frecuentes de Directores y Gerentes
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, fIdx) => {
            const isOpen = openFaq === fIdx;
            return (
              <div
                key={fIdx}
                className="bg-white/90 rounded-2xl border border-[#2C4231]/15 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-cormorant text-lg sm:text-xl font-bold text-[#23110E]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#2C4231] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-5 sm:px-6 pb-6 pt-1 border-t border-[#2C4231]/10 bg-[#FAF4E6]/50"
                    >
                      <p className="font-lora text-xs sm:text-sm text-[#23110E]/80 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Continuity Navigation */}
      <SectionFooterNav
        currentId="trazabilidad"
        onSelectSection={onSelectSection}
        onOpenDiagnostic={onOpenDiagnostic}
      />
    </section>
  );
}
