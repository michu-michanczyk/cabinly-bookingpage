import { useEffect } from "react";
import { useBookingStore } from "../../stores/booking-store";
import { formatCurrency, formatDateShort, cn } from "../../lib/utils";
import { calcExtrasTotal } from "../../data/extras";
import { Button } from "../ui/Button";
import { StickyButtonWrapper } from "./StickyButtonWrapper";
import type { Cabin } from "../../types/cabin";

interface BookingStepSummaryProps {
  cabin: Cabin;
}

export function BookingStepSummary({ cabin }: BookingStepSummaryProps) {
  const dates = useBookingStore((s) => s.dates);
  const guests = useBookingStore((s) => s.guests);
  const pricing = useBookingStore((s) => s.pricing);
  const selectedExtras = useBookingStore((s) => s.selectedExtras);
  const setStep = useBookingStore((s) => s.setStep);
  const paymentOption = useBookingStore((s) => s.paymentOption);
  const setPaymentOption = useBookingStore((s) => s.setPaymentOption);

  const missingData = !dates.checkIn || !dates.checkOut || !pricing;

  useEffect(() => {
    if (missingData) setStep(1);
  }, [missingData, setStep]);

  if (missingData) return null;

  const guestSummary = [
    `${guests.adults} adult${guests.adults !== 1 ? "s" : ""}`,
    guests.children > 0 ? `${guests.children} child${guests.children !== 1 ? "ren" : ""}` : null,
    guests.babies > 0 ? `${guests.babies} baby` : null,
    guests.pets > 0 ? `${guests.pets} pet${guests.pets !== 1 ? "s" : ""}` : null,
  ].filter(Boolean).join(", ");

  const extrasTotal = calcExtrasTotal(selectedExtras);
  const grandTotal = pricing.total + extrasTotal;
  const currency = cabin.pricing.currency;

  const isSplit = paymentOption === "split";
  const dueNow = isSplit ? Math.ceil(grandTotal / 2) : grandTotal;
  const dueLater = grandTotal - dueNow;

  const checkInDate = formatDateShort(dates.checkIn);
  const checkOutDate = formatDateShort(dates.checkOut);

  const sevenDaysBefore = new Date(new Date(dates.checkIn).getTime() - 7 * 24 * 60 * 60 * 1000);
  const sevenDaysBeforeStr = sevenDaysBefore.toLocaleDateString("en-US", { day: "numeric", month: "short" });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-medium text-text-primary">Book & Pay</h1>

      {/* Summary card */}
      <div className="border border-border-default rounded-2xl overflow-hidden">
        {/* Dates + guests */}
        <div className="px-4 py-4 space-y-2 border-b border-border-default">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-primary">Dates</span>
            <span className="text-sm font-medium text-text-primary">{checkInDate} — {checkOutDate}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-primary">Guests</span>
            <span className="text-sm font-medium text-text-primary">{guestSummary}</span>
          </div>
        </div>

        {/* Price breakdown */}
        <div className="px-4 py-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-primary">{formatCurrency(pricing.subtotal / pricing.nights, currency)} × {pricing.nights} night{pricing.nights !== 1 ? "s" : ""}</span>
            <span className="text-sm text-text-primary">{formatCurrency(pricing.subtotal, currency)}</span>
          </div>
          {pricing.discount > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-alert-positive">Proposed date discount</span>
              <span className="text-sm text-alert-positive">-{formatCurrency(pricing.discount, currency)}</span>
            </div>
          )}
          {extrasTotal > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-primary">Additional services</span>
              <span className="text-sm text-text-primary">{formatCurrency(extrasTotal, currency)}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-primary">Cleaning fee</span>
            <span className="text-sm text-text-primary">{formatCurrency(pricing.cleaningFee, currency)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className={cn("text-sm", pricing.serviceFee === 0 ? "text-alert-positive" : "text-text-primary")}>
              Service fee{pricing.serviceFee === 0 ? " ✨" : ""}
            </span>
            <span className={cn("text-sm", pricing.serviceFee === 0 ? "text-alert-positive" : "text-text-primary")}>
              {formatCurrency(pricing.serviceFee, currency)}
            </span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border-light">
            <span className="text-[16px] font-semibold text-text-primary">Total</span>
            <span className="text-[16px] font-semibold text-text-primary">{formatCurrency(grandTotal, currency)}</span>
          </div>
        </div>
      </div>

      {/* Split payment + due now — single card */}
      <div className="border border-border-default rounded-2xl overflow-hidden">
        <div className="px-4 py-4 space-y-3">
          {/* Toggle row */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 text-text-primary">
                <path d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <p className="text-sm font-semibold text-text-primary">Split payment</p>
                <p className="text-sm text-text-secondary">50% now, 50% 7 days before arrival</p>
              </div>
            </div>
            <button
              onClick={() => setPaymentOption(isSplit ? "full" : "split")}
              className={cn(
                "relative shrink-0 w-11 h-6 rounded-full transition-colors cursor-pointer",
                isSplit ? "bg-bg-onSurface" : "bg-border-hover"
              )}
            >
              <span className={cn(
                "absolute top-0.5 w-5 h-5 rounded-full shadow transition-all",
                isSplit ? "bg-bg-primary left-[calc(100%-1.375rem)]" : "bg-bg-primary left-0.5"
              )} />
            </button>
          </div>

          {/* Due now + optional 7-days-before */}
          <div className="pt-3 border-t border-border-light space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-primary">Due now{isSplit ? " (50%)" : ""}</span>
              <span className="text-[16px] font-semibold text-text-primary">{formatCurrency(dueNow, currency)}</span>
            </div>
            {isSplit && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-primary">7 days before ({sevenDaysBeforeStr})</span>
                <span className="text-sm font-semibold text-text-primary">{formatCurrency(dueLater, currency)}</span>
              </div>
            )}
            <p className="text-sm text-text-secondary">
              Free cancellation until {sevenDaysBeforeStr}
            </p>
          </div>
        </div>
      </div>

      {/* Terms */}
      <p className="text-xs text-text-secondary text-center">
        By clicking "Book & pay" you accept the{" "}
        <a href="/cabinly-bookingpage/terms" target="_blank" rel="noopener noreferrer" className="underline">terms & conditions</a>
        ,<br />
        <a href="/cabinly-bookingpage/privacy" target="_blank" rel="noopener noreferrer" className="underline">privacy policy</a>
        {" "}and cancellation rules.
      </p>

      <StickyButtonWrapper>
        <Button variant="primary" size="lg" className="w-full" onClick={() => setStep(6)}>
          Continue to payment
        </Button>
      </StickyButtonWrapper>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-3 pb-2">
        {/* Secured by Stripe */}
        <div className="border border-border-default rounded-xl p-3 flex flex-col items-center justify-between gap-2">
          <div className="h-5 flex items-center justify-center">
            <svg width="34" height="14" viewBox="0 0 34 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M18.2681 8.14192L16.541 8.52349V7.08202L18.2681 6.70752V8.14192ZM21.8599 8.94038C21.1856 8.94038 20.7521 9.26542 20.5112 9.49153L20.4218 9.05344H18.908V17.2924L20.6282 16.9179L20.6351 14.9183C20.8828 15.102 21.2475 15.3634 21.853 15.3634C23.0847 15.3634 24.2063 14.3459 24.2063 12.106C24.1994 10.0568 23.0641 8.94038 21.8599 8.94038ZM21.447 13.8089C21.041 13.8089 20.8002 13.6605 20.6351 13.4768L20.6282 10.8553C20.8071 10.6504 21.0548 10.509 21.447 10.509C22.0732 10.509 22.5067 11.2298 22.5067 12.1554C22.5067 13.1023 22.0801 13.8089 21.447 13.8089ZM29.6286 12.1766C29.6286 10.3677 28.7753 8.94038 27.1446 8.94038C25.5069 8.94038 24.516 10.3677 24.516 12.1625C24.516 14.2894 25.6858 15.3634 27.3647 15.3634C28.1836 15.3634 28.8029 15.1726 29.2708 14.9041V13.4909C28.8029 13.7312 28.2661 13.8795 27.5849 13.8795C26.9175 13.8795 26.3257 13.6393 26.25 12.8055H29.6148C29.6148 12.7666 29.6173 12.6782 29.6201 12.5763L29.6201 12.5761C29.624 12.4377 29.6286 12.2743 29.6286 12.1766ZM26.2293 11.5054C26.2293 10.7069 26.7041 10.3748 27.1376 10.3748C27.5574 10.3748 28.0046 10.7069 28.0046 11.5054H26.2293ZM16.5409 9.06052H18.268V15.2433H16.5409V9.06052ZM14.58 9.06051L14.6901 9.5834C15.0961 8.82026 15.9011 8.97572 16.1213 9.06051V10.6857C15.908 10.608 15.2199 10.509 14.8139 11.0531V15.2433H13.0937V9.06051H14.58ZM11.2495 7.52717L9.57053 7.8946L9.56365 13.5545C9.56365 14.6003 10.3274 15.3705 11.3458 15.3705C11.9101 15.3705 12.3229 15.2645 12.55 15.1373V13.7029C12.3298 13.7947 11.2426 14.1198 11.2426 13.074V10.5656H12.55V9.0605H11.2426L11.2495 7.52717ZM7.18292 10.4737C6.81823 10.4737 6.59804 10.5797 6.59804 10.8553C6.59804 11.1562 6.97699 11.2885 7.44712 11.4527C8.21355 11.7204 9.22231 12.0728 9.22657 13.3779C9.22657 14.6427 8.24259 15.3705 6.81135 15.3705C6.21958 15.3705 5.57277 15.2504 4.93284 14.9677V13.286C5.51084 13.611 6.24023 13.8513 6.81135 13.8513C7.19668 13.8513 7.47192 13.7453 7.47192 13.4203C7.47192 13.087 7.06113 12.9346 6.56519 12.7507C5.80991 12.4706 4.85715 12.1173 4.85715 10.9401C4.85715 9.6894 5.78608 8.9404 7.18292 8.9404C7.75404 8.9404 8.31828 9.03225 8.88941 9.26543V10.926C8.36645 10.6362 7.70588 10.4737 7.18292 10.4737Z" fill="#6461FC"/></svg>
          </div>
          <span className="text-xs text-text-secondary text-center">Secured by Stripe</span>
        </div>
        {/* Data encrypted */}
        <div className="border border-border-default rounded-xl p-3 flex flex-col items-center justify-between gap-2">
          <div className="h-5 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M4 6.66665V5.33331C4 3.12665 4.66667 1.33331 8 1.33331C11.3333 1.33331 12 3.12665 12 5.33331V6.66665" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 12.3333C8.92048 12.3333 9.66667 11.5871 9.66667 10.6667C9.66667 9.74619 8.92048 9 8 9C7.07953 9 6.33333 9.74619 6.33333 10.6667C6.33333 11.5871 7.07953 12.3333 8 12.3333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M11.3333 14.6667H4.66667C2 14.6667 1.33333 14 1.33333 11.3334V10C1.33333 7.33335 2 6.66669 4.66667 6.66669H11.3333C14 6.66669 14.6667 7.33335 14.6667 10V11.3334C14.6667 14 14 14.6667 11.3333 14.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span className="text-xs text-text-secondary text-center">Data encrypted</span>
        </div>
        {/* Free cancellation */}
        <div className="border border-border-default rounded-xl p-3 flex flex-col items-center justify-between gap-2">
          <div className="h-5 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M14.6667 8.00002V11.3334C14.6667 13.3334 13.3333 14.6667 11.3333 14.6667H4.66666C2.66666 14.6667 1.33333 13.3334 1.33333 11.3334V8.00002C1.33333 6.18669 2.42666 4.92002 4.12666 4.70669C4.29999 4.68002 4.47999 4.66669 4.66666 4.66669H11.3333C11.5067 4.66669 11.6733 4.67335 11.8333 4.70001C13.5533 4.90001 14.6667 6.17335 14.6667 8.00002Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M11.8343 4.69998C11.6743 4.67331 11.5076 4.66665 11.3343 4.66665H4.66761C4.48094 4.66665 4.30094 4.67999 4.12761 4.70665C4.22094 4.51999 4.35428 4.34665 4.51428 4.18665L6.68094 2.01331C7.59428 1.10665 9.07428 1.10665 9.98761 2.01331L11.1543 3.19333C11.5809 3.61333 11.8076 4.14665 11.8343 4.69998Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14.6667 8.33331H12.6667C11.9333 8.33331 11.3333 8.93331 11.3333 9.66665C11.3333 10.4 11.9333 11 12.6667 11H14.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span className="text-xs text-text-secondary text-center">Free cancellation</span>
        </div>
      </div>
    </div>
  );
}
