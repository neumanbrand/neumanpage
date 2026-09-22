"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionFooterNav } from "@/components/ui/SectionFooterNav";
import { ArrowRight } from "lucide-react";

interface SectionMetodologiaProps {
  onSelectSection: (id: string) => void;
  onOpenDiagnostic: () => void;
}

const steps = [
  {
    num: "01",
    title: "Levantamiento y Caracterización",
    subtitle: "Auditoría in-situ de residuos",
    tag: "Diagnóstico Inicial",
    desc: "Visitamos la planta de corte o taller para muestrear, pesar y clasificar los retazos y sobrantes generados según composición (algodón, denim, mezclas sintéticas) y formato.",
    deliverablePreview: "Ficha de Caracterización de Fibras y Volúmenes",
  },
  {
    num: "02",
    title: "Diagnóstico Cuantitativo y Cualitativo",
    subtitle: "Flujo de masa & puntos críticos",
    tag: "Balance de Corte",
    desc: "Mapeamos dónde, cómo y por qué se genera cada fracción de residuo. Calculamos el balance de materia y los costos ocultos asociados al almacenamiento improductivo.",
    deliverablePreview: "Diagrama de Flujo y Balance de Residuos",
  },
  {
    num: "03",
    title: "Investigación de Mercado y Soluciones",
    subtitle: "Benchmark & tecnologías viables",
    tag: "Inteligencia de Materiales",
    desc: "Cruzamos la composición de tus residuos textiles con nuestra base de datos de tecnologías circulares, proveedores de desfibrado y opciones de hilatura en Colombia y la región.",
    deliverablePreview: "Matriz de Tecnologías y Vías Aplicables",
  },
  {
    num: "04",
    title: "Mapeo y Priorización de Oportunidades",
    subtitle: "Filtro de impacto vs. viabilidad",
    tag: "Matriz de Decisión",
    desc: "Identificamos todas las rutas posibles y las ordenamos según esfuerzo técnico y beneficio económico: reutilización interna, insumos de marca, reciclaje mecánico o venta de excedentes.",
    deliverablePreview: "Mapa Preliminar de Oportunidades Circulares",
  },
  {
    num: "05",
    title: "Evaluación de Viabilidad",
    subtitle: "Análisis técnico y financiero",
    tag: "Filtro Riguroso",
    desc: "Modelamos la viabilidad económica: costos logísticos, costo por insumo recuperado vs. insumo virgen, métricas de agua y carbono evitadas, y retorno sobre la inversión (ROI).",
    deliverablePreview: "Modelo Financiero y Análisis de Rentabilidad B2B",
  },
  {
    num: "06",
    title: "Formulación Estratégica y Hoja de Ruta",
    subtitle: "Plan ejecutivo de implementación",
    tag: "Entregable Maestro",
    desc: "Sintetizamos las decisiones en un plan de acción calendarizado, con hitos claros, requerimientos de inversión y especificaciones técnicas para la ejecución de la marca.",
    deliverablePreview: "Dossier Estratégico y Hoja de Ruta Accionable",
  },
];

