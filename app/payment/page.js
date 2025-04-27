import React, { Suspense } from "react";
import PaymentPage from "./PaymentPage"; // Separate file

export default function Page() {
  return (
    <Suspense fallback={<div>Loading payment page...</div>}>
      <PaymentPage />
    </Suspense>
  );
}
