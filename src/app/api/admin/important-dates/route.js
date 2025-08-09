import { NextResponse } from "next/server";
import { query } from "@/lib/db";

async function ensureTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS important_dates (
      id INT AUTO_INCREMENT PRIMARY KEY,
      icon VARCHAR(50) NOT NULL,
      title VARCHAR(100) NOT NULL,
      date_text VARCHAR(100) NOT NULL,
      year_text VARCHAR(100) NOT NULL,
      order_index INT DEFAULT 0,
      active TINYINT(1) DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}

export async function GET() {
  try {
    await ensureTable();
    const rows = await query(
      `SELECT id, icon, title, date_text, year_text, order_index, active
       FROM important_dates ORDER BY order_index ASC, id ASC`
    );
    return NextResponse.json({ items: rows });
  } catch (e) {
    console.error("important-dates GET error", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await ensureTable();
    const body = await request.json();
    const { action } = body || {};

    if (action === "create") {
      const {
        icon,
        title,
        date_text,
        year_text,
        order_index = 0,
        active = 1,
      } = body;
      await query(
        `INSERT INTO important_dates (icon, title, date_text, year_text, order_index, active)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [icon, title, date_text, year_text, order_index, active ? 1 : 0]
      );
      return NextResponse.json({ success: true });
    }

    if (action === "bulkDelete") {
      const { ids } = body;
      if (!Array.isArray(ids) || ids.length === 0) {
        return NextResponse.json({ error: "No ids" }, { status: 400 });
      }
      const placeholders = ids.map(() => "?").join(",");
      await query(
        `DELETE FROM important_dates WHERE id IN (${placeholders})`,
        ids
      );
      return NextResponse.json({ success: true, deleted: ids.length });
    }

    if (action === "reorder") {
      const { items } = body; // [{id, order_index}]
      if (!Array.isArray(items)) {
        return NextResponse.json({ error: "No items" }, { status: 400 });
      }
      for (const it of items) {
        await query(`UPDATE important_dates SET order_index = ? WHERE id = ?`, [
          it.order_index ?? 0,
          it.id,
        ]);
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (e) {
    console.error("important-dates POST error", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