const deliverables = [
  {
    num: "01",
    code: "DOC-NEU-01",
    title: "Mapa de Residuos Textiles",
    subtitle: "Diagnóstico de Flujos & Volúmenes",
    desc: "Radiografía cuantitativa y cualitativa: kilogramos por colección, composiciones porcentuales, formatos de corte y costos de almacenamiento.",
    bullets: ["Balance de masa de corte", "Clasificación por tipo de fibra", "Costeo de bodegaje improductivo"],
  },
  {
    num: "02",
    code: "DOC-NEU-02",
    title: "Mapa de Oportunidades",
    subtitle: "Rutas Circulares Identificadas",
    desc: "Portafolio de alternativas viables: reutilización directa, desfibrado para hilatura, insumos de empaque/branding o comercialización de deadstock.",
    bullets: ["Rutas de upcycling y confección", "Opciones de reciclaje mecánico", "Monetización de rollos obsoletos"],
  },
  {
    num: "03",
    code: "DOC-NEU-03",
    title: "Evaluación de Viabilidad",
    subtitle: "Filtro Técnico, Financiero & ESG",
    desc: "Análisis comparativo de costos vs. insumo virgen, proyección de ahorro por temporada, huella ambiental mitigada y tiempo de recuperación.",
    bullets: ["Cálculo de ahorro por kilogramo", "Métricas de agua y CO₂ auditables", "Evaluación de capacidad operativa"],
  },
  {
    num: "04",
    code: "DOC-NEU-04",
    title: "Estrategia & Hoja de Ruta",
    subtitle: "Plan de Acción 1:1 a la Medida",
    desc: "Documento ejecutivo maestro con recomendaciones priorizadas, cronograma de implementación por fases y lineamientos para producción interna o articulada.",
    bullets: ["Cronograma de ejecución", "Especificaciones técnicas de insumos", "Protocolo de trazabilidad 1:1"],
  },
];

