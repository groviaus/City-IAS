import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(_req, { params }) {
  try {
    const { id } = params;
    const rows = await query(
      `SELECT id, icon, title, date_text, year_text, order_index, active
       FROM important_dates WHERE id = ? LIMIT 1`,
      [id]
    );
    if (!rows || rows.length === 0)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ item: rows[0] });
  } catch (e) {
    console.error("important-dates [id] GET error", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { icon, title, date_text, year_text, order_index, active } = body;
    await query(
      `UPDATE important_dates SET 
        icon = COALESCE(?, icon),
        title = COALESCE(?, title),
        date_text = COALESCE(?, date_text),
        year_text = COALESCE(?, year_text),
        order_index = COALESCE(?, order_index),
        active = COALESCE(?, active)
       WHERE id = ?`,
      [icon, title, date_text, year_text, order_index, active, id]
    );
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("important-dates [id] PATCH error", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(_req, { params }) {
  try {
    const { id } = params;
    await query(`DELETE FROM important_dates WHERE id = ?`, [id]);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("important-dates [id] DELETE error", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
