import { useState } from "react";
import { Button } from "../ui/Button";
import { IconChevronLeft } from "../icons";
import { useBookingStore } from "../../stores/booking-store";

export function StepDetails() {
  const guestDetails = useBookingStore((s) => s.guestDetails);
  const setGuestDetails = useBookingStore((s) => s.setGuestDetails);
  const setStep = useBookingStore((s) => s.setStep);
  const [agreed, setAgreed] = useState(false);

  const canContinue =
    guestDetails.name.trim() !== "" &&
    guestDetails.email.trim() !== "" &&
    guestDetails.phone.trim() !== "" &&
    agreed;

  return (
    <div className="px-6 pb-6">
      {/* Back button */}
      <button
        onClick={() => setStep(1)}
        className="flex items-center gap-1 text-sm text-text-secondary hover:opacity-80 transition-opacity mb-4"
      >
        <IconChevronLeft size={14} />
        Back to dates
      </button>

      {/* Form */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-1.5">
            Full name *
          </label>
          <input
            type="text"
            value={guestDetails.name}
            onChange={(e) => setGuestDetails({ name: e.target.value })}
            placeholder="John Doe"
            className="w-full border border-border-light rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-border-focus focus:ring-1 focus:ring-border-focus/20 transition-all"
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
            className="w-full border border-border-light rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-border-focus focus:ring-1 focus:ring-border-focus/20 transition-all"
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
            className="w-full border border-border-light rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-border-focus focus:ring-1 focus:ring-border-focus/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-1.5">
            Special requests <span className="text-text-tertiary font-normal">(optional)</span>
          </label>
          <textarea
            value={guestDetails.requests}
            onChange={(e) => setGuestDetails({ requests: e.target.value })}
            placeholder="Any special requests or notes for the host..."
            rows={3}
            className="w-full border border-border-light rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-border-focus focus:ring-1 focus:ring-border-focus/20 transition-all resize-none"
          />
        </div>
      </div>

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
          <a href="#" className="underline text-text-primary">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline text-text-primary">
            Cancellation Policy
          </a>
          . I understand that my booking is subject to the host's house rules.
        </span>
      </label>

      {/* Continue to payment */}
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        disabled={!canContinue}
        onClick={() => setStep(3)}
      >
        Continue to payment
      </Button>
    </div>
  );
}
