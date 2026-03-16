import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";
import { mockCabin } from "../data/mock-cabin";
import { useBookingStore } from "../stores/booking-store";
import { formatCurrency, formatDateShort, calcDueNow, totalGuests as calcTotalGuests } from "../lib/utils";
import { calcExtrasTotal } from "../data/extras";
import { IconCalendar, IconUsers, IconTick } from "../components/icons";

export function BookingConfirmed() {
  const cabin = mockCabin;
  // Snapshot store on first render — before the delayed reset fires
  const snapshot = useRef(useBookingStore.getState());

  const { dates, guests, pricing, selectedExtras, paymentOption, guestDetails } = snapshot.current;

  useEffect(() => {
    const colors = ["#ff595e", "#ffca3a", "#6a4c93", "#1982c4", "#8ac926", "#ff924c"];
    const end = Date.now() + 3000;
    let rafId: number;

    const frame = () => {
      confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const extrasTotal = calcExtrasTotal(selectedExtras);
  const grandTotal = pricing ? pricing.total + extrasTotal : null;
  const isSplit = paymentOption === "split";
  const dueNow = grandTotal ? calcDueNow(grandTotal, isSplit) : null;
  const currency = cabin.pricing.currency;
  const numGuests = calcTotalGuests(guests);

  return (
    <div className="min-h-screen min-h-dvh bg-bg-primary flex flex-col">
      {/* Header */}
      <header className="bg-bg-primary border-b border-border-light">
        <div className="flex items-center justify-center h-16 py-2">
          <Link to="/">
            <img
              src={cabin.images[0].url}
              alt={cabin.images[0].alt}
              className="w-12 h-12 rounded-full object-cover"
            />
          </Link>
        </div>
      </header>

      <main className="flex-1 px-4 sm:px-6">
        <div className="max-w-[520px] mx-auto w-full pt-10 pb-12 flex flex-col items-center gap-8">

          {/* Success icon */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-20 h-20 rounded-full bg-text-primary flex items-center justify-center">
              <IconTick size={36} className="text-bg-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Booking confirmed!</h1>
              {guestDetails.name && (
                <p className="mt-1 text-text-secondary text-sm">
                  Thanks, {guestDetails.name.split(" ")[0]}! You're all set.
                </p>
              )}
            </div>
            {guestDetails.email && (
              <p className="text-sm text-text-secondary">
                Confirmation details have been sent to{" "}
                <span className="text-text-primary font-medium">{guestDetails.email}</span>
              </p>
            )}
          </div>

          {/* Booking summary card */}
          {(dates.checkIn || dates.checkOut || grandTotal) && (
            <div className="w-full border border-border-default rounded-2xl overflow-hidden">
              {/* Cabin image strip */}
              <div className="relative h-32 overflow-hidden">
                <img
                  src={cabin.images[0].url}
                  alt={cabin.images[0].alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-3 left-4">
                  <p className="text-white font-semibold text-base leading-tight">{cabin.title}</p>
                  <p className="text-white/80 text-xs">{cabin.location.city}, {cabin.location.country}</p>
                </div>
              </div>

              {/* Details */}
              <div className="px-4 py-4 space-y-3">
                {dates.checkIn && dates.checkOut && (
                  <div className="flex items-center gap-3">
                    <IconCalendar size={16} className="text-text-tertiary shrink-0" />
                    <span className="text-sm text-text-primary">
                      {formatDateShort(dates.checkIn)} – {formatDateShort(dates.checkOut)}
                      {pricing && (
                        <span className="text-text-secondary ml-1">· {pricing.nights} nights</span>
                      )}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <IconUsers size={16} className="text-text-tertiary shrink-0" />
                  <span className="text-sm text-text-primary">
                    {numGuests} guest{numGuests !== 1 ? "s" : ""}
                  </span>
                </div>

                {grandTotal && (
                  <>
                    <div className="border-t border-border-light pt-3 mt-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Total</span>
                        <span className="text-text-primary font-medium">{formatCurrency(grandTotal, currency)}</span>
                      </div>
                      {isSplit && dueNow && (
                        <>
                          <div className="flex justify-between text-sm mt-1">
                            <span className="text-text-secondary">Paid now</span>
                            <span className="text-text-primary font-medium">{formatCurrency(dueNow, currency)}</span>
                          </div>
                          <div className="flex justify-between text-sm mt-1">
                            <span className="text-text-secondary">Due at check-in</span>
                            <span className="text-text-primary font-medium">{formatCurrency(grandTotal - dueNow, currency)}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* CTA */}
          <Link
            to="/"
            className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-text-primary text-bg-primary text-base font-medium hover:opacity-80 transition-opacity w-full"
          >
            Back to home
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 sm:px-6 pt-3 sm:pt-5 pb-8 sm:pb-5">
        <div className="max-w-[520px] mx-auto w-full flex items-center justify-center">
          <div className="flex items-center gap-1.5">
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
              <path d="M7.92675 0C9.97158 0 11.511 0.457909 13.1652 1.57963C10.1366 5.16654 10.1242 10.4113 13.1359 14.0124L13.2744 14.178C11.5053 15.4143 9.60402 15.9336 7.5362 15.842C3.0329 15.636 3.89762e-06 12.3852 0 7.78373C0 3.38826 3.44643 0 7.92675 0Z" fill="url(#confirmed-footer-grad)"/>
              <defs>
                <linearGradient id="confirmed-footer-grad" x1="6.63721" y1="0" x2="6.63721" y2="15.8523" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#34D399"/>
                  <stop offset="0.634615" stopColor="#3B82F6"/>
                  <stop offset="1" stopColor="#17179A"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="text-sm font-medium text-text-primary">Cabinly</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
