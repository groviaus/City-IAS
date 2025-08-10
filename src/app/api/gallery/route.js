import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS gallery_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        src VARCHAR(255) NOT NULL,
        alt VARCHAR(255) NOT NULL,
        category ENUM('facilities','hostel','events') DEFAULT 'facilities',
        title VARCHAR(255),
        order_index INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    const rows = await query(
      `SELECT id, src, alt, category, title, order_index FROM gallery_images ORDER BY order_index ASC, id ASC`
    );
    return NextResponse.json({ items: rows || [] });
  } catch (e) {
    console.error("public gallery GET error", e);
    return NextResponse.json({ items: [] });
  }
}

