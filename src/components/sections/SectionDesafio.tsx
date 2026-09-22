"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionFooterNav } from "@/components/ui/SectionFooterNav";

interface SectionDesafioProps {
  onSelectSection: (id: string) => void;
  onOpenDiagnostic: () => void;
}

export function SectionDesafio({
  onSelectSection,
  onOpenDiagnostic,
}: SectionDesafioProps) {
  const painPoints = [
    {
      code: "REF-DES-01",
      title: "Valor Perdido",
      metric: "15% – 25%",
      metricLabel: "Pérdida promedio en mesa de corte",
      desc: "Materia prima premium adquirida a precio completo que termina descartada, regalada o rematada a centavos por kilogramo sin generar retorno para la marca.",
    },
    {
      code: "REF-DES-02",
      title: "Falta de Claridad",
      metric: "Ceguera Técnica",
      metricLabel: "Composiciones & Mezclas",
      desc: "Desconocimiento sistemático de los volúmenes reales generados por temporada, tipos exactos de mezclas de fibra y el costo oculto de bodegaje prolongado.",
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
      title: "Falta de Capacidad",
      metric: "Sobrecarga Operativa",
      metricLabel: "Equipos saturados",
      desc: "Equipos de diseño, patronaje y producción absorbidos por el día a día de las colecciones, sin tiempo ni recursos para estructurar proyectos sostenibles.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full text-[#23110E]">
      {/* Swiss Editorial Header */}
      <div className="border-b border-[#2C4231]/15 pb-8 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#2C4231] text-[#F5E8C7] font-mono text-[11px] font-bold tracking-widest">
              01
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#2C4231] font-semibold">
              El Desafío Textil B2B
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#23110E]/60 tracking-wider">
            Diagnóstico Operativo & Fuga de Valor
          </span>
        </div>

        <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#23110E] mt-6 max-w-3xl leading-[1.15]">
          La fuga silenciosa de recursos en la industria de la confección.
        </h2>

        <p className="font-lora text-sm sm:text-base text-[#23110E]/80 mt-4 max-w-2xl leading-relaxed">
          En cada orden de producción, una fracción crítica de la tela comprada se convierte en residuo antes de llegar a la tienda. Sin una estrategia clara, este material se traduce en pasivo financiero y bodegaje improductivo.
        </p>
      </div>

      {/* Swiss Balance of Mass Comparison Table */}
      <div className="bg-[#F5E8C7]/50 rounded-2xl p-6 sm:p-8 border border-[#2C4231]/15 mb-14">
        <div className="flex items-center justify-between border-b border-[#2C4231]/15 pb-3 mb-6">
          <span className="font-mono text-xs uppercase tracking-wider text-[#2C4231] font-bold">
            Balance de Materia en Confección Textil
          </span>
          <span className="font-mono text-[10px] text-[#23110E]/60">
            Fuente: Análisis Sectorial NEUMAN
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-l-2 border-[#2C4231] pl-4">
            <div className="font-mono text-xs text-[#23110E]/60 uppercase tracking-wider">
              Entrada a Corte
            </div>
            <div className="font-cormorant text-3xl font-bold text-[#2C4231] my-1">
              100%
            </div>
            <p className="font-lora text-xs text-[#23110E]/75 leading-relaxed">
              Materia prima comprada a precio comercial completo (rollos de algodón, denim, lino o mezclas).
            </p>
          </div>

          <div className="border-l-2 border-[#2C4231]/40 pl-4">
            <div className="font-mono text-xs text-[#23110E]/60 uppercase tracking-wider">
              Prenda Terminada
            </div>
            <div className="font-cormorant text-3xl font-bold text-[#23110E] my-1">
              75% – 80%
            </div>
            <p className="font-lora text-xs text-[#23110E]/75 leading-relaxed">
              Volumen efectivo transformado en producto comercializado para venta al consumidor final.
            </p>
          </div>

          <div className="border-l-2 border-[#7B1B1B] pl-4 bg-[#7B1B1B]/5 p-3 rounded-r-xl">
            <div className="font-mono text-xs text-[#7B1B1B] uppercase tracking-wider font-bold">
              Residuos de Corte & Sobrantes
            </div>
            <div className="font-cormorant text-3xl font-bold text-[#7B1B1B] my-1">
              15% – 25%
            </div>
            <p className="font-lora text-xs text-[#23110E]/80 leading-relaxed font-medium">
              Retazos, orillos y despuntes que se acumulan en bodegas o terminan en vertederos sin plan de rescate.
            </p>
          </div>
        </div>
      </div>

      {/* The 4 Core Pain Points (From Slide 3) */}
      <div className="mb-14">
        <div className="mb-6 flex items-baseline justify-between border-b border-[#2C4231]/10 pb-2">
          <h3 className="font-cormorant text-2xl font-bold text-[#23110E]">
            Los 4 Dolores Estructurales de las Marcas
          </h3>
          <span className="font-mono text-[11px] text-[#2C4231] font-medium">
            Diagnóstico de Barreras Internas
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {painPoints.map((point, idx) => (
            <div
              key={idx}
              className="bg-white/80 rounded-2xl p-6 sm:p-7 border border-[#2C4231]/15 shadow-sm hover:border-[#2C4231]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#2C4231]/10 pb-3 mb-4">
                  <span className="font-mono text-[10px] text-[#2C4231] font-bold tracking-widest bg-[#2C4231]/5 px-2 py-0.5 rounded">
                    {point.code}
                  </span>
                  <span className="font-mono text-xs text-[#7B1B1B] font-semibold">
                    {point.metric}
                  </span>
                </div>

                <h4 className="font-cormorant text-xl font-bold text-[#23110E]">
                  {point.title}
                </h4>
                <div className="font-mono text-[11px] text-[#2C4231] font-medium mt-0.5 mb-3">
                  {point.metricLabel}
                </div>

                <p className="font-lora text-xs sm:text-sm text-[#23110E]/80 leading-relaxed">
                  {point.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#2C4231]/10 flex items-center justify-between text-[11px] font-mono text-[#23110E]/50">
                <span>Evaluación B2B</span>
                <span>Bogotá D.C.</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editorial Pull Quote / Sastre Insight */}
      <div className="bg-[#2C4231] text-[#F5E8C7] rounded-2xl p-8 sm:p-10 mb-10 border border-[#2C4231] shadow-xl">
        <div className="max-w-3xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#F5E8C7]/70 font-semibold block mb-3">
            El Enfoque de Consultoría NEUMAN
          </span>
          <blockquote className="font-cormorant text-xl sm:text-2xl font-bold text-[#F5E8C7] leading-snug">
            “No se trata de reciclar por cumplir una etiqueta. Se trata de recuperar el valor financiero y técnico de cada metro de tela que tu empresa ya pagó.”
          </blockquote>
          <p className="font-lora text-xs sm:text-sm text-[#F5E8C7]/80 mt-4 leading-relaxed">
            Nuestro trabajo como consultora es auditar con precisión de sastre ese flujo de materiales, clasificarlo y diseñar una hoja de ruta con retornos tangibles.
          </p>
        </div>
      </div>

      {/* Bottom Continuity Navigation */}
      <SectionFooterNav
        currentId="desafio"
        onSelectSection={onSelectSection}
        onOpenDiagnostic={onOpenDiagnostic}
      />
    </section>
  );
}
