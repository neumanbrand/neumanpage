"use client";

import React from "react";
import { motion } from "framer-motion";
import { Truck, Cpu, Award, Sparkles, ShoppingBag, DollarSign, Share2 } from "lucide-react";

export function ThreeStepCycle() {
  const pathways = [
    {
      title: "Insumos de Sastre 1:1",
      subtitle: "Marquillas, Hangtags & Sesgos",
      desc: "Desfibramos tus propios retazos y tejemos tus marquillas de marca, hangtags con semilla y sesgos internos para tus próximas prendas.",
      icon: <Sparkles className="w-5 h-5 text-[#F5E8C7]" />,
      tag: "Cero Insumo Virgen",
    },
    {
      title: "Nueva Línea Cápsula",
      subtitle: "Co-diseño según tu nicho",
      desc: "Desarrollamos junto a tu equipo de diseño una colección cápsula o línea de accesorios complementarios aprovechando tus sobrantes de corte.",
      icon: <ShoppingBag className="w-5 h-5 text-[#F5E8C7]" />,
      tag: "Nueva Vía de Ingresos",
    },
    {
      title: "Brokerage de Deadstock",
      subtitle: "Monetización de saldos nobles",
      desc: "Conectamos tus rollos parados, orillos y excedentes textiles de alto gramaje con compradores industriales y marcas que pagan por tu materia prima.",
      icon: <DollarSign className="w-5 h-5 text-[#F5E8C7]" />,
      tag: "Liquidez Inmediata",
    },
    {
      title: "Activos ESG & Redes",
      subtitle: "Reportes de sostenibilidad",
      desc: "Te entregamos la data auditable de agua y CO₂ evitado, junto con kits visuales para comunicar tus hitos circulares en redes sociales e informes ESG.",
      icon: <Share2 className="w-5 h-5 text-[#F5E8C7]" />,
      tag: "Reputación & Marca",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Diagnóstico In-Situ",
      desc: "Pesamos, caracterizamos composiciones (algodón, denim, mezclas) y auditamos los residuos textiles directamente en tus instalaciones de corte.",
      icon: <Truck className="w-5 h-5 text-[#F5E8C7]" />,
    },
    {
      num: "02",
      title: "Transformación & Tejido",
      desc: "Procesamos y desfibramos mecánicamente el residuo clasificado en circuito cerrado para hilar tu nuevo lote de insumos.",
      icon: <Cpu className="w-5 h-5 text-[#F5E8C7]" />,
    },
    {
      num: "03",
      title: "Entrega + Certificado QR",
      desc: "Recibes tu producto terminado listo para confección, respaldado con el Certificado Oficial de Trazabilidad 1:1.",
      icon: <Award className="w-5 h-5 text-[#F5E8C7]" />,
    },
  ];

  return (
    <section
      id="ciclo"
      className="relative min-h-screen flex flex-col justify-center py-24 px-6 sm:px-12 lg:px-20 bg-[#F5E8C7] text-[#23110E] overflow-hidden select-none border-t border-[#2C4231]/10"
    >
      {/* Ambient Lighting */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#2C4231]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#7B1B1B]/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block font-mono text-xs uppercase tracking-[0.25em] text-[#2C4231] font-semibold bg-white/80 px-4 py-1.5 rounded-full border border-[#2C4231]/20 mb-3 shadow-xs"
          >
            Modelo de Valorización Integral B2B
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant text-2xl sm:text-3xl lg:text-4xl font-bold text-[#23110E] leading-tight"
          >
            Los 4 Caminos para Rentabilizar <span className="italic font-normal text-[#2C4231] underline decoration-[#7B1B1B] decoration-2 underline-offset-8">tus Residuos Textiles</span>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-lora text-sm sm:text-base text-[#23110E]/80 mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            No existe un residuo inservible; solo materias primas sin la ingeniería circular correcta. Analizamos tus residuos textiles para estructurar la solución más rentable para tu negocio.
          </motion.p>
        </div>

        {/* 4 Value Pathways Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pathways.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 + idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl border border-[#2C4231]/15 shadow-xl shadow-[#2C4231]/5 flex flex-col justify-between hover:border-[#2C4231]/40 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2C4231] flex items-center justify-center shadow-md shadow-[#2C4231]/20">
                    {item.icon}
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#2C4231] bg-[#2C4231]/10 px-2 py-0.5 rounded-md border border-[#2C4231]/15 font-semibold">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-cormorant text-lg sm:text-xl font-bold text-[#23110E] leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-[#2C4231]/80 mt-1 mb-3 font-medium">
                  {item.subtitle}
                </p>
              </div>
              <p className="font-lora text-xs text-[#23110E]/75 leading-relaxed border-t border-[#2C4231]/10 pt-3">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* The 3-Step Closed Circuit Container (Verde Bosque como SEGUNDO color distintivo) */}
        <div className="bg-[#2C4231] text-[#F5E8C7] rounded-3xl p-8 sm:p-12 border border-[#2C4231] shadow-2xl shadow-[#2C4231]/20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#F5E8C7]/70 font-semibold">
              Logística Inversa & Trazabilidad
            </span>
            <h3 className="font-cormorant text-xl sm:text-2xl font-bold text-[#F5E8C7] mt-1">
              El Circuito Cerrado NEUMAN
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((st, sIdx) => (
              <div key={sIdx} className="flex flex-col gap-3 relative">
                <div className="flex items-center gap-3.5">
                  <span className="font-cormorant text-2xl sm:text-3xl font-bold text-[#F5E8C7]">
                    {st.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-[#F5E8C7]/20">
                    {st.icon}
                  </div>
                  <h4 className="font-cormorant text-base sm:text-lg font-bold text-[#F5E8C7]">
                    {st.title}
                  </h4>
                </div>
                <p className="font-lora text-xs sm:text-sm text-[#F5E8C7]/80 leading-relaxed pl-1">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
