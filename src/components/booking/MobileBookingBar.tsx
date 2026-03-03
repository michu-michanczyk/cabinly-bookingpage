import { Button } from "../ui/Button";
import { IconStar } from "../icons";
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
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-border-light px-4 py-3 sm:hidden">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-bold text-text-primary">
            {formatCurrency(cabin.pricing.baseNight, cabin.pricing.currency)}
            <span className="text-xs font-normal text-text-secondary"> / night</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-text-secondary">
            <IconStar size={10} className="text-text-primary" />
            <span>{cabin.rating.score}</span>
            <span className="text-text-tertiary">· {cabin.rating.count} reviews</span>
          </div>
        </div>
        <Button variant="primary" size="md" onClick={() => openBooking()}>
          Book a stay
        </Button>
      </div>
    </div>
  );
}
