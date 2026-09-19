import fs from "fs";
import path from "path";
import { DiagnosticFormData } from "./schema";

export interface StoredLead extends DiagnosticFormData {
  id: string;
  timestamp: string;
  status: "nuevo" | "en_contacto" | "cerrado" | "archivado";
}

const DATA_FILE = path.join(process.cwd(), "data", "leads.json");

function ensureFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), "utf-8");
  }
}

export function getAllLeads(): StoredLead[] {
  try {
    ensureFile();
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading leads.json:", error);
    return [];
  }
}

export function saveLead(data: DiagnosticFormData): StoredLead {
  ensureFile();
  const leads = getAllLeads();
  const newLead: StoredLead = {
    ...data,
    id: `lead-${Date.now()}`,
    timestamp: new Date().toISOString(),
    status: "nuevo"
  };

  leads.unshift(newLead);
  fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2), "utf-8");
  return newLead;
}

export function updateLeadStatus(id: string, status: StoredLead["status"]): boolean {
  ensureFile();
  const leads = getAllLeads();
  const idx = leads.findIndex((l) => l.id === id);
  if (idx === -1) return false;

  leads[idx].status = status;
  fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2), "utf-8");
  return true;
}

export function deleteLead(id: string): boolean {
  ensureFile();
  const leads = getAllLeads();
  const filtered = leads.filter((l) => l.id !== id);
  fs.writeFileSync(DATA_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}
