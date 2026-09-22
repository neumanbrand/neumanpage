"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionFooterNav } from "@/components/ui/SectionFooterNav";
import { ShieldCheck, QrCode, Lock, ChevronDown } from "lucide-react";

interface SectionTrazabilidadProps {
  onSelectSection: (id: string) => void;
  onOpenDiagnostic: () => void;
}

const pillars = [
  {
    num: "I",
    title: "Custodia Estricta 1:1",
    tag: "Cero Mezcla",
    desc: "Cada lote recolectado en tu planta se procesa de forma aislada. Garantizamos contractualmente que los insumos devueltos provienen al 100% de tus propios descartes de confección.",
  },
  {
    num: "II",
    title: "Pasaporte Digital con Código QR",
    tag: "Verificación Pública",
    desc: "Tus prendas incorporan un código QR dinámico para que el comprador final verifique el origen del material, la reducción de huella hídrica y la historia circular de la pieza.",
  },
  {
    num: "III",
    title: "Expediente Técnico para Reportes ESG",
    tag: "Rigor Corporativo",
    desc: "Entregamos métricas de impacto certificadas y auditables — litros de agua evitados, kg de CO₂ mitigados, kg desviados de vertedero — listas para memorias de sostenibilidad.",
  },
];

const team = [
  { name: "Pablo",    role: "CEO & Co-Fundador",            focus: "Estrategia Circular & Alianzas Institucionales" },
  { name: "Jerónimo", role: "CPO · Ingeniería de Producto", focus: "Ingeniería de Insumos & Calidad Textil" },
  { name: "Santiago", role: "CFO · Estructuración",         focus: "Estructuración Financiera & Rentabilidad B2B" },
  { name: "Amalia",   role: "CMO · Marca & Relato",         focus: "Posicionamiento de Marca & Relato Sostenible" },
];

const faqs = [
  {
    q: "¿NEUMAN fabrica productos físicos o solo entrega consultoría estratégica?",
    a: "Somos una consultora especializada en inteligencia y estrategia de valorización textil. Nuestro núcleo es diagnosticar y trazar la hoja de ruta. Sin embargo, según las necesidades del caso, articulamos y coordinamos la conversión física de residuos en insumos técnicos (marquillas, hangtags, sesgos) o colecciones cápsula.",
  },
  {
    q: "¿Qué recibe mi empresa al culminar el proceso de consultoría?",
    a: "Entregamos 4 productos técnicos de alto impacto: Mapa de Residuos Textiles (cuantificación y flujos), Mapa de Oportunidades (rutas circulares), Evaluación de Viabilidad Técnica y Financiera, y Estrategia y Hoja de Ruta de Implementación.",
  },
  {
    q: "¿Con qué tipos de materiales o excedentes textiles trabajan?",
    a: "Analizamos retazos de mesa de corte, rollos obsoletos (deadstock), prendas con tara y saldos textiles en algodón, denim, lino, mezclas sintéticas y fibras técnicas, tanto en talleres de autor como en plantas industriales.",
  },
  {
    q: "¿Cómo garantizan la trazabilidad, confidencialidad y custodia del material?",
    a: "Trabajamos bajo acuerdos de confidencialidad industrial (NDA) y un protocolo de custodia técnica 1:1, asegurando que cada kilogramo diagnosticado y gestionado mantenga trazabilidad verificable.",
  },
];

