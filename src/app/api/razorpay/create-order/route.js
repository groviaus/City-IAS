import { NextResponse } from "next/server";
import Razorpay from "razorpay";

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    const { amount, currency = "INR", receipt, applicationId } = await request.json();

    if (!amount || !receipt || !applicationId) {
      return NextResponse.json(
        {
          success: false,
          message: "Amount, receipt, and applicationId are required",
        },
        { status: 400 }
      );
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert to paise
      currency,
      receipt,
      notes: {
        applicationId: applicationId.toString(),
      },
    });

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
      },
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create payment order",
      },
      { status: 500 }
    );
  }
}
