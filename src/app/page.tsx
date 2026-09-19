"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollyHero } from "@/components/scrollytelling/ScrollyHero";
import { ProblemStatement } from "@/components/sections/ProblemStatement";
import { ThreeStepCycle } from "@/components/sections/ThreeStepCycle";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { CertificationFeature } from "@/components/sections/CertificationFeature";
import { ImpactCalculator } from "@/components/sections/ImpactCalculator";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/layout/Footer";
import { DiagnosticModal } from "@/components/scrollytelling/DiagnosticModal";

export default function HomePage() {
  const [modalView, setModalView] = useState<"diagnostic" | "faq" | null>(null);
  const [showNavbar, setShowNavbar] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById("hero");
      if (!heroEl) return;
      const rect = heroEl.getBoundingClientRect();
      const isPast = rect.bottom <= 100;
      setShowNavbar((prev) => (prev !== isPast ? isPast : prev));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAF4E6] text-[#23110E] font-lora selection:bg-[#2C4231] selection:text-[#F5E8C7]">
      {/* Top Navbar: ONLY appears when the hero has completely disappeared from view */}
      <Navbar
        visible={showNavbar}
        onOpenDiagnostic={() => setModalView("diagnostic")}
      />

      {/* Clean Scrolly Hero: Flower centered & camera aligned, pure NEUMAN logo, zero texts */}
      <ScrollyHero />

      {/* Traditional Luxury Editorial Web Sections: Slides up smoothly over hero */}
      <main className="relative z-20 w-full bg-[#FAF4E6] rounded-t-[36px] sm:rounded-t-[48px] shadow-[0_-25px_60px_rgba(44,66,49,0.08)] border-t border-[#2C4231]/10">
        {/* Section 1: El Problema de la Mesa de Corte */}
        <ProblemStatement />

        {/* Section 2: El Protocolo de Economía Circular 1:1 */}
        <ThreeStepCycle />

        {/* Section 3: Catálogo de Insumos de Sastre */}
        <ProductShowcase />

        {/* Section 4: Certificación & Pasaporte Digital Blockchain */}
        <CertificationFeature />

        {/* Section 5: Calculadora de Impacto Textil */}
        <ImpactCalculator />

        {/* Section 6: Preguntas Frecuentes */}
        <FAQ />
      </main>

      {/* Luxury Tailor Footer */}
      <Footer />

      {/* Diagnostic Wizard & FAQ Modal */}
      <DiagnosticModal
        view={modalView}
        onClose={() => setModalView(null)}
      />
    </div>
  );
}
