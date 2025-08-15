// Razorpay utility functions for client-side integration

export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(window.Razorpay);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(window.Razorpay);
    };
    script.onerror = () => {
      resolve(null);
    };
    document.body.appendChild(script);
  });
};

export const createRazorpayOrder = async (amount, receipt, applicationId) => {
  try {
    const response = await fetch("/api/razorpay/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        receipt,
        applicationId,
      }),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Failed to create order");
    }

    return result.order;
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw error;
  }
};

export const verifyPayment = async (paymentData, applicationId) => {
  try {
    const response = await fetch("/api/razorpay/verify-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        razorpay_order_id: paymentData.razorpay_order_id,
        razorpay_payment_id: paymentData.razorpay_payment_id,
        razorpay_signature: paymentData.razorpay_signature,
        applicationId,
      }),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Payment verification failed");
    }

    return result;
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
};

export const openRazorpayCheckout = async (order, userData, onSuccess, onFailure) => {
  try {
    const Razorpay = await loadRazorpayScript();
    
    if (!Razorpay) {
      throw new Error("Failed to load Razorpay");
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "City IAS Academy",
      description: `Registration for ${userData.course}`,
      order_id: order.id,
      prefill: {
        name: userData.name,
        email: userData.email,
        contact: userData.phone,
      },
      notes: {
        applicationId: userData.applicationId,
        course: userData.course,
      },
      theme: {
        color: "#2563eb",
      },
      handler: async function (response) {
        try {
          await verifyPayment(response, userData.applicationId);
          onSuccess(response);
        } catch (error) {
          onFailure(error);
        }
      },
      modal: {
        ondismiss: function () {
          onFailure(new Error("Payment cancelled"));
        },
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Error opening Razorpay checkout:", error);
    onFailure(error);
  }
};
