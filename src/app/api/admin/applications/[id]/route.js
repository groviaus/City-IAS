import { NextResponse } from "next/server";
import { query } from "@/lib/db";

async function ensureStatusColumn() {
  try {
    const columns = await query("SHOW COLUMNS FROM applications LIKE 'status'");
    if (!columns || columns.length === 0) {
      await query(
        "ALTER TABLE applications ADD COLUMN status ENUM('pending','approved','rejected') DEFAULT 'pending'"
      );
    }
  } catch (e) {
    console.error("ensureStatusColumn error:", e);
  }
}

export async function GET(_req, { params }) {
  const { id } = params;
  try {
    await ensureStatusColumn();
    const rows = await query(
      `SELECT id, name, email, phone, city_state, course, created_at, COALESCE(status,'pending') as status
       FROM applications WHERE id = ? LIMIT 1`,
      [id]
    );
    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ application: rows[0] });
  } catch (error) {
    console.error("Error fetching application:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  const { id } = params;
  try {
    await ensureStatusColumn();
    const body = await request.json();
    const { status } = body;
    if (!["pending", "approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    await query(`UPDATE applications SET status = ? WHERE id = ?`, [
      status,
      id,
    ]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_req, { params }) {
  const { id } = params;
  try {
    await query(`DELETE FROM applications WHERE id = ?`, [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting application:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
