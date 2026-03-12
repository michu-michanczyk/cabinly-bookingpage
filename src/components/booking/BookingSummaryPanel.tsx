import { parseISO, format } from "date-fns";
import { IconStar, IconCalendar, IconUsers } from "../icons";
import { useBookingStore } from "../../stores/booking-store";
import { formatCurrency, cn } from "../../lib/utils";
import type { Cabin } from "../../types/cabin";
import { Button } from "../ui/Button";

interface BookingSummaryPanelProps {
  cabin: Cabin;
}

export function BookingSummaryPanel({ cabin }: BookingSummaryPanelProps) {
  const step = useBookingStore((s) => s.step);
  const dates = useBookingStore((s) => s.dates);
  const guests = useBookingStore((s) => s.guests);
  const pricing = useBookingStore((s) => s.pricing);
  const paymentOption = useBookingStore((s) => s.paymentOption);
  const selectedPromo = useBookingStore((s) => s.selectedPromo);
  const setStep = useBookingStore((s) => s.setStep);

  const hasDates = dates.checkIn && dates.checkOut;

  const fullTotal = pricing ? Math.round(pricing.total * 0.98) : 0;
  const splitNow = pricing ? Math.round(pricing.total * 0.5) : 0;

  const canContinueStep1 = hasDates && pricing;

  return (
    <div className="border border-border-light rounded-2xl overflow-hidden bg-bg-primary shadow-sm">
      {/* Price header */}
      <div className="px-6 pt-6 pb-4 border-b border-border-light">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-bold text-text-primary">
              {formatCurrency(cabin.pricing.baseNight, cabin.pricing.currency)}
            </span>
            <span className="text-sm text-text-secondary">/ night</span>
          </div>
          <div className="flex items-center gap-1">
            <IconStar size={13} className="text-text-primary" />
            <span className="text-sm font-semibold text-text-primary">{cabin.rating.score}</span>
            <span className="text-xs text-text-tertiary">({cabin.rating.count})</span>
          </div>
        </div>
      </div>

      {/* Date + guest summary pills */}
      {hasDates ? (
        <div className="px-6 py-4 space-y-2">
          <button
            onClick={() => setStep(1)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-border-light hover:border-border-dark transition-colors text-left group"
          >
            <IconCalendar size={14} className="text-text-tertiary shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-text-tertiary uppercase tracking-wide font-semibold leading-none mb-0.5">Dates</div>
              <div className="text-sm font-medium text-text-primary">
                {format(parseISO(dates.checkIn!), "MMM d")} – {format(parseISO(dates.checkOut!), "MMM d, yyyy")}
              </div>
            </div>
            <span className="text-xs text-text-tertiary group-hover:text-text-secondary transition-colors">Edit</span>
          </button>

          <button
            onClick={() => setStep(1)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-border-light hover:border-border-dark transition-colors text-left group"
          >
            <IconUsers size={14} className="text-text-tertiary shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-text-tertiary uppercase tracking-wide font-semibold leading-none mb-0.5">Guests</div>
              <div className="text-sm font-medium text-text-primary">
                {guests.adults + guests.children} guest{guests.adults + guests.children !== 1 ? "s" : ""}
                {guests.children > 0 && (
                  <span className="text-text-tertiary"> · {guests.adults} adult{guests.adults !== 1 ? "s" : ""}, {guests.children} child{guests.children !== 1 ? "ren" : ""}</span>
                )}
              </div>
            </div>
            <span className="text-xs text-text-tertiary group-hover:text-text-secondary transition-colors">Edit</span>
          </button>
        </div>
      ) : (
        <div className="px-6 py-4">
          <p className="text-sm text-text-tertiary">Select dates to see the total price</p>
        </div>
      )}

      {/* Price breakdown */}
      {pricing && (
        <div className="px-6 py-4 border-t border-border-light space-y-2.5">
          <div className="flex justify-between text-sm text-text-secondary">
            <span>
              {formatCurrency(cabin.pricing.baseNight, cabin.pricing.currency)} × {pricing.nights} night{pricing.nights !== 1 ? "s" : ""}
            </span>
            <span>{formatCurrency(pricing.subtotal, cabin.pricing.currency)}</span>
          </div>
          <div className="flex justify-between text-sm text-text-secondary">
            <span>Cleaning fee</span>
            <span>{formatCurrency(pricing.cleaningFee, cabin.pricing.currency)}</span>
          </div>
          <div className="flex justify-between text-sm text-text-secondary">
            <span>Service fee</span>
            <span>{formatCurrency(pricing.serviceFee, cabin.pricing.currency)}</span>
          </div>
          {pricing.discount > 0 && (
            <div className="flex justify-between text-sm font-semibold text-alert-positive">
              <span>Promo discount</span>
              <span>−{formatCurrency(pricing.discount, cabin.pricing.currency)}</span>
            </div>
          )}
          {selectedPromo && (
            <div className="flex items-center gap-1.5 text-xs text-alert-positive rounded-lg px-3 py-2" style={{ background: "color-mix(in srgb, var(--color-alert-positive) 10%, transparent)" }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M5 0L6.12 3.38L9.51 3.38L6.82 5.47L7.94 8.85L5 6.76L2.06 8.85L3.18 5.47L0.49 3.38L3.88 3.38Z"/></svg>
              {selectedPromo.badge} applied
            </div>
          )}
          <div className="border-t border-border-light pt-3 flex justify-between font-bold text-text-primary">
            <span>Total</span>
            <span>{formatCurrency(pricing.total, cabin.pricing.currency)}</span>
          </div>

          {/* Payment option context when on step 2+ */}
          {step >= 2 && (
            <div
              className={cn(
                "rounded-lg px-3 py-2 text-xs",
                paymentOption === "split" && "bg-bg-tertiary text-text-secondary"
              )}
              style={paymentOption === "full" ? { background: "color-mix(in srgb, var(--color-alert-positive) 10%, transparent)", color: "var(--color-alert-positive)" } : undefined}
            >
              {paymentOption === "full" ? (
                <>Pay in full · {formatCurrency(fullTotal, cabin.pricing.currency)} <span className="opacity-70">(2% off)</span></>
              ) : (
                <>Due now · {formatCurrency(splitNow, cabin.pricing.currency)} · Remaining at check-in</>
              )}
            </div>
          )}
        </div>
      )}

      {/* Continue CTAs */}
      {step === 1 && (
        <div className="px-6 pb-6">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            disabled={!canContinueStep1}
            onClick={() => setStep(2)}
          >
            {hasDates && pricing ? `Continue · ${formatCurrency(pricing.total, cabin.pricing.currency)}` : "Select dates to continue"}
          </Button>
          <p className="text-xs text-text-tertiary text-center mt-3">
            You won't be charged yet
          </p>
        </div>
      )}

      {/* Trust badges */}
      <div className="px-6 pb-6 flex items-center justify-center gap-4">
        <span className="flex items-center gap-1.5 text-xs text-text-tertiary">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 1L7.5 4H11L8.25 6.25L9.25 9.5L6 7.5L2.75 9.5L3.75 6.25L1 4H4.5L6 1Z" stroke="currentColor" strokeWidth="1" fill="none"/>
          </svg>
          Verified host
        </span>
        <span className="flex items-center gap-1.5 text-xs text-text-tertiary">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 1L10 2.5V6C10 8.5 8 10.5 6 11C4 10.5 2 8.5 2 6V2.5L6 1Z" stroke="currentColor" strokeWidth="1" fill="none"/>
          </svg>
          Secure booking
        </span>
        <span className="flex items-center gap-1.5 text-xs text-text-tertiary">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 4H10M2 4V9.5C2 9.78 2.22 10 2.5 10H9.5C9.78 10 10 9.78 10 9.5V4M2 4L3.5 2H8.5L10 4" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round"/>
          </svg>
          Free cancellation
        </span>
      </div>
    </div>
  );
}
