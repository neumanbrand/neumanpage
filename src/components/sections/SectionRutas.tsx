"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionFooterNav } from "@/components/ui/SectionFooterNav";

interface SectionRutasProps {
  onSelectSection: (id: string) => void;
  onOpenDiagnostic: () => void;
}

const routes = [
  {
    id: "insumos",
    code: "RUT-01",
    label: "Insumos 1:1",
    category: "Circuito Cerrado Directo",
    title: "Insumos Técnicos de Sastre 1:1",
    materials: "Retazos de corte de algodón, denim, lino y sedas",
    solution: "Transformación en marquillas tejidas en telar jacquard, hangtags en papel textil germinable, sesgos de terminación y bolsas protectoras de entrega.",
    benefit: "Sustituye la compra recurrente de insumos importados vírgenes con tus propios sobrantes textiles.",
    metric: "1 kg ≈ 280 marquillas tejidas",
    tag: "Alta Rentabilidad B2B",
  },
  {
    id: "reciclaje",
    code: "RUT-02",
    label: "Reciclaje",
    category: "Fibra a Fibra",
    title: "Reciclaje Mecánico & Hilatura",
    materials: "Retazos monomaterial (algodón 100%, mezclas algodón-poliéster)",
    solution: "Clasificación por tono, desfibrado mecánico sin tintes adicionales y mezcla con fibra de soporte para hilatura técnica recuperada.",
    benefit: "Nuevo hilo para tejido de punto o plano sin consumir agua de cultivo ni agroquímicos.",
    metric: "Hasta −85% en huella hídrica",
    tag: "Impacto ESG Auditado",
  },
  {
    id: "upcycling",
    code: "RUT-03",
    label: "Upcycling",
    category: "Diseño Circular",
    title: "Reutilización & Upcycling Estructurado",
    materials: "Orillos, piezas con tara menor, sobrantes de paño y dril",
    solution: "Patronaje modular y co-diseño de accesorios corporativos (porta-documentos, totes, packaging premium) y cápsulas de edición limitada.",
    benefit: "Retención del 100% del valor de la tela sin procesos de triturado.",
    metric: "0 kWh de procesamiento mecánico",
    tag: "Relato de Marca",
  },
  {
    id: "deadstock",
    code: "RUT-04",
    label: "Deadstock",
    category: "Gestión de Inventario",
    title: "Monetización de Rollos & Deadstock",
    materials: "Rollos obsoletos, metros sobrantes de colecciones pasadas",
    solution: "Auditoría de inventario inactivo, re-clasificación técnica y colocación estratégica en redes de confección o proyectos institucionales.",
    benefit: "Conversión de inventario depreciado en capital de trabajo líquido.",
    metric: "Liberación inmediata de m² en bodega",
    tag: "Retorno Financiero Rápido",
  },
];

const materialMatrix = [
  { fiber: "Algodón 100% (Popelinas, Driles)",    route: "Insumos de Sastre + Desfibrado Hilatura",       viability: "95%" },
  { fiber: "Denim Índigo (Pesado & Liviano)",      route: "Marquillas Jacquard + Upcycling en Accesorios", viability: "98%" },
  { fiber: "Mezclas Algodón / Poliéster",          route: "Hilatura Recuperada para Tejido Técnico",       viability: "85%" },
  { fiber: "Linos Nobles & Fibras Vegetales",      route: "Papel Textil para Hangtags Germinables",        viability: "92%" },
  { fiber: "Seda & Tejidos Finos de Autor",        route: "Sesgos, vivos de costura y acabados",           viability: "90%" },
];

const filterOptions = [
  { key: "all",       label: "Todas" },
  { key: "insumos",   label: "Insumos 1:1" },
  { key: "reciclaje", label: "Reciclaje" },
  { key: "upcycling", label: "Upcycling" },
  { key: "deadstock", label: "Deadstock" },
];

