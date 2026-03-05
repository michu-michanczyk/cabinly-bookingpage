import { Button } from "../ui/Button";
import { useBookingStore } from "../../stores/booking-store";
import { formatCurrency } from "../../lib/utils";
import type { Cabin } from "../../types/cabin";

interface MobileBookingBarProps {
  cabin: Cabin;
}

export function MobileBookingBar({ cabin }: MobileBookingBarProps) {
  const openBooking = useBookingStore((s) => s.openBooking);
  const isOpen = useBookingStore((s) => s.isOpen);

  if (isOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-bg-primary border-t border-border-light px-4 py-3 md:hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-medium text-text-secondary">Start from</span>
          <span className="text-sm font-medium text-text-primary">
            {formatCurrency(cabin.pricing.baseNight, cabin.pricing.currency)}
          </span>
          <span className="text-sm font-medium text-text-secondary">/ night</span>
        </div>
        <Button variant="primary" size="md" onClick={() => openBooking()}>
          Book a stay
        </Button>
      </div>
    </div>
  );
}
