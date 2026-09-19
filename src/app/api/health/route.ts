import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "NEUMAN B2B Circular Textile Platform",
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
}
