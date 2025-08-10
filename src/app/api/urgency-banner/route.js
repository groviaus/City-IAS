import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const rows = await query(
      `SELECT id, title, subtitle, batch_start_date, available_seats
       FROM urgency_banner WHERE active = 1 ORDER BY id DESC LIMIT 1`
    );
    return NextResponse.json({ item: rows[0] || null });
  } catch (e) {
    console.error("public urgency-banner GET error", e);
    return NextResponse.json({ item: null });
  }
}
