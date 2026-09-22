"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ArrowUpRight, Scissors } from "lucide-react";

interface FAQItem {
  id: string;
  num: string;
  tag: string;
  question: string;
  answer: string;
  detail: string;
}

export function FAQ() {
  const [activePocket, setActivePocket] = useState<string | null>(null);

  const faqs: FAQItem[] = [
    {
      id: "faq-1",
      num: "01",
      tag: "Modelo de Servicio",
      question: "¿NEUMAN fabrica productos físicos o solo entrega consultoría estratégica?",
      answer: "Somos una consultora especializada en inteligencia y estrategia de valorización textil. Nuestro núcleo es diagnosticar y trazar la hoja de ruta. Sin embargo, según las necesidades y el caso de tu marca, articulamos y coordinamos la conversión física de residuos en insumos técnicos o colecciones cápsula.",
      detail: "Inteligencia estratégica + capacidad de coordinación productiva según viabilidad.",
    },
    {
      id: "faq-2",
      num: "02",
      tag: "Entregables Técnicos",
      question: "¿Qué recibe mi empresa al culminar el proceso de consultoría?",
      answer: "Entregamos 4 productos ejecutivos y técnicos: 1) Mapa de Residuos Textiles (cuantificación y flujos), 2) Mapa de Oportunidades (rutas circulares), 3) Evaluación de Viabilidad Técnica y Financiera, y 4) Estrategia y Hoja de Ruta de Implementación.",
      detail: "Informes ejecutivos accionables desarrollados en 6 etapas metodológicas.",
    },
    {
      id: "faq-3",
      num: "03",
      tag: "Materiales & Volúmenes",
      question: "¿Con qué tipos de materiales, fibras o excedentes textiles trabajan?",
      answer: "Analizamos retazos de mesa de corte, rollos obsoletos (deadstock), prendas con tara y saldos textiles en algodón, denim, lino, mezclas sintéticas y fibras técnicas.",
      detail: "Diagnóstico adaptable: desde talleres de autor y marcas medianas hasta plantas industriales.",
    },
    {
      id: "faq-4",
      num: "04",
      tag: "Custodia & Trazabilidad",
      question: "¿Cómo garantizan la trazabilidad, confidencialidad y custodia del material?",
      answer: "Trabajamos bajo estrictos acuerdos de confidencialidad industrial y un protocolo de custodia técnica 1:1, asegurando que cada kilogramo diagnosticado y gestionado cuente con trazabilidad verificable.",
      detail: "Trazabilidad documental y técnica transparente para tus reportes de sostenibilidad.",
    },
  ];

  const togglePocket = (id: string) => {
    setActivePocket((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative min-h-screen flex items-center justify-center py-24 px-6 sm:px-12 lg:px-20 bg-[#FAF4E6] text-[#23110E] overflow-hidden select-none border-t border-[#2C4231]/10"
    >
      {/* Ambient Lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#2C4231]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#7B1B1B]/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-5xl mx-auto w-full relative z-10 flex flex-col justify-between py-2">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 shrink-0">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#2C4231]/15 text-[#2C4231] text-xs font-mono uppercase tracking-[0.2em] mb-3 font-semibold shadow-xs">
            <Scissors className="w-3.5 h-3.5 text-[#2C4231]" />
            Bolsillos de Sastre • Preguntas Frecuentes
          </div>
          
          <h2 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#23110E] leading-tight">
            Toca cada bolsillo para <span className="italic font-normal text-[#2C4231] underline decoration-[#7B1B1B] decoration-2 underline-offset-8">extraer la respuesta</span>.
          </h2>
        </div>

        {/* 2x2 Tailor Pockets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto w-full my-auto mb-10">
          {faqs.map((faq) => {
            const isOpen = activePocket === faq.id;

            return (
              <div
                key={faq.id}
                onClick={() => togglePocket(faq.id)}
                className="relative cursor-pointer group"
              >
                {/* Pocket Outer Container */}
                <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl border-2 border-dashed border-[#2C4231]/25 p-5 sm:p-6 shadow-xl shadow-[#2C4231]/5 overflow-hidden transition-all duration-300 group-hover:border-[#2C4231]">
                  
                  {/* Brass Corner Rivets */}
                  <div className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full bg-[#2C4231] border border-white" />
                  <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#2C4231] border border-white" />

                  {/* Pocket Header */}
                  <div className="flex items-center justify-between border-b border-[#2C4231]/10 pb-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#2C4231] text-[#F5E8C7] font-mono text-[10px] font-bold tracking-wider shadow-xs">
                        NM • {faq.num}
                      </span>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#2C4231] font-semibold">
                        {faq.tag}
                      </span>
                    </div>

                    <span className="text-xs font-mono text-[#23110E]/60 group-hover:text-[#2C4231] transition-colors font-medium">
                      {isOpen ? "Guardar ↑" : "Extraer ↓"}
                    </span>
                  </div>

                  {/* Question */}
                  <h3 className="font-cormorant text-base sm:text-lg font-bold text-[#23110E] leading-snug">
                    {faq.question}
                  </h3>

                  {/* Extracted Swatch Card */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-4 pt-3 border-t border-[#2C4231]/15 bg-[#FAF4E6] text-[#23110E] rounded-xl p-4 shadow-inner overflow-hidden"
                      >
                        <p className="font-lora text-xs sm:text-sm leading-relaxed font-normal">
                          {faq.answer}
                        </p>
                        <div className="mt-3 pt-2.5 border-t border-[#2C4231]/10 flex items-center justify-between text-xs font-mono text-[#23110E]/75">
                          <span>{faq.detail}</span>
                          {/* Specific red detail badge */}
                          <span className="text-[#F5E8C7] bg-[#7B1B1B] px-2 py-0.5 rounded-sm font-bold text-[10px]">
                            100% Circular
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Bottom Stitch */}
                  <div className="mt-4 pt-2 border-t border-dotted border-[#2C4231]/20 flex justify-between items-center text-[10px] font-mono text-[#23110E]/40">
                    <span>Pespunte de Costura</span>
                    <span>Bogotá D.C.</span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* WhatsApp Inquiry */}
        <div className="text-center pt-2">
          <a
            href="https://wa.me/573001234567?text=Hola%20NEUMAN,%20tengo%20una%20consulta%20técnica%20sobre%20mis%20residuos%20textiles."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#2C4231] hover:text-[#1E2E22] transition-colors font-medium"
          >
            <MessageSquare className="w-4 h-4 text-[#2C4231]" />
            <span>¿Tienes una duda técnica sobre tus materiales? Consulta a un consultor de economía circular</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>

      </div>
    </section>
  );
}
