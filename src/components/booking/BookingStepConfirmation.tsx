import { useNavigate } from "react-router-dom";
import { useBookingStore } from "../../stores/booking-store";
import { formatCurrency, formatDateShort, cn } from "../../lib/utils";
import { Button } from "../ui/Button";
import { StickyButtonWrapper } from "./StickyButtonWrapper";
import type { Cabin } from "../../types/cabin";

interface BookingStepConfirmationProps {
  cabin: Cabin;
}

const EXTRAS = [
  { id: "sauna", title: "Private sauna", price: 280 },
  { id: "hottub", title: "Hot tube on terrace", price: 200 },
  { id: "late-checkout", title: "Late check-out", price: 100 },
  { id: "firewood", title: "Additional fireplace wood", price: 150 },
];

function Row({ label, value, green, bold }: { label: string; value: string; green?: boolean; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className={cn("text-sm", green ? "text-alert-positive" : bold ? "font-semibold text-text-primary" : "text-text-secondary")}>{label}</span>
      <span className={cn("text-sm", green ? "text-alert-positive" : bold ? "font-semibold text-text-primary" : "text-text-secondary")}>{value}</span>
    </div>
  );
}

export function BookingStepConfirmation({ cabin }: BookingStepConfirmationProps) {
  const navigate = useNavigate();
  const dates = useBookingStore((s) => s.dates);
  const guests = useBookingStore((s) => s.guests);
  const pricing = useBookingStore((s) => s.pricing);
  const selectedExtras = useBookingStore((s) => s.selectedExtras);
  const paymentOption = useBookingStore((s) => s.paymentOption);
  const setPaymentOption = useBookingStore((s) => s.setPaymentOption);
  const guestDetails = useBookingStore((s) => s.guestDetails);
  const reset = useBookingStore((s) => s.reset);

  if (!dates.checkIn || !dates.checkOut || !pricing) return null;

  const totalGuests = guests.adults + guests.children;
  const extrasTotal = EXTRAS.filter((e) => selectedExtras.includes(e.id)).reduce((sum, e) => sum + e.price, 0);
  const grandTotal = pricing.total + extrasTotal;
  const currency = cabin.pricing.currency;

  const isSplit = paymentOption === "split";
  const dueNow = isSplit ? Math.ceil(grandTotal / 2) : grandTotal;
  const dueLater = grandTotal - dueNow;

  const checkInDate = formatDateShort(dates.checkIn);
  const checkOutDate = formatDateShort(dates.checkOut);

  // 7 days before check-in
  const checkInMs = new Date(dates.checkIn).getTime();
  const sevenDaysBefore = new Date(checkInMs - 7 * 24 * 60 * 60 * 1000);
  const sevenDaysBeforeStr = sevenDaysBefore.toLocaleDateString("en-US", { day: "numeric", month: "short" });

  const handleBook = () => {
    navigate("/book/confirmed");
    setTimeout(() => reset(), 300);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-medium text-text-primary">Payment</h1>
        <p className="text-sm text-text-secondary mt-1">Choose your payment method</p>
      </div>

      {/* Summary card */}
      <div className="border border-border-default rounded-2xl overflow-hidden">
        {/* Dates + guests */}
        <div className="px-4 py-4 space-y-1 border-b border-border-default">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Dates</span>
            <span className="text-sm font-medium text-text-primary">{checkInDate} — {checkOutDate}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Guests</span>
            <span className="text-sm font-medium text-text-primary">{totalGuests} adult{totalGuests !== 1 ? "s" : ""}</span>
          </div>
        </div>

        {/* Price breakdown */}
        <div className="px-4 divide-y divide-border-light">
          <Row
            label={`${formatCurrency(pricing.subtotal / pricing.nights, currency)} × ${pricing.nights} night${pricing.nights !== 1 ? "s" : ""}`}
            value={formatCurrency(pricing.subtotal, currency)}
          />
          {pricing.discount > 0 && (
            <Row label="Proposed date discount" value={`-${formatCurrency(pricing.discount, currency)}`} green />
          )}
          {extrasTotal > 0 && (
            <Row label="Additional services" value={`+${formatCurrency(extrasTotal, currency)}`} />
          )}
          <Row label="Cleaning fee" value={formatCurrency(pricing.cleaningFee, currency)} />
          <Row label="Service fee" value={`${formatCurrency(pricing.serviceFee, currency)}${pricing.serviceFee === 0 ? " ✨" : ""}`} green={pricing.serviceFee === 0} />
          <div className="flex items-center justify-between py-3">
            <span className="text-sm font-bold text-text-primary">Total</span>
            <span className="text-sm font-bold text-text-primary">{formatCurrency(grandTotal, currency)}</span>
          </div>
        </div>
      </div>

      {/* Split payment toggle */}
      <div className="border border-border-default rounded-2xl overflow-hidden">
        <div className="px-4 py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Split icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 text-text-primary">
                <path d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <p className="text-sm font-semibold text-text-primary">Split payment</p>
                <p className="text-sm text-text-secondary">50% now, 50% 7 days before arrival</p>
              </div>
            </div>
            {/* Toggle */}
            <button
              onClick={() => setPaymentOption(isSplit ? "full" : "split")}
              className={cn(
                "relative shrink-0 w-11 h-6 rounded-full transition-colors cursor-pointer",
                isSplit ? "bg-text-primary" : "bg-border-hover"
              )}
            >
              <span className={cn(
                "absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all",
                isSplit ? "left-[calc(100%-1.375rem)]" : "left-0.5"
              )} />
            </button>
          </div>

          {isSplit && (
            <div className="mt-4 pt-3 border-t border-border-light space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Now (50%)</span>
                <span className="text-sm font-semibold text-text-primary">{formatCurrency(dueNow, currency)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">7 days before ({checkInDate})</span>
                <span className="text-sm font-semibold text-text-primary">{formatCurrency(dueLater, currency)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Due now card */}
      <div className="border border-border-default rounded-2xl px-4 py-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Due now</span>
          <span className="text-base font-bold text-text-primary">{formatCurrency(dueNow, currency)}</span>
        </div>
        <p className="text-sm text-text-secondary mt-1">
          Free cancellation until {sevenDaysBeforeStr}
        </p>
      </div>

      {/* Terms */}
      <p className="text-xs text-text-secondary">
        By clicking "Book & pay" you accept the{" "}
        <a href="/cabinly-bookingpage/terms" target="_blank" rel="noopener noreferrer" className="underline">terms & conditions</a>
        ,{" "}
        <a href="/cabinly-bookingpage/privacy" target="_blank" rel="noopener noreferrer" className="underline">privacy policy</a>
        {" "}and cancellation rules.
      </p>

      <StickyButtonWrapper>
        <Button variant="primary" size="lg" className="w-full" onClick={handleBook}>
          Book & pay {formatCurrency(dueNow, currency)}
        </Button>
      </StickyButtonWrapper>

      {/* Stripe badge */}
      <div className="flex items-center justify-center gap-2 text-xs text-text-secondary">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M4 6.66665V5.33331C4 3.12665 4.66667 1.33331 8 1.33331C11.3333 1.33331 12 3.12665 12 5.33331V6.66665" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.3333 14.6667H4.66667C2 14.6667 1.33333 14 1.33333 11.3334V10C1.33333 7.33335 2 6.66669 4.66667 6.66669H11.3333C14 6.66669 14.6667 7.33335 14.6667 10V11.3334C14.6667 14 14 14.6667 11.3333 14.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Payment secured by Stripe
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-3 pb-2">
        {[
          { label: "Secure payment", icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 22C12 22 3 18 3 12V5L12 2L21 5V12C21 18 12 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          )},
          { label: "Data encrypted", icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 10V7C6 4.79 7.79 3 10 3H14C16.21 3 18 4.79 18 7V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 21H7C5.9 21 5 20.1 5 19V13C5 11.9 5.9 11 7 11H17C18.1 11 19 11.9 19 13V19C19 20.1 18.1 21 17 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          )},
          { label: "Free cancellation", icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          )},
        ].map(({ label, icon }) => (
          <div key={label} className="border border-border-default rounded-xl p-3 flex flex-col items-center gap-2">
            <span className="text-text-secondary">{icon}</span>
            <span className="text-xs text-text-secondary text-center">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
