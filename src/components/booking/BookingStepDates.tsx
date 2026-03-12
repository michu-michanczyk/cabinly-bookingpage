import { useState, useEffect } from "react";
import { format, parseISO, eachDayOfInterval, isSameDay, isAfter, isBefore, startOfDay } from "date-fns";
import { IconChevronLeft } from "../icons";
import { useBookingStore } from "../../stores/booking-store";
import { formatCurrency, cn } from "../../lib/utils";
import { Button } from "../ui/Button";
import { StickyButtonWrapper } from "./StickyButtonWrapper";
import type { Cabin, Promo } from "../../types/cabin";

interface BookingStepDatesProps {
  cabin: Cabin;
}

// Flash/lightning bolt — stroked outline icon provided by user
function IconFlashSvg({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.05999 8.85333H6.11999V13.6533C6.11999 14.7733 6.72665 15 7.46665 14.16L12.5133 8.42666C13.1333 7.72666 12.8733 7.14666 11.9333 7.14666H9.87332V2.34666C9.87332 1.22666 9.26665 0.999998 8.52665 1.84L3.47999 7.57333C2.86665 8.28 3.12665 8.85333 4.05999 8.85333Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Calendar icon — exact SVG provided by user
function IconCalendarSvg({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.33325 1.33334V3.33334" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.6667 1.33334V3.33334" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.6667 2.33334C12.8867 2.45334 14 3.3 14 6.43334V10.5533C14 13.3 13.3333 14.6733 10 14.6733H6C2.66667 14.6733 2 13.3 2 10.5533V6.43334C2 3.3 3.11333 2.46 5.33333 2.33334H10.6667Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}


export function BookingStepDates({ cabin }: BookingStepDatesProps) {
  const dates = useBookingStore((s) => s.dates);
  const selectedPromo = useBookingStore((s) => s.selectedPromo);
  const setDates = useBookingStore((s) => s.setDates);
  const setSelectedPromo = useBookingStore((s) => s.setSelectedPromo);
  const calculatePricing = useBookingStore((s) => s.calculatePricing);
  const setStep = useBookingStore((s) => s.setStep);

  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => new Date());
  const [selectingCheckOut, setSelectingCheckOut] = useState(false);

  const hasDates = dates.checkIn && dates.checkOut;

  useEffect(() => {
    if (dates.checkIn && dates.checkOut) {
      calculatePricing(
        cabin.pricing.baseNight,
        cabin.pricing.cleaningFee,
        cabin.pricing.serviceFee
      );
    }
  }, [dates.checkIn, dates.checkOut, cabin.pricing, calculatePricing]);

  const handlePromoSelect = (promo: Promo) => {
    if (selectedPromo?.id === promo.id) {
      setSelectedPromo(null);
      setDates(null, null);
      return;
    }
    setSelectedPromo(promo);
    setDates(promo.dates.start, promo.dates.end);
    setCalendarMonth(parseISO(promo.dates.start));
  };

  const handleDateClick = (day: Date) => {
    const dateStr = format(day, "yyyy-MM-dd");
    if (!dates.checkIn || !selectingCheckOut) {
      setSelectedPromo(null);
      setDates(dateStr, null);
      setSelectingCheckOut(true);
    } else {
      if (isBefore(day, parseISO(dates.checkIn))) {
        setDates(dateStr, null);
        setSelectingCheckOut(true);
      } else {
        setDates(dates.checkIn, dateStr);
        setSelectingCheckOut(false);
      }
    }
  };

  const handleClearDates = () => {
    setSelectedPromo(null);
    setDates(null, null);
    setSelectingCheckOut(false);
  };

  return (
    <div className="space-y-6">
      {/* "Select your date" — header-large: fontSize:20 fontWeight:500 */}
      <h1 className="text-xl font-medium text-text-primary">
        Select your date
      </h1>

      {/* Dates section */}
      <div className="space-y-2">
        {/* Header: ⚡ Proposed  Special offers */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-text-primary"><IconFlashSvg size={16} /></span>
          <span className="text-base font-medium text-text-primary">Special offers</span>
        </div>

        {/* Promo cards — height:75px, padding:16px, radius:12px, border: border-default #C0C0CE */}
        <div className="space-y-2">
          {cabin.promos.map((promo) => {
            const isSelected = selectedPromo?.id === promo.id;
            const nights = Math.round(
              (new Date(promo.dates.end).getTime() - new Date(promo.dates.start).getTime()) /
                (1000 * 60 * 60 * 24)
            );
            const perNight = Math.round(promo.dealPrice / nights);

            return (
              <button
                key={promo.id}
                onClick={() => handlePromoSelect(promo)}
                style={{
                  height: 75,
                  borderColor: isSelected ? "var(--color-text-primary)" : "var(--color-border-default)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-border-dark)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = isSelected ? "var(--color-text-primary)" : "var(--color-border-default)"; }}
                className={cn(
                  "w-full text-left rounded-xl px-4 flex flex-col justify-center transition-all cursor-pointer border",
                  isSelected
                    ? "bg-bg-secondary"
                    : "bg-bg-primary"
                )}
              >
                {/* Top row: date + badge | strikethrough price */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-sm font-medium text-text-primary whitespace-nowrap">
                      {format(parseISO(promo.dates.start), "d MMM")} - {format(parseISO(promo.dates.end), "d MMM")}
                    </span>
                    <PromoBadge badge={promo.badge} />
                  </div>
                  <span className="text-sm text-text-secondary line-through shrink-0">
                    {formatCurrency(cabin.pricing.baseNight, cabin.pricing.currency)}
                  </span>
                </div>

                {/* Bottom row: description | deal price/night — 4px gap */}
                <div className="flex items-center justify-between gap-4 mt-1">
                  <span className="text-sm text-text-secondary">
                    {promo.title} · {nights} night{nights !== 1 ? "s" : ""}
                  </span>
                  <span className="text-sm font-medium text-text-primary shrink-0">
                    {formatCurrency(perNight, cabin.pricing.currency)}
                    <span className="text-sm font-medium text-text-primary"> / night</span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Not a fit? — same height and style as promo cards */}
        {!showCalendar ? (
          <button
            onClick={() => { setShowCalendar(true); handleClearDates(); }}
            style={{ height: 75, borderColor: "var(--color-border-default)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-border-dark)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-border-default)"; }}
            className="w-full flex items-center gap-2 px-4 rounded-xl border transition-colors text-left bg-bg-primary cursor-pointer"
          >
            <span className="text-text-primary shrink-0"><IconCalendarSvg size={16} /></span>
            <span className="text-sm font-medium text-text-primary">
              Not a fit? Find your date
            </span>
          </button>
        ) : (
          <div className="space-y-3">
            {/* Calendar header */}
            <div className="mt-6">
              <p className="text-base font-medium text-text-primary">
                {!dates.checkIn ? "Select check-in" : !dates.checkOut ? "Select check-out" : "Dates selected"}
              </p>
            </div>

            {/* Calendar widget */}
            <div className="border border-border-default rounded-xl overflow-hidden">
              <div className="flex items-center px-5 py-3 border-b border-border-default">
                <span className="text-sm font-medium text-text-primary flex-1">
                  {format(calendarMonth, "MMMM yyyy")}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCalendarMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-bg-tertiary transition-colors text-text-secondary cursor-pointer"
                  >
                    <IconChevronLeft size={14} />
                  </button>
                  <button
                    onClick={() => setCalendarMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-bg-tertiary transition-colors text-text-secondary cursor-pointer"
                  >
                    <IconChevronLeft size={14} className="rotate-180" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 px-3 pt-2">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                  <div key={d} className="text-center text-[11px] font-medium text-text-secondary py-1.5">{d}</div>
                ))}
              </div>
              <div className="px-3 pb-3">
                <CalendarGrid
                  month={calendarMonth}
                  checkIn={dates.checkIn}
                  checkOut={dates.checkOut}
                  onDayClick={handleDateClick}
                  nightlyPrices={cabin.pricing.nightlyPrices}
                  baseNight={cabin.pricing.baseNight}
                  currency={cabin.pricing.currency}
                />
              </div>
            </div>

            {hasDates && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-primary">
                  {format(parseISO(dates.checkIn!), "MMM d")} – {format(parseISO(dates.checkOut!), "MMM d, yyyy")}
                </span>
                <button onClick={handleClearDates} className="text-sm text-text-secondary hover:text-text-primary underline cursor-pointer">Clear</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Continue button */}
      <StickyButtonWrapper>
        <Button variant="primary" size="lg" className="w-full" disabled={!hasDates} onClick={() => setStep(2)}>
          Continue
        </Button>
      </StickyButtonWrapper>

    </div>
  );
}

function PromoBadge({ badge }: { badge: string }) {
  const isPercent = badge.includes("%");
  const isFor = badge.toLowerCase().includes("for");
  const isSeasonal = badge.toLowerCase().includes("seasonal");

  if (isPercent) {
    return (
      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[12px] font-semibold" style={{ background: "#FFE4D0", color: "#FF8427" }}>
        {badge}
      </span>
    );
  }
  if (isFor) {
    return (
      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[12px] font-semibold" style={{ background: "#FFEDED", color: "#E53E3E" }}>
        {badge}
      </span>
    );
  }
  if (isSeasonal) {
    return (
      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[12px] font-semibold" style={{ background: "#E3EEFC", color: "#0C3B7C" }}>
        {badge}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[12px] font-semibold" style={{ background: "#FFE4D0", color: "#FF8427" }}>
      {badge}
    </span>
  );
}


function CalendarGrid({ month, checkIn, checkOut, onDayClick, nightlyPrices, baseNight, currency }: {
  month: Date; checkIn: string | null; checkOut: string | null; onDayClick: (day: Date) => void;
  nightlyPrices?: Record<string, number>; baseNight: number; currency: string;
}) {
  const today = startOfDay(new Date());
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  const days = eachDayOfInterval({ start: firstDay, end: lastDay });
  const startDow = firstDay.getDay();
  const checkInDate = checkIn ? parseISO(checkIn) : null;
  const checkOutDate = checkOut ? parseISO(checkOut) : null;
  const symbol = currency === "EUR" ? "€" : currency === "PLN" ? "zł" : "$";

  return (
    <div className="grid grid-cols-7">
      {Array.from({ length: startDow }).map((_, i) => <div key={`e-${i}`} />)}
      {days.map((day) => {
        const isPast = isBefore(day, today);
        const isCheckIn = checkInDate && isSameDay(day, checkInDate);
        const isCheckOut = checkOutDate && isSameDay(day, checkOutDate);
        const isInRange = checkInDate && checkOutDate && isAfter(day, checkInDate) && isBefore(day, checkOutDate);
        const nightPrice = nightlyPrices?.[format(day, "yyyy-MM-dd")] ?? baseNight;

        return (
          <button key={day.toISOString()} disabled={isPast} onClick={() => onDayClick(day)}
            className={cn(
              "h-12 flex flex-col items-center justify-center gap-0.5 transition-all select-none",
              isPast ? "cursor-not-allowed" : "cursor-pointer",
              !isPast && !isCheckIn && !isCheckOut && !isInRange && "hover:rounded-lg hover:bg-bg-tertiary",
              isInRange && "bg-bg-tertiary",
              isCheckIn && "bg-text-primary rounded-l-lg",
              isCheckOut && "bg-text-primary rounded-r-lg"
            )}>
            <span className={cn("text-lg font-medium leading-none",
              isPast && "text-text-tertiary/30",
              !isPast && !isCheckIn && !isCheckOut && "text-text-primary",
              (isCheckIn || isCheckOut) && "text-white")}>
              {format(day, "d")}
            </span>
            {!isPast && (
              <span className={cn("text-xs leading-none",
                isCheckIn || isCheckOut ? "text-white/60" : "text-text-secondary")}>
                {symbol}{nightPrice}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
