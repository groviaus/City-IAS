import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { validateForm } from "@/lib/validation";

/**
 * POST /api/submit-application
 * Handles form submission with validation and database storage
 * 
 * Duplicate Prevention Logic:
 * - Users can register for multiple courses with the same email/phone
 * - Duplicate registrations are only prevented within the same course
 * - This allows users to apply for both "FREE Coaching Program" and "Foundation Batch for 12th Pass"
 * - Database constraints ensure (course, phone) and (course, email) combinations are unique
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
          phone VARCHAR(15) NOT NULL,
          email VARCHAR(100) NOT NULL,
          course VARCHAR(100) NOT NULL,
          city_state VARCHAR(100) NOT NULL,
          status ENUM('pending','approved','rejected') DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE KEY unique_course_phone (course, phone),
          UNIQUE KEY unique_course_email (course, email)
        )
      `);

      // Check for existing phone number within the same course
      const [existingPhone] = await connection.execute(
        "SELECT id FROM applications WHERE phone = ? AND course = ?",
        [cleanData.phone, cleanData.course]
      );

      if (existingPhone.length > 0) {
        return NextResponse.json(
          {
            success: false,
            message: "Phone number already exists for this course",
            errors: { phone: "This phone number is already registered for this course" },
          },
          { status: 409 }
        );
      }

      // Check for existing email within the same course
      const [existingEmail] = await connection.execute(
        "SELECT id FROM applications WHERE email = ? AND course = ?",
        [cleanData.email, cleanData.course]
      );

      if (existingEmail.length > 0) {
        return NextResponse.json(
          {
            success: false,
            message: "Email already exists for this course",
            errors: { email: "This email address is already registered for this course" },
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

      const applicationId = result.insertId;

      return NextResponse.json(
        {
          success: true,
          message: "Application submitted successfully!",
          data: {
            id: applicationId,
            name: cleanData.name,
            phone: cleanData.phone,
            email: cleanData.email,
            course: cleanData.course,
            cityState: cleanData.cityState,
            status: "pending",
            applicationId: applicationId, // Include this for payment processing
          },
        },
        { status: 201 }
      );
    } catch (dbError) {
      console.error("Database error:", dbError);

      // Handle specific database errors
      if (dbError.code === "ER_DUP_ENTRY") {
        if (dbError.message.includes("unique_course_phone")) {
          return NextResponse.json(
            {
              success: false,
              message: "Phone number already exists for this course",
              errors: { phone: "This phone number is already registered for this course" },
            },
            { status: 409 }
          );
        } else if (dbError.message.includes("unique_course_email")) {
          return NextResponse.json(
            {
              success: false,
              message: "Email already exists for this course",
              errors: { email: "This email address is already registered for this course" },
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
 * Health check endpoint and application status checker
 * 
 * Usage:
 * - GET /api/submit-application (health check)
 * - GET /api/submit-application?email=user@example.com&phone=1234567890&course=Course Name
 *   (check if user already has application for specific course)
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const phone = searchParams.get('phone');
    const course = searchParams.get('course');

    // If query parameters are provided, check for existing application
    if (email && phone && course) {
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
        // Check for existing application for this specific course
        const [existingApp] = await connection.execute(
          "SELECT id, status FROM applications WHERE email = ? AND phone = ? AND course = ?",
          [email, phone, course]
        );

        if (existingApp.length > 0) {
          return NextResponse.json({
            success: true,
            exists: true,
            applicationId: existingApp[0].id,
            status: existingApp[0].status,
            message: `Application already exists for ${course}`
          });
        } else {
          return NextResponse.json({
            success: true,
            exists: false,
            message: `No existing application found for ${course}`
          });
        }
      } finally {
        await connection.end();
      }
    }

    // Default health check if no query parameters
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
      await connection.ping();
      return NextResponse.json(
        {
          success: true,
          message: "API is running and database is connected",
        },
        { status: 200 }
      );
    } finally {
      await connection.end();
    }
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
