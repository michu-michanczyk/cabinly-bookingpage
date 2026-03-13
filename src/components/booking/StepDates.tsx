import { useState, useEffect } from "react";
import { format, parseISO, eachDayOfInterval, isSameDay, isAfter, isBefore, startOfDay } from "date-fns";
import { Button } from "../ui/Button";
import { IconCalendar, IconUsers, IconAdd, IconMinus, IconFlash } from "../icons";
import { useBookingStore } from "../../stores/booking-store";
import { formatCurrency, cn } from "../../lib/utils";
import type { Cabin } from "../../types/cabin";

interface StepDatesProps {
  cabin: Cabin;
}

export function StepDates({ cabin }: StepDatesProps) {
  const dates = useBookingStore((s) => s.dates);
  const guests = useBookingStore((s) => s.guests);
  const selectedPromo = useBookingStore((s) => s.selectedPromo);
  const pricing = useBookingStore((s) => s.pricing);
  const setDates = useBookingStore((s) => s.setDates);
  const setGuests = useBookingStore((s) => s.setGuests);
  const setStep = useBookingStore((s) => s.setStep);
  const calculatePricing = useBookingStore((s) => s.calculatePricing);

  const [calendarMonth, setCalendarMonth] = useState(() => {
    if (dates.checkIn) return parseISO(dates.checkIn);
    return new Date();
  });
  const [selectingCheckOut, setSelectingCheckOut] = useState(false);

  // Recalculate pricing when dates change
  useEffect(() => {
    if (dates.checkIn && dates.checkOut) {
      calculatePricing(
        cabin.pricing.baseNight,
        cabin.pricing.cleaningFee,
        cabin.pricing.serviceFee
      );
    }
  }, [dates.checkIn, dates.checkOut, cabin.pricing, calculatePricing]);

  const handleDateClick = (day: Date) => {
    const dateStr = format(day, "yyyy-MM-dd");

    if (!dates.checkIn || selectingCheckOut === false) {
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

  const canContinue = dates.checkIn && dates.checkOut && pricing;

  return (
    <div className="px-6 pb-6">
      {/* Promo badge if applicable */}
      {selectedPromo && (
        <div className="flex items-center gap-2 p-3 bg-alert-positive/10 rounded-lg mb-4">
          <IconFlash size={16} className="text-alert-positive" />
          <div>
            <span className="text-sm font-semibold text-alert-positive">{selectedPromo.badge}</span>
            <span className="text-xs text-alert-positive/80 ml-2">{selectedPromo.title}</span>
          </div>
        </div>
      )}

      {/* Calendar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() =>
              setCalendarMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
            }
            className="p-2 rounded-lg hover:opacity-80 transition-opacity text-text-secondary"
          >
            ←
          </button>
          <span className="text-sm font-semibold text-text-primary">
            {format(calendarMonth, "MMMM yyyy")}
          </span>
          <button
            onClick={() =>
              setCalendarMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
            }
            className="p-2 rounded-lg hover:opacity-80 transition-opacity text-text-secondary"
          >
            →
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
            <div key={d} className="text-center text-[10px] font-semibold text-text-tertiary py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <CalendarGrid
          month={calendarMonth}
          checkIn={dates.checkIn}
          checkOut={dates.checkOut}
          onDayClick={handleDateClick}
        />
      </div>

      {/* Date display */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="border border-border-light rounded-lg p-3">
          <div className="text-[10px] text-text-tertiary mb-1 flex items-center gap-1">
            <IconCalendar size={10} /> Check-in
          </div>
          <div className="text-sm font-semibold text-text-primary">
            {dates.checkIn ? format(parseISO(dates.checkIn), "MMM d, yyyy") : "Select date"}
          </div>
        </div>
        <div className="border border-border-light rounded-lg p-3">
          <div className="text-[10px] text-text-tertiary mb-1 flex items-center gap-1">
            <IconCalendar size={10} /> Check-out
          </div>
          <div className="text-sm font-semibold text-text-primary">
            {dates.checkOut ? format(parseISO(dates.checkOut), "MMM d, yyyy") : "Select date"}
          </div>
        </div>
      </div>

      {/* Guest counter */}
      <div className="border border-border-light rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <IconUsers size={16} className="text-text-secondary" />
          <span className="text-sm font-semibold text-text-primary">Guests</span>
        </div>
        <div className="space-y-3">
          <GuestCounter
            label="Adults"
            value={guests.adults}
            min={1}
            max={cabin.maxGuests}
            onChange={(v) => setGuests({ adults: v })}
          />
          <GuestCounter
            label="Children"
            value={guests.children}
            min={0}
            max={Math.max(0, cabin.maxGuests - guests.adults)}
            onChange={(v) => setGuests({ children: v })}
          />
        </div>
      </div>

      {/* Price breakdown */}
      {pricing && (
        <div className="border border-border-light rounded-lg p-4 mb-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-text-secondary">
              <span>
                {formatCurrency(cabin.pricing.baseNight, cabin.pricing.currency)} × {pricing.nights}{" "}
                nights
              </span>
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
            <div className="border-t border-border-light pt-2 flex justify-between font-bold text-text-primary">
              <span>Total</span>
              <span>{formatCurrency(pricing.total, cabin.pricing.currency)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Continue button */}
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        disabled={!canContinue}
        onClick={() => setStep(2)}
      >
        Continue
      </Button>
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

function CalendarGrid({
  month,
  checkIn,
  checkOut,
  onDayClick,
}: {
  month: Date;
  checkIn: string | null;
  checkOut: string | null;
  onDayClick: (day: Date) => void;
}) {
  const today = startOfDay(new Date());
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  const days = eachDayOfInterval({ start: firstDay, end: lastDay });

  // Get the starting day of week (Monday = 0)
  let startDow = firstDay.getDay() - 1;
  if (startDow < 0) startDow = 6;

  const checkInDate = checkIn ? parseISO(checkIn) : null;
  const checkOutDate = checkOut ? parseISO(checkOut) : null;

  return (
    <div className="grid grid-cols-7 gap-1">
      {/* Empty cells for offset */}
      {Array.from({ length: startDow }).map((_, i) => (
        <div key={`empty-${i}`} />
      ))}

      {days.map((day) => {
        const isPast = isBefore(day, today);
        const isCheckIn = checkInDate && isSameDay(day, checkInDate);
        const isCheckOut = checkOutDate && isSameDay(day, checkOutDate);
        const isInRange =
          checkInDate && checkOutDate && isAfter(day, checkInDate) && isBefore(day, checkOutDate);

        return (
          <button
            key={day.toISOString()}
            disabled={isPast}
            onClick={() => onDayClick(day)}
            className={cn(
              "h-9 rounded-lg text-xs font-medium transition-all",
              isPast && "text-text-tertiary/40 cursor-not-allowed",
              !isPast && !isCheckIn && !isCheckOut && !isInRange && "text-text-primary hover:opacity-80",
              isCheckIn && "bg-text-primary text-white rounded-r-none",
              isCheckOut && "bg-text-primary text-white rounded-l-none",
              isInRange && "bg-bg-tertiary text-text-primary"
            )}
          >
            {format(day, "d")}
          </button>
        );
      })}
    </div>
  );
}
