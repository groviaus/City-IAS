import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "srv1875.hstgr.io",
      user: process.env.DB_USER || "u181984996_cityiasacademy",
      password: process.env.DB_PASSWORD || "D=a9whhW7@",
      database: process.env.DB_NAME || "u181984996_cityiasacademy",
      port: process.env.DB_PORT || 3306,
    });

    try {
      const [rows] = await connection.execute(`
        SELECT id, title, subtitle, description, price, duration, registration,
               badge, badge_color, border_color, icon_bg, icon_color, title_color,
               button_text, button_color, is_popular, status, features
        FROM courses
        WHERE status = 'active'
        ORDER BY created_at DESC
      `);

      const courses = rows.map((c) => ({
        id: c.id,
        title: c.title,
        subtitle: c.subtitle || "",
        description: c.description || "",
        price: Number(c.price) || 0,
        duration: c.duration || "",
        registration: c.registration ? Number(c.registration) : null,
        badge: c.badge || "",
        badgeColor: c.badge_color || "bg-green-500",
        borderColor: c.border_color || "border-green-200",
        iconBg: c.icon_bg || "bg-green-100",
        iconColor: c.icon_color || "text-green-600",
        titleColor: c.title_color || "text-green-700",
        buttonText: c.button_text || "Enroll Now",
        buttonColor: c.button_color || "bg-green-600 hover:bg-green-700",
        isPopular: !!c.is_popular,
        status: c.status,
        features: c.features ? JSON.parse(c.features) : [],
      }));

      return NextResponse.json({ courses });
    } finally {
      await connection.end();
    }
  } catch (e) {
    console.error("Public courses API error", e);
    return NextResponse.json({ courses: [] }, { status: 200 });
  }
}
