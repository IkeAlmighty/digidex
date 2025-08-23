import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { createSubscription } from "../api/payments";
import { useState, useEffect } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function CheckoutForm({ membership }) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    setMessage("");

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin, // TODO: create page to view billing
      },
    });

    if (error) setMessage(error.message || "Payment failed");
    setSubmitting(false);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button disabled={!stripe || submitting}>
          {submitting ? "Confirming..." : `Start ${membership} Subscription`}
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default function SubscriptionCheckout({ membership }) {
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    async function setClientSecret() {
      try {
        const res = await createSubscription(membership);
        const data = await res.json();
        if (data.clientSecret) setClientSecret(data.clientSecret);
        else throw new Error(data.message || "Failed to start subscription");
      } catch (err) {
        console.error(err);
      }
    }

    setClientSecret();
  }, [membership]);

  if (!clientSecret) return <p>Loading payment form...</p>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm membership={membership} />
    </Elements>
  );
}
