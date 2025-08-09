import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const rows = await query(
      `SELECT id, icon, title, date_text, year_text, order_index
       FROM important_dates WHERE active = 1 ORDER BY order_index ASC, id ASC`
    );
    return NextResponse.json({ items: rows || [] });
  } catch (e) {
    console.error("public important-dates GET error", e);
    return NextResponse.json({ items: [] });
  }
}
