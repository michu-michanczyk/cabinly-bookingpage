import { useState, useEffect } from "react";
import { format, parseISO, eachDayOfInterval, isSameDay, isAfter, isBefore, startOfDay } from "date-fns";
import { IconChevronLeft } from "../icons";
import { useBookingStore } from "../../stores/booking-store";
import { formatCurrency, getNights, cn } from "../../lib/utils";
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
  const pricing = useBookingStore((s) => s.pricing);
  const setDates = useBookingStore((s) => s.setDates);
  const setSelectedPromo = useBookingStore((s) => s.setSelectedPromo);
  const calculatePricing = useBookingStore((s) => s.calculatePricing);
  const setStep = useBookingStore((s) => s.setStep);

  const [showCalendar, setShowCalendar] = useState(
    () => !!(dates.checkIn && !selectedPromo)
  );
  const [calendarMonth, setCalendarMonth] = useState(
    () => dates.checkIn ? parseISO(dates.checkIn) : new Date()
  );
  const [selectingCheckOut, setSelectingCheckOut] = useState(false);

  const hasDates = dates.checkIn && dates.checkOut;

  const { baseNight, cleaningFee, serviceFee, nightlyPrices } = cabin.pricing;
  useEffect(() => {
    if (dates.checkIn && dates.checkOut) {
      calculatePricing(baseNight, cleaningFee, serviceFee, nightlyPrices);
    }
  }, [dates.checkIn, dates.checkOut, baseNight, cleaningFee, serviceFee, nightlyPrices, calculatePricing]);

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
            const nights = getNights(promo.dates.start, promo.dates.end);
            const perNight = Math.round(promo.dealPrice / nights);

            return (
              <button
                key={promo.id}
                onClick={() => handlePromoSelect(promo)}
                style={{ height: 75 }}
                className={cn(
                  "w-full text-left rounded-2xl px-4 flex flex-col justify-center transition-colors cursor-pointer border overflow-hidden",
                  isSelected
                    ? "bg-bg-secondary border-text-primary"
                    : "bg-bg-primary border-border-default hover:border-border-hover"
                )}
              >
                {/* Top row: date + badge | current price/night */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-sm font-medium text-text-primary whitespace-nowrap">
                      {format(parseISO(promo.dates.start), "d MMM")} - {format(parseISO(promo.dates.end), "d MMM")}
                    </span>
                    <PromoBadge badge={promo.badge} />
                  </div>
                  <span className="text-sm font-medium text-text-primary shrink-0">
                    {formatCurrency(perNight, cabin.pricing.currency)}
                    <span className="text-sm font-medium text-text-primary"> / night</span>
                  </span>
                </div>

                {/* Bottom row: description | strikethrough original price — 4px gap */}
                <div className="flex items-center justify-between gap-4 mt-1">
                  <span className="text-sm text-text-secondary">
                    {promo.title} · {nights} night{nights !== 1 ? "s" : ""}
                  </span>
                  <span className="text-sm text-text-secondary line-through shrink-0">
                    {formatCurrency(cabin.pricing.baseNight, cabin.pricing.currency)}
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
            style={{ height: 75 }}
            className="w-full flex items-center gap-2 px-4 rounded-2xl border border-border-default transition-colors text-left bg-bg-primary cursor-pointer overflow-hidden hover:border-border-hover"
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

      {/* Summary row */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-secondary">{hasDates && pricing ? `${pricing.nights} night${pricing.nights !== 1 ? "s" : ""}` : "No dates selected"}</span>
        <span className="text-base font-medium text-text-primary">{hasDates && pricing ? formatCurrency(pricing.subtotal - pricing.discount, cabin.pricing.currency) : formatCurrency(0, cabin.pricing.currency)}</span>
      </div>
      <StickyButtonWrapper>
        <Button variant="primary" size="lg" className="w-full" disabled={!hasDates} onClick={() => setStep(2)}>
          Continue
        </Button>
      </StickyButtonWrapper>

      {/* Direct booking banner */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: "#DDFFE0", border: "1px solid #ADDFB2" }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
          <path d="M2.78001 10.2L5.80001 13.22C7.04001 14.46 9.05334 14.46 10.3 13.22L13.2267 10.2934C14.4667 9.05337 14.4667 7.04003 13.2267 5.79337L10.2 2.78003C9.56668 2.1467 8.69334 1.8067 7.80001 1.85337L4.46668 2.01337C3.13334 2.07337 2.07334 3.13337 2.00668 4.46003L1.84668 7.79337C1.80668 8.69337 2.14668 9.5667 2.78001 10.2Z" stroke="#158820" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6.33317 8.00002C7.25364 8.00002 7.99984 7.25383 7.99984 6.33335C7.99984 5.41288 7.25364 4.66669 6.33317 4.66669C5.4127 4.66669 4.6665 5.41288 4.6665 6.33335C4.6665 7.25383 5.4127 8.00002 6.33317 8.00002Z" stroke="#158820" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <div>
          <p className="text-sm font-semibold" style={{ color: "#1A5C22" }}>You're booking directly - 0% commission</p>
          <p className="text-sm" style={{ color: "#3A8A44" }}>Best price guaranteed. Cheaper than OTA.</p>
        </div>
      </div>

    </div>
  );
}

const BADGE_STYLES: Array<{ test: (b: string) => boolean; bg: string; color: string }> = [
  { test: (b) => b.toLowerCase().includes("for"),      bg: "#FFEDED", color: "#E53E3E" },
  { test: (b) => b.toLowerCase().includes("seasonal"), bg: "#E3EEFC", color: "#0C3B7C" },
  { test: (b) => b.includes("%"),                      bg: "#FFE4D0", color: "#FF8427" },
];

function PromoBadge({ badge }: { badge: string }) {
  const style = BADGE_STYLES.find((s) => s.test(badge)) ?? BADGE_STYLES[2];
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[12px] font-semibold" style={{ background: style.bg, color: style.color }}>
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
              (isCheckIn || isCheckOut) && "text-bg-primary")}>
              {format(day, "d")}
            </span>
            {!isPast && (
              <span className={cn("text-xs leading-none",
                isCheckIn || isCheckOut ? "text-bg-primary/60" : "text-text-secondary")}>
                {symbol}{nightPrice}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
