import { loadStripe } from "@stripe/stripe-js";

// Use a test publishable key - replace with real key in production
const STRIPE_PUBLISHABLE_KEY =
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
  "pk_test_placeholder";

export const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

// Mock payment intent creation - in production this would call your backend
export async function createPaymentIntent(_amount: number, _currency: string) {
  // Simulated API call - in production, POST to your backend
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    clientSecret: "pi_mock_secret_" + Date.now(),
    paymentIntentId: "pi_" + Date.now(),
  };
}
