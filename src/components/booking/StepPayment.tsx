import { useState } from "react";
import { Button } from "../ui/Button";
import { IconChevronLeft, IconMoney, IconCalendar, IconUsers } from "../icons";
import { useBookingStore } from "../../stores/booking-store";
import { formatCurrency, formatDateRange } from "../../lib/utils";
import type { Cabin } from "../../types/cabin";

interface StepPaymentProps {
  cabin: Cabin;
}

export function StepPayment({ cabin }: StepPaymentProps) {
  const dates = useBookingStore((s) => s.dates);
  const guests = useBookingStore((s) => s.guests);
  const guestDetails = useBookingStore((s) => s.guestDetails);
  const pricing = useBookingStore((s) => s.pricing);
  const selectedPromo = useBookingStore((s) => s.selectedPromo);
  const setStep = useBookingStore((s) => s.setStep);

  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

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

    // Simulate Stripe payment processing
    // In production, this would use Stripe Elements and createPaymentIntent
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setStep(4);
  };

  if (!pricing || !dates.checkIn || !dates.checkOut) return null;

  return (
    <div className="px-6 pb-6">
      {/* Back button */}
      <button
        onClick={() => setStep(2)}
        className="flex items-center gap-1 text-sm text-text-secondary hover:opacity-80 transition-opacity mb-4"
      >
        <IconChevronLeft size={14} />
        Back to details
      </button>

      {/* Booking summary */}
      <div className="bg-bg-tertiary rounded-lg p-4 mb-6">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Booking summary</h3>

        <div className="space-y-2 text-xs text-text-secondary">
          <div className="flex items-center gap-2">
            <IconCalendar size={12} className="text-text-tertiary" />
            <span>{formatDateRange(dates.checkIn, dates.checkOut)}</span>
            <span className="text-text-tertiary">({pricing.nights} nights)</span>
          </div>
          <div className="flex items-center gap-2">
            <IconUsers size={12} className="text-text-tertiary" />
            <span>
              {guests.adults} adult{guests.adults > 1 ? "s" : ""}
              {guests.children > 0 && `, ${guests.children} child${guests.children > 1 ? "ren" : ""}`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <IconMoney size={12} className="text-text-tertiary" />
            <span>{guestDetails.name} · {guestDetails.email}</span>
          </div>
        </div>

        {selectedPromo && (
          <div className="mt-3 pt-3 border-t border-border-light">
            <span className="text-xs font-semibold text-alert-positive">{selectedPromo.badge}</span>
          </div>
        )}
      </div>

      {/* Price breakdown */}
      <div className="border border-border-light rounded-lg p-4 mb-6">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-text-secondary">
            <span>Subtotal ({pricing.nights} nights)</span>
            <span>{formatCurrency(pricing.subtotal, cabin.pricing.currency)}</span>
          </div>
          <div className="flex justify-between text-text-secondary">
            <span>Cleaning fee</span>
            <span>{formatCurrency(pricing.cleaningFee, cabin.pricing.currency)}</span>
          </div>
          <div className="flex justify-between text-text-secondary">
            <span>Service fee</span>
            <span>{formatCurrency(pricing.serviceFee, cabin.pricing.currency)}</span>
          </div>
          {pricing.discount > 0 && (
            <div className="flex justify-between text-alert-positive font-semibold">
              <span>Promo discount</span>
              <span>−{formatCurrency(pricing.discount, cabin.pricing.currency)}</span>
            </div>
          )}
          <div className="border-t border-border-light pt-2 flex justify-between font-bold text-text-primary text-base">
            <span>Total</span>
            <span>{formatCurrency(pricing.total, cabin.pricing.currency)}</span>
          </div>
        </div>
      </div>

      {/* Card form (mock Stripe Elements) */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Payment details</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-text-tertiary mb-1">Card number</label>
            <input
              type="text"
              id="card-number"
              name="card-number"
              autoComplete="cc-number"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="4242 4242 4242 4242"
              className="w-full border border-border-light rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-border-focus focus:ring-1 focus:ring-border-focus/20 transition-all font-mono"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-text-tertiary mb-1">Expiry</label>
              <input
                type="text"
                id="card-expiry"
                name="card-expiry"
                autoComplete="cc-exp"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                placeholder="MM/YY"
                className="w-full border border-border-light rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-border-focus focus:ring-1 focus:ring-border-focus/20 transition-all font-mono"
              />
            </div>
            <div>
              <label className="block text-xs text-text-tertiary mb-1">CVC</label>
              <input
                type="text"
                id="card-cvc"
                name="card-cvc"
                autoComplete="cc-csc"
                value={cardCvc}
                onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                placeholder="123"
                className="w-full border border-border-light rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-border-focus focus:ring-1 focus:ring-border-focus/20 transition-all font-mono"
              />
            </div>
          </div>
        </div>
        <p className="text-[10px] text-text-tertiary mt-2">
          Secured by Stripe. Your card details are encrypted and never stored on our servers.
        </p>
      </div>

      {/* Pay button */}
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
          : `Pay ${formatCurrency(pricing.total, cabin.pricing.currency)}`}
      </Button>
    </div>
  );
}
