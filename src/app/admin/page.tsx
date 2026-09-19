"use client";

import React, { useState, useEffect, useMemo } from "react";
import { NeumanLogo, NeumanWordmark } from "@/components/brand/BrandAssets";
import Link from "next/link";
import {
  Users,
  Briefcase,
  Layers,
  ShieldCheck,
  BarChart3,
  Sparkles,
  Plus,
  Camera,
  Search,
  Download,
  Mail,
  Phone,
  MessageSquare,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Trash2,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Scale,
  Send,
  UploadCloud,
  X,
  AlertCircle,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Filter,
  Check,
  Eye,
  FileText,
  Printer,
  RefreshCw,
  Scissors,
  Tag,
  MapPin,
  Flame,
  Award,
  ChevronDown,
  RotateCw,
  LayoutDashboard,
  Kanban,
  TableProperties,
  SlidersHorizontal,
  Home,
  Inbox,
  Zap,
  PanelLeftClose,
  PanelLeftOpen,
  PieChart,
  DollarSign,
  Activity,
  UserCheck,
  User
} from "lucide-react";

type TabType = "contactos" | "pipeline" | "certificados" | "esg" | "ia";

interface TailoringStep {
  id: string;
  stepNum: number;
  label: string;
  shortLabel: string;
  desc: string;
  actionText: string;
  icon: any;
  colorBorder: string;
  badgeBg: string;
  textColor: string;
  whatsappTemplate: (name: string, empresa: string, material: string, insumo: string, kg: number) => string;
}

// 8 Stages total: Paso 0 (Recepción Automática & Auto-Etiquetado) + 7 Operational Steps
const ALL_STEPS: TailoringStep[] = [
  {
    id: "0. Recepción Automática",
    stepNum: 0,
    label: "0. Recepción Automática",
    shortLabel: "Paso 0 · Ingreso",
    desc: "Bandeja automática de entrada con auto-etiquetado inteligente de material, volumen y prioridad.",
    actionText: "Iniciar Circuito (Paso 1)",
    icon: Inbox,
    colorBorder: "border-stone-300 border-dashed",
    badgeBg: "bg-[#FAF7F2] border-[#E5DFD7]",
    textColor: "text-[#5C5248]",
    whatsappTemplate: (name, empresa) =>
      `Hola ${name || ""}, te escribe el equipo de NEUMAN. Recibimos tu solicitud para transformar los retazos textiles de ${empresa || "tu marca"}. ¿Cuándo podemos coordinar una breve llamada técnica?`
  },
  {
    id: "1. Contacto Recibido",
    stepNum: 1,
    label: "1. Contacto Recibido",
    shortLabel: "Contacto",
    desc: "Llegada del contacto con datos iniciales de la marca o taller.",
    actionText: "Diagnosticar Sobrantes",
    icon: Users,
    colorBorder: "border-blue-500",
    badgeBg: "bg-blue-500/10 border-blue-200",
    textColor: "text-blue-700",
    whatsappTemplate: (name, empresa) =>
      `Hola ${name || ""}, te escribe el equipo de NEUMAN. Recibimos tu interés para transformar los retazos textiles de ${empresa || "tu marca"}. ¿Cuándo podemos tener una breve llamada para conocer tus sobrantes y coordinar una muestra?`
  },
  {
    id: "2. Diagnóstico de Sobrantes",
    stepNum: 2,
    label: "2. Diagnóstico de Sobrantes",
    shortLabel: "Sobrantes",
    desc: "Conversación técnica: composición de retazos, volumen mensual en Kg y definición de insumos.",
    actionText: "Enviar Propuesta",
    icon: Scissors,
    colorBorder: "border-amber-500",
    badgeBg: "bg-amber-500/10 border-amber-200",
    textColor: "text-amber-700",
    whatsappTemplate: (name, _empresa, material, insumo, kg) =>
      `Hola ${name || ""}. Ya analizamos los datos de tus ${kg || 50} Kg de ${material || "retazos"}. Estamos calculando la cantidad exacta de ${insumo || "marquillas y empaques"} que podemos tejer en el taller para enviarte la propuesta formal hoy.`
  },
  {
    id: "3. Propuesta Enviada",
    stepNum: 3,
    label: "3. Propuesta Enviada",
    shortLabel: "Propuesta",
    desc: "Cotización formal radicada con rendimiento textil y cálculo de ahorro hídrico ESG.",
    actionText: "Recibir Feedback & Diseñar",
    icon: Send,
    colorBorder: "border-indigo-500",
    badgeBg: "bg-indigo-500/10 border-indigo-200",
    textColor: "text-indigo-700",
    whatsappTemplate: (name, _empresa, _material, insumo) =>
      `Hola ${name || ""}. Te enviamos la propuesta técnica para tus ${insumo || "insumos circulares"}. ¿Pudiste revisarla? Nos gustaría agendar la sesión de co-diseño para calibrar colores y ligamentos de telar.`
  },
  {
    id: "4. Feedback & Co-Diseño",
    stepNum: 4,
    label: "4. Feedback & Co-Diseño",
    shortLabel: "Co-Diseño",
    desc: "Retroalimentación, calibración de color, tejido Jacquard, tipografía y muestra de telar.",
    actionText: "Aprobar Lote",
    icon: Sparkles,
    colorBorder: "border-purple-500",
    badgeBg: "bg-purple-500/10 border-purple-200",
    textColor: "text-purple-700",
    whatsappTemplate: (name) =>
      `Hola ${name || ""}. Ya ajustamos la muestra de diseño según tus comentarios de acabado y color. Te compartimos la ficha técnica final para tu visto bueno y pase a telar.`
  },
  {
    id: "5. Aprobación de Lote",
    stepNum: 5,
    label: "5. Aprobación de Lote",
    shortLabel: "Aprobación",
    desc: "Muestra y presupuesto autorizados por el cliente. Listo para ingresar al taller.",
    actionText: "Mandar a Producción",
    icon: CheckCircle2,
    colorBorder: "border-emerald-500",
    badgeBg: "bg-emerald-500/10 border-emerald-200",
    textColor: "text-emerald-700",
    whatsappTemplate: (name, empresa, _material, _insumo, kg) =>
      `¡Excelente ${name || ""}! El lote de ${kg || 100} Kg para ${empresa} ha sido formalmente aprobado. Coordinamos la recepción física del retazo en taller para iniciar el desfibrado.`
  },
  {
    id: "6. En Producción",
    stepNum: 6,
    label: "6. En Producción",
    shortLabel: "Producción",
    desc: "Desfibrado de retazos en planta, hilatura y tejido en telar Jacquard/plano.",
    actionText: "Entregar & Generar QR",
    icon: RotateCw,
    colorBorder: "border-orange-500",
    badgeBg: "bg-orange-500/10 border-orange-200",
    textColor: "text-orange-700",
    whatsappTemplate: (name, _empresa, _material, insumo) =>
      `Hola ${name || ""}. Tus ${insumo || "marquillas circulares"} están en pleno proceso de tejido en nuestros telares de Bogotá. El lote pasa hoy a corte, planchado y control de calidad.`
  },
  {
    id: "7. Entregado con Certificado QR",
    stepNum: 7,
    label: "7. Entregado con Certificado QR",
    shortLabel: "Entregado QR",
    desc: "Despacho final con Sello Oficial de Custodia y Certificado QR 1:1.",
    actionText: "Ver Certificado QR",
    icon: ShieldCheck,
    colorBorder: "border-emerald-600",
    badgeBg: "bg-emerald-600/15 border-emerald-300",
    textColor: "text-emerald-800",
    whatsappTemplate: (name, empresa, _material, insumo) =>
      `¡Hola ${name || ""}! Tu pedido de ${insumo || "insumos circulares"} para ${empresa} ya fue entregado con éxito. Puedes consultar y descargar tu Certificado Oficial de Trazabilidad 1:1 en el portal de NEUMAN.`
  }
];

// NEUMAN Core Team
const TEAM_MEMBERS = [
  { name: "Pablo", role: "CEO · Dirección General & Alianzas", shortRole: "CEO", color: "bg-blue-500/15 text-blue-800 border-blue-300", avatar: "P" },
  { name: "Jerónimo", role: "CPO · Producto, Calidad & Taller", shortRole: "CPO", color: "bg-amber-500/15 text-amber-800 border-amber-300", avatar: "J" },
  { name: "Santiago", role: "CFO · Finanzas & Cuentas", shortRole: "CFO", color: "bg-emerald-500/15 text-emerald-800 border-emerald-300", avatar: "S" },
  { name: "Amalia", role: "CMO · Marketing, Marca & Co-Diseño", shortRole: "CMO", color: "bg-purple-500/15 text-purple-800 border-purple-300", avatar: "A" }
];

// Helper to generate automatic tags based on incoming contact data
function generateAutoTags(rel: any): string[] {
  if (rel.autoTags && Array.isArray(rel.autoTags) && rel.autoTags.length > 0) {
    return rel.autoTags;
  }
  const tags: string[] = ["Auto-Etiquetado"];
  const mat = rel.materialPrincipal || "";
  if (mat.includes("Denim")) tags.push("Residuo: Denim");
  else if (mat.includes("Algodón")) tags.push("Residuo: Algodón");
  else if (mat.includes("Lino")) tags.push("Residuo: Lino");
  else tags.push("Residuo: Mezcla");

  const vol = Number(rel.volumenMensualKg) || 50;
  if (vol >= 200) tags.push("Alto Volumen VIP");
  else if (vol >= 80) tags.push("Volumen Estándar");
  else tags.push("Lote Muestra");

  if (rel.insumoInteres) {
    tags.push(`Insumo: ${rel.insumoInteres.split(" ")[0]}`);
  }
  tags.push("Canal: Web");
  return tags;
}

