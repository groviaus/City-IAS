import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

/**
 * GET /api/admin/courses
 * Retrieve all courses for admin panel
 */
export async function GET() {
  try {
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
      // Create courses table if it doesn't exist
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS courses (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          subtitle VARCHAR(255),
          description TEXT,
          price DECIMAL(10,2) DEFAULT 0,
          duration VARCHAR(100),
          registration DECIMAL(10,2),
          badge VARCHAR(100),
          badge_color VARCHAR(100) DEFAULT 'bg-green-500',
          border_color VARCHAR(100) DEFAULT 'border-green-200',
          icon_bg VARCHAR(100) DEFAULT 'bg-green-100',
          icon_color VARCHAR(100) DEFAULT 'text-green-600',
          title_color VARCHAR(100) DEFAULT 'text-green-700',
          button_text VARCHAR(255),
          button_color VARCHAR(100) DEFAULT 'bg-green-600 hover:bg-green-700',
          is_popular BOOLEAN DEFAULT FALSE,
          status ENUM('draft', 'active', 'inactive') DEFAULT 'draft',
          features JSON,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);

      // Fetch all courses
      const [rows] = await connection.execute(`
        SELECT 
          id, title, subtitle, description, price, duration, registration,
          badge, badge_color, border_color, icon_bg, icon_color, title_color,
          button_text, button_color, is_popular, status, features,
          created_at, updated_at
        FROM courses 
        ORDER BY created_at DESC
      `);

      // Parse JSON features
      const courses = rows.map((course) => ({
        ...course,
        features: course.features ? JSON.parse(course.features) : [],
        price: parseFloat(course.price),
        registration: course.registration
          ? parseFloat(course.registration)
          : null,
      }));

      return NextResponse.json({
        success: true,
        courses: courses,
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
 * POST /api/admin/courses
 * Create a new course
 */
export async function POST(request) {
  try {
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
      // Create courses table if it doesn't exist
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS courses (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          subtitle VARCHAR(255),
          description TEXT,
          price DECIMAL(10,2) DEFAULT 0,
          duration VARCHAR(100),
          registration DECIMAL(10,2),
          badge VARCHAR(100),
          badge_color VARCHAR(100) DEFAULT 'bg-green-500',
          border_color VARCHAR(100) DEFAULT 'border-green-200',
          icon_bg VARCHAR(100) DEFAULT 'bg-green-100',
          icon_color VARCHAR(100) DEFAULT 'text-green-600',
          title_color VARCHAR(100) DEFAULT 'text-green-700',
          button_text VARCHAR(255),
          button_color VARCHAR(100) DEFAULT 'bg-green-600 hover:bg-green-700',
          is_popular BOOLEAN DEFAULT FALSE,
          status ENUM('draft', 'active', 'inactive') DEFAULT 'draft',
          features JSON,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);

      // Insert new course
      const [result] = await connection.execute(
        `
        INSERT INTO courses (
          title, subtitle, description, price, duration, registration,
          badge, badge_color, border_color, icon_bg, icon_color, title_color,
          button_text, button_color, is_popular, status, features
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        ]
      );

      return NextResponse.json(
        {
          success: true,
          message: "Course created successfully!",
          data: {
            id: result.insertId,
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
          },
        },
        { status: 201 }
      );
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
