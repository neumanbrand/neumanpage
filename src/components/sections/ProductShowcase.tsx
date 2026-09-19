"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tag, Bookmark, Scissors, ShoppingBag, CheckCircle2, Sparkles } from "lucide-react";

export function ProductShowcase() {
  const [activeTab, setActiveTab] = useState(0);

  const products = [
    {
      id: "marquillas",
      name: "Marquillas Tejidas Satín Jacquard",
      category: "Branding de Sastre",
      icon: <Tag className="w-4 h-4" />,
      tagline: "El sello de sostenibilidad cosido al cuello de tu prenda",
      desc: "Tejidas con hilo desfibrado a partir de tus propios retazos de algodón, lino y denim. Textura ultra suave que no irrita la piel, bordadas con la identidad de tu marca.",
      specs: ["100% de tus retazos de mesa de corte", "Anchos calibrados de 15mm a 55mm", "Acabado satín ultra fino o tafetán"],
      wasteOrigin: "Retazos de popelina, chambray y denim",
    },
    {
      id: "hangtags",
      name: "Hangtags con Semilla Germinable",
      category: "Etiquetas Vivas",
      icon: <Bookmark className="w-4 h-4" />,
      tagline: "Papel artesanal de pulpa textil que florece",
      desc: "Etiquetas colgantes rígidas fabricadas con pulpa obtenida de tus residuos textiles combinada con semillas germinables de flores y hortalizas. El cliente final siembra la etiqueta en lugar de botarla.",
      specs: ["Gramaje 380-450g", "Bordes refilados o rústicos de sastre", "Código QR de trazabilidad impreso con tintas al agua"],
      wasteOrigin: "Sobrantes de lino crudo, seda y mezclas nobles",
    },
    {
      id: "sesgos",
      name: "Sesgos & Ribs de Terminación",
      category: "Insumos Técnicos",
      icon: <Scissors className="w-4 h-4" />,
      tagline: "Acabados internos de sastrería de alta gama",
      desc: "Cintas al sesgo cortadas al bies para remates de solapas, costuras interiores de chaquetas y cuellos, sustituyendo la compra de cinta virgen comercial.",
      specs: ["Corte calibrado de 20mm a 45mm", "Termofijado listo para costura industrial", "Coincidencia exacta de color de tu colección"],
      wasteOrigin: "Tiras, orillos y despuntes de corte",
    },
    {
      id: "empaques",
      name: "Totes & Dustbags Protectoras",
      category: "Packaging Circular",
      icon: <ShoppingBag className="w-4 h-4" />,
      tagline: "Bolsas guardapolvo y empaque reutilizable",
      desc: "Fundas protectoras para prendas de alta costura, calzado y marroquinería, confeccionadas con los retazos de mayor metraje de tus telas más resistentes.",
      specs: ["Cordón de algodón 100% recuperado", "Estampado serigráfico botánico al agua", "Dimensiones personalizadas por prenda"],
      wasteOrigin: "Retazos medianos de paño, dril y gabardina",
    },
  ];

  const current = products[activeTab];

  return (
    <section
      id="productos"
      className="relative min-h-screen flex flex-col justify-center py-24 px-6 sm:px-12 lg:px-20 bg-[#FAF4E6] text-[#23110E] overflow-hidden select-none border-t border-[#2C4231]/10"
    >
      {/* Ambient Lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#2C4231]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#7B1B1B]/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Container */}
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
            Muestrario de Insumos Circulares
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant text-3xl sm:text-5xl lg:text-6xl font-bold text-[#23110E] leading-tight"
          >
            ¿En qué se transforman tus <span className="italic font-normal text-[#2C4231] underline decoration-[#7B1B1B] decoration-2 underline-offset-8">retazos textiles</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-lora text-sm sm:text-base text-[#23110E]/80 mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            Sustituye proveedores de insumos vírgenes. Diseñamos componentes de alta gama que elevan el valor percibido de tu marca mientras cierras tu ciclo productivo.
          </motion.p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 max-w-4xl mx-auto">
          {products.map((p, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-lora font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#2C4231] text-[#F5E8C7] shadow-lg shadow-[#2C4231]/25 border border-[#2C4231] scale-105"
                    : "bg-white/80 backdrop-blur-md text-[#2C4231] hover:bg-white border border-[#2C4231]/15"
                }`}
              >
                {p.icon}
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Product Card */}
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/95 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 border border-[#2C4231]/15 shadow-2xl shadow-[#2C4231]/5 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Left Details */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#2C4231]/10 text-[10px] font-mono font-bold text-[#2C4231] uppercase tracking-wider border border-[#2C4231]/20">
                {current.category}
              </span>
              <span className="text-xs font-mono text-[#2C4231]/70 font-medium">
                • Insumo de Sastre 1:1
              </span>
            </div>

            <h3 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#23110E] leading-tight">
              {current.name}
            </h3>

            <p className="font-cormorant italic text-lg sm:text-xl text-[#2C4231] font-semibold">
              "{current.tagline}"
            </p>

            <p className="font-lora text-xs sm:text-sm text-[#23110E]/80 leading-relaxed">
              {current.desc}
            </p>

            <div className="pt-4 border-t border-[#2C4231]/10 flex flex-col gap-2 font-lora text-xs text-[#23110E]/85">
              {current.specs.map((spec, sIdx) => (
                <div key={sIdx} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2C4231] shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual Badge Box (Verde Bosque como SEGUNDO color) */}
          <div className="lg:col-span-5 bg-[#2C4231] rounded-3xl p-8 text-[#F5E8C7] flex flex-col justify-between items-center text-center shadow-2xl border border-[#2C4231] relative overflow-hidden min-h-[260px]">
            <div className="w-20 h-20 rounded-full bg-[#F5E8C7] flex flex-col items-center justify-center shadow-xl my-auto border border-[#F5E8C7]/30 text-[#2C4231]">
              <Sparkles className="w-8 h-8 text-[#2C4231]" />
              <span className="text-[9px] font-mono font-bold tracking-wider mt-0.5">1:1 B2B</span>
            </div>

            <div className="w-full pt-4 border-t border-[#F5E8C7]/15 flex items-center justify-between text-xs font-mono text-[#F5E8C7]/80">
              <span className="truncate max-w-[180px]">Materia: {current.wasteOrigin}</span>
              {/* Red detail badge */}
              <span className="text-[#F5E8C7] font-bold bg-[#7B1B1B] px-2.5 py-0.5 rounded-md text-[10px] shadow-sm">
                1:1 Trazabilidad
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