export function SectionTrazabilidad({ onSelectSection, onOpenDiagnostic }: SectionTrazabilidadProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full text-[#23110E]">

      {/* ── Section Header ─────────────────────────────── */}
      <header className="border-b border-[#2C4231]/15 pb-10 mb-16">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#2C4231]/60">04 /</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#2C4231] font-semibold">
              Trazabilidad & Confianza
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#23110E]/40 tracking-widest hidden sm:block">
            Custodia 1:1 · Transparencia ESG · Equipo
          </span>
        </div>

        <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold text-[#23110E] max-w-3xl leading-[1.08] tracking-tight">
          Trazabilidad auditable.<br className="hidden sm:block" /> Cero greenwashing.
        </h2>

        <p className="font-lora text-base text-[#23110E]/65 mt-6 max-w-xl leading-[1.75]">
          En un mercado saturado de etiquetas genéricas, NEUMAN respalda cada proyecto
          con evidencia técnica, pasaporte digital y custodia estricta de principio a fin.
        </p>
      </header>

      {/* ── Trust Pillars + Certificate ───────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20">

        {/* Left: 3 Pillars */}
        <div className="lg:col-span-7 divide-y divide-[#2C4231]/10 border-y border-[#2C4231]/10">
          {pillars.map((pil, pIdx) => (
            <div key={pIdx} className="flex items-start gap-6 py-7">
              <span className="font-cormorant text-3xl font-bold text-[#2C4231]/20 leading-none select-none shrink-0 w-6 text-right">
                {pil.num}
              </span>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-cormorant text-xl sm:text-2xl font-bold text-[#23110E]">
                    {pil.title}
                  </h4>
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#2C4231] font-semibold border border-[#2C4231]/25 px-2 py-0.5">
                    {pil.tag}
                  </span>
                </div>
                <p className="font-lora text-sm text-[#23110E]/65 leading-[1.75]">
                  {pil.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Certificate Card */}
        <div className="lg:col-span-5">
          <div className="bg-[#2C4231] text-[#F5E8C7] rounded-2xl p-7 sm:p-8 flex flex-col gap-6 h-full">
            {/* Header */}
            <div className="flex items-center justify-between pb-5 border-b border-[#F5E8C7]/15">
              <div>
                <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#F5E8C7]/50 mb-1">
                  Estándar Oficial NEUMAN
                </div>
                <h4 className="font-cormorant text-xl font-bold text-[#F5E8C7]">
                  Certificado de Custodia 1:1
                </h4>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#7B1B1B]/60 flex items-center justify-center shrink-0">
                <Lock className="w-3.5 h-3.5 text-[#F5E8C7]" />
              </div>
            </div>

            {/* Data rows */}
            <div className="space-y-3 font-mono text-[11px]">
              {[
                ["Lote Auditable", "NM-BOG-2026-084"],
                ["Origen", "Mesa de Corte Confección"],
                ["Materia Prima", "Algodón & Denim 100%"],
                ["Entregables", "Hoja de Ruta + Insumos Circulares"],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between items-baseline gap-4 border-b border-[#F5E8C7]/8 pb-2">
                  <span className="text-[#F5E8C7]/50">{label}</span>
                  <span className="font-bold text-[#F5E8C7] text-right">{val}</span>
                </div>
              ))}
            </div>

            {/* QR */}
            <div className="flex items-center gap-4 bg-[#F5E8C7]/8 p-4 rounded-xl border border-[#F5E8C7]/15 mt-auto">
              <div className="w-11 h-11 bg-[#F5E8C7] rounded-lg p-1.5 flex items-center justify-center shrink-0">
                <QrCode className="w-full h-full text-[#2C4231]" />
              </div>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#F5E8C7] font-bold block mb-0.5">
                  Pasaporte Digital Público
                </span>
                <span className="font-lora text-xs text-[#F5E8C7]/70">
                  Escaneable en prenda por el consumidor final
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Leadership Team ────────────────────────────── */}
      <div className="mb-20">
        <div className="flex items-baseline justify-between mb-8 pb-3 border-b border-[#2C4231]/10">
          <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#23110E]">
            Equipo de Consultoría
          </h3>
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#2C4231]/50 hidden sm:block">
            Bogotá D.C., Colombia
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#2C4231]/8">
          {team.map((m, mIdx) => (
            <div key={mIdx} className="bg-[#FAF4E6] p-7 flex flex-col gap-3 hover:bg-[#F5E8C7] transition-colors duration-300">
              <span className="font-cormorant text-3xl font-bold text-[#23110E] leading-none">
                {m.name}
              </span>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#2C4231] font-semibold block leading-snug">
                  {m.role}
                </span>
              </div>
              <p className="font-lora text-sm text-[#23110E]/60 leading-relaxed mt-auto">
                {m.focus}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── FAQ Accordion ──────────────────────────────── */}
      <div className="mb-20">
        <div className="flex items-baseline justify-between mb-8 pb-3 border-b border-[#2C4231]/10">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#7B1B1B] font-semibold block mb-1">
              Claridad Comercial
            </span>
            <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#23110E]">
              Preguntas de Directores y Gerentes
            </h3>
          </div>
        </div>

        <div className="divide-y divide-[#2C4231]/10 border-t border-[#2C4231]/10">
          {faqs.map((faq, fIdx) => {
            const isOpen = openFaq === fIdx;
            return (
              <div key={fIdx}>
                <button
                  onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                  className="w-full flex items-start justify-between gap-6 py-6 text-left cursor-pointer group"
                >
                  <span className="font-cormorant text-xl sm:text-2xl font-bold text-[#23110E] leading-tight group-hover:text-[#2C4231] transition-colors duration-200">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#2C4231] shrink-0 mt-1.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="font-lora text-base text-[#23110E]/65 leading-[1.75] pb-7 max-w-3xl">
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

      <SectionFooterNav
        currentId="trazabilidad"
        onSelectSection={onSelectSection}
        onOpenDiagnostic={onOpenDiagnostic}
      />
    </section>
  );
}
