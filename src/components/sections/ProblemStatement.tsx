"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, TrendingDown, DollarSign, Warehouse, ArrowRight } from "lucide-react";

export function ProblemStatement() {
  const cards = [
    {
      icon: <DollarSign className="w-5 h-5 text-[#F5E8C7]" />,
      num: "01",
      label: "Se genera valor perdido",
      desc: "Las empresas de moda generan residuos y excedentes textiles de corte en cada colección. Esos materiales nobles pierden su valor económico, ocupan espacio y terminan convertidos en pasivos.",
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-[#F5E8C7]" />,
      num: "02",
      label: "Falta de claridad",
      desc: "Muchas marcas no saben qué hacer exactamente con cada tipo de tela sobrante, cuáles mezclas de fibras son viables ni cómo priorizar las decisiones de rescate textil.",
    },
    {
      icon: <TrendingDown className="w-5 h-5 text-[#F5E8C7]" />,
      num: "03",
      label: "Oportunidades invisibles",
      desc: "Existen múltiples alternativas de reutilización, reciclaje, nuevos productos, deadstock y transformación que las marcas no identifican por falta de inteligencia de mercado.",
    },
    {
      icon: <Warehouse className="w-5 h-5 text-[#F5E8C7]" />,
      num: "04",
      label: "Falta de capacidad",
      desc: "Los equipos de diseño y confección no disponen del tiempo, los recursos ni el conocimiento técnico especializado para investigar todas las tecnologías y canales de valorización.",
    },
  ];

  return (
    <section
      id="problema"
      className="relative min-h-screen flex flex-col justify-center py-24 px-6 sm:px-12 lg:px-20 bg-[#FAF4E6] text-[#23110E] overflow-hidden select-none border-t border-[#2C4231]/10"
    >
      {/* Ambient Lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#2C4231]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#7B1B1B]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2C4231]/10 border border-[#2C4231]/20 text-[#2C4231] text-xs font-mono uppercase tracking-[0.2em] mb-4 font-semibold shadow-xs"
          >
            <AlertCircle className="w-3.5 h-3.5 text-[#2C4231]" />
            El Problema que Resuelve NEUMAN
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant text-2xl sm:text-3xl lg:text-4xl font-bold text-[#23110E] leading-tight tracking-tight"
          >
            Un problema que las marcas de moda <span className="italic font-normal text-[#2C4231] underline decoration-[#7B1B1B] decoration-2 underline-offset-8">no logran resolver solas</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-lora text-sm sm:text-base text-[#23110E]/80 mt-5 max-w-2xl mx-auto leading-relaxed"
          >
            Las empresas de moda generan residuos y excedentes textiles en cada colección, pero no cuentan con el tiempo ni la especialización para investigar su potencial de valorización.
          </motion.p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.12 + idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="bg-white/90 backdrop-blur-xl p-6 sm:p-7 rounded-3xl border border-[#2C4231]/15 shadow-xl shadow-[#2C4231]/5 flex flex-col justify-between hover:border-[#2C4231]/40 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#2C4231] flex items-center justify-center shadow-md shadow-[#2C4231]/20">
                    {card.icon}
                  </div>
                  <span className="font-mono text-xs font-bold text-[#7B1B1B] bg-[#7B1B1B]/10 px-2 py-0.5 rounded-md">
                    {card.num}
                  </span>
                </div>
                <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[#23110E] font-bold">
                  {card.label}
                </h3>
              </div>
              <p className="font-lora text-xs text-[#23110E]/75 leading-relaxed mt-4 border-t border-[#2C4231]/10 pt-4">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Manifesto Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 p-6 rounded-3xl bg-white/85 border border-[#2C4231]/15 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <div className="font-lora text-sm text-[#23110E]/85">
            <strong className="font-semibold text-[#2C4231]">NEUMAN identifica qué se puede hacer con tus residuos textiles;</strong> te entregamos una estrategia estructurada y te acompañamos en la implementación.
          </div>
          <a
            href="#diagnostico"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2C4231] hover:bg-[#1E2E22] text-[#F5E8C7] font-lora text-xs uppercase tracking-wider font-semibold transition-all shrink-0 shadow-md shadow-[#2C4231]/20"
          >
            <span>Auditar mis Residuos</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F5E8C7]" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
