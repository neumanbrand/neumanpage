"use client";

import React, { useState } from "react";
import { SectionFooterNav } from "@/components/ui/SectionFooterNav";
import { Tag, Sparkles, Droplets, Cloud, Scale, MessageSquare, ArrowUpRight, Send, CheckCircle2 } from "lucide-react";

interface SectionDiagnosticoProps {
  onSelectSection: (id: string) => void;
  onOpenDiagnostic: () => void;
}

export function SectionDiagnostico({
  onSelectSection,
  onOpenDiagnostic,
}: SectionDiagnosticoProps) {
  const [wasteKg, setWasteKg] = useState<number>(150);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    volume: "150",
    message: "",
  });

  // Projection Calculations
  const labelsProduced = Math.round(wasteKg * 280);
  const waterSavedLiters = Math.round(wasteKg * 2500);
  const co2SavedKg = Math.round(wasteKg * 14.5);
  const moneySavedCop = Math.round(wasteKg * 280 * 220);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const whatsappUrl = `https://wa.me/573001234567?text=Hola%20NEUMAN,%20quiero%20agendar%20un%20diagnóstico%20técnico%20de%20residuos%20textiles%20para%20mi%20empresa.%20Volumen%20estimado:%20${wasteKg}%20kg/mes.`;

  return (
    <section className="py-16 sm:py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full text-[#23110E]">
      {/* Swiss Editorial Header */}
      <div className="border-b border-[#2C4231]/15 pb-8 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#2C4231] text-[#F5E8C7] font-mono text-[11px] font-bold tracking-widest">
              05
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#2C4231] font-semibold">
              Diagnóstico & Impacto
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#23110E]/60 tracking-wider">
            Calculadora B2B · Solicitud de Auditoría en Bogotá
          </span>
        </div>

        <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#23110E] mt-6 max-w-3xl leading-[1.15]">
          Calcula el retorno de tus materiales y agenda tu diagnóstico técnico.
        </h2>

        <p className="font-lora text-sm sm:text-base text-[#23110E]/80 mt-4 max-w-2xl leading-relaxed">
          Cuantifica el potencial económico y ambiental de tus retazos de corte y da el primer paso hacia una estrategia de valorización a la medida de tu producción.
        </p>
      </div>

      {/* Part A: Interactive Calculator Box */}
      <div className="bg-white/95 rounded-3xl p-6 sm:p-10 border border-[#2C4231]/15 shadow-xl mb-16">
        <div className="flex items-center justify-between border-b border-[#2C4231]/10 pb-4 mb-8">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#7B1B1B] font-bold block mb-1">
              Simulador Ejecutivo
            </span>
            <h3 className="font-cormorant text-2xl font-bold text-[#23110E]">
              Proyección Mensual de Rendimiento
            </h3>
          </div>
          <span className="font-mono text-xs text-[#2C4231] font-bold bg-[#2C4231]/5 px-3 py-1 rounded-full">
            Muestreo Bogotá
          </span>
        </div>

        {/* Slider */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#23110E]/80 font-bold">
              Volumen Estimado Mensual de Retazos & Excedentes:
            </span>
            <div className="font-cormorant text-3xl font-bold text-[#2C4231]">
              {wasteKg} <span className="text-sm font-lora font-normal text-[#23110E]/70">Kg / mes</span>
            </div>
          </div>

          <input
            type="range"
            min="20"
            max="1000"
            step="10"
            value={wasteKg}
            onChange={(e) => {
              setWasteKg(Number(e.target.value));
              setFormData((prev) => ({ ...prev, volume: e.target.value }));
            }}
            className="w-full h-3 bg-[#2C4231]/15 rounded-lg appearance-none cursor-pointer accent-[#2C4231] border border-[#2C4231]/20"
          />

          <div className="flex justify-between text-[11px] font-mono text-[#23110E]/60 mt-2">
            <span>20 Kg (Taller de Autor)</span>
            <span>250 Kg (Marca Mediana)</span>
            <span>1,000 Kg (Planta Confección)</span>
          </div>
        </div>

        {/* 4 Projected Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#FAF4E6] p-5 rounded-2xl border border-[#2C4231]/10 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-2 text-[#2C4231]">
              <Tag className="w-4 h-4" />
              <span className="text-xs font-mono uppercase font-bold tracking-wider">
                Insumos 1:1
              </span>
            </div>
            <div className="font-cormorant text-3xl font-bold text-[#2C4231] my-1">
              +{labelsProduced.toLocaleString("es-CO")}
            </div>
            <p className="text-[11px] font-lora text-[#23110E]/70">
              Marquillas tejidas en telar propio
            </p>
          </div>

          <div className="bg-[#FAF4E6] p-5 rounded-2xl border border-[#2C4231]/10 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-2 text-[#2C4231]">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-mono uppercase font-bold tracking-wider">
                Ahorro Proyectado
              </span>
            </div>
            <div className="font-cormorant text-3xl font-bold text-[#2C4231] my-1">
              ~${(moneySavedCop / 1000000).toFixed(1)}M
            </div>
            <p className="text-[11px] font-lora text-[#23110E]/70">
              COP vs insumos comerciales vírgenes
            </p>
          </div>

          <div className="bg-[#FAF4E6] p-5 rounded-2xl border border-[#2C4231]/10 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-2 text-[#2C4231]">
              <Droplets className="w-4 h-4" />
              <span className="text-xs font-mono uppercase font-bold tracking-wider">
                Agua Evitada
              </span>
            </div>
            <div className="font-cormorant text-3xl font-bold text-[#2C4231] my-1">
              {(waterSavedLiters / 1000).toFixed(0)}k Lts
            </div>
            <p className="text-[11px] font-lora text-[#23110E]/70">
              Agua no consumida en cultivo virgen
            </p>
          </div>

          <div className="bg-[#FAF4E6] p-5 rounded-2xl border border-[#2C4231]/10 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-2 text-[#2C4231]">
              <Cloud className="w-4 h-4" />
              <span className="text-xs font-mono uppercase font-bold tracking-wider">
                Mitigación CO₂
              </span>
            </div>
            <div className="font-cormorant text-3xl font-bold text-[#2C4231] my-1">
              -{co2SavedKg.toLocaleString("es-CO")} Kg
            </div>
            <p className="text-[11px] font-lora text-[#23110E]/70">
              Emisiones no generadas en vertedero
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#23110E]/70 pt-2 border-t border-[#2C4231]/10">
          <Scale className="w-4 h-4 text-[#2C4231] shrink-0" />
          <span>Fórmulas validadas sobre análisis de ciclo de vida (LCA) para la industria textil colombiana.</span>
        </div>
      </div>

      {/* Part B: Direct B2B Contact & Consultation Scheduler */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-10">
        
        {/* Left Column: Direct Consultation Info */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#7B1B1B] font-bold">
            Paso Siguiente
          </span>
          <h3 className="font-cormorant text-3xl font-bold text-[#23110E] leading-tight">
            Agenda tu diagnóstico técnico sin costo inicial.
          </h3>
          <p className="font-lora text-xs sm:text-sm text-[#23110E]/80 leading-relaxed">
            Coordinamos una sesión con un consultor de NEUMAN para evaluar las composiciones de tu planta de corte, pesaje de muestras y viabilidad de insumos de circuito cerrado.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 bg-white/80 p-4 rounded-xl border border-[#2C4231]/15">
              <CheckCircle2 className="w-4 h-4 text-[#2C4231] shrink-0 mt-0.5" />
              <div className="text-xs font-lora text-[#23110E]/80">
                <strong className="text-[#23110E] block font-semibold">Muestreo in-situ en Bogotá:</strong>
                Revisión física de retazos, composición porcentual y formatos de corte.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/80 p-4 rounded-xl border border-[#2C4231]/15">
              <CheckCircle2 className="w-4 h-4 text-[#2C4231] shrink-0 mt-0.5" />
              <div className="text-xs font-lora text-[#23110E]/80">
                <strong className="text-[#23110E] block font-semibold">Acuerdo de Confidencialidad (NDA):</strong>
                Garantía estricta de protección sobre tus volúmenes y diseños.
              </div>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#2C4231] text-[#F5E8C7] hover:bg-[#1E2E22] font-lora font-semibold text-xs uppercase tracking-wider transition-all shadow-md group mt-2"
          >
            <MessageSquare className="w-4 h-4 text-[#F5E8C7]" />
            <span>Hablar por WhatsApp con un Consultor</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Right Column: Direct Form */}
        <div className="lg:col-span-7 bg-white/90 p-7 sm:p-9 rounded-3xl border border-[#2C4231]/15 shadow-xl">
          {formSubmitted ? (
            <div className="py-12 text-center">
              <div className="w-12 h-12 rounded-full bg-[#2C4231] text-[#F5E8C7] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-cormorant text-2xl font-bold text-[#23110E]">
                Solicitud Recibida con Éxito
              </h4>
              <p className="font-lora text-xs sm:text-sm text-[#23110E]/80 mt-2 max-w-md mx-auto">
                Un consultor técnico de NEUMAN se pondrá en contacto en menos de 24 horas para coordinar la auditoría preliminar de tu marca.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-[#2C4231]/10 pb-3 mb-4">
                <h4 className="font-cormorant text-xl font-bold text-[#23110E]">
                  Solicitud de Diagnóstico B2B
                </h4>
                <p className="font-mono text-[10px] text-[#23110E]/60">
                  Completa los datos de tu empresa para preparar la sesión técnica.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#23110E]/70 mb-1 font-semibold">
                    Nombre & Apellido
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej. Camila Morales"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#2C4231]/20 bg-[#FAF4E6]/50 text-xs font-lora focus:outline-none focus:border-[#2C4231]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#23110E]/70 mb-1 font-semibold">
                    Empresa / Marca
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Ej. Taller & Co."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#2C4231]/20 bg-[#FAF4E6]/50 text-xs font-lora focus:outline-none focus:border-[#2C4231]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#23110E]/70 mb-1 font-semibold">
                    Correo Corporativo
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contacto@tumarca.co"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#2C4231]/20 bg-[#FAF4E6]/50 text-xs font-lora focus:outline-none focus:border-[#2C4231]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#23110E]/70 mb-1 font-semibold">
                    Volumen Mensual Aprox.
                  </label>
                  <select
                    value={formData.volume}
                    onChange={(e) => {
                      setFormData({ ...formData, volume: e.target.value });
                      setWasteKg(Number(e.target.value));
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#2C4231]/20 bg-[#FAF4E6]/50 text-xs font-lora focus:outline-none focus:border-[#2C4231]"
                  >
                    <option value="50">Menos de 50 Kg / mes</option>
                    <option value="150">50 a 250 Kg / mes</option>
                    <option value="500">250 a 500 Kg / mes</option>
                    <option value="1000">Más de 500 Kg / mes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#23110E]/70 mb-1 font-semibold">
                  Principales Materiales / Notas del Taller
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Ej. Retazos de popelina de algodón y rollos de temporadas previas en bodega..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#2C4231]/20 bg-[#FAF4E6]/50 text-xs font-lora focus:outline-none focus:border-[#2C4231] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#7B1B1B] text-[#F5E8C7] hover:bg-[#5C1414] font-lora text-xs uppercase tracking-wider font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-[#F5E8C7]" />
                <span>Enviar Solicitud de Diagnóstico</span>
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Bottom Continuity Navigation */}
      <SectionFooterNav
        currentId="diagnostico"
        onSelectSection={onSelectSection}
        onOpenDiagnostic={onOpenDiagnostic}
      />
    </section>
  );
}
