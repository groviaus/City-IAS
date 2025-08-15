"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { openRazorpayCheckout } from "@/lib/razorpay";

export default function PaymentTest() {
  const [isLoading, setIsLoading] = useState(false);

  const testPayment = async () => {
    setIsLoading(true);
    
    try {
      // Create a test order
      const response = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 100, // ₹1 for testing
          receipt: `test_receipt_${Date.now()}`,
          applicationId: 999, // Test application ID
        }),
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message);
      }

      // Test data
      const testUserData = {
        name: "Test User",
        email: "test@example.com",
        phone: "9999999999",
        course: "Test Course",
        applicationId: 999,
      };

      // Open Razorpay checkout
      await openRazorpayCheckout(
        result.order,
        testUserData,
        (paymentResponse) => {
          console.log("Payment successful:", paymentResponse);
          alert("Payment successful! Check console for details.");
        },
        (error) => {
          console.error("Payment failed:", error);
          alert("Payment failed! Check console for details.");
        }
      );
    } catch (error) {
      console.error("Test payment error:", error);
      alert("Test payment failed! Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Payment Integration Test</h3>
      <p className="text-sm text-gray-600 mb-4">
        Click the button below to test the Razorpay integration with a ₹1 test payment.
      </p>
      <Button
        onClick={testPayment}
        disabled={isLoading}
        className="bg-green-600 hover:bg-green-700"
      >
        {isLoading ? "Testing..." : "Test Payment (₹1)"}
      </Button>
    </div>
  );
}