export function SectionMetodologia({ onSelectSection, onOpenDiagnostic }: SectionMetodologiaProps) {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full text-[#23110E]">

      {/* ── Section Header ─────────────────────────────── */}
      <header className="border-b border-[#2C4231]/15 pb-10 mb-16">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#2C4231]/60">02 /</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#2C4231] font-semibold">
              Metodología de Consultoría
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#23110E]/40 tracking-widest hidden sm:block">
            6 Etapas · 4 Entregables Tangibles
          </span>
        </div>

        <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold text-[#23110E] max-w-3xl leading-[1.08] tracking-tight">
          Rigor de ingeniería.<br className="hidden sm:block" /> Resultados ejecutivos.
        </h2>

        <p className="font-lora text-base text-[#23110E]/65 mt-6 max-w-xl leading-[1.75]">
          Aplicamos una metodología B2B que acompaña a tu marca desde el pesaje en planta hasta
          la entrega de activos estratégicos accionables — sin discursos vagos de sostenibilidad.
        </p>
      </header>

      {/* ── Part A: 6 Etapas ───────────────────────────── */}
      <div className="mb-20">
        <div className="flex items-baseline justify-between mb-8 pb-3 border-b border-[#2C4231]/10">
          <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#23110E]">
            El Proceso en 6 Etapas
          </h3>
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#23110E]/40 hidden sm:block">
            Selecciona una etapa
          </span>
        </div>

        {/* Step Selector — Vertical numbered list (sastre style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          <div className="lg:col-span-4 flex flex-col divide-y divide-[#2C4231]/10 border-y border-[#2C4231]/10">
            {steps.map((st, sIdx) => {
              const isSelected = activeStep === sIdx;
              return (
                <button
                  key={sIdx}
                  onClick={() => setActiveStep(sIdx)}
                  className={`group flex items-start gap-4 py-4 px-2 text-left cursor-pointer transition-all duration-200 ${
                    isSelected ? "bg-[#2C4231]/5" : "hover:bg-[#2C4231]/3"
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-bold shrink-0 transition-colors duration-200 ${
                      isSelected ? "text-[#2C4231]" : "text-[#23110E]/30 group-hover:text-[#2C4231]/60"
                    }`}
                  >
                    {st.num}
                  </span>
                  <span
                    className={`font-cormorant text-base font-bold leading-tight transition-colors duration-200 ${
                      isSelected ? "text-[#2C4231]" : "text-[#23110E]/70 group-hover:text-[#23110E]"
                    }`}
                  >
                    {st.title}
                  </span>
                  {isSelected && (
                    <span className="ml-auto shrink-0 w-1 self-stretch bg-[#2C4231] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Expanded Detail Panel */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <div className="bg-[#2C4231] text-[#F5E8C7] rounded-2xl p-8 sm:p-10 h-full flex flex-col gap-6">
                  {/* Tag + subtitle */}
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#F5E8C7]/50">
                      Etapa {steps[activeStep].num}
                    </span>
                    <span className="w-px h-3 bg-[#F5E8C7]/20" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#F5E8C7]/70 font-semibold">
                      {steps[activeStep].tag}
                    </span>
                  </div>

                  <h4 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#F5E8C7] leading-[1.1]">
                    {steps[activeStep].title}
                  </h4>

                  <p className="font-lora text-sm text-[#F5E8C7]/80 leading-[1.75]">
                    {steps[activeStep].desc}
                  </p>

                  {/* Deliverable callout */}
                  <div className="mt-auto pt-6 border-t border-[#F5E8C7]/15">
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#F5E8C7]/50 block mb-2">
                      Resultado de esta etapa
                    </span>
                    <p className="font-cormorant text-xl font-bold text-[#F5E8C7]">
                      {steps[activeStep].deliverablePreview}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Part B: 4 Entregables ─────────────────────── */}
      <div className="mb-20">
        <div className="flex items-baseline justify-between mb-8 pb-3 border-b border-[#2C4231]/10">
          <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#23110E]">
            Los 4 Entregables que Recibe tu Empresa
          </h3>
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#7B1B1B]/70 hidden sm:block">
            Activos Concretos
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#2C4231]/8">
          {deliverables.map((item, idx) => (
            <div key={idx} className="bg-[#FAF4E6] p-8 sm:p-10 flex flex-col gap-4 hover:bg-[#F5E8C7] transition-colors duration-300">
              {/* Number + code */}
              <div className="flex items-baseline gap-3">
                <span className="font-cormorant text-5xl font-bold text-[#2C4231]/20 leading-none select-none">
                  {item.num}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#2C4231]/50">
                  {item.code}
                </span>
              </div>

              <div>
                <h4 className="font-cormorant text-2xl font-bold text-[#23110E] leading-tight">
                  {item.title}
                </h4>
                <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#2C4231] mt-1 font-semibold">
                  {item.subtitle}
                </div>
              </div>

              <p className="font-lora text-sm text-[#23110E]/70 leading-[1.75]">
                {item.desc}
              </p>

              <ul className="space-y-1.5 pt-3 border-t border-[#2C4231]/10">
                {item.bullets.map((b, bIdx) => (
                  <li key={bIdx} className="flex items-baseline gap-2.5 text-sm font-lora text-[#23110E]/60">
                    <span className="font-mono text-[#2C4231] text-xs shrink-0">—</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Flexible Capacity Note ─────────────────────── */}
      <div className="border border-[#2C4231]/20 rounded-xl p-8 sm:p-10 mb-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#7B1B1B] font-semibold mb-3">
            Capacidad Operativa Adaptable
          </div>
          <h4 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#23110E] leading-tight mb-3">
            Estrategia pura o conversión física a insumos — según tu caso.
          </h4>
          <p className="font-lora text-sm text-[#23110E]/65 leading-[1.75]">
            Dependiendo de las capacidades internas de tu marca, NEUMAN entrega la hoja de ruta para implementación propia
            o articula y coordina la transformación física de tus residuos textiles en nuevos insumos técnicos
            (marquillas, hangtags, sesgos) o colecciones cápsula de circuito cerrado.
          </p>
        </div>
        <button
          onClick={() => onSelectSection("rutas")}
          className="group inline-flex items-center gap-2.5 shrink-0 cursor-pointer"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#2C4231] font-semibold relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#2C4231] group-hover:after:w-full after:transition-[width] after:duration-300">
            Ver Rutas de Valorización
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-[#2C4231] transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      <SectionFooterNav
        currentId="metodologia"
        onSelectSection={onSelectSection}
        onOpenDiagnostic={onOpenDiagnostic}
      />
    </section>
  );
}
