import { NextResponse } from "next/server";

// Course prices configuration
const coursePrices = {
  "FREE Coaching Program": 0,
  "Foundation Batch for 12th Pass": 5000, // ₹5000
};

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      coursePrices,
    });
  } catch (error) {
    console.error("Course prices API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch course prices",
      },
      { status: 500 }
    );
  }
}
