"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/Home/CheckoutForm";

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const amountParam = searchParams.get("amount");
  const [stripePromise, setStripePromise] = useState(null);

  const amount = amountParam ? parseFloat(amountParam) : null;

  useEffect(() => {
    if (amount) {
      const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);
      setStripePromise(stripe);
    }
  }, [amount]);

  if (!amount || !stripePromise) {
    return <div>Loading...</div>;
  }

  const options = {
    mode: "payment",
    amount: Math.round(amount * 100),
    currency: "inr",
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
};

export default PaymentPage;
