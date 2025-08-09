import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    // Get recent applications (last 10)
    const applications = await query(`
      SELECT 
        id,
        name,
        course,
        city_state,
        created_at
      FROM applications 
      ORDER BY created_at DESC 
      LIMIT 10
    `);

    return NextResponse.json({
      applications: applications || [],
    });
  } catch (error) {
    console.error("Error fetching recent applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent applications" },
      { status: 500 }
    );
  }
}
