"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, QrCode, Lock, Check } from "lucide-react";

export function CertificationFeature() {
  const points = [
    {
      title: "Certificado con Código QR Dinámico",
      desc: "Cada lote procesado recibe un pasaporte digital verificable. Tu consumidor final escanea la marquilla o el hangtag y ve la trazabilidad exacta del retazo original.",
    },
    {
      title: "Garantía Contractual 1:1 Cero Insumo Virgen",
      desc: "Certificamos con rigor de laboratorio que el 100% de la fibra empleada en tus marquillas y productos proviene de tus propios descartes de confección.",
    },
    {
      title: "Expediente Técnico para Reportes ESG",
      desc: "Documentación auditable con métricas de litros de agua ahorrados y kg de CO₂ mitigados, lista para incorporar a tus memorias de sostenibilidad corporativa.",
    },
  ];

  return (
    <section
      id="certificado"
      className="relative min-h-screen flex flex-col justify-center py-24 px-6 sm:px-12 lg:px-20 bg-[#FAF4E6] text-[#23110E] overflow-hidden select-none border-t border-[#2C4231]/10"
    >
      {/* Ambient Lighting */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#2C4231]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#7B1B1B]/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Text & Bullet Points */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#2C4231]/15 text-[#2C4231] text-xs font-mono uppercase tracking-[0.2em] font-semibold w-fit shadow-xs"
            >
              <ShieldCheck className="w-4 h-4 text-[#2C4231]" />
              Trazabilidad 1:1 Incorruptible
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-cormorant text-3xl sm:text-5xl lg:text-6xl font-bold text-[#23110E] leading-tight"
            >
              Trazabilidad Verificable. <span className="italic font-normal text-[#2C4231] underline decoration-[#7B1B1B] decoration-2 underline-offset-8">Cero Greenwashing</span>.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-lora text-sm sm:text-base text-[#23110E]/80 leading-relaxed"
            >
              No emitimos afirmaciones ambiguas ni etiquetas genéricas. Respaldamos cada metro de insumo con evidencias técnicas, pesaje certificado y pasaporte digital para que tu marca lidere con transparencia demostrable.
            </motion.p>

            <div className="space-y-3 pt-2">
              {points.map((pt, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-3.5 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#2C4231]/15 shadow-sm hover:border-[#2C4231]/30 transition-all duration-300"
                >
                  <div className="w-6 h-6 rounded-full bg-[#2C4231] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3.5 h-3.5 text-[#F5E8C7]" />
                  </div>
                  <div>
                    <h4 className="font-cormorant text-xl font-bold text-[#23110E]">
                      {pt.title}
                    </h4>
                    <p className="font-lora text-xs sm:text-sm text-[#23110E]/75 mt-1 leading-relaxed">
                      {pt.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Certificate Card (Verde Bosque como SEGUNDO color distintivo) */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md bg-[#2C4231] text-[#F5E8C7] rounded-3xl p-8 border border-[#2C4231] shadow-2xl shadow-[#2C4231]/20 relative"
            >
              {/* Certificate Header */}
              <div className="flex items-center justify-between border-b border-[#F5E8C7]/20 pb-5 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#F5E8C7] flex items-center justify-center shadow-lg border border-[#F5E8C7]/40 text-[#2C4231]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#F5E8C7]/80 font-bold block">
                      Certificado Oficial
                    </span>
                    <h4 className="font-cormorant text-xl font-bold text-[#F5E8C7]">
                      Custodia Textil 1:1
                    </h4>
                  </div>
                </div>
                {/* Specific red wax seal detail */}
                <div className="w-8 h-8 rounded-full bg-[#7B1B1B] flex items-center justify-center shadow-md border border-[#F5E8C7]/20">
                  <Lock className="w-4 h-4 text-[#F5E8C7]" />
                </div>
              </div>

              {/* Certificate Details */}
              <div className="space-y-3 text-xs font-mono mb-6 bg-white/10 p-5 rounded-2xl border border-[#F5E8C7]/15">
                <div className="flex justify-between items-center text-xs border-b border-[#F5E8C7]/10 pb-2">
                  <span className="text-[#F5E8C7]/70">Lote de Custodia:</span>
                  <span className="font-bold text-[#F5E8C7]">NM-2026-BOG-084</span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-[#F5E8C7]/10 pb-2">
                  <span className="text-[#F5E8C7]/70">Origen:</span>
                  <span className="font-bold text-[#F5E8C7]">Mesa de Corte Confección</span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-[#F5E8C7]/10 pb-2">
                  <span className="text-[#F5E8C7]/70">Materia Prima:</span>
                  <span className="font-bold text-[#F5E8C7]">Algodón & Denim 100%</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#F5E8C7]/70">Insumos Entregados:</span>
                  <span className="font-bold text-[#F5E8C7]">12,500 Marquillas Tejidas</span>
                </div>
              </div>

              {/* QR Verification Box */}
              <div className="flex items-center gap-4 bg-white/15 p-4 rounded-2xl border border-[#F5E8C7]/20 shadow-inner">
                <div className="w-14 h-14 bg-[#F5E8C7] rounded-xl p-1.5 flex items-center justify-center shrink-0 shadow-md">
                  <QrCode className="w-full h-full text-[#2C4231]" />
                </div>
                <div className="text-[11px] font-mono text-[#F5E8C7]/90">
                  <span className="font-bold text-[#F5E8C7] block uppercase tracking-wider text-xs mb-0.5">
                    Pasaporte Digital Público
                  </span>
                  <span>Escaneable en la prenda por el consumidor final</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
