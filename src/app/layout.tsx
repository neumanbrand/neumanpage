import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#F5E8C7",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "NEUMAN | New world needs neuman — De residuo a relato",
  description:
    "Consultoría B2B de valorización textil y economía circular en Colombia. Transformamos tus retazos de mesa de corte en insumos de sastre 1:1, nuevas líneas de producto y trazabilidad verificable.",
  keywords: [
    "economía circular textil Bogotá",
    "reciclaje textil B2B Colombia",
    "marquillas sostenibles",
    "valorización de retazos",
    "moda circular Colombia",
    "insumos textiles reciclados",
    "trazabilidad textil 1:1",
    "deadstock textil Bogotá"
  ],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/icon.svg"],
  },
  authors: [{ name: "NEUMAN Circular Textile" }],
  openGraph: {
    title: "NEUMAN | New world needs neuman",
    description: "Tus retazos no son basura. Son tu próxima colección de insumos de sastre con trazabilidad certificada.",
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="font-lora antialiased bg-[#F5E8C7] text-[#23110E] selection:bg-[#2C4231] selection:text-[#F5E8C7]">
        {children}
      </body>
    </html>
  );
}
