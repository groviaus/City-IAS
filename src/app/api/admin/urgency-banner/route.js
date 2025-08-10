import { NextResponse } from "next/server";
import { query } from "@/lib/db";

async function ensureTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS urgency_banner (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      subtitle VARCHAR(300) NOT NULL,
      batch_start_date DATE NOT NULL,
      available_seats INT DEFAULT 50,
      active TINYINT(1) DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}

export async function GET() {
  try {
    await ensureTable();
    const rows = await query(
      `SELECT id, title, subtitle, batch_start_date, available_seats, active
       FROM urgency_banner ORDER BY id DESC LIMIT 1`
    );
    return NextResponse.json({ items: rows });
  } catch (e) {
    console.error("urgency-banner GET error", e);
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
        title,
        subtitle,
        batch_start_date,
        available_seats = 50,
        active = 1,
      } = body;

      // Clear any existing active banners
      await query(`UPDATE urgency_banner SET active = 0`);

      await query(
        `INSERT INTO urgency_banner (title, subtitle, batch_start_date, available_seats, active)
         VALUES (?, ?, ?, ?, ?)`,
        [title, subtitle, batch_start_date, available_seats, active ? 1 : 0]
      );
      return NextResponse.json({ success: true });
    }

    if (action === "update") {
      const { id, title, subtitle, batch_start_date, available_seats, active } =
        body;

      await query(
        `UPDATE urgency_banner SET
          title = COALESCE(?, title),
          subtitle = COALESCE(?, subtitle),
          batch_start_date = COALESCE(?, batch_start_date),
          available_seats = COALESCE(?, available_seats),
          active = COALESCE(?, active)
         WHERE id = ?`,
        [title, subtitle, batch_start_date, available_seats, active, id]
      );
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (e) {
    console.error("urgency-banner POST error", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
