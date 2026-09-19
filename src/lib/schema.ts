import { z } from "zod";

export const diagnosticFormSchema = z.object({
  material: z.string().min(1, "Selecciona el tipo de residuo textil predominante"),
  monthlyVolumeKg: z.string().min(1, "Indica el volumen mensual aproximado de retazos"),
  frequency: z.string().default("Mensual"),
  desiredProduct: z.string().min(1, "Selecciona el insumo que deseas fabricar con tus retazos"),
  brandName: z.string().min(2, "El nombre de la marca o taller es obligatorio"),
  contactName: z.string().min(2, "El nombre de la persona de contacto es obligatorio"),
  contactRole: z.string().default("Director de Producción"),
  cityLocation: z.string().default("Bogotá"),
  email: z.string().email("Ingresa un correo electrónico corporativo válido"),
  phone: z.string().min(7, "Ingresa un número de WhatsApp o teléfono válido"),
  notes: z.string().optional(),
  sustainabilityStatus: z.string().optional()
});

export const diagnosticSchema = diagnosticFormSchema;
export type DiagnosticFormData = z.infer<typeof diagnosticFormSchema>;
