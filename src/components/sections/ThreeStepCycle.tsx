"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ClipboardList, 
  Search, 
  Lightbulb, 
  BarChart3, 
  Compass, 
  Map, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  Layers,
  Sparkles
} from "lucide-react";

export function ThreeStepCycle() {
  // 6 Pasos del Proceso de Consultoría (Slide 6 de la presentación)
  const sixSteps = [
    {
      num: "1",
      title: "Levantamiento de información",
      desc: "Recopilación rigurosa de datos sobre volúmenes, composiciones, mezclas y puntos de descarte en corte.",
      icon: <ClipboardList className="w-4 h-4 text-[#F5E8C7]" />,
    },
    {
      num: "2",
      title: "Diagnóstico de causas",
      desc: "Auditoría forense para entender por qué y dónde se originan los residuos y excedentes textiles.",
      icon: <Search className="w-4 h-4 text-[#F5E8C7]" />,
    },
    {
      num: "3",
      title: "Investigación tecnológica",
      desc: "Búsqueda especializada de usos, tecnologías disponibles y capacidades de transformación del mercado.",
      icon: <Layers className="w-4 h-4 text-[#F5E8C7]" />,
    },
    {
      num: "4",
      title: "Identificación de oportunidades",
      desc: "Detección de alternativas viables de reutilización, reciclaje, nuevos productos y deadstock.",
      icon: <Lightbulb className="w-4 h-4 text-[#F5E8C7]" />,
    },
    {
      num: "5",
      title: "Evaluación de alternativas",
      desc: "Cruce riguroso de viabilidad económica, técnica, productiva, ambiental y estratégica.",
      icon: <BarChart3 className="w-4 h-4 text-[#F5E8C7]" />,
    },
    {
      num: "6",
      title: "Estrategia de valorización",
      desc: "Diseño de la hoja de ruta priorizada y plan de ejecución (incluyendo conversión a producto si aplica).",
      icon: <Compass className="w-4 h-4 text-[#F5E8C7]" />,
    },
  ];

  // 4 Entregables de la Consultoría (Slide 7 de la presentación)
  const deliverables = [
    {
      num: "01",
      title: "Mapa de Residuos",
      desc: "Tipo, cantidad, material, mezclas de fibra, origen y frecuencia de generación en tu cadena de confección.",
      icon: <Map className="w-5 h-5 text-[#F5E8C7]" />,
      tag: "Diagnóstico de Origen",
    },
    {
      num: "02",
      title: "Mapa de Oportunidades",
      desc: "Reutilización, transformación, reciclaje, reducción y desarrollo de nuevos productos o insumos.",
      icon: <Lightbulb className="w-5 h-5 text-[#F5E8C7]" />,
      tag: "Alternativas Viables",
    },
    {
      num: "03",
      title: "Evaluación de Viabilidad",
      desc: "Potencial económico, ambiental, productivo y retorno de inversión de cada alternativa evaluada.",
      icon: <BarChart3 className="w-5 h-5 text-[#F5E8C7]" />,
      tag: "Filtro Técnico & Costos",
    },
    {
      num: "04",
      title: "Estrategia y Hoja de Ruta",
      desc: "Recomendaciones priorizadas, próximos pasos concretos y plan de implementación a la medida.",
      icon: <FileText className="w-5 h-5 text-[#F5E8C7]" />,
      tag: "Plan de Acción 1:1",
    },
  ];

  return (
    <section
      id="ciclo"
      className="relative min-h-screen flex flex-col justify-center py-24 px-6 sm:px-12 lg:px-20 bg-[#F5E8C7] text-[#23110E] overflow-hidden select-none border-t border-[#2C4231]/10"
    >
      {/* Ambient Lighting */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#2C4231]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#7B1B1B]/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block font-mono text-xs uppercase tracking-[0.25em] text-[#2C4231] font-semibold bg-white/80 px-4 py-1.5 rounded-full border border-[#2C4231]/20 mb-3 shadow-xs"
          >
            Metodología de Consultoría Especializada
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant text-2xl sm:text-3xl lg:text-4xl font-bold text-[#23110E] leading-tight"
          >
            Seis pasos, de los residuos textiles <span className="italic font-normal text-[#2C4231] underline decoration-[#7B1B1B] decoration-2 underline-offset-8">a la estrategia</span>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-lora text-sm sm:text-base text-[#23110E]/80 mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            La evaluación de alternativas cruza viabilidad económica, técnica, productiva, ambiental y estratégica antes de priorizar cada acción para tu marca.
          </motion.p>
        </div>

        {/* 6 Steps Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-14">
          {sixSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 * idx, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-[#2C4231]/15 shadow-sm flex flex-col justify-between hover:border-[#2C4231]/40 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-7 h-7 rounded-full bg-[#2C4231] text-[#F5E8C7] font-mono text-xs font-bold flex items-center justify-center shadow-xs">
                    {step.num}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-[#2C4231]/10 flex items-center justify-center text-[#2C4231]">
                    {step.icon}
                  </div>
                </div>
                <h3 className="font-mono text-xs font-bold text-[#23110E] leading-snug mb-2 uppercase tracking-wide">
                  {step.title}
                </h3>
              </div>
              <p className="font-lora text-[11px] text-[#23110E]/75 leading-relaxed border-t border-[#2C4231]/10 pt-2.5 mt-2">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Input / Output Pipeline Bar */}
        <div className="bg-white/85 rounded-2xl p-4 sm:p-5 border border-[#2C4231]/15 shadow-sm mb-16 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md bg-[#7B1B1B] text-[#F5E8C7] font-bold uppercase text-[10px]">
              Entrada
            </span>
            <span className="text-[#23110E]/85">
              Residuos, excedentes textiles y materiales sin uso claro.
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#2C4231] hidden md:block shrink-0" />
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md bg-[#2C4231] text-[#F5E8C7] font-bold uppercase text-[10px]">
              Salida
            </span>
            <span className="text-[#2C4231] font-semibold">
              Hoja de ruta priorizada, lista para implementar.
            </span>
          </div>
        </div>

        {/* The 4 Deliverables Container (Slide 7 de la presentación) */}
        <div className="bg-[#2C4231] text-[#F5E8C7] rounded-3xl p-8 sm:p-12 border border-[#2C4231] shadow-2xl shadow-[#2C4231]/20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#F5E8C7]/70 font-semibold">
              Fase 1 · Entregables Tangibles
            </span>
            <h3 className="font-cormorant text-xl sm:text-2xl font-bold text-[#F5E8C7] mt-1">
              Lo que tu empresa recibe al final de la consultoría
            </h3>
            <p className="font-lora text-xs sm:text-sm text-[#F5E8C7]/80 mt-2">
              Información procesada, inteligencia de materiales y decisiones estructuradas para tu equipo directivo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverables.map((item, dIdx) => (
              <div
                key={dIdx}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-[#F5E8C7]/20 flex flex-col justify-between hover:bg-white/15 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-cormorant text-2xl font-bold text-[#F5E8C7]">
                      {item.num}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#F5E8C7]/20 flex items-center justify-center text-[#F5E8C7]">
                      {item.icon}
                    </div>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#F5E8C7]/70 bg-white/5 px-2 py-0.5 rounded-md border border-[#F5E8C7]/15 font-semibold inline-block mb-2">
                    {item.tag}
                  </span>
                  <h4 className="font-cormorant text-lg font-bold text-[#F5E8C7] leading-snug">
                    {item.title}
                  </h4>
                </div>
                <p className="font-lora text-xs text-[#F5E8C7]/80 leading-relaxed border-t border-[#F5E8C7]/15 pt-3 mt-3">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Conversion Note (Honoring the user's specific instruction) */}
          <div className="mt-8 pt-6 border-t border-[#F5E8C7]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#F5E8C7] shrink-0" />
              <p className="font-lora text-xs text-[#F5E8C7]/85">
                <strong className="text-[#F5E8C7]">Implementación y Conversión Flexible:</strong> Según las necesidades de tu marca, NEUMAN te entrega la hoja de ruta para ejecución interna o articula la conversión física de tus residuos a nuevos insumos y productos terminados.
              </p>
            </div>
            <a
              href="#diagnostico"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#F5E8C7] hover:bg-white text-[#2C4231] font-lora text-xs uppercase tracking-wider font-semibold transition-all shrink-0 shadow-md"
            >
              <span>Solicitar Diagnóstico</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2C4231]" />
            </a>
          </div>
        </div>

      </div>
  );
}
