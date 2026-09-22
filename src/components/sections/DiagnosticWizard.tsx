"use client";

import React, { useState } from "react";
import { diagnosticSchema, type DiagnosticFormData } from "@/lib/schema";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ArrowRight, ArrowLeft, Send, Sparkles, Scale, Droplets, Tag, MessageSquare } from "lucide-react";
import confetti from "canvas-confetti";

const MATERIAL_OPTIONS = [
  { value: "Algodón 100%", label: "Algodón 100%", desc: "Popelinas, franelas, piqué, drill de algodón" },
  { value: "Denim / Índigo", label: "Denim / Índigo", desc: "Mezclillas pesadas o livianas sin elastano" },
  { value: "Lino & Fibras Nobles", label: "Lino & Fibras Nobles", desc: "Lino crudo, sedas, mezclas artesanales" },
  { value: "Mezclas Poli-Algodón", label: "Mezclas Poli-Algodón", desc: "Dril poliéster-algodón, gabardinas, forros" },
  { value: "Poliéster & Sintéticos", label: "Poliéster & Sintéticos", desc: "Tafetanes, impermeables, microfibras" },
  { value: "Mezcla Variada de Producción", label: "Mezcla Variada de Producción", desc: "Diversos tipos de sobrantes por clasificar" }
];

const VOLUME_OPTIONS = [
  { value: "30-50 Kg / mes", label: "30 - 50 Kg / mes", desc: "Cápsula piloto o marca emergente" },
  { value: "50-150 Kg / mes", label: "50 - 150 Kg / mes", desc: "Marca mediana o en crecimiento" },
  { value: "150-500 Kg / mes", label: "150 - 500 Kg / mes", desc: "Marca consolidada con varias colecciones" },
  { value: "+500 Kg / mes", label: "+500 Kg / mes", desc: "Confección a escala industrial" }
];

const PRODUCT_OPTIONS = [
  { value: "Marquillas Tejidas Satín", label: "Marquillas Tejidas Satín", desc: "Bordadas con tu logotipo listas para costura" },
  { value: "Hangtags Circulares con QR", label: "Hangtags con Semilla Germinable", desc: "Papel de pulpa textil con semilla plantable" },
  { value: "Cintas al Sesgo & Ribs", label: "Cintas al Sesgo & Vivos", desc: "Remates internos calibrados para prendas" },
  { value: "Totes & Dustbags de Empaque", label: "Totes & Bolsas Guardapolvo", desc: "Packaging textil reutilizable para tus clientes" }
];

