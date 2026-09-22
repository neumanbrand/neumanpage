"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionFooterNav } from "@/components/ui/SectionFooterNav";

interface SectionDesafioProps {
  onSelectSection: (id: string) => void;
  onOpenDiagnostic: () => void;
}

const painPoints = [
  {
    code: "REF-DES-01",
    title: "Valor Perdido",
    metric: "15% – 25%",
    metricLabel: "Pérdida promedio en mesa de corte",
    desc: "Materia prima premium adquirida a precio completo que termina descartada, regalada o rematada a centavos por kilogramo sin retorno para la marca.",
  },
  {
    code: "REF-DES-02",
    title: "Ceguera Técnica",
    metric: "Composiciones & Mezclas",
    metricLabel: "Desconocimiento estructural",
    desc: "Volúmenes reales por temporada, tipos exactos de mezcla de fibra y costo oculto de bodegaje prolongado sin mapeo ni registro formal.",
  },
  {
    code: "REF-DES-03",
    title: "Oportunidades Invisibles",
    metric: "Potencial Oculto",
    metricLabel: "Rutas circulares no exploradas",
    desc: "Insumos, hilaturas recicladas y opciones de upcycling no identificadas por falta de investigación técnica o desconexión con la cadena de valorización.",
  },
  {
    code: "REF-DES-04",
    title: "Sobrecarga Operativa",
    metric: "Equipos Saturados",
    metricLabel: "Sin capacidad para proyectos ESG",
    desc: "Diseño, patronaje y producción absorbidos por el día a día de las colecciones, sin tiempo ni recursos para estructurar proyectos sostenibles.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 },
  }),
};

export function SectionDesafio({ onSelectSection, onOpenDiagnostic }: SectionDesafioProps) {
  return (
    <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full text-[#23110E]">

      {/* ── Section Header ─────────────────────────────── */}
      <header className="border-b border-[#2C4231]/15 pb-10 mb-16">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#2C4231]/60">
              01 /
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#2C4231] font-semibold">
              El Desafío Textil
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#23110E]/40 tracking-widest hidden sm:block">
            Diagnóstico Operativo · Fuga de Valor
          </span>
        </div>

        <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold text-[#23110E] max-w-3xl leading-[1.08] tracking-tight">
          La fuga silenciosa<br className="hidden sm:block" /> de recursos en confección.
        </h2>

        <p className="font-lora text-base text-[#23110E]/65 mt-6 max-w-xl leading-[1.75]">
          En cada orden de producción, una fracción crítica de la tela comprada
          se convierte en residuo antes de llegar a la tienda. Sin estrategia,
          este material se traduce en pasivo financiero y bodegaje improductivo.
        </p>
      </header>

      {/* ── Balance de Masa ─────────────────────────────── */}
      <div className="mb-20">
        <div className="flex items-baseline justify-between mb-6 pb-3 border-b border-[#2C4231]/10">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#2C4231] font-semibold">
            Balance de Materia en Confección
          </span>
          <span className="font-mono text-[9px] text-[#23110E]/40 tracking-wider hidden sm:block">
            Fuente: Análisis Sectorial NEUMAN
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#2C4231]/10">
          {/* Col 1 */}
          <div className="py-8 md:py-10 md:pr-10">
            <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#23110E]/45 mb-3">
              Entrada a Corte
            </div>
            <div className="font-cormorant text-6xl font-bold text-[#2C4231] leading-none mb-3">
              100<span className="text-3xl">%</span>
            </div>
            <p className="font-lora text-sm text-[#23110E]/65 leading-relaxed max-w-xs">
              Materia prima comprada a precio comercial completo — rollos de algodón, denim, lino o mezclas.
            </p>
          </div>

          {/* Col 2 */}
          <div className="py-8 md:py-10 md:px-10">
            <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#23110E]/45 mb-3">
              Prenda Terminada
            </div>
            <div className="font-cormorant text-6xl font-bold text-[#23110E]/75 leading-none mb-3">
              75<span className="text-3xl">%</span>
            </div>
            <p className="font-lora text-sm text-[#23110E]/65 leading-relaxed max-w-xs">
              Volumen efectivo transformado en producto comercializado para el consumidor final.
            </p>
          </div>

          {/* Col 3 — highlight */}
          <div className="py-8 md:py-10 md:pl-10 relative">
            <div className="absolute top-0 left-0 w-full md:w-px md:h-full h-px bg-[#7B1B1B]/20" />
            <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#7B1B1B] mb-3 font-semibold">
              Residuos de Corte & Sobrantes
            </div>
            <div className="font-cormorant text-6xl font-bold text-[#7B1B1B] leading-none mb-3">
              25<span className="text-3xl">%</span>
            </div>
            <p className="font-lora text-sm text-[#23110E]/70 leading-relaxed max-w-xs font-medium">
              Retazos, orillos y despuntes que se acumulan en bodegas o terminan en vertederos sin plan de rescate.
            </p>
          </div>
        </div>
      </div>

      {/* ── Los 4 Dolores ──────────────────────────────── */}
      <div className="mb-20">
        <div className="flex items-baseline justify-between mb-8 pb-3 border-b border-[#2C4231]/10">
          <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#23110E]">
            Los 4 Dolores Estructurales
          </h3>
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#2C4231]/60 hidden sm:block">
            Diagnóstico de Barreras Internas
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#2C4231]/8">
          {painPoints.map((point, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="bg-[#FAF4E6] p-8 sm:p-10 group transition-colors duration-300 hover:bg-[#F5E8C7] flex flex-col gap-5"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#2C4231]/50">
                  {point.code}
                </span>
                <span className="font-cormorant text-2xl font-bold text-[#7B1B1B] text-right leading-tight shrink-0 max-w-[10rem]">
                  {point.metric}
                </span>
              </div>

              {/* Title */}
              <h4 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#23110E] leading-tight">
                {point.title}
              </h4>

              {/* Sublabel */}
              <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#2C4231] font-semibold">
                {point.metricLabel}
              </div>

              {/* Desc */}
              <p className="font-lora text-sm text-[#23110E]/70 leading-[1.75]">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Pull Quote ─────────────────────────────────── */}
      <blockquote className="border-l-2 border-[#2C4231] pl-8 sm:pl-12 py-2 mb-20">
        <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#2C4231]/50 mb-4">
          El enfoque de NEUMAN
        </div>
        <p className="font-cormorant text-2xl sm:text-3xl lg:text-4xl font-bold text-[#23110E] leading-[1.18] max-w-3xl">
          "No se trata de reciclar por cumplir una etiqueta. Se trata de recuperar el valor financiero
          de cada metro de tela que tu empresa ya pagó."
        </p>
        <p className="font-lora text-sm text-[#23110E]/60 mt-6 max-w-2xl leading-[1.75]">
          Nuestro trabajo es auditar con precisión de sastre ese flujo de materiales, clasificarlo
          y diseñar una hoja de ruta con retornos tangibles.
        </p>
      </blockquote>

      <SectionFooterNav
        currentId="desafio"
        onSelectSection={onSelectSection}
        onOpenDiagnostic={onOpenDiagnostic}
      />
    </section>
  );
}
