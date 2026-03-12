import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getStripePromise } from "../lib/stripe";
import { IconTick, IconChevronLeft } from "../components/icons";

type PaymentStatus = "loading" | "success" | "error" | "no_secret";

export function BookingConfirmed() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<PaymentStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const clientSecret = searchParams.get("payment_intent_client_secret");
    if (!clientSecret) {
      setStatus("no_secret");
      return;
    }

    getStripePromise().then(async (stripe) => {
      if (!stripe) {
        setStatus("error");
        setErrorMessage("Could not load payment processor.");
        return;
      }

      try {
        const { paymentIntent, error } = await stripe.retrievePaymentIntent(clientSecret);
        if (error) {
          setStatus("error");
          setErrorMessage(error.message ?? "An error occurred while verifying your payment.");
          return;
        }

        if (paymentIntent?.status === "succeeded") {
          setStatus("success");
        } else {
          setStatus("error");
          setErrorMessage(`Payment status: ${paymentIntent?.status ?? "unknown"}`);
        }
      } catch {
        setStatus("error");
        setErrorMessage("Failed to verify payment status.");
      }
    });
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-bg-primary border-b border-border-light">
        <div className="max-w-[640px] mx-auto px-4 py-3 flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-text-secondary hover:opacity-80 transition-opacity"
          >
            <IconChevronLeft size={16} />
            Back to home
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-[400px] w-full text-center">
          {status === "loading" && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-text-tertiary border-t-text-primary rounded-full animate-spin" />
              <p className="text-sm text-text-secondary">Verifying your payment…</p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-text-primary flex items-center justify-center">
                <IconTick size={36} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-text-primary">Booking confirmed!</h1>
              <p className="text-sm text-text-secondary">
                Your payment was successful. Check your email for confirmation details.
              </p>
              <Link
                to="/"
                className="mt-4 inline-flex items-center justify-center h-12 px-6 rounded-lg bg-accent text-accent-fg text-base font-medium hover:opacity-80 transition-opacity"
              >
                Back to home
              </Link>
            </div>
          )}

          {(status === "error" || status === "no_secret") && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-bg-tertiary flex items-center justify-center">
                <span className="text-3xl">!</span>
              </div>
              <h1 className="text-2xl font-bold text-text-primary">Payment issue</h1>
              <p className="text-sm text-text-secondary">
                {status === "no_secret"
                  ? "No payment information found."
                  : errorMessage ?? "Something went wrong with your payment."}
              </p>
              <Link
                to="/book"
                className="mt-4 inline-flex items-center justify-center h-12 px-6 rounded-lg bg-accent text-accent-fg text-base font-medium hover:opacity-80 transition-opacity"
              >
                Try again
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
