"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Scale, Droplets, Cloud, Sparkles, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ImpactCalculator() {
  const [wasteKg, setWasteKg] = useState(150);

  // Formulas
  const labelsProduced = Math.round(wasteKg * 280);
  const waterSavedLiters = Math.round(wasteKg * 2500);
  const co2SavedKg = Math.round(wasteKg * 14.5);
  const moneySavedCop = Math.round(wasteKg * 280 * 220);

  const metrics = [
    {
      icon: <Tag className="w-4 h-4 text-[#2C4231]" />,
      label: "Marquillas Tejidas",
      val: `+${labelsProduced.toLocaleString("es-CO")}`,
      sub: "Unidades listas para coser",
    },
    {
      icon: <Sparkles className="w-4 h-4 text-[#2C4231]" />,
      label: "Ahorro Proyectado",
      val: `~$${(moneySavedCop / 1000000).toFixed(1)}M`,
      sub: "COP vs insumos vírgenes",
    },
    {
      icon: <Droplets className="w-4 h-4 text-[#2C4231]" />,
      label: "Agua Evitada",
      val: `${(waterSavedLiters / 1000).toFixed(0)}k Lts`,
      sub: "En cultivo y tintorería",
    },
    {
      icon: <Cloud className="w-4 h-4 text-[#2C4231]" />,
      label: "Mitigación CO₂",
      val: `-${co2SavedKg.toLocaleString("es-CO")} Kg`,
      sub: "Emisiones no generadas",
    },
  ];

  return (
    <section
      id="impacto"
      className="relative min-h-screen flex flex-col justify-center py-24 px-6 sm:px-12 lg:px-20 bg-[#F5E8C7] text-[#23110E] overflow-hidden select-none border-t border-[#2C4231]/10"
    >
      {/* Ambient Lighting */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#2C4231]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#7B1B1B]/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block font-mono text-xs uppercase tracking-[0.25em] text-[#2C4231] font-semibold bg-white/80 px-4 py-1.5 rounded-full border border-[#2C4231]/15 mb-3 shadow-xs"
          >
            Calculadora de Retorno & ESG
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant text-3xl sm:text-5xl lg:text-6xl font-bold text-[#23110E] leading-tight"
          >
            Calcula el valor de tus <span className="italic font-normal text-[#2C4231] underline decoration-[#7B1B1B] decoration-2 underline-offset-8">residuos textiles</span>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-lora text-sm sm:text-base text-[#23110E]/80 mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            Mueve el calibrador según el volumen mensual de retazos de tu producción y descubre cuántos insumos y ahorro genera para tu marca.
          </motion.p>
        </div>

        {/* Calculator Main Box */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/95 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 border border-[#2C4231]/15 shadow-2xl shadow-[#2C4231]/5 max-w-5xl mx-auto"
        >
          {/* Slider Control */}
          <div className="mb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2 mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#23110E]/80 font-bold">
                Volumen Mensual de Retazos de Corte:
              </span>
              <span className="font-cormorant text-4xl sm:text-5xl font-bold text-[#2C4231]">
                {wasteKg} <span className="text-base font-lora font-normal text-[#23110E]/70">Kg / mes</span>
              </span>
            </div>

            <input
              type="range"
              min="20"
              max="1000"
              step="10"
              value={wasteKg}
              onChange={(e) => setWasteKg(Number(e.target.value))}
              className="w-full h-3 bg-[#2C4231]/15 rounded-lg appearance-none cursor-pointer accent-[#2C4231] border border-[#2C4231]/20"
            />

            <div className="flex justify-between text-xs font-mono text-[#23110E]/60 mt-2">
              <span>20 Kg (Taller Cápsula)</span>
              <span>250 Kg (Marca Mediana)</span>
              <span>1,000 Kg (Confección Industrial)</span>
            </div>
          </div>

          {/* 4 Impact Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {metrics.map((m, idx) => (
              <div
                key={idx}
                className="bg-[#FAF4E6] p-5 rounded-2xl border border-[#2C4231]/15 shadow-sm flex flex-col justify-between"
              >
                <div className="flex items-center gap-2 mb-2 text-[#2C4231]">
                  {m.icon}
                  <span className="text-xs font-mono uppercase tracking-wider font-bold">
                    {m.label}
                  </span>
                </div>
                <div className="font-cormorant text-3xl sm:text-4xl font-bold text-[#2C4231] my-1">
                  {m.val}
                </div>
                <p className="text-[11px] font-lora text-[#23110E]/70">
                  {m.sub}
                </p>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#2C4231]/10">
            <div className="flex items-center gap-2.5 text-xs font-mono text-[#23110E]/80">
              <Scale className="w-4 h-4 text-[#2C4231] shrink-0" />
              <span>Diagnóstico técnico de pesaje y muestreo sin costo en Bogotá</span>
            </div>
            <a href="#diagnostico">
              <Button
                variant="forest"
                size="md"
                className="font-lora uppercase tracking-wider text-xs bg-[#2C4231] text-[#F5E8C7] hover:bg-[#1E2E22] shadow-lg shadow-[#2C4231]/20"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Solicitar Diagnóstico B2B
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
