import { DiagnosticFormData } from "./schema";

export async function appendToGoogleSheets(data: DiagnosticFormData) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  const rowData = {
    fecha: new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" }),
    marca: data.brandName,
    contacto: data.contactName,
    cargo: data.contactRole,
    email: data.email,
    telefono: data.phone,
    materialPredominante: data.material,
    volumenMensualKg: data.monthlyVolumeKg,
    estadoSostenibilidad: data.sustainabilityStatus,
    notas: data.notes || ""
  };

  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rowData)
      });
      return await response.json();
    } catch (err) {
      console.error("Error al enviar fila a Google Sheets Webhook:", err);
      return { success: false, error: err };
    }
  }

  // Local / dev environment fallback
  console.log("📊 [DEV] Registro en Google Sheets simulado:", rowData);
  return { success: true, mode: "mock", row: rowData };
}
