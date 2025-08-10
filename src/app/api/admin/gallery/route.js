import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";

async function ensureTable() {
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
}

function getUploadsDir() {
  return path.join(process.cwd(), "public", "uploads", "gallery");
}

async function ensureUploadsDir() {
  const dir = getUploadsDir();
  await fs.mkdir(dir, { recursive: true });
  return dir;
}

export async function GET() {
  try {
    await ensureTable();
    const rows = await query(
      `SELECT id, src, alt, category, title, order_index, created_at
       FROM gallery_images ORDER BY order_index ASC, id ASC`
    );
    return NextResponse.json({ items: rows || [] });
  } catch (e) {
    console.error("gallery GET error", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await ensureTable();
    const contentType = request.headers.get("content-type") || "";

    // Multipart upload (single or multiple files)
    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      const category = (form.get("category") || "facilities").toString();
      const title = form.get("title")?.toString() || null;
      const alt = form.get("alt")?.toString() || "Gallery Image";
      const orderIndexRaw = form.get("order_index");
      const orderIndex = orderIndexRaw ? Number(orderIndexRaw) || 0 : 0;

      const files = form.getAll("files");
      if (!files || files.length === 0) {
        return NextResponse.json(
          { error: "No files uploaded" },
          { status: 400 }
        );
      }

      const dir = await ensureUploadsDir();
      const created = [];

      for (const file of files) {
        if (!file || typeof file === "string") continue;
        const blob = file;
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const originalName = blob.name || "image";
        const ext = path.extname(originalName) || ".jpg";
        const uniqueName = `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}${ext}`;
        const destPath = path.join(dir, uniqueName);
        await fs.writeFile(destPath, buffer);
        const src = `/uploads/gallery/${uniqueName}`;

        await query(
          `INSERT INTO gallery_images (src, alt, category, title, order_index)
           VALUES (?, ?, ?, ?, ?)`,
          [src, alt, category, title, orderIndex]
        );

        const [row] = await query(
          `SELECT id, src, alt, category, title, order_index, created_at
           FROM gallery_images WHERE src = ? ORDER BY id DESC LIMIT 1`,
          [src]
        );
        if (row) created.push(row);
      }

      return NextResponse.json({ success: true, created });
    }

    // JSON actions (bulkDelete, reorder)
    const body = await request.json();
    const { action } = body || {};

    if (action === "bulkDelete") {
      const { ids } = body;
      if (!Array.isArray(ids) || ids.length === 0) {
        return NextResponse.json({ error: "No ids" }, { status: 400 });
      }
      // Fetch src to delete files
      const placeholders = ids.map(() => "?").join(",");
      const rows = await query(
        `SELECT id, src FROM gallery_images WHERE id IN (${placeholders})`,
        ids
      );
      await query(
        `DELETE FROM gallery_images WHERE id IN (${placeholders})`,
        ids
      );
      // Delete files from disk (best-effort)
      const dir = getUploadsDir();
      await Promise.all(
        (rows || []).map(async (r) => {
          if (!r?.src) return;
          const filename = r.src.split("/uploads/gallery/")[1];
          if (!filename) return;
          const filePath = path.join(dir, filename);
          try {
            await fs.unlink(filePath);
          } catch (_e) {}
        })
      );
      return NextResponse.json({ success: true, deleted: ids.length });
    }

    if (action === "reorder") {
      const { items } = body; // [{id, order_index}]
      if (!Array.isArray(items)) {
        return NextResponse.json({ error: "No items" }, { status: 400 });
      }
      for (const it of items) {
        await query(`UPDATE gallery_images SET order_index = ? WHERE id = ?`, [
          it.order_index ?? 0,
          it.id,
        ]);
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (e) {
    console.error("gallery POST error", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
