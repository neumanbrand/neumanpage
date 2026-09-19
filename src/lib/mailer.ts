import { DiagnosticFormData } from "./schema";

export async function sendDiagnosticEmails(data: DiagnosticFormData) {
  // Configurable via process.env.RESEND_API_KEY or SMTP
  const isProd = process.env.NODE_ENV === "production" && !!process.env.RESEND_API_KEY;

  const emailPayload = {
    brand: data.brandName,
    contact: data.contactName,
    role: data.contactRole,
    email: data.email,
    phone: data.phone,
    material: data.material,
    volume: data.monthlyVolumeKg,
    status: data.sustainabilityStatus,
    notes: data.notes || "Sin notas adicionales",
    timestamp: new Date().toISOString()
  };

  if (isProd) {
    // Dispatch via Resend API
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "NEUMAN Notificaciones <notificaciones@neuman.co>",
          to: ["contacto@neuman.co"],
          subject: `⚡ Nuevo Diagnóstico Circular: ${data.brandName}`,
          html: `
            <div style="font-family: sans-serif; background-color: #F7F3EE; padding: 24px; color: #24120C;">
              <h2 style="color: #C86D51; margin-top: 0;">Nuevo Lead de Diagnóstico Textil</h2>
              <p><strong>Marca / Taller:</strong> ${data.brandName}</p>
              <p><strong>Contacto:</strong> ${data.contactName} (${data.contactRole})</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Teléfono:</strong> ${data.phone}</p>
              <hr style="border: 0; border-top: 1px solid #DFD3C3;" />
              <p><strong>Tipo de Residuo Textil:</strong> ${data.material}</p>
              <p><strong>Volumen Estimado:</strong> ${data.monthlyVolumeKg}</p>
              <p><strong>Iniciativas Sostenibles:</strong> ${data.sustainabilityStatus}</p>
              <p><strong>Notas:</strong> ${data.notes || "N/A"}</p>
            </div>
          `
        })
      });
      return await res.json();
    } catch (err) {
      console.error("Error al enviar email con Resend:", err);
      return { success: false, error: err };
    }
  }

  // Local / dev environment mock log
  console.log("📨 [DEV] Notificación de diagnóstico registrada con éxito:", emailPayload);
  return { success: true, mode: "mock", data: emailPayload };
}
