import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, crmData, apiKey: clientApiKey } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Mensaje no proporcionado" }, { status: 400 });
    }

    const apiKey = clientApiKey || process.env.GEMINI_API_KEY;
    const relations = crmData?.relations || [];
    const opportunities = crmData?.opportunities || [];

    // Summary calculations for live context
    const totalKg = relations.reduce((acc: number, r: any) => acc + (Number(r.volumenMensualKg) || 0), 0);
    const totalMarcas = relations.length;
    const totalWaterSaved = relations.reduce((acc: number, r: any) => {
      const kg = Number(r.volumenMensualKg) || 0;
      const mult = r.materialPrincipal?.includes("Denim") ? 2600 : r.materialPrincipal?.includes("Algodón") ? 2800 : 2100;
      return acc + (kg * mult);
    }, 0);
    const totalCo2Saved = Math.round(totalKg * 4.2);

    // If Gemini API Key is available, call Google Gemini 1.5 Flash
    if (apiKey) {
      try {
        const systemPrompt = `Eres el Asistente de Operaciones Textiles con IA de NEUMAN (Taller Textil Circular en Bogotá, Colombia).
Tu labor es asistir a Pablo (CEO), Jerónimo (CPO), Santiago (CFO) y Amalia (CMO) con análisis de datos en tiempo real, cálculos técnicos, borradores de WhatsApp y cotizaciones.

EQUIPO DE NEUMAN:
- Pablo: CEO · Dirección General & Alianzas.
- Jerónimo: CPO · Producto, Taller & Calidad de Hilatura.
- Santiago: CFO · Finanzas, Cuentas & Rentabilidad.
- Amalia: CMO · Marketing, Marca & Co-Diseño.

BASE DE DATOS EN VIVO DEL CRM:
- Total de marcas registradas: ${totalMarcas}
- Total volumen de retazos: ${totalKg.toLocaleString()} Kg/mes
- Ahorro de agua acumulado: ${totalWaterSaved.toLocaleString()} Litros
- CO2 mitigado acumulado: ${totalCo2Saved.toLocaleString()} Kg
- Listado completo de marcas en el taller:
${relations.map((r: any, idx: number) => `  ${idx + 1}. Empresa: "${r.empresa}", Contacto: "${r.nombre || r.contacto || "N/A"}", Paso: "${r.pasoActual || r.estado || "0. Recepción Automática"}", Material: "${r.materialPrincipal || "N/A"}", Volumen: ${r.volumenMensualKg || 0} Kg/mes, Responsable: "${r.responsable || "Pablo"}", Tel: "${r.telefono || "N/A"}", Insumo: "${r.insumoInteres || "Marquillas Satín"}"`).join("\n")}

DIRECTRICES:
- Responde siempre de forma fluida, cordial, profesional y ejecutiva en español.
- Si te consultan por una empresa, utiliza exactamente sus datos reales del CRM arriba.
- Si te piden redactar un mensaje, adáptalo al tono sastre y de economía circular de NEUMAN.
- Rinde cálculos técnicos precisos (1 Kg de retazo = ~320 marquillas satín de 25mm o ~4.8 totes).`;

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const response = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: `${systemPrompt}\n\nPregunta:\n${message}` }]
              }
            ],
            generationConfig: {
              temperature: 0.65,
              maxOutputTokens: 1200,
            }
          })
        });

        if (response.ok) {
          const geminiData = await response.json();
          const replyText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return NextResponse.json({
              reply: replyText,
              provider: "gemini-1.5-flash",
              hasKey: true
            });
          }
        }
      } catch (err) {
        console.error("Gemini API call failed, falling back to local engine:", err);
      }
    }

    // Comprehensive Dynamic CRM Engine
    const localReply = executeLocalCrmAI(message, relations, {
      totalKg,
      totalMarcas,
      totalWaterSaved,
      totalCo2Saved,
      opportunities
    });

    return NextResponse.json({
      reply: localReply,
      provider: "local-crm-engine",
      hasKey: !!apiKey
    });

  } catch (error) {
    console.error("AI Assistant Route Error:", error);
    return NextResponse.json(
      { error: "Error procesando la solicitud del asistente" },
      { status: 500 }
    );
  }
}

