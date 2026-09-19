"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, TrendingDown, DollarSign, Warehouse, ArrowRight } from "lucide-react";

export function ProblemStatement() {
  const cards = [
    {
      icon: <Warehouse className="w-5 h-5 text-[#F5E8C7]" />,
      stat: "15% - 25%",
      label: "Desperdicio en Mesa de Corte",
      desc: "De la tela virgen adquirida para cada colección termina en el suelo de corte como retazos, orillos y sobrantes textiles sin monetizar.",
    },
    {
      icon: <DollarSign className="w-5 h-5 text-[#F5E8C7]" />,
      stat: "$0 Retorno",
      label: "Costo Oculto de Almacenamiento",
      desc: "Toneladas de fibras nobles acumuladas en bodegas que ocupan metros cuadrados costosos y representan capital inmovilizado.",
    },
    {
      icon: <TrendingDown className="w-5 h-5 text-[#F5E8C7]" />,
      stat: "+35% Sobreprecio",
      label: "Compra de Insumos Vírgenes",
      desc: "Las marcas pagan a terceros por marquillas, sesgos y hangtags producidos con fibras vírgenes cuando ya poseen la materia prima.",
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
            El Desafío Oculto de la Confección
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant text-3xl sm:text-5xl lg:text-6xl font-bold text-[#23110E] leading-tight tracking-tight"
          >
            Hasta un 25% de tu tela comprada <span className="italic font-normal text-[#2C4231] underline decoration-[#7B1B1B] decoration-2 underline-offset-8">se queda en el suelo</span> de corte.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-lora text-sm sm:text-base text-[#23110E]/80 mt-5 max-w-2xl mx-auto leading-relaxed"
          >
            Cada temporada, los talleres acumulan sacos de material noble que terminan desechados o regalados. En NEUMAN convertimos ese pasivo en rentabilidad, insumos propios y prestigio sostenible.
          </motion.p>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl border border-[#2C4231]/15 shadow-xl shadow-[#2C4231]/5 flex flex-col justify-between hover:border-[#2C4231]/40 transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#2C4231] flex items-center justify-center mb-5 shadow-md shadow-[#2C4231]/20">
                  {card.icon}
                </div>
                <div className="font-cormorant text-4xl sm:text-5xl font-bold text-[#2C4231] tracking-tight">
                  {card.stat}
                </div>
                <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-[#23110E] font-bold mt-2">
                  {card.label}
                </h3>
              </div>
              <p className="font-lora text-xs sm:text-sm text-[#23110E]/75 leading-relaxed mt-4 border-t border-[#2C4231]/10 pt-4">
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
            <strong className="font-semibold text-[#2C4231]">¿Sabías cuánto dinero representan los residuos textiles de tu producción al año?</strong> Agenda un pesaje y caracterización técnica in-situ sin costo.
          </div>
          <a
            href="#diagnostico"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2C4231] hover:bg-[#1E2E22] text-[#F5E8C7] font-lora text-xs uppercase tracking-wider font-semibold transition-all shrink-0 shadow-md shadow-[#2C4231]/20"
          >
            <span>Valorizar mis Residuos</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F5E8C7]" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
