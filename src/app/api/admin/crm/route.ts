import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "crm.json");

function readCrmData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return { relations: [], opportunities: [], materials: [], activities: [] };
    }
    const fileContent = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading CRM data:", error);
    return { relations: [], opportunities: [], materials: [], activities: [] };
  }
}

function writeCrmData(data: any) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing CRM data:", error);
    return false;
  }
}

export async function GET(request: NextRequest) {
  const data = readCrmData();
  return NextResponse.json({ success: true, data });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, entity, payload } = body;
    const data = readCrmData();

    if (action === "createRelation") {
      const newRelation = {
        id: `rel-${Date.now()}`,
        nombre: payload.nombre || "Sin Nombre",
        empresa: payload.empresa || "Taller / Marca",
        cargo: payload.cargo || "Contacto",
        email: payload.email || "",
        telefono: payload.telefono || "",
        tipo: payload.tipo || "B2B",
        tags: payload.tags || ["B2B", "Nuevo"],
        puntaje: payload.puntaje || 75,
        ultimaInteraccion: new Date().toISOString().split("T")[0],
        materialPrincipal: payload.materialPrincipal || "Algodón 100%",
        volumenMensualKg: Number(payload.volumenMensualKg) || 50,
        ciudad: payload.ciudad || "Bogotá",
        notas: payload.notas || ""
      };
      data.relations = [newRelation, ...(data.relations || [])];
      writeCrmData(data);
      return NextResponse.json({ success: true, relation: newRelation });
    }

    if (action === "createOpportunity") {
      const newOpp = {
        id: `opp-${Date.now()}`,
        relationId: payload.relationId || "",
        titulo: payload.titulo || "Nueva Oportunidad Circular",
        empresa: payload.empresa || "Marca Textil",
        etapa: payload.etapa || "Contacto",
        valorCop: Number(payload.valorCop) || 2000000,
        materialKg: Number(payload.materialKg) || 100,
        fechaCierre: payload.fechaCierre || new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
        probabilidad: Number(payload.probabilidad) || 50
      };
      data.opportunities = [newOpp, ...(data.opportunities || [])];
      writeCrmData(data);
      return NextResponse.json({ success: true, opportunity: newOpp });
    }

    if (action === "createMaterial") {
      const newMat = {
        id: `mat-${Date.now()}`,
        relationId: payload.relationId || "",
        empresa: payload.empresa || "Taller Textil",
        tipo: payload.tipo || "Algodón 100%",
        pesoKg: Number(payload.pesoKg) || 100,
        estado: payload.estado || "Disponible",
        fechaRecepcion: new Date().toISOString().split("T")[0],
        destinoInsumo: payload.destinoInsumo || "Marquillas Tejidas",
        certificadoId: `NM-2026-BOG-${Math.floor(100 + Math.random() * 900)}`
      };
      data.materials = [newMat, ...(data.materials || [])];
      writeCrmData(data);
      return NextResponse.json({ success: true, material: newMat });
    }

    if (action === "createActivity") {
      const newAct = {
        id: `act-${Date.now()}`,
        relationId: payload.relationId || "",
        titulo: payload.titulo || "Seguimiento",
        tipo: payload.tipo || "Llamada",
        fecha: payload.fecha || new Date().toISOString().split("T")[0],
        completada: false,
        responsable: payload.responsable || "Equipo NEUMAN"
      };
      data.activities = [newAct, ...(data.activities || [])];
      writeCrmData(data);
      return NextResponse.json({ success: true, activity: newAct });
    }

    return NextResponse.json({ success: false, error: "Acción no reconocida" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { entity, id, updates } = body;
    const data = readCrmData();

    if (entity === "opportunity" && data.opportunities) {
      data.opportunities = data.opportunities.map((opp: any) =>
        opp.id === id ? { ...opp, ...updates } : opp
      );
      writeCrmData(data);
      return NextResponse.json({ success: true });
    }

    if (entity === "activity" && data.activities) {
      data.activities = data.activities.map((act: any) =>
        act.id === id ? { ...act, ...updates } : act
      );
      writeCrmData(data);
      return NextResponse.json({ success: true });
    }

    if (entity === "relation" && data.relations) {
      data.relations = data.relations.map((rel: any) =>
        rel.id === id ? { ...rel, ...updates } : rel
      );
      writeCrmData(data);
      return NextResponse.json({ success: true });
    }

    if (entity === "material" && data.materials) {
      data.materials = data.materials.map((mat: any) =>
        mat.id === id ? { ...mat, ...updates } : mat
      );
      writeCrmData(data);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: "Entidad no encontrada" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const entity = searchParams.get("entity");
    const id = searchParams.get("id");
    const data = readCrmData();

    if (entity === "relation") {
      data.relations = (data.relations || []).filter((r: any) => r.id !== id);
    } else if (entity === "opportunity") {
      data.opportunities = (data.opportunities || []).filter((o: any) => o.id !== id);
    } else if (entity === "material") {
      data.materials = (data.materials || []).filter((m: any) => m.id !== id);
    } else if (entity === "activity") {
      data.activities = (data.activities || []).filter((a: any) => a.id !== id);
    }

    writeCrmData(data);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
