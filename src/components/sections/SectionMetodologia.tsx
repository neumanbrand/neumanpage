"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionFooterNav } from "@/components/ui/SectionFooterNav";
import { Sparkles, FileText, CheckCircle2, ChevronRight, Layers } from "lucide-react";

interface SectionMetodologiaProps {
  onSelectSection: (id: string) => void;
  onOpenDiagnostic: () => void;
}

export function SectionMetodologia({
  onSelectSection,
  onOpenDiagnostic,
}: SectionMetodologiaProps) {
  const [activeStep, setActiveStep] = useState<number>(0);

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
      desc: "Identificamos todas las rutas posibles (reutilización interna, insumos de marca, reciclaje mecánico o venta de excedentes) y las ordenamos según esfuerzo técnico y beneficio económico.",
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

  return (
    <section className="py-16 sm:py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full text-[#23110E]">
      {/* Swiss Editorial Header */}
      <div className="border-b border-[#2C4231]/15 pb-8 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#2C4231] text-[#F5E8C7] font-mono text-[11px] font-bold tracking-widest">
              02
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#2C4231] font-semibold">
              Metodología de Consultoría
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#23110E]/60 tracking-wider">
            6 Etapas Estructuradas · 4 Entregables Tangibles
          </span>
        </div>

        <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#23110E] mt-6 max-w-3xl leading-[1.15]">
          Un proceso riguroso para transformar incertidumbre en decisiones ejecutivas.
        </h2>

        <p className="font-lora text-sm sm:text-base text-[#23110E]/80 mt-4 max-w-2xl leading-relaxed">
          No vendemos discursos vagos de sostenibilidad. Aplicamos una metodología de ingeniería y estrategia B2B que acompaña a tu marca desde el pesaje en planta hasta la entrega de activos accionables.
        </p>
      </div>

      {/* Part A: The 6-Step Interactive Process Timeline */}
      <div className="mb-16">
        <div className="flex items-baseline justify-between border-b border-[#2C4231]/15 pb-3 mb-8">
          <div>
            <span className="font-mono text-[10px] text-[#7B1B1B] uppercase tracking-wider font-bold block mb-1">
              Fase Operativa
            </span>
            <h3 className="font-cormorant text-2xl font-bold text-[#23110E]">
              El Proceso de Consultoría en 6 Etapas
            </h3>
          </div>
          <span className="font-mono text-[11px] text-[#23110E]/50 hidden sm:block">
            Haz clic en cada etapa para inspeccionar detalles
          </span>
        </div>

        {/* Step Selector Grid (Swiss Tabs) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
          {steps.map((st, sIdx) => {
            const isSelected = activeStep === sIdx;
            return (
              <button
                key={sIdx}
                onClick={() => setActiveStep(sIdx)}
                className={`p-3 text-left rounded-xl transition-all border cursor-pointer ${
                  isSelected
                    ? "bg-[#2C4231] text-[#F5E8C7] border-[#2C4231] shadow-md"
                    : "bg-white/80 text-[#23110E] border-[#2C4231]/15 hover:border-[#2C4231]/40"
                }`}
              >
                <div className="font-mono text-[10px] font-bold opacity-70 mb-1">
                  ETAPA {st.num}
                </div>
                <div className="font-cormorant text-sm font-bold leading-tight">
                  {st.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Step Expanded Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="bg-[#F5E8C7]/60 rounded-2xl p-6 sm:p-8 border border-[#2C4231]/20 flex flex-col md:flex-row justify-between gap-6 items-start"
          >
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-[10px] uppercase tracking-wider bg-[#2C4231] text-[#F5E8C7] px-2.5 py-0.5 rounded font-bold">
                  Etapa {steps[activeStep].num} · {steps[activeStep].tag}
                </span>
                <span className="font-mono text-[11px] text-[#23110E]/60">
                  {steps[activeStep].subtitle}
                </span>
              </div>

              <h4 className="font-cormorant text-2xl font-bold text-[#23110E] mt-1 mb-3">
                {steps[activeStep].title}
              </h4>

              <p className="font-lora text-xs sm:text-sm text-[#23110E]/85 leading-relaxed">
                {steps[activeStep].desc}
              </p>
            </div>

            <div className="bg-white/90 p-4 rounded-xl border border-[#2C4231]/15 shrink-0 w-full md:w-72">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#2C4231] font-bold block mb-1">
                Resultado de esta etapa
              </span>
              <p className="font-lora text-xs font-semibold text-[#23110E]">
                {steps[activeStep].deliverablePreview}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Part B: The 4 Tangible Deliverables (Slide 7) */}
      <div className="mb-14">
        <div className="flex items-baseline justify-between border-b border-[#2C4231]/15 pb-3 mb-8">
          <div>
            <span className="font-mono text-[10px] text-[#7B1B1B] uppercase tracking-wider font-bold block mb-1">
              Activos Concretos
            </span>
            <h3 className="font-cormorant text-2xl font-bold text-[#23110E]">
              Los 4 Entregables Tangibles que Recibe tu Empresa
            </h3>
          </div>
          <span className="font-mono text-[11px] text-[#2C4231] font-semibold">
            Información Ejecutiva & Auditoría B2B
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deliverables.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/90 rounded-2xl p-6 sm:p-7 border border-[#2C4231]/15 shadow-sm hover:border-[#2C4231]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#2C4231]/10 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#2C4231] text-[#F5E8C7] font-mono text-[10px] font-bold">
                      {item.num}
                    </span>
                    <span className="font-mono text-[10px] text-[#2C4231] font-bold tracking-wider">
                      {item.code}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#7B1B1B] uppercase font-semibold">
                    Entregable Oficial
                  </span>
                </div>

                <h4 className="font-cormorant text-xl font-bold text-[#23110E]">
                  {item.title}
                </h4>
                <div className="font-mono text-xs text-[#2C4231] font-medium mt-0.5 mb-3">
                  {item.subtitle}
                </div>

                <p className="font-lora text-xs sm:text-sm text-[#23110E]/80 leading-relaxed mb-4">
                  {item.desc}
                </p>

                <div className="space-y-1.5 border-t border-[#2C4231]/10 pt-3">
                  {item.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2 text-xs font-lora text-[#23110E]/75">
                      <ChevronRight className="w-3 h-3 text-[#2C4231] shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-[#2C4231]/10 flex items-center justify-between text-[10px] font-mono text-[#23110E]/50">
                <span>Formato PDF Ejecutivo + Datos Brutos</span>
                <span>Uso Directivo & ESG</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part C: Explicit Flexible Conversion Note (Honoring User Rule) */}
      <div className="bg-[#2C4231] text-[#F5E8C7] rounded-2xl p-7 sm:p-9 border border-[#2C4231] shadow-xl mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#F5E8C7]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F5E8C7]/80 font-bold">
                Capacidad Operativa Adaptable
              </span>
            </div>
            <h4 className="font-cormorant text-xl sm:text-2xl font-bold text-[#F5E8C7]">
              Estrategia Pura o Conversión Física a Insumos
            </h4>
            <p className="font-lora text-xs sm:text-sm text-[#F5E8C7]/85 mt-2 leading-relaxed">
              Dependiendo del caso y las capacidades internas de tu marca, NEUMAN te entrega la hoja de ruta para implementación propia, o bien articulamos y coordinamos la transformación física de tus residuos textiles en nuevos insumos técnicos (marquillas, hangtags, sesgos) o colecciones cápsula de circuito cerrado.
            </p>
          </div>

          <button
            onClick={() => onSelectSection("rutas")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F5E8C7] hover:bg-white text-[#2C4231] font-lora text-xs uppercase tracking-wider font-semibold transition-all shrink-0 shadow-md cursor-pointer"
          >
            <span>Ver Rutas de Valorización</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#2C4231]" />
          </button>
        </div>
      </div>

      {/* Bottom Continuity Navigation */}
      <SectionFooterNav
        currentId="metodologia"
        onSelectSection={onSelectSection}
        onOpenDiagnostic={onOpenDiagnostic}
      />
    </section>
  );
}