export function DiagnosticWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<DiagnosticFormData>>({
    material: "Algodón 100%",
    monthlyVolumeKg: "50-150 Kg / mes",
    frequency: "Mensual",
    desiredProduct: "Marquillas Tejidas Satín",
    brandName: "",
    contactName: "",
    contactRole: "Director de Producción",
    cityLocation: "Bogotá",
    email: "",
    phone: "",
    notes: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultData, setResultData] = useState<any | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSelect = (field: keyof DiagnosticFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleInputChange = (field: keyof DiagnosticFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const nextStep = () => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1 && !formData.material) {
      newErrors.material = "Por favor selecciona el material predominante.";
    } else if (currentStep === 2 && !formData.monthlyVolumeKg) {
      newErrors.monthlyVolumeKg = "Por favor indica el volumen mensual estimado.";
    } else if (currentStep === 3 && !formData.desiredProduct) {
      newErrors.desiredProduct = "Por favor selecciona el insumo que deseas obtener.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const validation = diagnosticSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "No pudimos procesar el diagnóstico.");
      }

      setResultData(result.data);
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err: any) {
      setSubmitError(err.message || "Error al procesar el diagnóstico.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="diagnostico"
      className="relative min-h-screen flex items-center justify-center py-24 px-6 sm:px-12 lg:px-20 bg-[#F5E8C7] text-[#23110E] overflow-hidden select-none border-t border-[#2C4231]/10"
    >
      {/* Ambient Lighting */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#2C4231]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#7B1B1B]/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col justify-between py-2">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#2C4231] font-semibold bg-white/80 px-4 py-1.5 rounded-full border border-[#2C4231]/20 inline-block mb-3 shadow-xs">
            {resultData ? "Diagnóstico Preliminar Completado" : `Paso ${currentStep} de 4 • Diagnóstico de Residuos & Excedentes`}
          </span>
          <h2 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#23110E] leading-tight">
            {resultData ? "Oportunidades Preliminares de Valorización" : "Diagnóstico Técnico de Residuos y Excedentes"}
          </h2>
          <p className="font-lora text-xs sm:text-sm text-[#23110E]/80 mt-2">
            Ingresa los parámetros de tu taller o bodega para que nuestro equipo analice alternativas viables antes de tu sesión estratégica.
          </p>
        </div>

        {/* Wizard Body Card */}
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-[#2C4231]/15 shadow-2xl shadow-[#2C4231]/5 relative my-auto">
          
          {/* Progress Bar (Only when filling) */}
          {!resultData && (
            <div className="flex gap-2 mb-6">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    step <= currentStep ? "bg-[#2C4231]" : "bg-[#2C4231]/15"
                  }`}
                />
              ))}
            </div>
          )}

          {resultData ? (
            /* COMPLETED DIAGNOSTIC SUMMARY */
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between border-b border-[#2C4231]/15 pb-4 gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#2C4231] font-bold">Certificado Asignado</span>
                  <h3 className="font-cormorant text-lg sm:text-xl font-bold text-[#23110E]">{resultData.brandName}</h3>
                </div>
                <div className="px-4 py-1.5 rounded-xl bg-[#2C4231] text-[#F5E8C7] font-mono text-xs font-bold shadow-sm">
                  {resultData.certCode}
                </div>
              </div>

              {/* 4 Impact Projections */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#FAF4E6] p-4 rounded-2xl border border-[#2C4231]/15 text-center">
                  <Tag className="w-5 h-5 text-[#2C4231] mx-auto mb-1.5" />
                  <div className="font-cormorant text-lg sm:text-xl font-bold text-[#2C4231]">+{resultData.estimatedLabels.toLocaleString("es-CO")}</div>
                  <p className="text-[10px] font-mono text-[#23110E]/70">{resultData.desiredProduct.split(" ")[0]} listas</p>
                </div>

                <div className="bg-[#FAF4E6] p-4 rounded-2xl border border-[#2C4231]/15 text-center">
                  <Sparkles className="w-5 h-5 text-[#2C4231] mx-auto mb-1.5" />
                  <div className="font-cormorant text-lg sm:text-xl font-bold text-[#2C4231]">${(resultData.moneySavedCop / 1000000).toFixed(1)}M</div>
                  <p className="text-[10px] font-mono text-[#23110E]/70">Ahorro proyectado</p>
                </div>

                <div className="bg-[#FAF4E6] p-4 rounded-2xl border border-[#2C4231]/15 text-center">
                  <Droplets className="w-5 h-5 text-[#2C4231] mx-auto mb-1.5" />
                  <div className="font-cormorant text-lg sm:text-xl font-bold text-[#2C4231]">{(resultData.waterSavedLiters / 1000).toFixed(0)}k Lts</div>
                  <p className="text-[10px] font-mono text-[#23110E]/70">Agua preservada</p>
                </div>

                <div className="bg-[#FAF4E6] p-4 rounded-2xl border border-[#2C4231]/15 text-center">
                  <Scale className="w-5 h-5 text-[#2C4231] mx-auto mb-1.5" />
                  <div className="font-cormorant text-lg sm:text-xl font-bold text-[#2C4231]">{resultData.kg} Kg</div>
                  <p className="text-[10px] font-mono text-[#23110E]/70">{resultData.material.split(" ")[0]}</p>
                </div>
              </div>

              {/* Status Message */}
              <div className="p-4 rounded-2xl bg-[#2C4231]/10 border border-[#2C4231]/20 text-xs font-lora text-[#23110E] flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2C4231] shrink-0" />
                <div>
                  <strong className="block font-semibold text-sm text-[#2C4231]">Diagnóstico ingresado en NEUMAN Intelligence</strong>
                  Un consultor experto analizará la viabilidad técnica y cruzará alternativas para estructurar tu Hoja de Ruta personalizada.
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <a
                  href={`https://wa.me/573001234567?text=Hola%20NEUMAN,%20acabo%20de%20completar%20el%20diagnóstico%20para%20${encodeURIComponent(resultData.brandName)}%20(Código:%20${resultData.certCode}).%20Quisiera%20agendar%20la%20sesión%20con%20el%20consultor.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#2C4231] text-[#F5E8C7] text-xs font-lora uppercase tracking-wider font-semibold hover:bg-[#1E2E22] transition-all inline-flex items-center justify-center gap-2 shadow-lg shadow-[#2C4231]/20"
                >
                  <MessageSquare className="w-4 h-4" /> Agendar Sesión con un Consultor
                </a>

                <button
                  onClick={() => {
                    setResultData(null);
                    setCurrentStep(1);
                  }}
                  className="text-xs font-mono text-[#23110E]/70 hover:text-[#2C4231] underline cursor-pointer"
                >
                  Realizar otro diagnóstico
                </button>
              </div>
            </div>
          ) : (
            /* WIZARD FORM STEPS */
            <form onSubmit={handleSubmit}>
              {/* Step 1: Material */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <p className="text-xs font-mono uppercase tracking-wider text-[#23110E] font-bold">
                    01. Selecciona el tipo de tela predominante en tus retazos:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {MATERIAL_OPTIONS.map((mat) => {
                      const isSelected = formData.material === mat.value;
                      return (
                        <button
                          type="button"
                          key={mat.value}
                          onClick={() => handleSelect("material", mat.value)}
                          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#2C4231] text-[#F5E8C7] border-[#2C4231] shadow-md shadow-[#2C4231]/20"
                              : "bg-[#FAF4E6] text-[#23110E] border-[#2C4231]/15 hover:border-[#2C4231]/40"
                          }`}
                        >
                          <span className="font-cormorant font-bold text-base block">{mat.label}</span>
                          <span className={`text-[11px] font-lora block mt-1 ${isSelected ? "text-[#F5E8C7]/80" : "text-[#23110E]/70"}`}>
                            {mat.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.material && <p className="text-xs text-[#7B1B1B] font-mono">{errors.material}</p>}
                </div>
              )}

              {/* Step 2: Volume & Frequency */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <p className="text-xs font-mono uppercase tracking-wider text-[#23110E] font-bold">
                    02. Volumen mensual aproximado y frecuencia de corte:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {VOLUME_OPTIONS.map((vol) => {
                      const isSelected = formData.monthlyVolumeKg === vol.value;
                      return (
                        <button
                          type="button"
                          key={vol.value}
                          onClick={() => handleSelect("monthlyVolumeKg", vol.value)}
                          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#2C4231] text-[#F5E8C7] border-[#2C4231] shadow-md shadow-[#2C4231]/20"
                              : "bg-[#FAF4E6] text-[#23110E] border-[#2C4231]/15 hover:border-[#2C4231]/40"
                          }`}
                        >
                          <span className="font-cormorant font-bold text-base block">{vol.label}</span>
                          <span className={`text-[11px] font-lora block mt-1 ${isSelected ? "text-[#F5E8C7]/80" : "text-[#23110E]/70"}`}>
                            {vol.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-3">
                    <label className="text-xs font-mono text-[#23110E]/80 block mb-2 font-medium">Frecuencia de Recolección Deseada:</label>
                    <div className="flex flex-wrap gap-2">
                      {["Semanal", "Quincenal", "Mensual", "Por Colección"].map((frec) => (
                        <button
                          type="button"
                          key={frec}
                          onClick={() => handleSelect("frequency", frec)}
                          className={`px-4 py-2 rounded-full border text-xs font-mono transition-all cursor-pointer ${
                            formData.frequency === frec
                              ? "bg-[#2C4231] text-[#F5E8C7] border-[#2C4231] font-bold shadow-sm"
                              : "bg-[#FAF4E6] text-[#23110E] border-[#2C4231]/20"
                          }`}
                        >
                          {frec}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Desired Circular Insumo */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <p className="text-xs font-mono uppercase tracking-wider text-[#23110E] font-bold">
                    03. ¿Qué insumo deseas que fabriquemos con tus retazos?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PRODUCT_OPTIONS.map((prod) => {
                      const isSelected = formData.desiredProduct === prod.value;
                      return (
                        <button
                          type="button"
                          key={prod.value}
                          onClick={() => handleSelect("desiredProduct", prod.value)}
                          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#2C4231] text-[#F5E8C7] border-[#2C4231] shadow-md shadow-[#2C4231]/20"
                              : "bg-[#FAF4E6] text-[#23110E] border-[#2C4231]/15 hover:border-[#2C4231]/40"
                          }`}
                        >
                          <span className="font-cormorant font-bold text-lg block">{prod.label}</span>
                          <span className={`text-[11px] font-lora block mt-1 ${isSelected ? "text-[#F5E8C7]/80" : "text-[#23110E]/70"}`}>
                            {prod.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.desiredProduct && <p className="text-xs text-[#7B1B1B] font-mono">{errors.desiredProduct}</p>}
                </div>
              )}

              {/* Step 4: Contact & Workshop Location */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <p className="text-xs font-mono uppercase tracking-wider text-[#23110E] font-bold">
                    04. Datos de tu marca y empresa para el reporte técnico:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-mono text-[#23110E]/80 block mb-1 font-medium">Nombre de la Marca o Empresa *</label>
                      <input
                        required
                        value={formData.brandName || ""}
                        onChange={(e) => handleInputChange("brandName", e.target.value)}
                        placeholder="Ej: Studio Bogotá S.A.S."
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF4E6] border border-[#2C4231]/20 text-xs font-lora text-[#23110E] focus:outline-[#2C4231] focus:border-[#2C4231]"
                      />
                      {errors.brandName && <span className="text-[10px] text-[#7B1B1B] font-mono">{errors.brandName}</span>}
                    </div>

                    <div>
                      <label className="text-xs font-mono text-[#23110E]/80 block mb-1 font-medium">Persona de Contacto *</label>
                      <input
                        required
                        value={formData.contactName || ""}
                        onChange={(e) => handleInputChange("contactName", e.target.value)}
                        placeholder="Ej: Camilo Torres"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF4E6] border border-[#2C4231]/20 text-xs font-lora text-[#23110E] focus:outline-[#2C4231] focus:border-[#2C4231]"
                      />
                      {errors.contactName && <span className="text-[10px] text-[#7B1B1B] font-mono">{errors.contactName}</span>}
                    </div>

                    <div>
                      <label className="text-xs font-mono text-[#23110E]/80 block mb-1 font-medium">Correo Corporativo *</label>
                      <input
                        required
                        type="email"
                        value={formData.email || ""}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="camilo@marca.co"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF4E6] border border-[#2C4231]/20 text-xs font-lora text-[#23110E] focus:outline-[#2C4231] focus:border-[#2C4231]"
                      />
                      {errors.email && <span className="text-[10px] text-[#7B1B1B] font-mono">{errors.email}</span>}
                    </div>

                    <div>
                      <label className="text-xs font-mono text-[#23110E]/80 block mb-1 font-medium">WhatsApp / Celular *</label>
                      <input
                        required
                        value={formData.phone || ""}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+57 300 000 0000"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF4E6] border border-[#2C4231]/20 text-xs font-lora text-[#23110E] focus:outline-[#2C4231] focus:border-[#2C4231]"
                      />
                      {errors.phone && <span className="text-[10px] text-[#7B1B1B] font-mono">{errors.phone}</span>}
                    </div>

                    <div>
                      <label className="text-xs font-mono text-[#23110E]/80 block mb-1 font-medium">Ubicación de Confección / Ciudad</label>
                      <input
                        value={formData.cityLocation || ""}
                        onChange={(e) => handleInputChange("cityLocation", e.target.value)}
                        placeholder="Ej: Bogotá - Puente Aranda"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF4E6] border border-[#2C4231]/20 text-xs font-lora text-[#23110E] focus:outline-[#2C4231] focus:border-[#2C4231]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-[#23110E]/80 block mb-1 font-medium">Cargo / Rol</label>
                      <input
                        value={formData.contactRole || ""}
                        onChange={(e) => handleInputChange("contactRole", e.target.value)}
                        placeholder="Ej: Director de Producción"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF4E6] border border-[#2C4231]/20 text-xs font-lora text-[#23110E] focus:outline-[#2C4231] focus:border-[#2C4231]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {submitError && (
                <div className="mt-3 text-xs text-[#7B1B1B] font-mono font-semibold">
                  {submitError}
                </div>
              )}

              {/* Controls */}
              <div className="flex items-center justify-between pt-6 mt-4 border-t border-[#2C4231]/15">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase font-bold text-[#2C4231] hover:text-[#1E2E22] cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Anterior
                  </button>
                ) : <div />}

                {currentStep < 4 ? (
                  <Button
                    type="button"
                    variant="forest"
                    size="md"
                    onClick={nextStep}
                    className="font-lora uppercase tracking-wider text-xs bg-[#2C4231] text-[#F5E8C7] hover:bg-[#1E2E22]"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Siguiente
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="forest"
                    size="md"
                    disabled={isSubmitting}
                    className="font-lora uppercase tracking-wider text-xs bg-[#2C4231] text-[#F5E8C7] hover:bg-[#1E2E22]"
                    icon={<Send className="w-4 h-4" />}
                  >
                    {isSubmitting ? "Calculando Diagnóstico..." : "Generar Diagnóstico Circular"}
                  </Button>
                )}
              </div>
            </form>
          )}

        </div>

        {/* Footer info */}
        <div className="text-center pt-4">
          <p className="text-xs font-mono text-[#23110E]/65">
            Diagnóstico con trazabilidad 1:1 • Cobertura técnica para marcas y empresas de confección en Bogotá y Colombia
          </p>
        </div>

      </div>
    </section>
  );
}
