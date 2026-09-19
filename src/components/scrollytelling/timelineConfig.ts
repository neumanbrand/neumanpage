export interface ChapterConfig {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  startFrame: number;
  endFrame: number;
  startProgress: number; // 0 to 1
  peakProgress: number;
  endProgress: number;
}

export const TOTAL_FRAMES = 166; // 0 to 165 inclusive (Full sequence up to frame #00165)

export const CHAPTERS: ChapterConfig[] = [
  {
    id: "origen",
    num: "01",
    title: "Origen & Manifiesto",
    subtitle: "El valor dormido en la mesa de corte",
    startFrame: 0,
    endFrame: 164,
    startProgress: 0.24,
    peakProgress: 0.35,
    endProgress: 0.44,
  },
  {
    id: "metamorfosis",
    num: "02",
    title: "La Metamorfosis",
    subtitle: "Protocolo técnico de economía circular 1:1",
    startFrame: 165,
    endFrame: 356,
    startProgress: 0.45,
    peakProgress: 0.55,
    endProgress: 0.64,
  },
  {
    id: "estructura",
    num: "03",
    title: "Forma & Estructura",
    subtitle: "Insumos de sastre y proyección de impacto",
    startFrame: 356,
    endFrame: 356,
    startProgress: 0.65,
    peakProgress: 0.75,
    endProgress: 0.84,
  },
  {
    id: "identidad",
    num: "04",
    title: "Identidad & Cierre",
    subtitle: "Trazabilidad certificada y contacto directo",
    startFrame: 356,
    endFrame: 356,
    startProgress: 0.85,
    peakProgress: 0.94,
    endProgress: 1.0,
  },
];
