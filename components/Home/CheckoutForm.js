"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React from "react";

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.warn("Stripe.js has not loaded yet.");
      return;
    }

    // 1. Submit PaymentElement first (required for deferred flow)
    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.error("Submit error:", submitError.message);
      return;
    }

    // 2. Fetch clientSecret from backend
    const res = await fetch("/api/create-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const data = await res.json();
    const clientSecret = data.clientSecret;

    if (!clientSecret) {
      console.error("Missing client secret from server response.");
      return;
    }

    // 3. Confirm payment
    const { error: confirmError } = await stripe.confirmPayment({
      clientSecret,
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/", // Update to your live/next page
      },
    });

    if (confirmError) {
      console.error("Payment confirmation error:", confirmError.message);
    } else {
      console.log("Payment confirmed. Redirecting...");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full mt-6">
      <h2 className="font-semibold">Amount To Pay: ₹{amount}</h2>
      <form onSubmit={handleSubmit} className="max-w-md w-full">
        <PaymentElement />
        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded-lg mt-2"
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
