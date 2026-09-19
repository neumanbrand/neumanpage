"use client";

import React, { useState } from "react";
import { Tag, Sparkles, Droplets, Cloud, ArrowDown, Bookmark, ShoppingBag } from "lucide-react";

interface ChapterProps {
  onNext?: () => void;
}

export function Chapter3Structure({ onNext }: ChapterProps) {
  const [wasteKg, setWasteKg] = useState(120);

  // Real-time impact calculations
  const labelsProduced = Math.round(wasteKg * 280);
  const waterSavedLiters = Math.round(wasteKg * 2500);
  const moneySavedCop = Math.round(wasteKg * 280 * 220);
  const co2SavedKg = Math.round(wasteKg * 14.5);

  return (
    <div className="flex flex-col gap-4 select-none">
      {/* Top Capsule */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#2C4231]/15 text-[#2C4231] text-[11px] font-mono tracking-widest uppercase font-semibold shadow-xs self-start">
        <Tag className="w-3.5 h-3.5 text-[#2C4231]" />
        <span>03 / 04 • Forma & Productos</span>
      </div>

      <div>
        <h2 className="font-cormorant text-lg sm:text-xl font-bold text-[#23110E] leading-tight">
          Insumos de alta costura <span className="italic font-normal text-[#2C4231]">& retorno ESG</span>.
        </h2>
        <p className="font-lora text-xs text-[#23110E]/80 mt-1 leading-relaxed">
          Tus retazos se transforman en marquillas satín de tacto suave, hangtags con semillas germinables y empaques circulares para tus colecciones.
        </p>
      </div>

      {/* Embedded Interactive Impact Calculator */}
      <div className="p-4 rounded-2xl bg-white/90 border border-[#2C4231]/15 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase text-[#2C4231] font-bold">
            Residuos Textiles por Mes:
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-[#2C4231] text-[#F5E8C7] font-mono text-xs font-bold shadow-xs">
            {wasteKg} Kg
          </span>
        </div>

        {/* Range Slider */}
        <input
          type="range"
          min={20}
          max={400}
          step={10}
          value={wasteKg}
          onChange={(e) => setWasteKg(Number(e.target.value))}
          className="w-full accent-[#2C4231] cursor-pointer"
        />

        {/* 4 Impact Grid Boxes */}
        <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[10px]">
          <div className="p-2.5 rounded-xl bg-[#FAF4E6] border border-[#2C4231]/10">
            <div className="flex items-center gap-1.5 text-[#2C4231]">
              <Tag className="w-3.5 h-3.5" />
              <span className="font-bold text-xs">+{labelsProduced.toLocaleString("es-CO")}</span>
            </div>
            <span className="text-[#23110E]/70 block mt-0.5">Marquillas listas</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#FAF4E6] border border-[#2C4231]/10">
            <div className="flex items-center gap-1.5 text-[#2C4231]">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-bold text-xs">${(moneySavedCop / 1000000).toFixed(1)}M COP</span>
            </div>
            <span className="text-[#23110E]/70 block mt-0.5">Ahorro proyectado</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#FAF4E6] border border-[#2C4231]/10">
            <div className="flex items-center gap-1.5 text-[#2C4231]">
              <Droplets className="w-3.5 h-3.5" />
              <span className="font-bold text-xs">{(waterSavedLiters / 1000).toFixed(0)}k Lts</span>
            </div>
            <span className="text-[#23110E]/70 block mt-0.5">Agua preservada</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#FAF4E6] border border-[#2C4231]/10">
            <div className="flex items-center gap-1.5 text-[#2C4231]">
              <Cloud className="w-3.5 h-3.5" />
              <span className="font-bold text-xs">-{co2SavedKg} Kg CO₂</span>
            </div>
            <span className="text-[#23110E]/70 block mt-0.5">Mitigación neta</span>
          </div>
        </div>
      </div>

      {/* Bottom Action Prompt */}
      <div className="pt-1 flex items-center justify-between">
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#2C4231] hover:text-[#1E2E22] font-semibold transition-colors cursor-pointer group"
        >
          <span>Avanzar a certificación y contacto</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
