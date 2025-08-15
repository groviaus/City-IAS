import { NextResponse } from "next/server";
import crypto from "crypto";
import mysql from "mysql2/promise";

export async function POST(request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      applicationId,
    } = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !applicationId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required payment verification parameters",
        },
        { status: 400 }
      );
    }

    // Verify the payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment signature",
        },
        { status: 400 }
      );
    }

    // Update application status to approved
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "srv1875.hstgr.io",
      user: process.env.DB_USER || "u181984996_cityiasacademy",
      password: process.env.DB_PASSWORD || "D=a9whhW7@",
      database: process.env.DB_NAME || "u181984996_cityiasacademy",
      port: process.env.DB_PORT || 3306,
    });

    try {
      // Update application status
      await connection.execute(
        "UPDATE applications SET status = 'approved' WHERE id = ?",
        [applicationId]
      );

      // Insert payment record
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS payments (
          id INT AUTO_INCREMENT PRIMARY KEY,
          application_id INT NOT NULL,
          razorpay_order_id VARCHAR(255) NOT NULL,
          razorpay_payment_id VARCHAR(255) NOT NULL,
          amount DECIMAL(10,2) NOT NULL,
          currency VARCHAR(10) DEFAULT 'INR',
          status ENUM('pending', 'completed', 'failed') DEFAULT 'completed',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (application_id) REFERENCES applications(id)
        )
      `);

      await connection.execute(
        "INSERT INTO payments (application_id, razorpay_order_id, razorpay_payment_id, amount, status) VALUES (?, ?, ?, ?, 'completed')",
        [applicationId, razorpay_order_id, razorpay_payment_id, 0] // Amount will be updated from order details
      );

      return NextResponse.json({
        success: true,
        message: "Your course has been booked and our team will contact you soon.",
        data: {
          applicationId,
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          status: "approved",
          message: "Your course has been booked and our team will contact you soon."
        },
      });
    } finally {
      await connection.end();
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to verify payment",
      },
      { status: 500 }
    );
  }
}
