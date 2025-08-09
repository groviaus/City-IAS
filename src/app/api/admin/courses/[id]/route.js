import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

/**
 * GET /api/admin/courses/[id]
 * Retrieve a specific course by ID
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "srv1875.hstgr.io",
      user: process.env.DB_USER || "u181984996_cityiasacademy",
      password: process.env.DB_PASSWORD || "D=a9whhW7@",
      database: process.env.DB_NAME || "u181984996_cityiasacademy",
      port: process.env.DB_PORT || 3306,
      connectTimeout: 60000,
      acquireTimeout: 60000,
      timeout: 60000,
    });

    try {
      const [rows] = await connection.execute(
        "SELECT * FROM courses WHERE id = ?",
        [id]
      );

      if (rows.length === 0) {
        return NextResponse.json(
          {
            success: false,
            message: "Course not found",
          },
          { status: 404 }
        );
      }

      const course = rows[0];

      // Parse JSON features
      const courseData = {
        ...course,
        features: course.features ? JSON.parse(course.features) : [],
        price: parseFloat(course.price),
        registration: course.registration
          ? parseFloat(course.registration)
          : null,
      };

      return NextResponse.json({
        success: true,
        course: courseData,
      });
    } finally {
      await connection.end();
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/courses/[id]
 * Update a specific course by ID
 */
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const {
      title,
      subtitle,
      description,
      price,
      duration,
      registration,
      badge,
      badgeColor,
      borderColor,
      iconBg,
      iconColor,
      titleColor,
      buttonText,
      buttonColor,
      isPopular,
      status,
      features,
    } = body;

    // Basic validation
    if (!title || !price) {
      return NextResponse.json(
        {
          success: false,
          message: "Title and price are required fields",
        },
        { status: 400 }
      );
    }

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "srv1875.hstgr.io",
      user: process.env.DB_USER || "u181984996_cityiasacademy",
      password: process.env.DB_PASSWORD || "D=a9whhW7@",
      database: process.env.DB_NAME || "u181984996_cityiasacademy",
      port: process.env.DB_PORT || 3306,
      connectTimeout: 60000,
      acquireTimeout: 60000,
      timeout: 60000,
    });

    try {
      // Check if course exists
      const [existing] = await connection.execute(
        "SELECT id FROM courses WHERE id = ?",
        [id]
      );

      if (existing.length === 0) {
        return NextResponse.json(
          {
            success: false,
            message: "Course not found",
          },
          { status: 404 }
        );
      }

      // Update course
      await connection.execute(
        `
        UPDATE courses SET
          title = ?, subtitle = ?, description = ?, price = ?, duration = ?,
          registration = ?, badge = ?, badge_color = ?, border_color = ?,
          icon_bg = ?, icon_color = ?, title_color = ?, button_text = ?,
          button_color = ?, is_popular = ?, status = ?, features = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `,
        [
          title,
          subtitle || null,
          description || null,
          price,
          duration || null,
          registration || null,
          badge || null,
          badgeColor || "bg-green-500",
          borderColor || "border-green-200",
          iconBg || "bg-green-100",
          iconColor || "text-green-600",
          titleColor || "text-green-700",
          buttonText || null,
          buttonColor || "bg-green-600 hover:bg-green-700",
          isPopular || false,
          status || "draft",
          JSON.stringify(features || []),
          id,
        ]
      );

      return NextResponse.json({
        success: true,
        message: "Course updated successfully!",
      });
    } finally {
      await connection.end();
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/courses/[id]
 * Delete a specific course by ID
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "srv1875.hstgr.io",
      user: process.env.DB_USER || "u181984996_cityiasacademy",
      password: process.env.DB_PASSWORD || "D=a9whhW7@",
      database: process.env.DB_NAME || "u181984996_cityiasacademy",
      port: process.env.DB_PORT || 3306,
      connectTimeout: 60000,
      acquireTimeout: 60000,
      timeout: 60000,
    });

    try {
      // Check if course exists
      const [existing] = await connection.execute(
        "SELECT id FROM courses WHERE id = ?",
        [id]
      );

      if (existing.length === 0) {
        return NextResponse.json(
          {
            success: false,
            message: "Course not found",
          },
          { status: 404 }
        );
      }

      // Delete course
      await connection.execute("DELETE FROM courses WHERE id = ?", [id]);

      return NextResponse.json({
        success: true,
        message: "Course deleted successfully!",
      });
    } finally {
      await connection.end();
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
