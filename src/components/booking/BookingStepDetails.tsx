import { Button } from "../ui/Button";
import { StickyButtonWrapper } from "./StickyButtonWrapper";
import { IconAdd, IconMinus } from "../icons";
import { useBookingStore } from "../../stores/booking-store";
import { formatCurrency, cn } from "../../lib/utils";
import type { Cabin } from "../../types/cabin";

interface BookingStepDetailsProps {
  cabin: Cabin;
}

export function BookingStepDetails({ cabin }: BookingStepDetailsProps) {
  const guestDetails = useBookingStore((s) => s.guestDetails);
  const guests = useBookingStore((s) => s.guests);
  const pricing = useBookingStore((s) => s.pricing);
  const paymentOption = useBookingStore((s) => s.paymentOption);
  const setGuestDetails = useBookingStore((s) => s.setGuestDetails);
  const setGuests = useBookingStore((s) => s.setGuests);
  const setStep = useBookingStore((s) => s.setStep);
  const setPaymentOption = useBookingStore((s) => s.setPaymentOption);
  const agreed = useBookingStore((s) => s.agreedToTerms);
  const setAgreed = useBookingStore((s) => s.setAgreedToTerms);


  const canContinue =
    guestDetails.name.trim() !== "" &&
    guestDetails.email.trim() !== "" &&
    guestDetails.phone.trim() !== "" &&
    agreed;

  const fullTotal = pricing ? Math.round(pricing.total * 0.98) : 0;
  const splitNow = pricing ? Math.round(pricing.total * 0.5) : 0;
  const splitLater = pricing ? pricing.total - splitNow : 0;
  const fullSavings = pricing ? pricing.total - fullTotal : 0;

  return (
    <div className="space-y-6">
      {/* Section header */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary">Your details</h2>
        <p className="text-sm text-text-secondary mt-1">Tell us a bit about yourself</p>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-1.5">
            Full name *
          </label>
          <input
            type="text"
            value={guestDetails.name}
            onChange={(e) => setGuestDetails({ name: e.target.value })}
            placeholder="John Doe"
            className="w-full border border-border-default rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-border-focus focus:ring-1 focus:ring-border-focus/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-1.5">
            Email address *
          </label>
          <input
            type="email"
            value={guestDetails.email}
            onChange={(e) => setGuestDetails({ email: e.target.value })}
            placeholder="john@example.com"
            className="w-full border border-border-default rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-border-focus focus:ring-1 focus:ring-border-focus/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-1.5">
            Phone number *
          </label>
          <input
            type="tel"
            value={guestDetails.phone}
            onChange={(e) => setGuestDetails({ phone: e.target.value })}
            placeholder="+48 123 456 789"
            className="w-full border border-border-default rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-border-focus focus:ring-1 focus:ring-border-focus/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-1.5">
            Message to host <span className="text-text-tertiary font-normal">(optional)</span>
          </label>
          <textarea
            value={guestDetails.requests}
            onChange={(e) => setGuestDetails({ requests: e.target.value })}
            placeholder="Any questions or notes for the host..."
            rows={3}
            className="w-full border border-border-default rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-border-focus focus:ring-1 focus:ring-border-focus/20 transition-all resize-none"
          />
        </div>
      </div>

      {/* Guest counters */}
      <div className="border border-border-default rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-4">Guests</h3>
        <div className="space-y-4">
          <GuestCounter
            label="Adults"
            value={guests.adults}
            min={1}
            max={cabin.maxGuests}
            onChange={(v) => setGuests(v, guests.children)}
          />
          <GuestCounter
            label="Children"
            value={guests.children}
            min={0}
            max={Math.max(0, cabin.maxGuests - guests.adults)}
            onChange={(v) => setGuests(guests.adults, v)}
          />
        </div>
      </div>

      {/* Payment option selector */}
      {pricing && (
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-3">Payment option</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Pay in full */}
            <button
              onClick={() => setPaymentOption("full")}
              className={cn(
                "text-left rounded-xl border p-4 transition-colors",
                paymentOption === "full"
                  ? "border-border-dark bg-bg-tertiary"
                  : "border-border-default hover:border-border-dark"
              )}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="text-sm font-semibold text-text-primary">Pay in full</span>
                <span className="text-xs font-semibold text-alert-positive shrink-0">
                  Save {formatCurrency(fullSavings, cabin.pricing.currency)}
                </span>
              </div>
              <p className="text-xs text-text-tertiary mb-2">2% early payment discount</p>
              <p className="text-sm font-bold text-text-primary">
                Total: {formatCurrency(fullTotal, cabin.pricing.currency)}
              </p>
            </button>

            {/* Split payment */}
            <button
              onClick={() => setPaymentOption("split")}
              className={cn(
                "text-left rounded-xl border p-4 transition-colors",
                paymentOption === "split"
                  ? "border-border-dark bg-bg-tertiary"
                  : "border-border-default hover:border-border-dark"
              )}
            >
              <div className="mb-1">
                <span className="text-sm font-semibold text-text-primary">Split payment</span>
              </div>
              <p className="text-xs text-text-tertiary mb-2">Pay in two instalments</p>
              <p className="text-sm font-bold text-text-primary">
                Due now: {formatCurrency(splitNow, cabin.pricing.currency)}
              </p>
              <p className="text-xs text-text-secondary mt-0.5">
                Due at check-in: {formatCurrency(splitLater, cabin.pricing.currency)}
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Terms */}
      <label className="flex items-start gap-3 mb-6 cursor-pointer">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-border-light text-brand-primary focus:ring-border-focus/20"
        />
        <span className="text-xs text-text-secondary leading-relaxed">
          I agree to the{" "}
          <a href="/terms" className="underline text-text-primary">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/terms" className="underline text-text-primary">
            Cancellation Policy
          </a>
          . I understand that my booking is subject to the host's house rules.
        </span>
      </label>

      {/* Continue to payment */}
      <StickyButtonWrapper>
        <Button variant="primary" size="lg" className="w-full" disabled={!canContinue} onClick={() => setStep(3)}>
          Continue to payment
        </Button>
      </StickyButtonWrapper>
    </div>
  );
}

function GuestCounter({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-text-secondary">{label}</span>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className={cn(
            "w-8 h-8 rounded-full border flex items-center justify-center transition-opacity",
            value <= min
              ? "border-border-light text-text-tertiary cursor-not-allowed"
              : "border-border-dark text-text-primary hover:opacity-80"
          )}
        >
          <IconMinus size={12} />
        </button>
        <span className="text-sm font-semibold text-text-primary w-6 text-center">{value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className={cn(
            "w-8 h-8 rounded-full border flex items-center justify-center transition-opacity",
            value >= max
              ? "border-border-light text-text-tertiary cursor-not-allowed"
              : "border-border-dark text-text-primary hover:opacity-80"
          )}
        >
          <IconAdd size={12} />
        </button>
      </div>
    </div>
  );
}
