import { motion } from "framer-motion";
import { IconTick, IconCalendar, IconUsers, IconExternal } from "../icons";
import { Button } from "../ui/Button";
import { useBookingStore } from "../../stores/booking-store";
import { formatDateRange, formatCurrency } from "../../lib/utils";
import type { Cabin } from "../../types/cabin";

interface StepConfirmationProps {
  cabin: Cabin;
}

export function StepConfirmation({ cabin }: StepConfirmationProps) {
  const dates = useBookingStore((s) => s.dates);
  const guests = useBookingStore((s) => s.guests);
  const guestDetails = useBookingStore((s) => s.guestDetails);
  const pricing = useBookingStore((s) => s.pricing);
  const closeBooking = useBookingStore((s) => s.closeBooking);
  const reset = useBookingStore((s) => s.reset);

  const bookingRef = `CB-${Date.now().toString(36).toUpperCase()}`;

  const handleDone = () => {
    closeBooking();
    setTimeout(() => reset(), 300);
  };

  if (!dates.checkIn || !dates.checkOut || !pricing) return null;

  return (
    <div className="px-6 pb-6 text-center">
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-text-primary flex items-center justify-center mx-auto mb-6 mt-4"
      >
        <IconTick size={36} className="text-white" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-2xl font-bold text-text-primary mb-2">Booking confirmed!</h3>
        <p className="text-sm text-text-secondary mb-6">
          A confirmation email has been sent to {guestDetails.email}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-bg-tertiary rounded-lg p-5 mb-6 text-left"
      >
        <div className="text-xs text-text-tertiary mb-1">Booking reference</div>
        <div className="text-lg font-bold text-text-primary mb-4 font-mono">{bookingRef}</div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3 text-text-secondary">
            <IconCalendar size={14} className="text-text-tertiary" />
            <span>{formatDateRange(dates.checkIn, dates.checkOut)}</span>
          </div>
          <div className="flex items-center gap-3 text-text-secondary">
            <IconUsers size={14} className="text-text-tertiary" />
            <span>
              {guests.adults + guests.children} guest{guests.adults + guests.children > 1 ? "s" : ""}
            </span>
          </div>
          <div className="pt-3 border-t border-border-light flex justify-between items-center">
            <span className="font-semibold text-text-primary">Total paid</span>
            <span className="font-bold text-text-primary">
              {formatCurrency(pricing.total, cabin.pricing.currency)}
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="space-y-3"
      >
        <Button variant="primary" size="lg" className="w-full" onClick={handleDone}>
          Done
        </Button>
        <button className="flex items-center justify-center gap-1 text-sm text-text-secondary hover:opacity-80 transition-opacity mx-auto">
          <IconExternal size={12} />
          Add to calendar
        </button>
      </motion.div>
    </div>
  );
}
