import { useState, useEffect } from "react";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "../ui/Button";
import { IconTick } from "../icons";
import { useBookingStore } from "../../stores/booking-store";
import { formatCurrency } from "../../lib/utils";
import { getStripePromise, createPaymentIntent } from "../../lib/stripe";
import type { Cabin } from "../../types/cabin";

interface BookingStepPaymentProps {
  cabin: Cabin;
}

export function BookingStepPayment({ cabin }: BookingStepPaymentProps) {
  const pricing = useBookingStore((s) => s.pricing);
  const paymentOption = useBookingStore((s) => s.paymentOption);

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadingIntent, setLoadingIntent] = useState(true);

  const payAmount = pricing
    ? paymentOption === "full"
      ? Math.round(pricing.total * 0.98)
      : Math.round(pricing.total * 0.5)
    : 0;

  useEffect(() => {
    if (!payAmount) return;
    setLoadingIntent(true);
    createPaymentIntent(payAmount * 100, cabin.pricing.currency.toLowerCase())
      .then(({ clientSecret: secret }) => {
        setClientSecret(secret);
      })
      .finally(() => setLoadingIntent(false));
  }, [payAmount, cabin.pricing.currency]);

  if (!pricing) return null;

  const appearance = {
    theme: "stripe" as const,
    variables: {
      colorPrimary: "#010101",
      fontFamily: "inherit",
      borderRadius: "8px",
    },
  };

  return (
    <div className="space-y-6">
      {/* Section header */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary">Payment</h2>
        <p className="text-sm text-text-secondary mt-1">Secure checkout · encrypted by Stripe</p>
      </div>

      {/* Trust mini-bar */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
          <IconTick size={12} className="text-alert-positive" />
          Verified host
        </div>
        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
          <IconTick size={12} className="text-alert-positive" />
          Secure booking
        </div>
      </div>

      {/* Payment amount display */}
      <div className="border border-border-default rounded-2xl p-5">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold text-text-primary">
              {paymentOption === "full" ? "Pay in full" : "Due now (50%)"}
            </p>
            {paymentOption === "full" && (
              <p className="text-xs text-alert-positive">Includes 2% discount</p>
            )}
            {paymentOption === "split" && (
              <p className="text-xs text-text-tertiary">
                Remaining {formatCurrency(pricing.total - payAmount, cabin.pricing.currency)} due at check-in
              </p>
            )}
          </div>
          <span className="text-xl font-bold text-text-primary">
            {formatCurrency(payAmount, cabin.pricing.currency)}
          </span>
        </div>
      </div>

      {/* Stripe Elements form */}
      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-3">Payment details</h3>
        {loadingIntent ? (
          <div className="border border-border-default rounded-lg p-6 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-text-tertiary border-t-text-primary rounded-full animate-spin" />
          </div>
        ) : clientSecret ? (
          <Elements
            stripe={getStripePromise()}
            options={{ clientSecret, appearance }}
          >
            <StripePaymentForm payAmount={payAmount} cabin={cabin} />
          </Elements>
        ) : (
          <MockPaymentForm payAmount={payAmount} cabin={cabin} />
        )}
      </div>
    </div>
  );
}


function StripePaymentForm({ payAmount, cabin }: { payAmount: number; cabin: Cabin }) {
  const stripe = useStripe();
  const elements = useElements();
  const setStep = useBookingStore((s) => s.setStep);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePay = async () => {
    if (!stripe || !elements) return;
    setIsProcessing(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/book/confirmed",
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message ?? "Payment failed. Please try again.");
      setIsProcessing(false);
    } else {
      setStep(4);
    }
  };

  return (
    <div className="space-y-4">
      <PaymentElement />
      {errorMessage && (
        <p className="text-xs text-red-500">{errorMessage}</p>
      )}
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        loading={isProcessing}
        disabled={!stripe || isProcessing}
        onClick={handlePay}
      >
        {isProcessing
          ? "Processing..."
          : `Pay ${formatCurrency(payAmount, cabin.pricing.currency)}`}
      </Button>
      <p className="text-[10px] text-text-tertiary text-center">
        Secured by Stripe. Your card details are encrypted and never stored on our servers.
      </p>
    </div>
  );
}

function MockPaymentForm({ payAmount, cabin }: { payAmount: number; cabin: Cabin }) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const setStep = useBookingStore((s) => s.setStep);

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 16);
    return cleaned.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 4);
    if (cleaned.length >= 3) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    return cleaned;
  };

  const canPay =
    cardNumber.replace(/\s/g, "").length === 16 &&
    cardExpiry.length === 5 &&
    cardCvc.length >= 3;

  const handlePay = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setStep(4);
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs text-text-tertiary mb-1">Card number</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
          placeholder="4242 4242 4242 4242"
          className="w-full border border-border-default rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-border-focus focus:ring-1 focus:ring-border-focus/20 transition-all font-mono"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-text-tertiary mb-1">Expiry</label>
          <input
            type="text"
            value={cardExpiry}
            onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
            placeholder="MM/YY"
            className="w-full border border-border-default rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-border-focus focus:ring-1 focus:ring-border-focus/20 transition-all font-mono"
          />
        </div>
        <div>
          <label className="block text-xs text-text-tertiary mb-1">CVC</label>
          <input
            type="text"
            value={cardCvc}
            onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
            placeholder="123"
            className="w-full border border-border-default rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-border-focus focus:ring-1 focus:ring-border-focus/20 transition-all font-mono"
          />
        </div>
      </div>
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        disabled={!canPay}
        loading={isProcessing}
        onClick={handlePay}
      >
        {isProcessing
          ? "Processing..."
          : `Pay ${formatCurrency(payAmount, cabin.pricing.currency)}`}
      </Button>
      <p className="text-[10px] text-text-tertiary text-center">
        Secured by Stripe. Your card details are encrypted and never stored on our servers.
      </p>
    </div>
  );
}
