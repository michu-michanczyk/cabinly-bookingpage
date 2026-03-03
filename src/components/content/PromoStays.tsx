import { useState, useEffect } from "react";
import { IconFlash, IconArrowRight } from "../icons";
import { Button } from "../ui/Button";
import { useBookingStore } from "../../stores/booking-store";
import { formatDateRange, formatCurrency, calculateSavings, getTimeRemaining } from "../../lib/utils";
import type { Promo } from "../../types/cabin";

interface PromoStaysProps {
  promos: Promo[];
  currency: string;
}

export function PromoStays({ promos, currency }: PromoStaysProps) {
  const openBooking = useBookingStore((s) => s.openBooking);

  if (promos.length === 0) return null;

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 sm:py-14 border-t border-border-light">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <IconFlash size={24} className="text-text-primary" />
        <h2 className="text-2xl font-bold text-text-primary">Special Offers</h2>
        <span className="text-xs font-semibold text-text-secondary bg-bg-tertiary px-2.5 py-1 rounded-full">
          Limited time
        </span>
      </div>

      {/* Cards grid - horizontal scroll on mobile */}
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {promos.map((promo) => (
          <PromoCard
            key={promo.id}
            promo={promo}
            currency={currency}
            onBook={() => openBooking(promo)}
          />
        ))}
      </div>
    </section>
  );
}

function PromoCard({
  promo,
  currency,
  onBook,
}: {
  promo: Promo;
  currency: string;
  onBook: () => void;
}) {
  const savings = calculateSavings(promo.originalPrice, promo.dealPrice);

  return (
    <div className="shrink-0 w-[300px] sm:w-auto border border-border-light rounded-lg p-5 flex flex-col hover:opacity-80 transition-opacity">
      {/* Badge + savings */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-text-primary bg-bg-tertiary px-2.5 py-1 rounded-full">
          {promo.badge}
        </span>
        <span className="text-xs font-bold text-text-primary bg-bg-tertiary px-2 py-0.5 rounded-full">
          Save {savings}%
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-text-primary mb-1">{promo.title}</h3>
      <p className="text-xs text-text-secondary mb-3">{promo.description}</p>

      {/* Dates */}
      <div className="text-sm text-text-secondary mb-3">
        {formatDateRange(promo.dates.start, promo.dates.end)}
      </div>

      {/* Pricing */}
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-2xl font-bold text-text-primary">
          {formatCurrency(promo.dealPrice, currency)}
        </span>
        <span className="text-sm text-text-tertiary line-through">
          {formatCurrency(promo.originalPrice, currency)}
        </span>
      </div>

      {/* Countdown for last-minute */}
      {promo.expiresAt && <CountdownTimer expiresAt={promo.expiresAt} />}

      {/* Spacer to push button to bottom */}
      <div className="flex-1" />

      {/* CTA */}
      <Button variant="primary" size="md" onClick={onBook} className="w-full mt-3">
        Book this deal
        <IconArrowRight size={14} />
      </Button>
    </div>
  );
}

function CountdownTimer({ expiresAt }: { expiresAt: string }) {
  const [time, setTime] = useState(getTimeRemaining(expiresAt));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining(expiresAt));
    }, 60000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  if (time.expired) {
    return (
      <div className="text-xs text-text-secondary font-semibold">Offer expired</div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-xs text-text-secondary font-semibold">
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-text-primary animate-pulse" />
      Ends in {time.hours}h {time.minutes}m
    </div>
  );
}
