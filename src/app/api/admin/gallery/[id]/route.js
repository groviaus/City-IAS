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

export async function GET(_req, { params }) {
  try {
    const { id } = params;
    await ensureTable();
    const rows = await query(
      `SELECT id, src, alt, category, title, order_index, created_at FROM gallery_images WHERE id = ? LIMIT 1`,
      [id]
    );
    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ item: rows[0] });
  } catch (e) {
    console.error("gallery [id] GET error", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    await ensureTable();

    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      // Optional image replacement + meta update
      const form = await request.formData();
      const title = form.get("title")?.toString() || null;
      const alt = form.get("alt")?.toString() || null;
      const category = form.get("category")?.toString() || null;
      const orderIndexRaw = form.get("order_index");
      const order_index =
        orderIndexRaw !== null ? Number(orderIndexRaw) || 0 : null;
      const file = form.get("file");

      let newSrc = null;
      if (file && typeof file !== "string") {
        // Read old to delete after
        const [current] = await query(
          `SELECT src FROM gallery_images WHERE id = ? LIMIT 1`,
          [id]
        );

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const originalName = file.name || "image";
        const ext = path.extname(originalName) || ".jpg";
        const uniqueName = `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}${ext}`;
        const destPath = path.join(getUploadsDir(), uniqueName);
        await fs.mkdir(getUploadsDir(), { recursive: true });
        await fs.writeFile(destPath, buffer);
        newSrc = `/uploads/gallery/${uniqueName}`;

        // Update src
        await query(`UPDATE gallery_images SET src = ? WHERE id = ?`, [
          newSrc,
          id,
        ]);

        // Delete old file best-effort
        try {
          const oldName = current?.src?.split("/uploads/gallery/")[1];
          if (oldName) {
            await fs.unlink(path.join(getUploadsDir(), oldName));
          }
        } catch (_e) {}
      }

      await query(
        `UPDATE gallery_images SET 
          title = COALESCE(?, title),
          alt = COALESCE(?, alt),
          category = COALESCE(?, category),
          order_index = COALESCE(?, order_index)
        WHERE id = ?`,
        [title, alt, category, order_index, id]
      );

      const [row] = await query(
        `SELECT id, src, alt, category, title, order_index, created_at FROM gallery_images WHERE id = ?`,
        [id]
      );
      return NextResponse.json({ success: true, item: row });
    }

    // JSON meta update only
    const body = await request.json();
    const { title, alt, category, order_index } = body || {};
    await query(
      `UPDATE gallery_images SET 
        title = COALESCE(?, title),
        alt = COALESCE(?, alt),
        category = COALESCE(?, category),
        order_index = COALESCE(?, order_index)
      WHERE id = ?`,
      [title, alt, category, order_index, id]
    );
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("gallery [id] PATCH error", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(_req, { params }) {
  try {
    const { id } = params;
    // Read src then delete row
    const rows = await query(
      `SELECT src FROM gallery_images WHERE id = ? LIMIT 1`,
      [id]
    );
    await query(`DELETE FROM gallery_images WHERE id = ?`, [id]);
    // Delete file from disk
    try {
      const src = rows?.[0]?.src;
      if (src) {
        const name = src.split("/uploads/gallery/")[1];
        if (name) await fs.unlink(path.join(getUploadsDir(), name));
      }
    } catch (_e) {}
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("gallery [id] DELETE error", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}