export function SectionRutas({ onSelectSection, onOpenDiagnostic }: SectionRutasProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filtered = activeFilter === "all" ? routes : routes.filter((r) => r.id === activeFilter);

  return (
    <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full text-[#23110E]">

      {/* ── Section Header ─────────────────────────────── */}
      <header className="border-b border-[#2C4231]/15 pb-10 mb-16">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#2C4231]/60">03 /</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#2C4231] font-semibold">
              Rutas de Valorización
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#23110E]/40 tracking-widest hidden sm:block">
            Matriz de Alternativas Circulares
          </span>
        </div>

        <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold text-[#23110E] max-w-3xl leading-[1.08] tracking-tight">
          Cada material tiene un destino<br className="hidden sm:block" /> de mayor valor.
        </h2>

        <p className="font-lora text-base text-[#23110E]/65 mt-6 max-w-xl leading-[1.75]">
          Analizamos la composición, el volumen y la calidad de tus retazos y excedentes para
          estructurar la ruta que mayor retorno económico y ambiental genere para tu marca.
        </p>
      </header>

      {/* ── Filter Bar — Sastre Stamps ─────────────────── */}
      <div className="flex flex-wrap items-center gap-2 mb-12">
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#23110E]/40 mr-2">
          Filtrar:
        </span>
        {filterOptions.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setActiveFilter(opt.key)}
            className={`px-4 py-1.5 border font-mono text-[9px] uppercase tracking-[0.2em] transition-all duration-200 cursor-pointer ${
              activeFilter === opt.key
                ? "border-[#2C4231] bg-[#2C4231] text-[#F5E8C7]"
                : "border-[#2C4231]/25 text-[#23110E]/60 hover:border-[#2C4231]/60 hover:text-[#23110E]"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* ── Routes Grid ────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#2C4231]/8 mb-20"
        >
          {filtered.map((route, rIdx) => (
            <div
              key={rIdx}
              className="bg-[#FAF4E6] p-8 sm:p-10 flex flex-col gap-5 hover:bg-[#F5E8C7] transition-colors duration-300"
            >
              {/* Top meta */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#2C4231]/50">
                    {route.code}
                  </span>
                  <span className="w-px h-3 bg-[#2C4231]/20" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#2C4231] font-semibold">
                    {route.category}
                  </span>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#7B1B1B] font-semibold shrink-0">
                  {route.tag}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#23110E] leading-tight">
                {route.title}
              </h3>

              {/* Material chip */}
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#23110E]/50 leading-relaxed">
                Materia aplicable: <span className="text-[#23110E]/75 normal-case font-lora not-italic text-xs">{route.materials}</span>
              </div>

              {/* Solution */}
              <p className="font-lora text-sm text-[#23110E]/70 leading-[1.75]">
                {route.solution}
              </p>

              {/* Benefit + metric */}
              <div className="pt-4 border-t border-[#2C4231]/10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <p className="font-lora text-sm text-[#2C4231] font-medium leading-relaxed">
                  {route.benefit}
                </p>
                <span className="font-mono text-xs font-bold text-[#2C4231] shrink-0 whitespace-nowrap">
                  {route.metric}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* ── Fiber Compatibility Table — Atelier Spec Sheet ─ */}
      <div className="mb-20">
        <div className="flex items-baseline justify-between mb-6 pb-3 border-b border-[#2C4231]/10">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#7B1B1B] font-semibold block mb-1">
              Guía Técnica de Materiales
            </span>
            <h4 className="font-cormorant text-2xl font-bold text-[#23110E]">
              Matriz de Compatibilidad de Fibras
            </h4>
          </div>
          <span className="font-mono text-[9px] text-[#23110E]/40 hidden sm:block">
            Taller Experimental NEUMAN
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#2C4231]/15">
                <th className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#2C4231] pb-3 pr-6 font-semibold">
                  Tipo de Fibra / Composición
                </th>
                <th className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#2C4231] pb-3 px-6 font-semibold">
                  Ruta Óptima Recomendada
                </th>
                <th className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#2C4231] pb-3 pl-6 text-right font-semibold">
                  Viabilidad
                </th>
              </tr>
            </thead>
            <tbody>
              {materialMatrix.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-[#2C4231]/8 hover:bg-[#2C4231]/3 transition-colors"
                >
                  <td className="font-lora text-sm font-semibold text-[#23110E] py-4 pr-6">
                    {row.fiber}
                  </td>
                  <td className="font-lora text-sm text-[#23110E]/70 py-4 px-6">
                    {row.route}
                  </td>
                  <td className="font-mono text-sm font-bold text-[#2C4231] py-4 pl-6 text-right">
                    {row.viability}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <SectionFooterNav
        currentId="rutas"
        onSelectSection={onSelectSection}
        onOpenDiagnostic={onOpenDiagnostic}
      />
    </section>
  );
}
