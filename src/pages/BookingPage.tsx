import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useBookingStore } from "../stores/booking-store";
import { useAccentColor } from "../hooks/useAccentColor";
import { mockCabin } from "../data/mock-cabin";
import { BookingLayout } from "../components/booking/BookingLayout";
import { BookingStepDates } from "../components/booking/BookingStepDates";
import { BookingStepDetails } from "../components/booking/BookingStepDetails";
import { BookingStepPayment } from "../components/booking/BookingStepPayment";
import { BookingStepConfirmation } from "../components/booking/BookingStepConfirmation";
import { Button } from "../components/ui/Button";

const ACCENT_COLOR = "#010101";

export function BookingPage() {
  const cabin = mockCabin;
  useAccentColor(ACCENT_COLOR);
  const step = useBookingStore((s) => s.step);
  const setStep = useBookingStore((s) => s.setStep);
  const dates = useBookingStore((s) => s.dates);
  const guestDetails = useBookingStore((s) => s.guestDetails);
  const agreedToTerms = useBookingStore((s) => s.agreedToTerms);
  const openBooking = useBookingStore((s) => s.openBooking);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const promoId = searchParams.get("promo");
    const promo = promoId ? cabin.promos.find((p) => p.id === promoId) ?? null : null;
    openBooking(promo ?? undefined);
    if (promoId) setSearchParams({}, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasDates = !!(dates.checkIn && dates.checkOut);
  const canContinueStep2 =
    guestDetails.name.trim() !== "" &&
    guestDetails.email.trim() !== "" &&
    guestDetails.phone.trim() !== "" &&
    agreedToTerms;

  const showStickyBar = step === 1 || step === 2;
  const stickyBar = showStickyBar ? (
    <Button
      variant="primary"
      size="lg"
      className="w-full"
      disabled={step === 1 ? !hasDates : !canContinueStep2}
      onClick={() => setStep((step + 1) as 1 | 2 | 3 | 4)}
    >
      {step === 1 ? "Continue" : "Continue to payment"}
    </Button>
  ) : undefined;

  return (
    <BookingLayout cabin={cabin} stickyBar={stickyBar}>
      <motion.div
        key={step}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {step === 1 && <BookingStepDates cabin={cabin} />}
        {step === 2 && <BookingStepDetails cabin={cabin} />}
        {step === 3 && <BookingStepPayment cabin={cabin} />}
        {step === 4 && <BookingStepConfirmation cabin={cabin} />}
      </motion.div>
    </BookingLayout>
  );
}
