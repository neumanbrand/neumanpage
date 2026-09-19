"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { DiagnosticWizard } from "@/components/sections/DiagnosticWizard";
import { FAQ } from "@/components/sections/FAQ";

interface DiagnosticModalProps {
  view: "diagnostic" | "faq" | null;
  onClose: () => void;
}

export function DiagnosticModal({ view, onClose }: DiagnosticModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (view) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [view]);

  return (
    <AnimatePresence>
      {view && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 pointer-events-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#23110E]/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="allow-modal-scroll relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FAF4E6] border border-[#2C4231]/20 rounded-3xl shadow-2xl z-10 p-4 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-white/80 hover:bg-[#2C4231] text-[#2C4231] hover:text-[#F5E8C7] flex items-center justify-center border border-[#2C4231]/15 transition-colors shadow-sm cursor-pointer z-20"
              aria-label="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content Switcher */}
            <div className="pt-2">
              {view === "diagnostic" ? <DiagnosticWizard /> : <FAQ />}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
