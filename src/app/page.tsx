"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollyHero } from "@/components/scrollytelling/ScrollyHero";
import { SectionDesafio } from "@/components/sections/SectionDesafio";
import { SectionMetodologia } from "@/components/sections/SectionMetodologia";
import { SectionRutas } from "@/components/sections/SectionRutas";
import { SectionTrazabilidad } from "@/components/sections/SectionTrazabilidad";
import { SectionDiagnostico } from "@/components/sections/SectionDiagnostico";
import { Footer } from "@/components/layout/Footer";
import { DiagnosticModal } from "@/components/scrollytelling/DiagnosticModal";

export default function HomePage() {
  const [modalView, setModalView] = useState<"diagnostic" | "faq" | null>(null);
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  const [activeSectionId, setActiveSectionId] = useState<string>("desafio");
  const contentRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById("hero");
      if (!heroEl) return;
      const rect = heroEl.getBoundingClientRect();
      const isPast = rect.bottom <= 120;
      setShowNavbar((prev) => (prev !== isPast ? isPast : prev));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSelectSection = (sectionId: string) => {
    setActiveSectionId(sectionId);
    setShowNavbar(true);

    if (contentRef.current) {
      // Scroll smoothly to top of content area without re-scrolling the hero
      const navOffset = 70;
      const elementPosition = contentRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#FAF4E6] text-[#23110E] font-lora selection:bg-[#2C4231] selection:text-[#F5E8C7]">
      {/* Sticky Adaptative Navbar: Displays the 5 dedicated section titles */}
      <Navbar
        visible={showNavbar}
        activeSectionId={activeSectionId}
        onSelectSection={handleSelectSection}
        onOpenDiagnostic={() => setModalView("diagnostic")}
        onLogoClick={handleLogoClick}
      />

      {/* Hero: Preserved intact on initial entry */}
      <ScrollyHero />

      {/* Main Content Hub: 5 Dedicated Executive B2B Sections */}
      <main
        id="content-sections"
        ref={contentRef}
        className="relative z-20 w-full bg-[#FAF4E6] rounded-t-[36px] sm:rounded-t-[48px] shadow-[0_-25px_60px_rgba(44,66,49,0.08)] border-t border-[#2C4231]/15 min-h-[60vh]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSectionId}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeSectionId === "desafio" && (
              <SectionDesafio
                onSelectSection={handleSelectSection}
                onOpenDiagnostic={() => setModalView("diagnostic")}
              />
            )}

            {activeSectionId === "metodologia" && (
              <SectionMetodologia
                onSelectSection={handleSelectSection}
                onOpenDiagnostic={() => setModalView("diagnostic")}
              />
            )}

            {activeSectionId === "rutas" && (
              <SectionRutas
                onSelectSection={handleSelectSection}
                onOpenDiagnostic={() => setModalView("diagnostic")}
              />
            )}

            {activeSectionId === "trazabilidad" && (
              <SectionTrazabilidad
                onSelectSection={handleSelectSection}
                onOpenDiagnostic={() => setModalView("diagnostic")}
              />
            )}

            {activeSectionId === "diagnostico" && (
              <SectionDiagnostico
                onSelectSection={handleSelectSection}
                onOpenDiagnostic={() => setModalView("diagnostic")}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Tailor Footer */}
      <Footer onSelectSection={handleSelectSection} />

      {/* Diagnostic Wizard Modal */}
      <DiagnosticModal
        view={modalView}
        onClose={() => setModalView(null)}
      />
    </div>
  );
}
