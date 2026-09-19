import { NextRequest, NextResponse } from "next/server";
import { diagnosticFormSchema } from "@/lib/schema";
import fs from "fs";
import path from "path";

const CRM_FILE = path.join(process.cwd(), "data", "crm.json");

function parseVolume(volStr: string): number {
  if (volStr.includes("500")) return 600;
  if (volStr.includes("150") || volStr.includes("200")) return 200;
  if (volStr.includes("50")) return 100;
  const num = parseInt(volStr.replace(/[^0-9]/g, ""), 10);
  return isNaN(num) || num <= 0 ? 100 : num;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = diagnosticFormSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validation.error.flatten().fieldErrors,
          message: "Por favor completa todos los campos requeridos."
        },
        { status: 400 }
      );
    }

    const data = validation.data;
    const kg = parseVolume(data.monthlyVolumeKg);
    const dateStr = new Date().toISOString().split("T")[0];
    const timestamp = Date.now();

    // Calculations
    const estimatedLabels = Math.round(kg * 280);
    const moneySavedCop = Math.round(kg * 280 * 220);
    const waterSavedLiters = Math.round(kg * 2500);
    const co2AvoidedKg = Math.round(kg * 14.5);
    const certCode = `NM-2026-BOG-${Math.floor(100 + Math.random() * 900)}`;

    // Score calculation
    let puntaje = 80;
    if (kg >= 200) puntaje = 95;
    else if (kg >= 100) puntaje = 88;
    else if (kg < 50) puntaje = 75;

    // Load CRM data
    let crmData: any = { relations: [], opportunities: [], materials: [], activities: [] };
    if (fs.existsSync(CRM_FILE)) {
      try {
        crmData = JSON.parse(fs.readFileSync(CRM_FILE, "utf-8"));
      } catch (e) {
        console.error("Error reading CRM file:", e);
      }
    }

    // 1. Create/Update Relation
    const relationId = `rel-${timestamp}`;
    const newRelation = {
      id: relationId,
      nombre: data.contactName,
      empresa: data.brandName,
      cargo: data.contactRole || "Director de Producción",
      email: data.email,
      telefono: data.phone,
      tipo: "B2B",
      tags: ["B2B", "Diagnóstico Web", data.material.split(" ")[0]],
      materialPrincipal: data.material,
      volumenMensualKg: kg,
      ciudad: data.cityLocation || "Bogotá",
      puntaje,
      ultimaInteraccion: "Hoy",
      insumoInteres: data.desiredProduct,
      frecuencia: data.frequency,
      notas: `Diagnóstico web recibido. Desea fabricar: ${data.desiredProduct}. Frecuencia: ${data.frequency}. ${data.notes || ""}`
    };

    // 2. Create Commercial Opportunity
    const oppId = `opp-${timestamp}`;
    const newOpp = {
      id: oppId,
      relationId,
      titulo: `Lote ${data.desiredProduct} (${kg} Kg ${data.material})`,
      empresa: data.brandName,
      etapa: "Diagnóstico",
      valorCop: moneySavedCop,
      materialKg: kg,
      fechaCierre: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      probabilidad: 70
    };

    // 3. Create Operational Task for Workshop Team
    const actId = `act-${timestamp}`;
    const newAct = {
      id: actId,
      relationId,
      titulo: `Visita técnica de pesaje y recolección para ${data.brandName}`,
      tipo: "Visita Técnica",
      fecha: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      responsable: "Equipo Técnico Bogotá",
      completada: false
    };

    // 4. Create Material Lot with QR
    const matId = `mat-${timestamp}`;
    const newMat = {
      id: matId,
      relationId,
      empresa: data.brandName,
      tipo: data.material,
      pesoKg: kg,
      estado: "En Diagnóstico",
      destinoInsumo: data.desiredProduct,
      certificadoId: certCode,
      fechaRecepcion: dateStr
    };

    // Save atomic
    crmData.relations = [newRelation, ...(crmData.relations || [])];
    crmData.opportunities = [newOpp, ...(crmData.opportunities || [])];
    crmData.activities = [newAct, ...(crmData.activities || [])];
    crmData.materials = [newMat, ...(crmData.materials || [])];

    fs.writeFileSync(CRM_FILE, JSON.stringify(crmData, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      data: {
        certCode,
        kg,
        material: data.material,
        desiredProduct: data.desiredProduct,
        estimatedLabels,
        moneySavedCop,
        waterSavedLiters,
        co2AvoidedKg,
        brandName: data.brandName,
        contactName: data.contactName
      },
      message: "Diagnóstico de viabilidad circular procesado y sincronizado con el CRM."
    });
  } catch (err: any) {
    console.error("Error in /api/diagnostic:", err);
    return NextResponse.json(
      { success: false, message: "Error interno al procesar el diagnóstico." },
      { status: 500 }
    );
  }
}
