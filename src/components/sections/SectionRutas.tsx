"use client";

import React, { useState } from "react";
import { SectionFooterNav } from "@/components/ui/SectionFooterNav";
import { Tag, Sparkles, RefreshCw, Scissors, PackageCheck, Layers } from "lucide-react";

interface SectionRutasProps {
  onSelectSection: (id: string) => void;
  onOpenDiagnostic: () => void;
}

export function SectionRutas({
  onSelectSection,
  onOpenDiagnostic,
}: SectionRutasProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const routes = [
    {
      id: "insumos",
      code: "RUT-01-INS",
      title: "Insumos Técnicos de Sastre 1:1",
      category: "Circuito Cerrado Directo",
      materials: "Retazos de corte de algodón, denim, lino y sedas",
      solution: "Transformación en marquillas tejidas en telar jacquard, hangtags en papel textil germinable, sesgos de terminación y bolsas protectoras de entrega.",
      benefit: "Sustituye la compra recurrente de insumos importados vírgenes con tus propios sobrantes textiles.",
      metric: "1 kg de residuo ≈ 280 marquillas tejidas",
      tag: "Alta Rentabilidad B2B",
    },
    {
      id: "reciclaje",
      code: "RUT-02-REC",
      title: "Reciclaje Mecánico & Hilatura",
      category: "Fibra a Fibra",
      materials: "Retazos monomaterial (algodón 100%, mezclas algodón-poliéster)",
      solution: "Protocolo de clasificación por tono, desfibrado mecánico sin tintes químicos adicionales y mezcla con fibra de soporte para hilatura técnica.",
      benefit: "Generación de nuevo hilo para tejido de punto o plano sin consumir agua de cultivo ni agroquímicos.",
      metric: "Hasta -85% en huella hídrica",
      tag: "Impacto ESG Auditado",
    },
    {
      id: "upcycling",
      code: "RUT-03-UPC",
      title: "Reutilización & Upcycling Estructurado",
      category: "Diseño Circular",
      materials: "Orillos, piezas con tara menor, sobrantes de paño y dril",
      solution: "Patronaje modular y co-diseño de accesorios corporativos (porta-documentos, totes, packaging premium) y cápsulas de edición limitada.",
      benefit: "Retención del 100% del valor de la tela sin necesidad de procesos de triturado.",
      metric: "0 Kwh de procesamiento mecánico",
      tag: "Relato de Marca",
    },
    {
      id: "deadstock",
      code: "RUT-04-STK",
      title: "Monetización de Rollos & Deadstock",
      category: "Gestión de Inventario",
      materials: "Rollos obsoletos, metros sobrantes de colecciones pasadas",
      solution: "Auditoría de inventario inactivo, re-clasificación arancelaria/técnica y colocación estratégica en redes de confección o proyectos institucionales.",
      benefit: "Conversión de inventario depreciado y espacio de almacenamiento en capital de trabajo líquido.",
      metric: "Liberación inmediata de m² en bodega",
      tag: "Retorno Financiero Rápido",
    },
  ];

  const materialMatrix = [
    { fiber: "Algodón 100% (Popelinas, Driles)", routeRecommended: "Insumos de Sastre (Marquillas) + Desfibrado Hilatura", viability: "Alta (95%)" },
    { fiber: "Denim Índigo (Pesado & Liviano)", routeRecommended: "Marquillas Jacquard + Upcycling en Accesorios", viability: "Alta (98%)" },
    { fiber: "Mezclas Algodón / Poliéster", routeRecommended: "Hilatura Recuperada para Relleno o Tejido Técnico", viability: "Media-Alta (85%)" },
    { fiber: "Linos Nobles & Fibras Vegetales", routeRecommended: "Papel Textil para Hangtags Germinables", viability: "Muy Alta (92%)" },
    { fiber: "Seda & Tejidos Finos de Autor", routeRecommended: "Sesgos, vivos de costura y detalles de acabado", viability: "Alta (90%)" },
  ];

  const filteredRoutes = activeFilter === "all" 
    ? routes 
    : routes.filter(r => r.id === activeFilter);

  return (
    <section className="py-16 sm:py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full text-[#23110E]">
      {/* Swiss Editorial Header */}
      <div className="border-b border-[#2C4231]/15 pb-8 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#2C4231] text-[#F5E8C7] font-mono text-[11px] font-bold tracking-widest">
              03
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#2C4231] font-semibold">
              Rutas de Valorización
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#23110E]/60 tracking-wider">
            Matriz de Alternativas Circulares & Conversión de Insumos
          </span>
        </div>

        <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#23110E] mt-6 max-w-3xl leading-[1.15]">
          Cada material tiene un destino de mayor valor que el vertedero.
        </h2>

        <p className="font-lora text-sm sm:text-base text-[#23110E]/80 mt-4 max-w-2xl leading-relaxed">
          En NEUMAN no creemos en soluciones únicas. Analizamos la composición, el volumen y la calidad de tus retazos y excedentes para estructurar la ruta que mayor retorno económico y ambiental genere para tu marca.
        </p>
      </div>

      {/* Filter Tabs (Swiss Style) */}
      <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-[#2C4231]/10 pb-4">
        <span className="font-mono text-xs uppercase text-[#23110E]/60 tracking-wider mr-2 font-semibold">
          Filtrar Vía:
        </span>
        {[
          { key: "all", label: "Todas las Rutas" },
          { key: "insumos", label: "Insumos 1:1" },
          { key: "reciclaje", label: "Reciclaje Mecánico" },
          { key: "upcycling", label: "Upcycling" },
          { key: "deadstock", label: "Deadstock & Saldos" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              activeFilter === tab.key
                ? "bg-[#2C4231] text-[#F5E8C7] font-bold shadow-xs"
                : "bg-white/70 text-[#23110E]/70 hover:bg-white hover:text-[#23110E] border border-[#2C4231]/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* The 4 Routes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {filteredRoutes.map((route, rIdx) => (
          <div
            key={rIdx}
            className="bg-white/90 rounded-2xl p-6 sm:p-8 border border-[#2C4231]/15 shadow-sm hover:border-[#2C4231]/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#2C4231]/10 pb-3 mb-4">
                <span className="font-mono text-[10px] font-bold text-[#2C4231] tracking-widest bg-[#2C4231]/5 px-2.5 py-0.5 rounded">
                  {route.code}
                </span>
                <span className="font-mono text-[10px] font-bold text-[#7B1B1B] uppercase tracking-wider">
                  {route.tag}
                </span>
              </div>

              <div className="font-mono text-[11px] text-[#2C4231] font-semibold mb-1">
                {route.category}
              </div>
              <h3 className="font-cormorant text-2xl font-bold text-[#23110E] mb-3">
                {route.title}
              </h3>

              <div className="bg-[#FAF4E6] p-3 rounded-xl border border-[#2C4231]/10 mb-4 text-xs font-mono text-[#23110E]/80">
                <span className="font-bold text-[#2C4231] block mb-0.5">Materia Prima Aplicable:</span>
                <span>{route.materials}</span>
              </div>

              <p className="font-lora text-xs sm:text-sm text-[#23110E]/85 leading-relaxed mb-4">
                {route.solution}
              </p>

              <div className="border-t border-[#2C4231]/10 pt-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#23110E]/60 block mb-0.5 font-bold">
                  Beneficio Clave para la Marca:
                </span>
                <p className="font-lora text-xs text-[#2C4231] font-medium leading-relaxed">
                  {route.benefit}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#2C4231]/15 flex items-center justify-between font-mono text-xs">
              <span className="text-[#23110E]/60 text-[11px]">Rendimiento Estimado:</span>
              <span className="font-bold text-[#2C4231]">{route.metric}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Swiss Material Feasibility Table */}
      <div className="bg-[#F5E8C7]/50 rounded-2xl p-6 sm:p-8 border border-[#2C4231]/15 mb-14">
        <div className="flex items-center justify-between border-b border-[#2C4231]/15 pb-3 mb-6">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#7B1B1B] font-bold block mb-0.5">
              Guía de Materiales
            </span>
            <h4 className="font-cormorant text-xl font-bold text-[#23110E]">
              Matriz de Compatibilidad de Fibras
            </h4>
          </div>
          <span className="font-mono text-[10px] text-[#23110E]/60 hidden sm:block">
            Taller Experimental NEUMAN
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-lora">
            <thead>
              <tr className="border-b border-[#2C4231]/20 font-mono text-[10px] uppercase text-[#2C4231] tracking-wider">
                <th className="py-2.5 pr-4">Tipo de Fibra / Composición</th>
                <th className="py-2.5 px-4">Ruta Óptima Recomendada</th>
                <th className="py-2.5 pl-4 text-right">Viabilidad Técnica</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2C4231]/10">
              {materialMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/40 transition-colors">
                  <td className="py-3 pr-4 font-semibold text-[#23110E]">
                    {row.fiber}
                  </td>
                  <td className="py-3 px-4 text-[#23110E]/80">
                    {row.routeRecommended}
                  </td>
                  <td className="py-3 pl-4 text-right font-mono font-bold text-[#2C4231]">
                    {row.viability}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Continuity Navigation */}
      <SectionFooterNav
        currentId="rutas"
        onSelectSection={onSelectSection}
        onOpenDiagnostic={onOpenDiagnostic}
      />
    </section>
  );
}