export default function NeumanCrmModernPage() {
  const [activeTab, setActiveTab] = useState<TabType>("contactos");
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [data, setData] = useState<any>({ relations: [], opportunities: [], materials: [], activities: [] });
  const [loading, setLoading] = useState<boolean>(true);

  // Modals & Details
  const [isAddContactOpen, setIsAddContactOpen] = useState<boolean>(false);
  const [isScanCardOpen, setIsScanCardOpen] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<any | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<any | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterMaterial, setFilterMaterial] = useState<string>("all");
  const [filterStep, setFilterStep] = useState<string>("all");
  const [filterResponsable, setFilterResponsable] = useState<string>("all");

  // New Contact Form (Defaults automatically to Paso 0)
  const [newContactForm, setNewContactForm] = useState({
    nombre: "",
    empresa: "",
    cargo: "Director de Producción",
    email: "",
    telefono: "",
    tipo: "B2B",
    materialPrincipal: "Algodón 100%",
    volumenMensualKg: 100,
    ciudad: "Bogotá",
    insumoInteres: "Marquillas Tejidas Satín",
    frecuencia: "Mensual",
    pasoActual: "0. Recepción Automática",
    responsable: "Pablo",
    notas: ""
  });

  // IA Assistant State
  const [aiChat, setAiChat] = useState<Array<{ role: "user" | "assistant"; text: string }>>([
    {
      role: "assistant",
      text: "Hola equipo NEUMAN (Pablo, Jerónimo, Santiago y Amalia). Soy su asistente de operaciones textiles. Puedo analizar métricas de conversión, calcular facturación proyectada, formular cotizaciones por lote o redactar propuestas comerciales para cualquier etapa del circuito."
    }
  ]);
  const [aiInput, setAiInput] = useState<string>("");
  const [aiThinking, setAiThinking] = useState<boolean>(false);
  const [geminiApiKey, setGeminiApiKey] = useState<string>("");
  const [showKeyModal, setShowKeyModal] = useState<boolean>(false);
  const [keyInputTemp, setKeyInputTemp] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedKey = localStorage.getItem("neuman_gemini_api_key");
      if (savedKey) {
        setGeminiApiKey(savedKey);
        setKeyInputTemp(savedKey);
      }
    }
  }, []);

  // Load Data
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/crm");
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      }
    } catch (err) {
      console.error("Error loading CRM:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Creation Actions (with Paso 0, team assignment and auto-tagging)
  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const autoGeneratedTags = generateAutoTags(newContactForm);
      const res = await fetch("/api/admin/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "createRelation",
          payload: {
            ...newContactForm,
            pasoActual: newContactForm.pasoActual || "0. Recepción Automática",
            autoTags: autoGeneratedTags,
            responsable: newContactForm.responsable || "Pablo",
            tags: [newContactForm.tipo, "Paso-0-Auto", newContactForm.materialPrincipal]
          }
        })
      });
      const resData = await res.json();
      if (resData.success) {
        // Also create a linked opportunity
        await fetch("/api/admin/crm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "createOpportunity",
            payload: {
              relationId: resData.relation.id,
              titulo: `Lote ${newContactForm.insumoInteres} (${newContactForm.volumenMensualKg} Kg)`,
              empresa: newContactForm.empresa,
              etapa: newContactForm.pasoActual,
              valorCop: Math.round(Number(newContactForm.volumenMensualKg) * 45000),
              materialKg: Number(newContactForm.volumenMensualKg)
            }
          })
        });

        // Also create a linked material lot
        await fetch("/api/admin/crm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "createMaterial",
            payload: {
              relationId: resData.relation.id,
              empresa: newContactForm.empresa,
              tipo: newContactForm.materialPrincipal,
              pesoKg: Number(newContactForm.volumenMensualKg),
              destinoInsumo: newContactForm.insumoInteres
            }
          })
        });

        loadData();
        setIsAddContactOpen(false);
        setNewContactForm({
          nombre: "",
          empresa: "",
          cargo: "Director de Producción",
          email: "",
          telefono: "",
          tipo: "B2B",
          materialPrincipal: "Algodón 100%",
          volumenMensualKg: 100,
          ciudad: "Bogotá",
          insumoInteres: "Marquillas Tejidas Satín",
          frecuencia: "Mensual",
          pasoActual: "0. Recepción Automática",
          responsable: "Pablo",
          notas: ""
        });
      }
    } catch (err) {
      console.error("Error saving contact:", err);
    }
  };

  // Helper to determine the current step for any contact (supports Paso 0)
  const getContactStep = (rel: any): string => {
    if (rel.pasoActual) {
      const match = ALL_STEPS.find((s) => s.id === rel.pasoActual || s.label === rel.pasoActual);
      if (match) return match.id;
    }
    // Fallback based on legacy fields
    const tagStr = (rel.tags || []).join(" ").toLowerCase();
    const projStr = (rel.proyectoEtapa || "").toLowerCase();
    const relStr = (rel.relacionEtapa || "").toLowerCase();

    if (projStr.includes("entrega") || tagStr.includes("certificado") || relStr.includes("cerrado")) return "7. Entregado con Certificado QR";
    if (projStr.includes("producción") || projStr.includes("telar")) return "6. En Producción";
    if (projStr.includes("diseño") || projStr.includes("desarrollo")) return "4. Feedback & Co-Diseño";
    if (relStr.includes("propuesta")) return "3. Propuesta Enviada";
    if (relStr.includes("contacto") || relStr.includes("muestra")) return "2. Diagnóstico de Sobrantes";
    if (tagStr.includes("nuevo") || tagStr.includes("web") || tagStr.includes("diagnóstico")) return "0. Recepción Automática";
    return "1. Contacto Recibido";
  };

  // Helper to get Assigned Team Member
  const getContactResponsable = (rel: any): string => {
    if (rel.responsable) return rel.responsable;
    const emp = rel.empresa || "";
    if (emp.includes("Studio")) return "Pablo";
    if (emp.includes("Textiles")) return "Amalia";
    if (emp.includes("Confecciones")) return "Jerónimo";
    return "Santiago";
  };

  // Update Contact Step in the Pipeline
  const handleUpdateStep = async (relationId: string, newStepId: string) => {
    try {
      await fetch("/api/admin/crm", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entity: "relation",
          id: relationId,
          updates: { 
            pasoActual: newStepId,
            relacionEtapa: newStepId,
            proyectoEtapa: newStepId,
            ultimaInteraccion: "Hoy" 
          }
        })
      });

      // Update corresponding opportunity if exists
      const opp = (data.opportunities || []).find((o: any) => o.relationId === relationId);
      if (opp) {
        await fetch("/api/admin/crm", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            entity: "opportunity",
            id: opp.id,
            updates: { etapa: newStepId }
          })
        });
      }

      loadData();
    } catch (err) {
      console.error("Error updating step:", err);
    }
  };

  // Update Contact Responsable
  const handleUpdateResponsable = async (relationId: string, newResp: string) => {
    try {
      await fetch("/api/admin/crm", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entity: "relation",
          id: relationId,
          updates: { responsable: newResp }
        })
      });
      loadData();
    } catch (err) {
      console.error("Error updating responsable:", err);
    }
  };

  // Delete Contact
  const handleDeleteContact = async (relationId: string) => {
    if (!confirm("¿Eliminar este contacto y todos sus registros asociados?")) return;
    try {
      await fetch(`/api/admin/crm?id=${relationId}&entity=relation`, {
        method: "DELETE"
      });
      loadData();
      if (selectedContact?.id === relationId) setSelectedContact(null);
    } catch (err) {
      console.error("Error deleting contact:", err);
    }
  };

  // CSV Export
  const handleExportCsv = () => {
    const headers = [
      "Empresa",
      "Contacto",
      "Cargo",
      "Email",
      "Telefono",
      "Ciudad",
      "Material_Principal",
      "Volumen_Kg_Mes",
      "Insumo_Deseado",
      "Paso_Actual_Pipeline",
      "Responsable_NEUMAN",
      "Etiquetas_Automaticas"
    ];
    const rows = (data.relations || []).map((r: any) => [
      `"${r.empresa || ""}"`,
      `"${r.nombre || ""}"`,
      `"${r.cargo || ""}"`,
      `"${r.email || ""}"`,
      `"${r.telefono || ""}"`,
      `"${r.ciudad || ""}"`,
      `"${r.materialPrincipal || ""}"`,
      r.volumenMensualKg || 0,
      `"${r.insumoInteres || ""}"`,
      `"${getContactStep(r)}"`,
      `"${getContactResponsable(r)}"`,
      `"${(generateAutoTags(r) || []).join("; ")}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e: any[]) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `NEUMAN_Paso_A_Paso_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // AI Chat Send (Conectado a la API Real en Vivo / Gemini)
  const handleSendAiMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || aiInput;
    if (!textToSend.trim()) return;
    const userMsg = textToSend.trim();
    setAiChat((prev) => [...prev, { role: "user", text: userMsg }]);
    setAiInput("");
    setAiThinking(true);

    try {
      const res = await fetch("/api/admin/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          crmData: data,
          apiKey: geminiApiKey || undefined,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        setAiChat((prev) => [...prev, { role: "assistant", text: json.reply }]);
      } else {
        setAiChat((prev) => [
          ...prev,
          { role: "assistant", text: "Hubo un inconveniente conectando con el motor de IA. Por favor intenta de nuevo." },
        ]);
      }
    } catch (err) {
      setAiChat((prev) => [
        ...prev,
        { role: "assistant", text: "Error de red al consultar el asistente. Verifica que el servidor esté activo." },
      ]);
    } finally {
      setAiThinking(false);
    }
  };

  // Calculated Metrics
  const totalContacts = data.relations?.length || 0;
  const totalKgAvailable = (data.relations || []).reduce((acc: number, r: any) => acc + (Number(r.volumenMensualKg) || 0), 0);
  const totalValueCop = (data.opportunities || []).reduce((acc: number, o: any) => acc + (Number(o.valorCop) || 0), 0) || (totalKgAvailable * 45000);
  const stepZeroCount = (data.relations || []).filter((r: any) => getContactStep(r) === "0. Recepción Automática").length;
  const activeInProduction = (data.relations || []).filter((r: any) => getContactStep(r) === "6. En Producción").length;
  const completedCount = (data.relations || []).filter((r: any) => getContactStep(r) === "7. Entregado con Certificado QR").length;

  // Material Distribution Calculation
  const materialStats = useMemo(() => {
    const counts: { [key: string]: { kg: number; count: number } } = {
      "Denim / Índigo": { kg: 0, count: 0 },
      "Algodón 100%": { kg: 0, count: 0 },
      "Lino & Fibras Nobles": { kg: 0, count: 0 },
      "Mezclas Poli-Algodón": { kg: 0, count: 0 }
    };

    (data.relations || []).forEach((r: any) => {
      const mat = r.materialPrincipal || "Algodón 100%";
      const kg = Number(r.volumenMensualKg) || 0;
      if (counts[mat]) {
        counts[mat].kg += kg;
        counts[mat].count += 1;
      } else {
        counts["Mezclas Poli-Algodón"].kg += kg;
        counts["Mezclas Poli-Algodón"].count += 1;
      }
    });

    return Object.entries(counts).map(([name, stat]) => ({
      name,
      kg: stat.kg,
      count: stat.count,
      percent: totalKgAvailable > 0 ? Math.round((stat.kg / totalKgAvailable) * 100) : 0
    }));
  }, [data.relations, totalKgAvailable]);

  // Team Member Workload Stats
  const teamStats = useMemo(() => {
    return TEAM_MEMBERS.map((member) => {
      const assigned = (data.relations || []).filter((r: any) => getContactResponsable(r) === member.name);
      const totalKg = assigned.reduce((acc: number, r: any) => acc + (Number(r.volumenMensualKg) || 0), 0);
      const totalVal = assigned.reduce((acc: number, r: any) => acc + ((Number(r.volumenMensualKg) || 0) * 45000), 0);
      return {
        ...member,
        contactsCount: assigned.length,
        totalKg,
        totalVal
      };
    });
  }, [data.relations]);

  // Filtered Contacts List for Directory
  const filteredRelations = useMemo(() => {
    return (data.relations || []).filter((rel: any) => {
      const currentStep = getContactStep(rel);
      const currentResp = getContactResponsable(rel);
      const matchesSearch =
        searchQuery === "" ||
        rel.nombre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rel.empresa?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rel.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rel.materialPrincipal?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rel.insumoInteres?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rel.ciudad?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        generateAutoTags(rel).some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesMaterial = filterMaterial === "all" || rel.materialPrincipal === filterMaterial;
      const matchesStep = filterStep === "all" || currentStep === filterStep;
      const matchesResp = filterResponsable === "all" || currentResp === filterResponsable;

      return matchesSearch && matchesMaterial && matchesStep && matchesResp;
    });
  }, [data.relations, searchQuery, filterMaterial, filterStep, filterResponsable]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E1B18] flex flex-col lg:flex-row font-sans selection:bg-[#C86D51]/20">
      
      {/* ========================================================================= */}
      {/* SIDEBAR / MENÚ A LA IZQUIERDA (MINIMIZABLE & LIMPIO)                      */}
      {/* ========================================================================= */}
      <aside className={`bg-[#FFFFFF] border-r border-b lg:border-b-0 border-[#E5DFD7] flex flex-col justify-between p-3 sm:p-4 lg:h-screen lg:sticky lg:top-0 z-40 shadow-xs transition-all duration-300 ${
        sidebarCollapsed ? "w-full lg:w-20" : "w-full lg:w-72"
      }`}>
        
        {/* Cabecera de Marca */}
        <div className="space-y-6">
          <div className={`flex items-center ${sidebarCollapsed ? "flex-col justify-center gap-3" : "justify-between"}`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E5DFD7] flex items-center justify-center shadow-xs p-1 flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#2C4231]" />
              </div>
              {!sidebarCollapsed && (
                <div>
                  <div className="flex items-center gap-2">
                    <NeumanWordmark className="h-5 w-auto" color="dark" />
                    <span className="text-[9px] font-mono font-bold bg-[#FAF7F2] text-[#C86D51] border border-[#E5DFD7] px-1.5 py-0.2 rounded">
                      CRM
                    </span>
                  </div>
                  <p className="text-[10px] text-[#7A7067] font-mono tracking-wider mt-0.5">De residuo a relato</p>
                </div>
              )}
            </div>

            <div className={`flex items-center ${sidebarCollapsed ? "flex-col gap-2" : "gap-1"}`}>
              <button
                type="button"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 rounded-xl text-[#8C827A] hover:text-[#1E1B18] hover:bg-[#FAF7F2] border border-transparent hover:border-[#E5DFD7] transition-all cursor-pointer"
                title={sidebarCollapsed ? "Expandir menú lateral" : "Minimizar menú lateral"}
              >
                {sidebarCollapsed ? (
                  <PanelLeftOpen className="w-4 h-4 text-[#C86D51]" />
                ) : (
                  <PanelLeftClose className="w-4 h-4 text-[#7A7067]" />
                )}
              </button>

              <Link
                href="/"
                className="p-2 rounded-xl text-[#8C827A] hover:text-[#1E1B18] hover:bg-[#FAF7F2] border border-transparent hover:border-[#E5DFD7] transition-all"
                title="Volver a la portada web"
              >
                <Home className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Menú Vertical de Navegación (Solo Títulos Limpios) */}
          <nav className="space-y-1.5">
            
            {/* 1. Directorio Paso a Paso */}
            <button
              type="button"
              onClick={() => setActiveTab("contactos")}
              className={`w-full flex items-center ${
                sidebarCollapsed ? "justify-center px-2 py-3" : "px-3.5 py-2.5"
              } rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "contactos"
                  ? "bg-[#24120C] text-[#FFFFFF] shadow-sm"
                  : "text-[#5C5248] hover:text-[#1E1B18] hover:bg-[#FAF7F2]"
              }`}
              title="1. Directorio Paso a Paso"
            >
              <div className="flex items-center gap-3">
                <TableProperties className={`w-4 h-4 flex-shrink-0 ${activeTab === "contactos" ? "text-[#E28A6E]" : "text-[#8C827A]"}`} />
                {!sidebarCollapsed && <span>1. Directorio Paso a Paso</span>}
              </div>
            </button>

            {/* 2. Tablero Paso a Paso */}
            <button
              type="button"
              onClick={() => setActiveTab("pipeline")}
              className={`w-full flex items-center ${
                sidebarCollapsed ? "justify-center px-2 py-3" : "px-3.5 py-2.5"
              } rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "pipeline"
                  ? "bg-[#24120C] text-[#FFFFFF] shadow-sm"
                  : "text-[#5C5248] hover:text-[#1E1B18] hover:bg-[#FAF7F2]"
              }`}
              title="2. Tablero Paso a Paso"
            >
              <div className="flex items-center gap-3">
                <Kanban className={`w-4 h-4 flex-shrink-0 ${activeTab === "pipeline" ? "text-[#E28A6E]" : "text-[#C86D51]"}`} />
                {!sidebarCollapsed && <span>2. Tablero Paso a Paso</span>}
              </div>
            </button>

            {/* 3. Certificados QR 1:1 */}
            <button
              type="button"
              onClick={() => setActiveTab("certificados")}
              className={`w-full flex items-center ${
                sidebarCollapsed ? "justify-center px-2 py-3" : "px-3.5 py-2.5"
              } rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "certificados"
                  ? "bg-[#24120C] text-[#FFFFFF] shadow-sm"
                  : "text-[#5C5248] hover:text-[#1E1B18] hover:bg-[#FAF7F2]"
              }`}
              title="3. Certificados QR 1:1"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className={`w-4 h-4 flex-shrink-0 ${activeTab === "certificados" ? "text-emerald-400" : "text-emerald-600"}`} />
                {!sidebarCollapsed && <span>3. Certificados QR 1:1</span>}
              </div>
            </button>

            {/* 4. Métricas & Analítica */}
            <button
              type="button"
              onClick={() => setActiveTab("esg")}
              className={`w-full flex items-center ${
                sidebarCollapsed ? "justify-center px-2 py-3" : "px-3.5 py-2.5"
              } rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "esg"
                  ? "bg-[#24120C] text-[#FFFFFF] shadow-sm"
                  : "text-[#5C5248] hover:text-[#1E1B18] hover:bg-[#FAF7F2]"
              }`}
              title="4. Métricas & Analítica"
            >
              <div className="flex items-center gap-3">
                <BarChart3 className={`w-4 h-4 flex-shrink-0 ${activeTab === "esg" ? "text-[#E28A6E]" : "text-[#8C827A]"}`} />
                {!sidebarCollapsed && <span>4. Métricas & Analítica</span>}
              </div>
            </button>

            {/* 5. Asistente AI Taller */}
            <button
              type="button"
              onClick={() => setActiveTab("ia")}
              className={`w-full flex items-center ${
                sidebarCollapsed ? "justify-center px-2 py-3" : "px-3.5 py-2.5"
              } rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "ia"
                  ? "bg-[#24120C] text-[#FFFFFF] shadow-sm"
                  : "text-[#5C5248] hover:text-[#1E1B18] hover:bg-[#FAF7F2]"
              }`}
              title="5. Asistente AI Taller"
            >
              <div className="flex items-center gap-3">
                <Sparkles className={`w-4 h-4 flex-shrink-0 ${activeTab === "ia" ? "text-amber-300" : "text-amber-500"}`} />
                {!sidebarCollapsed && <span>5. Asistente AI Taller</span>}
              </div>
            </button>

          </nav>
        </div>

        {/* Acciones Rápidas del Sidebar */}
        <div className="space-y-2 pt-4 border-t border-[#E5DFD7] mt-4 lg:mt-0">
          <button
            onClick={() => setIsAddContactOpen(true)}
            className={`w-full inline-flex items-center justify-center gap-2 ${
              sidebarCollapsed ? "p-2.5" : "px-4 py-2.5"
            } rounded-xl text-xs font-semibold text-white bg-[#C86D51] hover:bg-[#B75E43] shadow-xs transition-all cursor-pointer`}
            title="Nuevo Contacto"
          >
            <Plus className="w-4 h-4" />
            {!sidebarCollapsed && <span>Nuevo Contacto</span>}
          </button>

          {!sidebarCollapsed ? (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setIsScanCardOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-[11px] font-semibold text-[#5C5248] bg-[#FAF7F2] hover:bg-[#EAE4DC] border border-[#E5DFD7] transition-all cursor-pointer"
                title="Escanear tarjeta con OCR"
              >
                <Camera className="w-3.5 h-3.5 text-[#C86D51]" />
                <span>Escanear</span>
              </button>

              <button
                onClick={handleExportCsv}
                className="inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-[11px] font-semibold text-[#5C5248] bg-[#FAF7F2] hover:bg-[#EAE4DC] border border-[#E5DFD7] transition-all cursor-pointer"
                title="Descargar archivo CSV"
              >
                <Download className="w-3.5 h-3.5 text-[#7A7067]" />
                <span>CSV</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5 items-center">
              <button
                onClick={() => setIsScanCardOpen(true)}
                className="p-2 rounded-xl text-[#5C5248] bg-[#FAF7F2] hover:bg-[#EAE4DC] border border-[#E5DFD7] transition-all cursor-pointer"
                title="Escanear tarjeta con OCR"
              >
                <Camera className="w-3.5 h-3.5 text-[#C86D51]" />
              </button>
              <button
                onClick={handleExportCsv}
                className="p-2 rounded-xl text-[#5C5248] bg-[#FAF7F2] hover:bg-[#EAE4DC] border border-[#E5DFD7] transition-all cursor-pointer"
                title="Descargar CSV"
              >
                <Download className="w-3.5 h-3.5 text-[#7A7067]" />
              </button>
            </div>
          )}
        </div>

      </aside>

      {/* ========================================================================= */}
      {/* ÁREA PRINCIPAL DE CONTENIDO                                               */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Barra Superior del Contenido */}
        <header className="sticky top-0 z-30 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E5DFD7] px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-base text-[#1E1B18] capitalize">
              {activeTab === "contactos" && "1. Directorio Paso a Paso"}
              {activeTab === "pipeline" && "2. Tablero Paso a Paso (Paso 0 + 7 Fases)"}
              {activeTab === "certificados" && "3. Centro de Certificados QR 1:1"}
              {activeTab === "esg" && "4. Dashboard Ejecutivo & Estadísticas 360°"}
              {activeTab === "ia" && "5. Asistente AI de Taller"}
            </h1>
            <p className="text-xs text-[#7A7067]">
              {activeTab === "contactos" && "Visión integral de todos los contactos con auto-etiquetado en Paso 0 y asignación de equipo"}
              {activeTab === "pipeline" && "Recepción automática en Paso 0 y avance lineal en 7 etapas de taller"}
              {activeTab === "certificados" && "Sellos y códigos QR oficiales de trazabilidad 1:1 para lotes concluidos"}
              {activeTab === "esg" && "Embudo de conversión, distribución de material, proyección en $ COP y métricas por socio"}
              {activeTab === "ia" && "Calculadora de telar, cotizaciones y redacción de propuestas"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold bg-[#FFFFFF] text-[#C86D51] px-2.5 py-1 rounded-lg border border-[#E5DFD7] shadow-2xs">
              {totalKgAvailable.toLocaleString()} Kg Totales
            </span>
          </div>
        </header>

        {/* Cuerpo Principal del Tab Seleccionado */}
        <main className="flex-1 p-4 sm:p-8 space-y-6">

          {/* ========================================================================= */}
          {/* PESTAÑA 1: DIRECTORIO PASO A PASO                                         */}
          {/* ========================================================================= */}
          {activeTab === "contactos" && (
            <div className="space-y-6">
              


              {/* Tarjetas Métricas Superiores */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#FFFFFF] p-4 sm:p-5 rounded-2xl border border-[#E5DFD7] shadow-xs">
                  <div className="flex items-center justify-between text-[#8C827A] mb-2">
                    <span className="text-xs font-semibold">Total Contactos</span>
                    <Users className="w-4 h-4 text-[#C86D51]" />
                  </div>
                  <div className="text-2xl font-bold text-[#1E1B18]">{totalContacts}</div>
                  <div className="text-[11px] text-[#7A7067] font-medium mt-1">
                    Marcas registradas
                  </div>
                </div>

                <div className="bg-[#FFFFFF] p-4 sm:p-5 rounded-2xl border border-[#E5DFD7] shadow-xs">
                  <div className="flex items-center justify-between text-[#8C827A] mb-2">
                    <span className="text-xs font-semibold">Retazos Disponibles</span>
                    <Scale className="w-4 h-4 text-[#C86D51]" />
                  </div>
                  <div className="text-2xl font-bold text-[#1E1B18]">{totalKgAvailable.toLocaleString()} <span className="text-sm font-normal text-[#8C827A]">Kg/mes</span></div>
                  <div className="text-[11px] text-[#7A7067] font-medium mt-1">Capacidad de desfibrado</div>
                </div>

                <div className="bg-[#FFFFFF] p-4 sm:p-5 rounded-2xl border border-[#E5DFD7] shadow-xs">
                  <div className="flex items-center justify-between text-[#8C827A] mb-2">
                    <span className="text-xs font-semibold">En Producción (Telar)</span>
                    <RotateCw className="w-4 h-4 text-[#C86D51]" />
                  </div>
                  <div className="text-2xl font-bold text-[#1E1B18]">{activeInProduction}</div>
                  <div className="text-[11px] text-blue-600 font-medium mt-1">Lotes tejiéndose</div>
                </div>

                <div className="bg-[#FFFFFF] p-4 sm:p-5 rounded-2xl border border-[#E5DFD7] shadow-xs">
                  <div className="flex items-center justify-between text-[#8C827A] mb-2">
                    <span className="text-xs font-semibold">Valor en Cartera</span>
                    <TrendingUp className="w-4 h-4 text-[#C86D51]" />
                  </div>
                  <div className="text-2xl font-bold text-[#1E1B18]">${(totalValueCop / 1000000).toFixed(1)}M <span className="text-xs font-normal text-[#8C827A]">COP</span></div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-1">{completedCount} lotes entregados</div>
                </div>
              </div>

              {/* Barra de Búsqueda y Filtros */}
              <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#E5DFD7] flex flex-col lg:flex-row items-center justify-between gap-3 shadow-2xs">
                <div className="relative w-full lg:w-80">
                  <Search className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar marca, material, etiqueta, ciudad..."
                    className="w-full pl-9 pr-4 py-2 bg-[#FAF7F2] rounded-xl text-xs border border-transparent focus:border-[#C86D51] focus:bg-white outline-none transition-all"
                  />
                </div>

                <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto">
                  {/* Filtro por Responsable */}
                  <select
                    value={filterResponsable}
                    onChange={(e) => setFilterResponsable(e.target.value)}
                    className="px-3 py-2 bg-[#FAF7F2] rounded-xl text-xs border border-transparent focus:border-[#C86D51] outline-none text-[#5C5248] font-medium"
                  >
                    <option value="all">Todo el Equipo</option>
                    {TEAM_MEMBERS.map((m) => (
                      <option key={m.name} value={m.name}>{m.name} ({m.shortRole})</option>
                    ))}
                  </select>

                  {/* Filtro por Material */}
                  <select
                    value={filterMaterial}
                    onChange={(e) => setFilterMaterial(e.target.value)}
                    className="px-3 py-2 bg-[#FAF7F2] rounded-xl text-xs border border-transparent focus:border-[#C86D51] outline-none text-[#5C5248]"
                  >
                    <option value="all">Todos los Materiales</option>
                    <option value="Denim / Índigo">Denim / Índigo</option>
                    <option value="Algodón 100%">Algodón 100%</option>
                    <option value="Lino & Fibras Nobles">Lino & Fibras Nobles</option>
                    <option value="Mezclas Poli-Algodón">Mezclas Poli-Algodón</option>
                  </select>

                  {/* Filtro por Paso */}
                  <select
                    value={filterStep}
                    onChange={(e) => setFilterStep(e.target.value)}
                    className="px-3 py-2 bg-[#FAF7F2] rounded-xl text-xs border border-transparent focus:border-[#C86D51] outline-none text-[#5C5248]"
                  >
                    <option value="all">Todos los Pasos</option>
                    {ALL_STEPS.map((s) => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tabla de Contactos Global */}
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5DFD7] overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#FAF7F2] border-b border-[#E5DFD7] text-[#7A7067] font-semibold">
                        <th className="py-3.5 px-4">Empresa / Marca</th>
                        <th className="py-3.5 px-4">Contacto & Teléfono</th>
                        <th className="py-3.5 px-4">Material & Kg/Mes</th>
                        <th className="py-3.5 px-4">Responsable</th>
                        <th className="py-3.5 px-4">Paso Actual</th>
                        <th className="py-3.5 px-4 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5DFD7]">
                      {filteredRelations.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-[#8C827A]">
                            No se encontraron contactos que coincidan con la búsqueda.
                          </td>
                        </tr>
                      ) : (
                        filteredRelations.map((rel: any) => {
                          const currentStepId = getContactStep(rel);
                          const currentStepObj = ALL_STEPS.find((s) => s.id === currentStepId) || ALL_STEPS[0];
                          const autoTags = generateAutoTags(rel);
                          const isPaso0 = currentStepId === "0. Recepción Automática";
                          const respName = getContactResponsable(rel);
                          const respObj = TEAM_MEMBERS.find((m) => m.name === respName) || TEAM_MEMBERS[0];
                          
                          // WhatsApp Message
                          const waText = encodeURIComponent(
                            currentStepObj.whatsappTemplate(
                              rel.nombre,
                              rel.empresa,
                              rel.materialPrincipal,
                              rel.insumoInteres,
                              rel.volumenMensualKg
                            )
                          );
                          const waUrl = `https://wa.me/${(rel.telefono || "").replace(/[^0-9]/g, "")}?text=${waText}`;

                          return (
                            <tr
                              key={rel.id}
                              className="transition-colors group hover:bg-[#FAF7F2]"
                            >
                              {/* Empresa */}
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-[#1E1B18] text-sm">{rel.empresa}</span>
                                </div>
                                <div className="text-[11px] text-[#8C827A] flex items-center gap-1 mt-0.5">
                                  <MapPin className="w-3 h-3 text-[#C86D51]" />
                                  <span>{rel.ciudad || "Bogotá"}</span>
                                </div>
                              </td>

                              {/* Contacto & Tel */}
                              <td className="py-3.5 px-4">
                                <div className="font-semibold text-[#1E1B18]">{rel.nombre}</div>
                                <div className="text-[11px] text-[#7A7067]">{rel.cargo}</div>
                                <div className="text-[11px] font-mono text-[#8C827A] mt-0.5">{rel.telefono}</div>
                              </td>

                              {/* Material & Kg */}
                              <td className="py-3.5 px-4">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF7F2] border border-[#E5DFD7] font-medium text-[#24120C]">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#C86D51]" />
                                  <span>{rel.materialPrincipal}</span>
                                </div>
                                <div className="text-[11px] font-bold text-[#C86D51] mt-1">
                                  {rel.volumenMensualKg} Kg <span className="font-normal text-[#8C827A]">/ mes</span>
                                </div>
                              </td>

                              {/* Responsable del Equipo */}
                              <td className="py-3.5 px-4">
                                <select
                                  value={respName}
                                  onChange={(e) => handleUpdateResponsable(rel.id, e.target.value)}
                                  className="px-2 py-1 rounded-lg text-[11px] font-semibold border border-[#D5CBC0] bg-[#FFFFFF] focus:border-[#C86D51] outline-none cursor-pointer"
                                >
                                  {TEAM_MEMBERS.map((m) => (
                                    <option key={m.name} value={m.name}>
                                      {m.name} ({m.shortRole})
                                    </option>
                                  ))}
                                </select>
                              </td>

                              {/* Selector de Paso */}
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-1.5">
                                  <select
                                    value={currentStepId}
                                    onChange={(e) => handleUpdateStep(rel.id, e.target.value)}
                                    className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border border-[#D5CBC0] bg-[#FFFFFF] focus:border-[#C86D51] outline-none cursor-pointer"
                                  >
                                    {ALL_STEPS.map((s) => (
                                      <option key={s.id} value={s.id}>{s.label}</option>
                                    ))}
                                  </select>


                                </div>
                              </td>

                              {/* Acciones */}
                              <td className="py-3.5 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <a
                                    href={waUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-200"
                                    title="Enviar WhatsApp según su etapa"
                                  >
                                    <MessageSquare className="w-3.5 h-3.5" />
                                  </a>

                                  <button
                                    type="button"
                                    onClick={() => setSelectedContact(rel)}
                                    className="p-1.5 rounded-lg bg-[#FAF7F2] text-[#5C5248] hover:text-[#C86D51] hover:bg-[#EAE4DC] border border-[#E5DFD7] transition-colors"
                                    title="Ver Ficha Detallada"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => handleDeleteContact(rel.id)}
                                    className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors border border-red-200"
                                    title="Eliminar Contacto"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* PESTAÑA 2: TABLERO PASO A PASO (INCLUYE PASO 0 + 7 FASES)                */}
          {/* ========================================================================= */}
          {activeTab === "pipeline" && (
            <div className="space-y-6">
              
              {/* Resumen Superior del Paso a Paso */}
              <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E5DFD7] shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-bold text-[#1E1B18] flex items-center gap-2">
                      <span>Recorrido de Transformación Textil</span>
                      <span className="text-xs font-mono font-normal text-[#8C827A]">· {totalContacts} Marcas en Proceso</span>
                    </h2>
                    <p className="text-xs text-[#7A7067]">
                      📥 Paso 0: Recepción Automática ➔ Paso 1: Contacto ➔ Paso 2: Sobrantes ➔ Paso 3: Propuesta ➔ Paso 4: Co-Diseño ➔ Paso 5: Aprobación ➔ Paso 6: Telar ➔ Paso 7: Entrega QR.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#8C827A]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C86D51] animate-pulse" />
                    <span>Arrastra tarjetas o usa los botones para avanzar/volver</span>
                  </div>
                </div>

                {/* Breadcrumb visual del proceso completo (Paso 0 a 7) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-2 border-t border-[#E5DFD7]">
                  {ALL_STEPS.map((step) => {
                    const stepCount = (data.relations || []).filter((r: any) => getContactStep(r) === step.id).length;
                    const Icon = step.icon;
                    const isZero = step.stepNum === 0;

                    return (
                      <div
                        key={step.id}
                        className={`p-2.5 rounded-xl border flex flex-col justify-between ${
                          isZero
                            ? "bg-[#FAF7F2] border-[#E5DFD7]"
                            : stepCount > 0
                            ? "bg-[#FAF7F2] border-[#C86D51]/30"
                            : "bg-[#FFFFFF] border-[#E5DFD7]/70 opacity-70"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-bold text-[#24120C] flex items-center gap-1">
                            <Icon className={`w-3.5 h-3.5 ${isZero ? "text-[#7A7067]" : "text-[#C86D51]"}`} />
                            <span>Paso {step.stepNum}</span>
                          </span>
                          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border ${
                            isZero
                              ? "bg-[#FAF7F2] text-[#5C5248] border-[#E5DFD7]"
                              : "bg-[#FFFFFF] text-[#C86D51] border-[#E5DFD7]"
                          }`}>
                            {stepCount}
                          </span>
                        </div>
                        <div className="text-[10px] font-medium text-[#7A7067] truncate">{step.shortLabel}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tablero Kanban Horizontal con las 8 Columnas (0 a 7) */}
              <div className="flex gap-4 overflow-x-auto pb-6 items-start">
                {ALL_STEPS.map((step, idx) => {
                  const stepContacts = (data.relations || []).filter((r: any) => getContactStep(r) === step.id);
                  const stepKg = stepContacts.reduce((acc: number, r: any) => acc + (Number(r.volumenMensualKg) || 0), 0);
                  const Icon = step.icon;
                  const isZero = step.stepNum === 0;

                  return (
                    <div
                      key={step.id}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.dataTransfer.dropEffect = "move";
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        const contactId = e.dataTransfer.getData("text/plain");
                        if (contactId) handleUpdateStep(contactId, step.id);
                      }}
                      className={`w-80 flex-shrink-0 rounded-2xl border-t-4 ${step.colorBorder} border-x border-b border-[#E5DFD7] p-3.5 flex flex-col min-h-[580px] shadow-xs transition-colors ${
                        isZero ? "bg-[#FAF8F5] hover:bg-[#F5F2ED]" : "bg-[#FFFFFF] hover:bg-[#FDFCFB]"
                      }`}
                    >
                      {/* Encabezado de Columna */}
                      <div className="pb-3 border-b border-[#E5DFD7] mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-lg border ${
                              isZero
                                ? "bg-[#FAF7F2] border-[#E5DFD7] text-[#5C5248]"
                                : "bg-[#FAF7F2] border-[#E5DFD7] text-[#C86D51]"
                            }`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <div className="font-bold text-xs text-[#1E1B18]">{step.label}</div>
                              <span className="text-[10px] font-mono text-[#8C827A]">{stepContacts.length} contactos</span>
                            </div>
                          </div>
                          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                            isZero
                              ? "bg-[#FAF7F2] text-[#5C5248] border-[#E5DFD7]"
                              : "bg-[#FAF7F2] text-[#C86D51] border-[#E5DFD7]"
                          }`}>
                            {stepKg} Kg
                          </span>
                        </div>
                        <p className="text-[10px] text-[#7A7067] mt-1 leading-tight">{step.desc}</p>
                      </div>

                      {/* Tarjetas Arrastrables en esta columna */}
                      <div className="space-y-3 flex-1 overflow-y-auto pr-0.5">
                        {stepContacts.length === 0 ? (
                          <div className="py-14 text-center text-xs text-[#8C827A] border-2 border-dashed border-[#E5DFD7] rounded-xl flex flex-col items-center justify-center gap-1.5">
                            <span className="font-medium text-[#7A7067]">Sin marcas en este paso</span>
                            <span className="text-[10px] text-[#8C827A]/70">Arrastra una tarjeta aquí</span>
                          </div>
                        ) : (
                          stepContacts.map((rel: any) => {
                            const progressPercent = Math.round((step.stepNum / 7) * 100);
                            const autoTags = generateAutoTags(rel);
                            const respName = getContactResponsable(rel);
                            const respObj = TEAM_MEMBERS.find((m) => m.name === respName) || TEAM_MEMBERS[0];
                            const waText = encodeURIComponent(
                              step.whatsappTemplate(
                                rel.nombre,
                                rel.empresa,
                                rel.materialPrincipal,
                                rel.insumoInteres,
                                rel.volumenMensualKg
                              )
                            );
                            const waUrl = `https://wa.me/${(rel.telefono || "").replace(/[^0-9]/g, "")}?text=${waText}`;

                            return (
                              <div
                                key={rel.id}
                                draggable={true}
                                onDragStart={(e) => {
                                  e.dataTransfer.setData("text/plain", rel.id);
                                  e.dataTransfer.effectAllowed = "move";
                                }}
                                className={`p-3.5 rounded-xl border shadow-2xs hover:border-[#C86D51] hover:shadow-md transition-all space-y-3 cursor-grab active:cursor-grabbing group ${
                                  isZero ? "bg-[#FFFFFF] border-[#E5DFD7]" : "bg-[#FAF7F2] border-[#E5DFD7]"
                                }`}
                              >
                                {/* Header Tarjeta */}
                                <div>
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <div className="font-bold text-sm text-[#1E1B18] group-hover:text-[#C86D51] transition-colors leading-tight flex items-center gap-1.5">
                                        <span>{rel.empresa}</span>
                                      </div>
                                      <div className="text-[11px] text-[#7A7067] flex items-center gap-1 mt-0.5">
                                        <span>{rel.nombre}</span>
                                        <span>·</span>
                                        <span className="text-[#8C827A]">{rel.ciudad || "Bogotá"}</span>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <span className="text-[10px] font-mono font-bold text-[#C86D51] bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#E5DFD7]">
                                        {rel.volumenMensualKg} Kg
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Responsable Asignado + Auto-Etiquetas */}
                                <div className="flex items-center justify-between gap-1 text-[10px]">
                                  <div className="flex items-center gap-1 font-semibold px-2 py-0.5 rounded-md bg-white border border-[#E5DFD7] text-[#24120C]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#C86D51]" />
                                    <span>Resp: {respName}</span>
                                  </div>
                                  <span className="font-mono text-[#8C827A] text-[9px]">
                                    {autoTags[1] || "#Web"}
                                  </span>
                                </div>

                                {/* Barra de Progreso del Paso a Paso */}
                                {!isZero && (
                                  <div>
                                    <div className="flex items-center justify-between text-[10px] text-[#8C827A] mb-1">
                                      <span>Progreso en Circuito</span>
                                      <span className="font-bold font-mono text-[#24120C]">{progressPercent}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-[#E5DFD7] rounded-full overflow-hidden">
                                      <div
                                        className="h-full bg-gradient-to-r from-[#C86D51] to-[#E28A6E] rounded-full transition-all duration-500"
                                        style={{ width: `${progressPercent}%` }}
                                      />
                                    </div>
                                  </div>
                                )}

                                {/* Ficha Técnica Rápida */}
                                <div className="text-[11px] text-[#5C5248] space-y-0.5 bg-[#FFFFFF] p-2 rounded-lg border border-[#E5DFD7]/80">
                                  <div><span className="text-[#8C827A]">Residuo:</span> <span className="font-medium">{rel.materialPrincipal}</span></div>
                                  <div><span className="text-[#8C827A]">Insumo:</span> <span className="font-semibold text-[#1E1B18]">{rel.insumoInteres || "Marquillas Tejidas"}</span></div>
                                </div>

                                {/* Barra de Acciones del Paso a Paso */}
                                <div className="space-y-2 pt-1 border-t border-[#E5DFD7]/80">
                                  
                                  {/* Botón Principal de Avance / Botón de Retroceso */}
                                  <div className="flex items-center gap-1.5">
                                    {/* Botón Retroceder al paso anterior si no es el primero */}
                                    {idx > 0 && (
                                      <button
                                        type="button"
                                        onClick={() => handleUpdateStep(rel.id, ALL_STEPS[idx - 1].id)}
                                        className="inline-flex items-center justify-center p-1.5 rounded-lg text-[#7A7067] hover:text-[#1E1B18] bg-[#FFFFFF] hover:bg-[#EAE4DC] border border-[#D5CBC0] transition-colors cursor-pointer"
                                        title={`Retroceder al Paso ${ALL_STEPS[idx - 1].stepNum}: ${ALL_STEPS[idx - 1].shortLabel}`}
                                      >
                                        <ArrowLeft className="w-3.5 h-3.5" />
                                      </button>
                                    )}

                                    {/* Botón Avanzar al siguiente paso */}
                                    {idx < ALL_STEPS.length - 1 ? (
                                      <button
                                        type="button"
                                        onClick={() => handleUpdateStep(rel.id, ALL_STEPS[idx + 1].id)}
                                        className={`flex-1 inline-flex items-center justify-between text-[11px] font-semibold text-white px-2.5 py-1.5 rounded-lg shadow-2xs transition-all cursor-pointer ${
                                          isZero
                                            ? "bg-[#C86D51] hover:bg-[#B75E43]"
                                            : "bg-[#C86D51] hover:bg-[#B75E43]"
                                        }`}
                                        title={`Avanzar a: ${ALL_STEPS[idx + 1].label}`}
                                      >
                                        <span className="truncate">{step.actionText}</span>
                                        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={() => setSelectedCertificate({ ...rel, certificadoId: `NM-2026-BOG-${rel.id.slice(-3)}` })}
                                        className="flex-1 inline-flex items-center justify-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer"
                                      >
                                        <ShieldCheck className="w-3.5 h-3.5" />
                                        <span>Ver Certificado QR</span>
                                      </button>
                                    )}
                                  </div>

                                  {/* Acciones Secundarias: WhatsApp específico del paso & Ficha */}
                                  <div className="flex items-center justify-between text-[10px] pt-1 border-t border-[#E5DFD7]/50">
                                    <a
                                      href={waUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
                                      title="Enviar mensaje personalizado para esta etapa"
                                    >
                                      <MessageSquare className="w-3 h-3" />
                                      <span>WhatsApp Paso {step.stepNum}</span>
                                    </a>

                                    <button
                                      type="button"
                                      onClick={() => setSelectedContact(rel)}
                                      className="font-semibold text-[#7A7067] hover:text-[#1E1B18]"
                                    >
                                      Ver Ficha →
                                    </button>
                                  </div>

                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* PESTAÑA 3: CENTRO DE CERTIFICADOS QR 1:1                                  */}
          {/* ========================================================================= */}
          {activeTab === "certificados" && (
            <div className="space-y-6">
              <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E5DFD7] flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-[#1E1B18] flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span>Centro de Certificados de Trazabilidad 1:1</span>
                  </h2>
                  <p className="text-xs text-[#7A7067]">
                    Sellos digitales y códigos QR oficiales para los lotes que completaron el ciclo de producción en taller.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(data.relations || [])
                  .filter((r: any) => getContactStep(r) === "7. Entregado con Certificado QR" || r.tieneProyectoActivo)
                  .map((rel: any) => {
                    const certCode = `NM-2026-BOG-${rel.id.slice(-3)}`;
                    const waterSaved = (Number(rel.volumenMensualKg) || 50) * 1800;
                    const co2Saved = Math.round((Number(rel.volumenMensualKg) || 50) * 4.2);

                    return (
                      <div
                        key={rel.id}
                        className="bg-[#FFFFFF] rounded-2xl border border-emerald-200 p-5 shadow-xs hover:border-emerald-500 transition-all space-y-4"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
                              {certCode}
                            </span>
                            <h3 className="font-bold text-base text-[#1E1B18] mt-1.5">{rel.empresa}</h3>
                            <p className="text-xs text-[#7A7067]">{rel.insumoInteres || "Marquillas Tejidas Satín"}</p>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                            <Check className="w-4 h-4" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-center bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD7]">
                          <div>
                            <div className="text-[10px] text-[#8C827A]">Agua Preservada</div>
                            <div className="text-xs font-bold font-mono text-blue-700">{waterSaved.toLocaleString()} L</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-[#8C827A]">CO₂ Evitado</div>
                            <div className="text-xs font-bold font-mono text-emerald-700">{co2Saved} Kg</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-[#E5DFD7]">
                          <span className="text-[10px] text-[#8C827A]">Emisión: Taller Bogotá</span>
                          <button
                            type="button"
                            onClick={() => setSelectedCertificate({ ...rel, certificadoId: certCode })}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Ver Certificado QR</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* PESTAÑA 4: DASHBOARD EJECUTIVO & ESTADÍSTICAS 360°                         */}
          {/* ========================================================================= */}
          {activeTab === "esg" && (
            <div className="space-y-6">
              
              {/* Header Analítico */}
              <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E5DFD7] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-[#1E1B18] flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#C86D51]" />
                    <span>Dashboard Ejecutivo 360° & Analítica Textil</span>
                  </h2>
                  <p className="text-xs text-[#7A7067]">
                    Monitoreo en tiempo real de conversión comercial, capacidad de taller, finanzas e impacto ecológico
                  </p>
                </div>
                <div className="text-xs font-mono font-bold bg-[#FAF7F2] text-[#24120C] px-3 py-1.5 rounded-xl border border-[#E5DFD7]">
                  KPIs Actualizados: Tiempo Real
                </div>
              </div>

              {/* 1. KPIs Superiores Ejecutivos */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E5DFD7] shadow-xs">
                  <div className="flex items-center justify-between text-[#8C827A] mb-2">
                    <span className="text-xs font-semibold">Valor Proyectado Cartera</span>
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-[#1E1B18]">
                    ${(totalValueCop / 1000000).toFixed(1)}M <span className="text-xs font-normal text-[#8C827A]">COP</span>
                  </div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-1">Ticket promedio ~$3.5M COP</div>
                </div>

                <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E5DFD7] shadow-xs">
                  <div className="flex items-center justify-between text-[#8C827A] mb-2">
                    <span className="text-xs font-semibold">Capacidad Mensual</span>
                    <Scale className="w-4 h-4 text-[#C86D51]" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-[#1E1B18]">
                    {totalKgAvailable.toLocaleString()} <span className="text-xs font-normal text-[#8C827A]">Kg</span>
                  </div>
                  <div className="text-[11px] text-blue-600 font-medium mt-1">~182,400 marquillas satín est.</div>
                </div>

                <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E5DFD7] shadow-xs">
                  <div className="flex items-center justify-between text-[#8C827A] mb-2">
                    <span className="text-xs font-semibold">Agua Preservada</span>
                    <Activity className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-blue-700">
                    {((totalKgAvailable * 1800) / 1000).toFixed(1)}k <span className="text-xs font-normal text-[#8C827A]">Litros</span>
                  </div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-1">~{(totalKgAvailable * 1800).toLocaleString()} L de agua dulce</div>
                </div>

                <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E5DFD7] shadow-xs">
                  <div className="flex items-center justify-between text-[#8C827A] mb-2">
                    <span className="text-xs font-semibold">CO₂ Evitado</span>
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-emerald-700">
                    {Math.round(totalKgAvailable * 4.2).toLocaleString()} <span className="text-xs font-normal text-[#8C827A]">Kg</span>
                  </div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-1">Economía circular local</div>
                </div>
              </div>

              {/* 2. Gráficas Principales: Embudo y Composición */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Gráfica 1: Embudo de Conversión (Paso 0 a 7) */}
                <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E5DFD7] shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD7]">
                    <div>
                      <h3 className="font-bold text-sm text-[#1E1B18] flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-[#C86D51]" />
                        <span>Embudo de Conversión por Fases</span>
                      </h3>
                      <p className="text-xs text-[#7A7067]">Distribución de marcas en los 8 pasos del pipeline</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#C86D51]">{totalContacts} Contactos</span>
                  </div>

                  <div className="space-y-2.5">
                    {ALL_STEPS.map((step) => {
                      const count = (data.relations || []).filter((r: any) => getContactStep(r) === step.id).length;
                      const percentage = totalContacts > 0 ? Math.round((count / totalContacts) * 100) : 0;

                      return (
                        <div key={step.id} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-medium text-[#24120C] truncate max-w-[200px]">
                              {step.label}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono text-[#8C827A]">{count} marcas</span>
                              <span className="text-xs font-bold font-mono text-[#C86D51] w-10 text-right">{percentage}%</span>
                            </div>
                          </div>
                          <div className="w-full h-2 bg-[#FAF7F2] rounded-full overflow-hidden border border-[#E5DFD7]">
                            <div
                              className="h-full bg-gradient-to-r from-[#C86D51] to-[#E28A6E] rounded-full transition-all duration-500"
                              style={{ width: `${Math.max(percentage, 4)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Gráfica 2: Composición de Residuos Textiles (% y Kg) */}
                <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E5DFD7] shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD7]">
                    <div>
                      <h3 className="font-bold text-sm text-[#1E1B18] flex items-center gap-2">
                        <PieChart className="w-4 h-4 text-blue-600" />
                        <span>Composición de Retazos Textiles</span>
                      </h3>
                      <p className="text-xs text-[#7A7067]">Volumen recolectado por tipo de fibra textil</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-blue-700">{totalKgAvailable} Kg/mes</span>
                  </div>

                  <div className="space-y-3 pt-2">
                    {materialStats.map((mat) => (
                      <div key={mat.name} className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E5DFD7] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#C86D51]" />
                            <span className="font-bold text-xs text-[#1E1B18]">{mat.name}</span>
                          </div>
                          <div className="text-xs font-mono">
                            <span className="font-bold text-[#C86D51]">{mat.kg} Kg</span>
                            <span className="text-[#8C827A] ml-1.5 font-semibold">({mat.percent}%)</span>
                          </div>
                        </div>
                        <div className="w-full h-1.5 bg-[#FFFFFF] rounded-full overflow-hidden border border-[#E5DFD7]/80">
                          <div
                            className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(mat.percent, 3)}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-[#7A7067]">
                          <span>{mat.count} marcas generadoras</span>
                          <span>Rendimiento est: ~{Math.round(mat.kg * 320)} marquillas</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* 3. Desempeño por Integrante del Equipo Fundador */}
              <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E5DFD7] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD7]">
                  <div>
                    <h3 className="font-bold text-sm text-[#1E1B18] flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-emerald-600" />
                      <span>Rendimiento y Asignación por Equipo (Pablo, Jerónimo, Santiago y Amalia)</span>
                    </h3>
                    <p className="text-xs text-[#7A7067]">Carga de trabajo, volumen textil y valor en cartera gestionado por cada socio</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {teamStats.map((member) => (
                    <div
                      key={member.name}
                      className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5DFD7] hover:border-[#C86D51] transition-all space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-[#24120C] text-[#E28A6E] flex items-center justify-center font-bold text-sm shadow-xs">
                            {member.avatar}
                          </div>
                          <div>
                            <div className="font-bold text-sm text-[#1E1B18]">{member.name}</div>
                            <span className="text-[10px] font-mono font-bold text-[#C86D51]">{member.shortRole}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded border border-[#E5DFD7] text-[#24120C]">
                          {member.contactsCount} marcas
                        </span>
                      </div>

                      <div className="text-[11px] text-[#7A7067] leading-tight">
                        {member.role}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-center bg-white p-2 rounded-xl border border-[#E5DFD7]">
                        <div>
                          <div className="text-[10px] text-[#8C827A]">Volumen</div>
                          <div className="text-xs font-bold font-mono text-[#1E1B18]">{member.totalKg} Kg</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-[#8C827A]">Cartera</div>
                          <div className="text-xs font-bold font-mono text-emerald-700">${(member.totalVal / 1000000).toFixed(1)}M</div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setFilterResponsable(member.name);
                          setActiveTab("contactos");
                        }}
                        className="w-full text-center text-[10px] font-bold text-[#C86D51] hover:underline pt-1"
                      >
                        Ver marcas de {member.name} →
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Retorno Ecológico Consolidado */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E5DFD7] text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2">
                    <Scale className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-bold font-mono text-[#1E1B18]">{(totalKgAvailable * 1800).toLocaleString()} L</div>
                  <div className="text-xs font-semibold text-[#7A7067]">Agua Dulce Preservada</div>
                  <p className="text-[11px] text-[#8C827A]">Equivalente al consumo anual de {Math.round((totalKgAvailable * 1800) / 45000)} hogares en Bogotá</p>
                </div>

                <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E5DFD7] text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-bold font-mono text-[#1E1B18]">{Math.round(totalKgAvailable * 4.2).toLocaleString()} Kg</div>
                  <div className="text-xs font-semibold text-[#7A7067]">Emisiones de CO₂ Evitadas</div>
                  <p className="text-[11px] text-[#8C827A]">Al sustituir materias vírgenes sintéticas por retazo local</p>
                </div>

                <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E5DFD7] text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] text-[#C86D51] flex items-center justify-center mx-auto mb-2">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-bold font-mono text-[#1E1B18]">{totalKgAvailable.toLocaleString()} Kg</div>
                  <div className="text-xs font-semibold text-[#7A7067]">Residuos Textiles Rescatados</div>
                  <p className="text-[11px] text-[#8C827A]">100% integrados a insumos de sastre con Certificado 1:1</p>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* PESTAÑA 5: ASISTENTE AI DE TALLER                                         */}
          {/* ========================================================================= */}
          {activeTab === "ia" && (
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5DFD7] p-6 max-w-4xl mx-auto flex flex-col h-[600px] shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5DFD7]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#24120C] flex items-center justify-center text-amber-500 shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold text-sm text-[#1E1B18]">Asistente AI de Operaciones Textiles</h2>
                      <span className="inline-flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {geminiApiKey ? "Gemini 1.5 Activo" : "CRM Data en Vivo"}
                      </span>
                    </div>
                    <p className="text-xs text-[#7A7067]">Analiza marcas del CRM, calcula rendimientos técnicos y redacta propuestas de sastre</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowKeyModal(true)}
                  className="self-start sm:self-auto text-[11px] font-medium px-3 py-1.5 rounded-xl border border-[#E5DFD7] hover:border-[#C86D51] text-[#7A7067] hover:text-[#C86D51] bg-[#FAF7F2] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-[#C86D51]" />
                  <span>{geminiApiKey ? "Gemini Conectado" : "Conectar Gemini API (Opcional)"}</span>
                </button>
              </div>

              {/* Sugerencias Rápidas de Consulta */}
              <div className="flex items-center gap-2 overflow-x-auto py-2.5 border-b border-[#E5DFD7]/60 no-scrollbar">
                <span className="text-[10px] font-mono text-[#8C827A] shrink-0">Sugerencias:</span>
                {[
                  "¿Qué estado tiene Studio Bogotá?",
                  "Resumen ejecutivo para Pablo",
                  "Redacta un mensaje para Tiki Brands",
                  "¿Cuánto rinden 150 kg de denim?",
                  "¿Quién está en Paso 0?"
                ].map((sug, sIdx) => (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={() => handleSendAiMessage(sug)}
                    className="shrink-0 text-[11px] px-2.5 py-1 rounded-lg bg-[#FAF7F2] hover:bg-[#ECE3D6] text-[#5C5248] border border-[#E5DFD7] transition-all cursor-pointer"
                  >
                    {sug}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {aiChat.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#24120C] text-[#FFFFFF]"
                          : "bg-[#FAF7F2] text-[#1E1B18] border border-[#E5DFD7]"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.text}</div>
                    </div>
                  </div>
                ))}
                {aiThinking && (
                  <div className="flex gap-2 items-center text-xs text-[#8C827A] italic">
                    <Sparkles className="w-3.5 h-3.5 animate-spin text-[#C86D51]" />
                    <span>El asistente está calculando...</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#E5DFD7] flex gap-2">
                <input
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendAiMessage()}
                  placeholder="Ej: ¿Qué marcas tiene a cargo Pablo o cuál es el cálculo para Amalia?"
                  className="flex-1 px-4 py-2.5 bg-[#FAF7F2] rounded-xl text-xs border border-transparent focus:border-[#C86D51] outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleSendAiMessage()}
                  className="px-4 py-2.5 rounded-xl bg-[#C86D51] hover:bg-[#B75E43] text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar</span>
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: NUEVO CONTACTO                                                     */}
      {/* ========================================================================= */}
      {isAddContactOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] rounded-2xl max-w-lg w-full p-6 border border-[#E5DFD7] shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD7]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] text-[#C86D51] flex items-center justify-center border border-[#E5DFD7]">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-[#1E1B18]">Registrar Nuevo Contacto B2B</h3>
              </div>
              <button onClick={() => setIsAddContactOpen(false)} className="text-[#8C827A] hover:text-[#1E1B18]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveContact} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#5C5248]">Empresa / Marca *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Studio Bogotá S.A.S."
                    value={newContactForm.empresa}
                    onChange={(e) => setNewContactForm({ ...newContactForm, empresa: e.target.value })}
                    className="w-full mt-1 p-2 bg-[#FAF7F2] rounded-lg border border-[#D5CBC0] focus:border-[#C86D51] outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#5C5248]">Persona de Contacto *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Valeria Restrepo"
                    value={newContactForm.nombre}
                    onChange={(e) => setNewContactForm({ ...newContactForm, nombre: e.target.value })}
                    className="w-full mt-1 p-2 bg-[#FAF7F2] rounded-lg border border-[#D5CBC0] focus:border-[#C86D51] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#5C5248]">WhatsApp / Teléfono *</label>
                  <input
                    type="text"
                    required
                    placeholder="+57 310 000 0000"
                    value={newContactForm.telefono}
                    onChange={(e) => setNewContactForm({ ...newContactForm, telefono: e.target.value })}
                    className="w-full mt-1 p-2 bg-[#FAF7F2] rounded-lg border border-[#D5CBC0] focus:border-[#C86D51] outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#5C5248]">Correo Electrónico</label>
                  <input
                    type="email"
                    placeholder="contacto@marca.co"
                    value={newContactForm.email}
                    onChange={(e) => setNewContactForm({ ...newContactForm, email: e.target.value })}
                    className="w-full mt-1 p-2 bg-[#FAF7F2] rounded-lg border border-[#D5CBC0] focus:border-[#C86D51] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#5C5248]">Tipo de Residuo Textil</label>
                  <select
                    value={newContactForm.materialPrincipal}
                    onChange={(e) => setNewContactForm({ ...newContactForm, materialPrincipal: e.target.value })}
                    className="w-full mt-1 p-2 bg-[#FAF7F2] rounded-lg border border-[#D5CBC0] focus:border-[#C86D51] outline-none"
                  >
                    <option value="Denim / Índigo">Denim / Índigo</option>
                    <option value="Algodón 100%">Algodón 100%</option>
                    <option value="Lino & Fibras Nobles">Lino & Fibras Nobles</option>
                    <option value="Mezclas Poli-Algodón">Mezclas Poli-Algodón</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-[#5C5248]">Volumen Estimado (Kg/mes)</label>
                  <input
                    type="number"
                    value={newContactForm.volumenMensualKg}
                    onChange={(e) => setNewContactForm({ ...newContactForm, volumenMensualKg: Number(e.target.value) })}
                    className="w-full mt-1 p-2 bg-[#FAF7F2] rounded-lg border border-[#D5CBC0] focus:border-[#C86D51] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#5C5248]">Responsable NEUMAN</label>
                  <select
                    value={newContactForm.responsable}
                    onChange={(e) => setNewContactForm({ ...newContactForm, responsable: e.target.value })}
                    className="w-full mt-1 p-2 bg-[#FAF7F2] rounded-lg border border-[#D5CBC0] focus:border-[#C86D51] outline-none font-medium"
                  >
                    {TEAM_MEMBERS.map((m) => (
                      <option key={m.name} value={m.name}>{m.name} ({m.shortRole})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-[#5C5248]">Insumo Deseado</label>
                  <select
                    value={newContactForm.insumoInteres}
                    onChange={(e) => setNewContactForm({ ...newContactForm, insumoInteres: e.target.value })}
                    className="w-full mt-1 p-2 bg-[#FAF7F2] rounded-lg border border-[#D5CBC0] focus:border-[#C86D51] outline-none"
                  >
                    <option value="Marquillas Tejidas Satín">Marquillas Tejidas Satín</option>
                    <option value="Cintas de Envolver">Cintas de Envolver</option>
                    <option value="Hangtags QR Circulares">Hangtags QR Circulares</option>
                    <option value="Totes de Empaque">Totes de Empaque</option>
                    <option value="Cordones de Ajuste">Cordones de Ajuste</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5DFD7] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddContactOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-[#7A7067] hover:bg-[#FAF7F2] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#C86D51] hover:bg-[#B75E43] text-white font-semibold shadow-xs transition-all"
                >
                  Guardar Contacto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ESCANEAR TARJETA DE PRESENTACIÓN                                   */}
      {/* ========================================================================= */}
      {isScanCardOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] rounded-2xl max-w-md w-full p-6 border border-[#E5DFD7] shadow-xl text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] text-[#C86D51] flex items-center justify-center mx-auto border border-[#E5DFD7]">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#1E1B18]">Escanear Tarjeta de Taller</h3>
              <p className="text-xs text-[#7A7067] mt-1">
                Apunta la cámara a una tarjeta física o sube una foto para extraer los datos de la marca con OCR inteligente y auto-etiquetado.
              </p>
            </div>

            <div className="p-8 border-2 border-dashed border-[#D5CBC0] rounded-xl bg-[#FAF7F2] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#C86D51] transition-colors">
              <UploadCloud className="w-8 h-8 text-[#8C827A]" />
              <span className="text-xs font-semibold text-[#5C5248]">Arrastra una foto o haz clic para abrir cámara</span>
              <span className="text-[10px] text-[#8C827A]">JPG, PNG hasta 10MB</span>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsScanCardOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#FAF7F2] text-[#5C5248] hover:bg-[#EAE4DC]"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: EXPEDIENTE COMPLETO DEL CONTACTO                                   */}
      {/* ========================================================================= */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] rounded-2xl max-w-lg w-full p-6 border border-[#E5DFD7] shadow-2xl space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-[#E5DFD7]">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#C86D51] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E5DFD7]">
                  {getContactStep(selectedContact)}
                </span>
                <h3 className="font-bold text-lg text-[#1E1B18] mt-1">{selectedContact.empresa}</h3>
                <p className="text-xs text-[#7A7067]">{selectedContact.nombre} · {selectedContact.cargo}</p>
              </div>
              <button onClick={() => setSelectedContact(null)} className="text-[#8C827A] hover:text-[#1E1B18]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DFD7]">
                <div>
                  <span className="text-[#8C827A]">Teléfono:</span>
                  <div className="font-mono font-bold text-[#1E1B18] mt-0.5">{selectedContact.telefono}</div>
                </div>
                <div>
                  <span className="text-[#8C827A]">Correo:</span>
                  <div className="font-medium text-[#1E1B18] mt-0.5">{selectedContact.email || "No registrado"}</div>
                </div>
                <div>
                  <span className="text-[#8C827A]">Residuo Textil:</span>
                  <div className="font-bold text-[#C86D51] mt-0.5">{selectedContact.materialPrincipal}</div>
                </div>
                <div>
                  <span className="text-[#8C827A]">Responsable:</span>
                  <div className="font-bold text-[#1E1B18] mt-0.5">{getContactResponsable(selectedContact)}</div>
                </div>
              </div>

              {/* Auto-Etiquetas en el Expediente */}
              <div>
                <label className="font-semibold text-[#5C5248]">Etiquetas Automáticas:</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {generateAutoTags(selectedContact).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-[#FAF7F2] border border-[#E5DFD7] text-[#5C5248]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#5C5248]">Cambiar Responsable:</label>
                  <select
                    value={getContactResponsable(selectedContact)}
                    onChange={(e) => {
                      handleUpdateResponsable(selectedContact.id, e.target.value);
                      setSelectedContact({ ...selectedContact, responsable: e.target.value });
                    }}
                    className="w-full mt-1.5 p-2 bg-[#FAF7F2] rounded-lg border border-[#D5CBC0] font-semibold text-xs text-[#24120C] focus:border-[#C86D51] outline-none"
                  >
                    {TEAM_MEMBERS.map((m) => (
                      <option key={m.name} value={m.name}>{m.name} ({m.shortRole})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#5C5248]">Mover a otro Paso:</label>
                  <select
                    value={getContactStep(selectedContact)}
                    onChange={(e) => {
                      handleUpdateStep(selectedContact.id, e.target.value);
                      setSelectedContact({ ...selectedContact, pasoActual: e.target.value });
                    }}
                    className="w-full mt-1.5 p-2 bg-[#FAF7F2] rounded-lg border border-[#D5CBC0] font-semibold text-xs text-[#24120C] focus:border-[#C86D51] outline-none"
                  >
                    {ALL_STEPS.map((s) => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5DFD7] flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleDeleteContact(selectedContact.id)}
                className="text-xs text-red-600 hover:underline font-semibold"
              >
                Eliminar Registro
              </button>
              <button
                type="button"
                onClick={() => setSelectedContact(null)}
                className="px-4 py-2 rounded-xl bg-[#24120C] text-white text-xs font-semibold"
              >
                Listo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CERTIFICADO QR OFICIAL IMPRIMIBLE                                  */}
      {/* ========================================================================= */}
      {selectedCertificate && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] rounded-2xl max-w-md w-full p-6 border border-[#E5DFD7] shadow-2xl text-center space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5DFD7]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#2C4231]" />
                <span className="font-serif font-bold text-xs uppercase tracking-widest text-[#24120C]">NEUMAN B2B</span>
              </div>
              <button onClick={() => setSelectedCertificate(null)} className="text-[#8C827A] hover:text-[#1E1B18]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/50 space-y-2">
              <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider">
                Certificado Oficial de Trazabilidad 1:1
              </span>
              <h3 className="font-bold text-lg text-[#1E1B18]">{selectedCertificate.empresa}</h3>
              <p className="text-xs text-[#7A7067]">
                Lote {selectedCertificate.insumoInteres || "Insumos Circulares"} ({selectedCertificate.volumenMensualKg} Kg)
              </p>
            </div>

            {/* Código QR Simulado de Alta Fidelidad */}
            <div className="p-4 bg-white rounded-xl border border-[#E5DFD7] inline-block shadow-2xs">
              <div className="w-36 h-36 bg-[#FAF7F2] border border-[#24120C] rounded-lg p-2.5 flex flex-col items-center justify-between">
                <div className="grid grid-cols-6 gap-1 w-full h-full p-1 bg-[#24120C] rounded">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-2xs ${
                        i % 2 === 0 || i % 5 === 0 ? "bg-[#FAF7F2]" : "bg-[#24120C]"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="font-mono text-[10px] font-bold text-[#C86D51] mt-2">
                {selectedCertificate.certificadoId || "NM-2026-BOG-001"}
              </div>
            </div>

            <div className="text-[11px] text-[#7A7067] bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DFD7]">
              Custodia garantizada en taller de Bogotá. Cada insumo tejido lleva el ADN del retazo original.
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#24120C] text-white hover:bg-black transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir Certificado</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedCertificate(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#FAF7F2] text-[#5C5248] hover:bg-[#EAE4DC]"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}


      {/* MODAL CONFIGURACIÓN GEMINI API KEY */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] rounded-2xl max-w-md w-full p-6 border border-[#E5DFD7] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD7]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-[#1E1B18]">Activar Motor Gemini AI</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="text-[#8C827A] hover:text-[#1E1B18] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#7A7067] leading-relaxed">
              El CRM ya cuenta con un <strong>motor de análisis inteligente en tiempo real</strong> para consultar empresas y calcular rendimientos.
              Si deseas además <strong>IA generativa abierta y razonamiento profundo</strong>, puedes pegar tu clave gratuita de Google AI Studio.
            </p>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-[#5C5248]">Gemini API Key (Google AI Studio)</label>
              <input
                type="password"
                value={keyInputTemp}
                onChange={(e) => setKeyInputTemp(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DFD7] rounded-xl outline-none focus:border-[#C86D51]"
              />
              <p className="text-[10px] text-[#8C827A]">
                Obtén una clave gratis en{" "}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C86D51] underline font-semibold"
                >
                  aistudio.google.com
                </a>
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E5DFD7]">
              {geminiApiKey && (
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem("neuman_gemini_api_key");
                    setGeminiApiKey("");
                    setKeyInputTemp("");
                    setShowKeyModal(false);
                  }}
                  className="px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                >
                  Desconectar
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="px-3 py-1.5 text-xs text-[#7A7067] hover:bg-[#FAF7F2] rounded-lg cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  const k = keyInputTemp.trim();
                  if (k) {
                    localStorage.setItem("neuman_gemini_api_key", k);
                    setGeminiApiKey(k);
                  }
                  setShowKeyModal(false);
                }}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-[#C86D51] hover:bg-[#B75E43] rounded-lg cursor-pointer shadow-xs"
              >
                Guardar y Activar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
