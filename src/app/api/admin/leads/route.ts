import { NextRequest, NextResponse } from "next/server";
import { getAllLeads, updateLeadStatus, deleteLead } from "@/lib/leadsStore";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const leads = getAllLeads();

  // Exportar a CSV si se solicita
  if (searchParams.get("export") === "csv") {
    const headers = [
      "ID",
      "Fecha",
      "Marca",
      "Contacto",
      "Cargo",
      "Email",
      "Telefono",
      "Material",
      "Volumen_Kg_Mes",
      "Estado_Sostenibilidad",
      "Estado_Lead",
      "Notas"
    ];

    const rows = leads.map((l) => [
      l.id,
      new Date(l.timestamp).toLocaleString("es-CO"),
      `"${(l.brandName || "").replace(/"/g, '""')}"`,
      `"${(l.contactName || "").replace(/"/g, '""')}"`,
      `"${(l.contactRole || "").replace(/"/g, '""')}"`,
      l.email,
      `"${l.phone}"`,
      l.material,
      l.monthlyVolumeKg,
      l.sustainabilityStatus,
      l.status,
      `"${(l.notes || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="neuman-leads-${new Date().toISOString().slice(0, 10)}.csv"`
      }
    });
  }

  return NextResponse.json({ success: true, leads, count: leads.length });
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ success: false, message: "ID y estado requeridos" }, { status: 400 });
    }

    const ok = updateLeadStatus(id, status);
    if (!ok) {
      return NextResponse.json({ success: false, message: "Lead no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Estado actualizado con éxito" });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Error interno" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "ID requerido" }, { status: 400 });
    }

    const ok = deleteLead(id);
    return NextResponse.json({ success: ok, message: ok ? "Lead eliminado" : "Lead no encontrado" });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Error al eliminar" }, { status: 500 });
  }
}