function executeLocalCrmAI(query: string, relations: any[], metrics: any): string {
  const q = query.toLowerCase().trim();

  // 1. Search for specific company
  const foundCompany = relations.find((r: any) => {
    const emp = (r.empresa || "").toLowerCase();
    const nom = (r.nombre || r.contacto || "").toLowerCase();
    const words = emp.split(/\s+/).filter((w: string) => w.length > 2 && !["s.a.s", "sas", "ltda", "de", "la", "el"].includes(w));
    return (emp && q.includes(emp)) ||
           (words.some((w: string) => q.includes(w))) ||
           (nom && q.includes(nom));
  });

  if (foundCompany) {
    const kg = Number(foundCompany.volumenMensualKg) || 50;
    const mat = foundCompany.materialPrincipal || "Algodón / Denim";
    const labels = Math.round(kg * 320);
    const water = Math.round(kg * 2600);
    const co2 = (kg * 4.2).toFixed(1);
    const step = foundCompany.pasoActual || foundCompany.estado || "0. Recepción Automática";
    const responsable = foundCompany.responsable || "Pablo";

    if (q.includes("whatsapp") || q.includes("mensaje") || q.includes("redacta") || q.includes("escribir") || q.includes("propuesta")) {
      return `📱 **Propuesta de WhatsApp para ${foundCompany.empresa}:**

*"Hola ${foundCompany.nombre || foundCompany.contacto || "equipo de " + foundCompany.empresa}, te escribe ${responsable} de NEUMAN Consultoría de Economía Circular Textil en Bogotá.*

*Revisamos los datos de producción de su empresa (${kg} Kg/mes de ${mat}). Ya calculamos el rendimiento de sus residuos textiles: podemos transformar este volumen en **${labels.toLocaleString()} ${foundCompany.insumoInteres || "marquillas satín tejidas"}**, ahorrando **${water.toLocaleString()} Litros de agua** con Certificado Oficial de Custodia 1:1.*

*¿Les parece si coordinamos una breve llamada de 10 minutos para definir los detalles del co-diseño?"*

---
📌 **Datos de Seguimiento:** Estado actual: \`${step}\` | Responsable asignado: **${responsable}** | Teléfono: **${foundCompany.telefono || "Por registrar"}**.`;
    }

    return `🏢 **Ficha Técnica & Estado de ${foundCompany.empresa}:**

- **Etapa en el Proceso:** \`${step}\`
- **Contacto Registrado:** ${foundCompany.nombre || foundCompany.contacto || "No especificado"}
- **Teléfono:** ${foundCompany.telefono || "Sin registrar"}
- **Material de Residuos Textiles:** ${mat}
- **Volumen Declarado:** **${kg} Kg/mes**
- **Insumo a Confeccionar:** ${foundCompany.insumoInteres || "Marquillas Satín Jacquard"}
- **Responsable en NEUMAN:** **${responsable}**
- **Ubicación:** ${foundCompany.ciudad || "Bogotá D.C."}

🧮 **Rendimiento Productivo del Lote:**
- **Unidades Terminadas:** ~**${labels.toLocaleString()} insumos** listos para pegado.
- **Ahorro de Agua Potable:** **${water.toLocaleString()} Litros** de agua preservada.
- **Emisiones Evitadas:** **-${co2} Kg de CO₂** certificados para su reporte de sostenibilidad.`;
  }

  // 2. Query for team members
  if (q.includes("pablo") || q.includes("ceo") || q.includes("direccion")) {
    const pabloBrands = relations.filter((r: any) => (r.responsable || "").toLowerCase().includes("pablo"));
    return `👔 **Resumen Ejecutivo para Pablo (CEO · Dirección General & Alianzas):**

- **Cartera Total:** ${metrics.totalMarcas} marcas registradas con un volumen mensual de **${metrics.totalKg.toLocaleString()} Kg**.
- **Impacto Consolidado:** ${metrics.totalWaterSaved.toLocaleString()} L de agua dulce preservados y -${metrics.totalCo2Saved.toLocaleString()} Kg CO₂.
- **Marcas asignadas directamente a ti:** ${pabloBrands.length > 0 ? pabloBrands.map((b: any) => b.empresa).join(", ") : "Todas las marcas clave"}.

🎯 **Prioridades de Cierre:**
1. Validar términos comerciales con las marcas en Paso 0 y Paso 1.
2. Coordinar con Jerónimo la calendarización del telar Jacquard para las entregas del mes.
3. Consolidar la firma de convenios de custodia 1:1.`;
  }

  if (q.includes("jeronimo") || q.includes("cpo") || q.includes("planta") || q.includes("calidad") || q.includes("hilatura") || q.includes("produccion")) {
    const inProd = relations.filter((r: any) => (r.pasoActual || "").includes("Producción") || (r.pasoActual || "").includes("Transformación"));
    return `🧵 **Reporte Técnico & Operativo para Jerónimo (CPO):**

- **Marcas en Fase de Producción:** ${inProd.length} marcas (${inProd.map((b: any) => b.empresa).join(", ") || "En fase de alistamiento de urdimbre"}).
- **Capacidad Total Proyectada:** ${(metrics.totalKg * 320).toLocaleString()} marquillas satín de alta definición.
- **Control de Calidad 1:1:** Cada lote de retazos se clasifica por título métrico y color. Cero contaminación cruzada entre lotes de diferentes clientes.`;
  }

  if (q.includes("santiago") || q.includes("cfo") || q.includes("finanzas") || q.includes("facturacion") || q.includes("precio") || q.includes("costo")) {
    const totalVal = metrics.totalKg * 45000;
    return `📊 **Proyección Financiera para Santiago (CFO):**

- **Volumen Activo:** **${metrics.totalKg.toLocaleString()} Kg/mes**.
- **Facturación Proyectada del Pipeline:** **~$${(totalVal / 1000000).toFixed(1)}M COP/mes** ($45,000 COP/Kg promedio).
- **Margen Operativo Estimado:** **~64%**, con retorno de inversión en insumos vírgenes para el cliente de 3.2x.`;
  }

  if (q.includes("amalia") || q.includes("cmo") || q.includes("marketing") || q.includes("marca") || q.includes("diseno") || q.includes("diseño")) {
    return `🎨 **Estrategia de Comunicación & Co-Diseño para Amalia (CMO):**

- **Marcas Aliadas:** ${metrics.totalMarcas} marcas con potencial de co-branding.
- **Narrativa Oficial:** *"De residuo a relato"* — convertir los residuos textiles en la seña de identidad de las prendas.
- **Indicador Estrella de Campaña:** **${metrics.totalWaterSaved.toLocaleString()} Litros de agua ahorrados**, perfecto para los hangtags y etiquetas con código QR trazable.`;
  }

  // 3. Technical Calculation
  const numMatch = q.match(/(\d+)\s*(kg|kilos|k|ton)/);
  if (numMatch || q.includes("calcula") || q.includes("rinde") || q.includes("cuanto rinde") || q.includes("cuántas")) {
    const kg = numMatch ? Number(numMatch[1]) : 100;
    const marquillas = Math.round(kg * 320);
    const totes = Math.round(kg * 4.8);
    const agua = Math.round(kg * 2600);
    const co2 = (kg * 4.2).toFixed(1);
    const valCop = Math.round(kg * 45000);

    return `🧮 **Cálculo de Rendimiento Textil para ${kg} Kg de Residuos Textiles:**

- **🏷️ Marquillas Satín Tejidas:** ~**${marquillas.toLocaleString()} unidades** (ancho estándar 20-35mm).
- **🛍️ Bolsas Tote / Empaques:** ~**${totes.toLocaleString()} bolsas de sastre**.
- **💧 Preservación Hídrica:** **${agua.toLocaleString()} Litros de agua dulce** (sin teñido químico adicional).
- **🌱 Emisiones Mitigadas:** **-${co2} Kg de CO₂** evitados.
- **💰 Valor Comercial Estimado:** ~$${(valCop / 1000000).toFixed(2)}M COP.

*Todo lote se entrega con Certificado Oficial de Custodia 1:1 y código QR para auditorías y consumidor final.*`;
  }

  // 4. Status Breakdown
  if (q.includes("paso") || q.includes("etapa") || q.includes("quién") || q.includes("quien") || q.includes("marcas") || q.includes("listado")) {
    const stepsMap: { [key: string]: string[] } = {};
    relations.forEach((r: any) => {
      const step = r.pasoActual || r.estado || "0. Recepción Automática";
      if (!stepsMap[step]) stepsMap[step] = [];
      stepsMap[step].push(`${r.empresa} (${r.volumenMensualKg || 0} Kg)`);
    });

    return `📋 **Estado Actual del Circuito de Taller (${metrics.totalMarcas} Marcas):**

${Object.entries(stepsMap).map(([step, list]) => `• **${step}:**\n  - ${list.join("\n  - ")}`).join("\n\n")}

**Volumen Acumulado:** ${metrics.totalKg.toLocaleString()} Kg/mes. ¿Deseas redactar una propuesta o consultar una marca específica?`;
  }

  // 5. Default intelligent response
  return `🤖 **Asistente de Operaciones Textiles NEUMAN**

Base de datos en tiempo real del taller:
- 🏢 **${metrics.totalMarcas} marcas** registradas en el pipeline B2B.
- 📦 **${metrics.totalKg.toLocaleString()} Kg/mes** de retazos textiles bajo gestión.
- 💧 **${metrics.totalWaterSaved.toLocaleString()} Litros** de agua preservados.
- 🌍 **-${metrics.totalCo2Saved.toLocaleString()} Kg CO₂** evitados.

**Consultas rápidas que puedes hacerme:**
- *"¿Qué estado tiene Studio Bogotá?"* (o cualquier marca de la lista)
- *"Redacta un mensaje de WhatsApp para Tiki Brands"*
- *"¿Cuánto rinden 150 kg de algodón?"*
- *"Resumen ejecutivo para Pablo (CEO) o Santiago (CFO)"*
- *"¿Quién está en Paso 0?"*`;
}
