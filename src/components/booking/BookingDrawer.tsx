import { Drawer } from "../ui/Drawer";
import { useBookingStore } from "../../stores/booking-store";
import { StepDates } from "./StepDates";
import { StepDetails } from "./StepDetails";
import { StepPayment } from "./StepPayment";
import { StepConfirmation } from "./StepConfirmation";
import type { Cabin } from "../../types/cabin";

interface BookingDrawerProps {
  cabin: Cabin;
}

const stepTitles: Record<number, string> = {
  1: "Select dates",
  2: "Your details",
  3: "Payment",
  4: "Confirmed!",
};

export function BookingDrawer({ cabin }: BookingDrawerProps) {
  const isOpen = useBookingStore((s) => s.isOpen);
  const step = useBookingStore((s) => s.step);
  const closeBooking = useBookingStore((s) => s.closeBooking);

  return (
    <Drawer isOpen={isOpen} onClose={closeBooking} title={stepTitles[step]}>
      {/* Step indicator */}
      {step < 4 && (
        <div className="px-6 pt-4">
          <div className="flex items-center gap-2 mb-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    s <= step ? "bg-text-primary" : "bg-bg-tertiary"
                  }`}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-text-tertiary mb-2">
            <span className={step >= 1 ? "text-text-primary font-semibold" : ""}>Dates</span>
            <span className={step >= 2 ? "text-text-primary font-semibold" : ""}>Details</span>
            <span className={step >= 3 ? "text-text-primary font-semibold" : ""}>Payment</span>
          </div>
        </div>
      )}

      {/* Step content */}
      {step === 1 && <StepDates cabin={cabin} />}
      {step === 2 && <StepDetails />}
      {step === 3 && <StepPayment cabin={cabin} />}
      {step === 4 && <StepConfirmation cabin={cabin} />}
    </Drawer>
  );
}
