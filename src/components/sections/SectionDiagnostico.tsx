"use client";

import React, { useState } from "react";
import { SectionFooterNav } from "@/components/ui/SectionFooterNav";
import { Droplets, Cloud, Tag, ArrowUpRight, Send, CheckCircle2 } from "lucide-react";

interface SectionDiagnosticoProps {
  onSelectSection: (id: string) => void;
  onOpenDiagnostic: () => void;
}

export function SectionDiagnostico({ onSelectSection, onOpenDiagnostic }: SectionDiagnosticoProps) {
  const [wasteKg, setWasteKg] = useState<number>(150);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    volume: "150",
    message: "",
  });

  const labelsProduced  = Math.round(wasteKg * 280);
  const waterSavedLiters = Math.round(wasteKg * 2500);
  const co2SavedKg      = Math.round(wasteKg * 14.5);
  const moneySavedCop   = Math.round(wasteKg * 280 * 220);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const whatsappUrl = `https://wa.me/573001234567?text=Hola%20NEUMAN,%20quiero%20agendar%20un%20diagnóstico%20técnico%20de%20residuos%20textiles.%20Volumen%20estimado:%20${wasteKg}%20kg/mes.`;

  const inputClass =
    "w-full px-0 py-3 border-b border-[#2C4231]/20 bg-transparent text-sm font-lora text-[#23110E] placeholder:text-[#23110E]/30 focus:outline-none focus:border-[#2C4231] transition-colors duration-200 resize-none";

  return (
    <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full text-[#23110E]">

      {/* ── Section Header ─────────────────────────────── */}
      <header className="border-b border-[#2C4231]/15 pb-10 mb-16">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#2C4231]/60">05 /</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#2C4231] font-semibold">
              Diagnóstico & Impacto
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#23110E]/40 tracking-widest hidden sm:block">
            Calculadora B2B · Auditoría en Bogotá
          </span>
        </div>

        <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold text-[#23110E] max-w-3xl leading-[1.08] tracking-tight">
          Calcula el retorno de tus materiales.<br className="hidden sm:block" /> Agenda tu diagnóstico.
        </h2>

        <p className="font-lora text-base text-[#23110E]/65 mt-6 max-w-xl leading-[1.75]">
          Cuantifica el potencial económico y ambiental de tus retazos y da el primer paso
          hacia una estrategia de valorización a la medida de tu producción.
        </p>
      </header>

      {/* ── Interactive Calculator ─────────────────────── */}
      <div className="mb-20">
        <div className="flex items-baseline justify-between mb-8 pb-3 border-b border-[#2C4231]/10">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#7B1B1B] font-semibold block mb-1">
              Simulador Ejecutivo
            </span>
            <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#23110E]">
              Proyección Mensual de Rendimiento
            </h3>
          </div>
          <span className="font-mono text-[9px] text-[#23110E]/40 hidden sm:block">
            Muestreo Bogotá · LCA Textil CO
          </span>
        </div>

        {/* Slider */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-3 mb-5">
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#23110E]/50">
              Volumen estimado mensual de retazos & excedentes
            </span>
            <div className="font-cormorant text-5xl font-bold text-[#2C4231] leading-none tabular-nums">
              {wasteKg}
              <span className="text-xl font-lora font-normal text-[#23110E]/50 ml-2">kg / mes</span>
            </div>
          </div>

          <input
            type="range"
            min="20" max="1000" step="10"
            value={wasteKg}
            onChange={(e) => {
              setWasteKg(Number(e.target.value));
              setFormData((prev) => ({ ...prev, volume: e.target.value }));
            }}
            className="w-full h-px bg-[#2C4231]/20 appearance-none cursor-pointer accent-[#2C4231]
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4
                       [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-[#2C4231] [&::-webkit-slider-thumb]:cursor-pointer"
          />

          <div className="flex justify-between font-mono text-[9px] text-[#23110E]/35 mt-2.5">
            <span>20 kg · Taller</span>
            <span>250 kg · Marca Mediana</span>
            <span>1,000 kg · Planta</span>
          </div>
        </div>

        {/* Metrics — 4 columns editorial */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#2C4231]/8">
          {[
            {
              label: "Insumos 1:1",
              value: `+${labelsProduced.toLocaleString("es-CO")}`,
              unit: "marquillas tejidas",
              icon: <Tag className="w-3.5 h-3.5" />,
            },
            {
              label: "Ahorro Proyectado",
              value: `~$${(moneySavedCop / 1000000).toFixed(1)}M`,
              unit: "COP vs. insumos vírgenes",
              icon: null,
            },
            {
              label: "Agua Evitada",
              value: `${(waterSavedLiters / 1000).toFixed(0)}k L`,
              unit: "no consumida en cultivo",
              icon: <Droplets className="w-3.5 h-3.5" />,
            },
            {
              label: "Mitigación CO₂",
              value: `-${co2SavedKg.toLocaleString("es-CO")} kg`,
              unit: "emisiones no generadas",
              icon: <Cloud className="w-3.5 h-3.5" />,
            },
          ].map((metric, idx) => (
            <div key={idx} className="bg-[#FAF4E6] p-6 sm:p-8 flex flex-col gap-3">
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[#2C4231]/60">
                {metric.icon}
                <span>{metric.label}</span>
              </div>
              <div className="font-cormorant text-3xl sm:text-4xl font-bold text-[#2C4231] leading-none tabular-nums">
                {metric.value}
              </div>
              <p className="font-lora text-xs text-[#23110E]/50 leading-snug">
                {metric.unit}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 font-mono text-[9px] text-[#23110E]/35 tracking-wider">
          * Fórmulas validadas sobre análisis de ciclo de vida (LCA) para la industria textil colombiana.
        </div>
      </div>

      {/* ── Contact / Form ─────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

        {/* Left: CTA info */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#7B1B1B] font-semibold block mb-3">
              Paso Siguiente
            </span>
            <h3 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#23110E] leading-tight">
              Agenda tu diagnóstico técnico sin costo inicial.
            </h3>
          </div>

          <p className="font-lora text-sm text-[#23110E]/65 leading-[1.75]">
            Coordinamos una sesión con un consultor de NEUMAN para evaluar las composiciones
            de tu planta de corte, pesaje de muestras y viabilidad de insumos de circuito cerrado.
          </p>

          <div className="space-y-4 border-t border-[#2C4231]/10 pt-6">
            {[
              {
                title: "Muestreo in-situ en Bogotá",
                desc: "Revisión física de retazos, composición porcentual y formatos de corte.",
              },
              {
                title: "Acuerdo de Confidencialidad (NDA)",
                desc: "Garantía estricta de protección sobre tus volúmenes y diseños.",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <span className="font-mono text-[9px] text-[#2C4231] mt-0.5 shrink-0">✓</span>
                <div>
                  <strong className="font-lora text-sm font-semibold text-[#23110E] block">
                    {item.title}
                  </strong>
                  <span className="font-lora text-sm text-[#23110E]/60">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 mt-2"
          >
            <span className="font-lora text-sm font-semibold text-[#2C4231] relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#2C4231] group-hover:after:w-full after:transition-[width] after:duration-300">
              Hablar por WhatsApp con un Consultor
            </span>
            <ArrowUpRight className="w-4 h-4 text-[#2C4231] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Right: Form — Sastre Line Style */}
        <div className="lg:col-span-7">
          {formSubmitted ? (
            <div className="py-16 flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#2C4231] flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-[#F5E8C7]" />
              </div>
              <h4 className="font-cormorant text-3xl font-bold text-[#23110E]">
                Solicitud Recibida
              </h4>
              <p className="font-lora text-sm text-[#23110E]/65 max-w-md leading-[1.75]">
                Un consultor técnico de NEUMAN se pondrá en contacto en menos de 24 horas
                para coordinar la auditoría preliminar de tu marca.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="pb-4 border-b border-[#2C4231]/10">
                <h4 className="font-cormorant text-2xl font-bold text-[#23110E]">
                  Solicitud de Diagnóstico B2B
                </h4>
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#23110E]/40 mt-1">
                  Completa los datos de tu empresa
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#23110E]/50 block mb-2">
                    Nombre & Apellido
                  </label>
                  <input
                    type="text" required value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Camila Morales"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#23110E]/50 block mb-2">
                    Empresa / Marca
                  </label>
                  <input
                    type="text" required value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Taller & Co."
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#23110E]/50 block mb-2">
                    Correo Corporativo
                  </label>
                  <input
                    type="email" required value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contacto@tumarca.co"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#23110E]/50 block mb-2">
                    Volumen Mensual Aprox.
                  </label>
                  <select
                    value={formData.volume}
                    onChange={(e) => {
                      setFormData({ ...formData, volume: e.target.value });
                      setWasteKg(Number(e.target.value));
                    }}
                    className={inputClass + " appearance-none cursor-pointer"}
                  >
                    <option value="50">Menos de 50 kg / mes</option>
                    <option value="150">50 a 250 kg / mes</option>
                    <option value="500">250 a 500 kg / mes</option>
                    <option value="1000">Más de 500 kg / mes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#23110E]/50 block mb-2">
                  Principales Materiales / Notas del Taller
                </label>
                <textarea
                  rows={3} value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Ej. Retazos de popelina de algodón y rollos de temporadas previas en bodega..."
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                className="group mt-2 flex items-center gap-3 self-start cursor-pointer"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#7B1B1B] text-[#F5E8C7] transition-colors duration-200 group-hover:bg-[#5C1414]">
                  <Send className="w-3.5 h-3.5" />
                </span>
                <span className="font-lora text-sm font-semibold text-[#7B1B1B] relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#7B1B1B] group-hover:after:w-full after:transition-[width] after:duration-300">
                  Enviar Solicitud de Diagnóstico
                </span>
              </button>
            </form>
          )}
        </div>
      </div>

      <SectionFooterNav
        currentId="diagnostico"
        onSelectSection={onSelectSection}
        onOpenDiagnostic={onOpenDiagnostic}
      />
    </section>
  );
}
