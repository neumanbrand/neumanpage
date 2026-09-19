"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Scissors, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full bg-[#140A06] text-[#F7F3EE] flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-[#C86D51] selection:text-white">
      
      {/* Sutil resplandor cálido de fondo */}
      <div className="absolute w-96 h-96 bg-[#C86D51]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md w-full flex flex-col items-center text-center">
        
        {/* Pespunte cortado */}
        <motion.div
          animate={{
            rotate: [-4, 4, -4],
            y: [-3, 3, -3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative mb-6"
        >
          {/* Círculo base marfil */}
          <div className="relative w-28 h-28 rounded-full bg-[#FAF7F2] border-2 border-[#C86D51] flex items-center justify-center p-4 shadow-2xl overflow-visible">
            
            <Scissors className="w-12 h-12 text-[#24120C]" />

            {/* Hilos enredados alrededor de la ardilla (Espirales SVG cómicas) */}
            <svg 
              className="absolute -inset-2.5 w-[calc(100%+20px)] h-[calc(100%+20px)] pointer-events-none overflow-visible"
              viewBox="0 0 100 100"
              fill="none"
            >
              {/* Enredo 1 */}
              <path
                d="M 15 50 C 15 20, 85 20, 85 50 C 85 80, 15 80, 15 50"
                stroke="#C86D51"
                strokeWidth="2.5"
                strokeDasharray="4 2"
                strokeLinecap="round"
              />
              {/* Enredo 2 cruzado */}
              <path
                d="M 25 25 C 75 35, 25 65, 75 75"
                stroke="#C86D51"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              {/* Cabo de hilo suelto con aguja */}
              <path
                d="M 75 75 C 90 85, 95 95, 102 98"
                stroke="#C86D51"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            {/* Agujita asomándose por la esquina inferior */}
            <div className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-[#24120C] border border-[#C86D51] flex items-center justify-center text-[10px] shadow-sm">
              🪡
            </div>
          </div>
        </motion.div>

        {/* TÍTULO CÓMICO */}
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#F7F3EE] mb-2 tracking-tight">
          404 · La ardilla se enredó en el ovillo.
        </h1>

        {/* SUBTÍTULO CÓMICO */}
        <p className="text-sm sm:text-base text-[#DFD3C3]/80 leading-relaxed mb-8 max-w-sm">
          Buscamos este patrón por todo el taller, pero se lo comieron los retazos.
        </p>

        {/* BOTÓN ÚNICO ELEGANTE */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C86D51] hover:bg-[#B75E43] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>🧵 Desenredar y volver al inicio</span>
        </Link>

      </div>
    </main>
  );
}
