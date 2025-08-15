import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// Status column is now created by default in submit-application API
// No need for dynamic column creation

export async function GET() {
  try {
    console.log("Fetching applications from database...");

    const applications = await query(`
      SELECT 
        id,
        name,
        email,
        phone,
        city_state,
        course,
        status,
        created_at
      FROM applications 
      ORDER BY created_at DESC
    `);

    console.log("Applications fetched:", applications.length);

    return NextResponse.json({
      applications: applications || [],
      total: applications ? applications.length : 0,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch applications",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// Bulk actions: { action: 'delete'|'status', ids: number[], status?: 'pending'|'approved'|'rejected' }
export async function POST(request) {
  try {
    const body = await request.json();
    const { action, ids, status } = body || {};
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "No ids provided" }, { status: 400 });
    }

    if (action === "delete") {
      const placeholders = ids.map(() => "?").join(",");
      await query(
        `DELETE FROM applications WHERE id IN (${placeholders})`,
        ids
      );
      return NextResponse.json({ success: true, deleted: ids.length });
    }

    if (action === "status") {
      if (!["pending", "approved", "rejected"].includes(status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      }
      const placeholders = ids.map(() => "?").join(",");
      await query(
        `UPDATE applications SET status = ? WHERE id IN (${placeholders})`,
        [status, ...ids]
      );
      return NextResponse.json({ success: true, updated: ids.length });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Bulk action error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
