import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { validateForm } from "@/lib/validation";

/**
 * POST /api/submit-application
 * Handles form submission with validation and database storage
 */
export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();
    const { name, phone, email, course, cityState } = body;

    // Server-side validation
    const validation = validateForm({ name, phone, email, course, cityState });

    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const cleanData = validation.cleanData;

    // Create new connection for serverless
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
      // Create table if it doesn't exist
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS applications (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          phone VARCHAR(15) UNIQUE NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          course VARCHAR(100) NOT NULL,
          city_state VARCHAR(100) NOT NULL,
          status ENUM('pending','approved','rejected') DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Check for existing phone number
      const [existingPhone] = await connection.execute(
        "SELECT id FROM applications WHERE phone = ?",
        [cleanData.phone]
      );

      if (existingPhone.length > 0) {
        return NextResponse.json(
          {
            success: false,
            message: "Phone number already exists",
            errors: { phone: "This phone number is already registered" },
          },
          { status: 409 }
        );
      }

      // Check for existing email
      const [existingEmail] = await connection.execute(
        "SELECT id FROM applications WHERE email = ?",
        [cleanData.email]
      );

      if (existingEmail.length > 0) {
        return NextResponse.json(
          {
            success: false,
            message: "Email already exists",
            errors: { email: "This email address is already registered" },
          },
          { status: 409 }
        );
      }

      // Insert new application with explicit pending status
      const [result] = await connection.execute(
        "INSERT INTO applications (name, phone, email, course, city_state, status) VALUES (?, ?, ?, ?, ?, 'pending')",
        [
          cleanData.name,
          cleanData.phone,
          cleanData.email,
          cleanData.course,
          cleanData.cityState,
        ]
      );

      return NextResponse.json(
        {
          success: true,
          message: "Application submitted successfully!",
          data: {
            id: result.insertId,
            name: cleanData.name,
            phone: cleanData.phone,
            email: cleanData.email,
            course: cleanData.course,
            cityState: cleanData.cityState,
            status: "pending",
          },
        },
        { status: 201 }
      );
    } catch (dbError) {
      console.error("Database error:", dbError);

      // Handle specific database errors
      if (dbError.code === "ER_DUP_ENTRY") {
        if (dbError.message.includes("phone")) {
          return NextResponse.json(
            {
              success: false,
              message: "Phone number already exists",
              errors: { phone: "This phone number is already registered" },
            },
            { status: 409 }
          );
        } else if (dbError.message.includes("email")) {
          return NextResponse.json(
            {
              success: false,
              message: "Email already exists",
              errors: { email: "This email address is already registered" },
            },
            { status: 409 }
          );
        }
      }

      return NextResponse.json(
        {
          success: false,
          message: "Database error occurred. Please try again later.",
        },
        { status: 500 }
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

/**
 * GET /api/submit-application
 * Health check endpoint
 */
export async function GET() {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();

    return NextResponse.json(
      {
        success: true,
        message: "API is running and database is connected",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Health check failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed",
      },
      { status: 503 }
    );
  }
}
