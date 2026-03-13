import { useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useBookingStore } from "../stores/booking-store";
import { useAccentColor } from "../hooks/useAccentColor";
import { mockCabin } from "../data/mock-cabin";
import { BookingLayout } from "../components/booking/BookingLayout";
import { BookingStepDates } from "../components/booking/BookingStepDates";
import { BookingStepDetails } from "../components/booking/BookingStepDetails";
import { BookingStepPayment } from "../components/booking/BookingStepPayment";
import { BookingStepGuestDetails } from "../components/booking/BookingStepGuestDetails";
import { BookingStepConfirmation } from "../components/booking/BookingStepConfirmation";

const ACCENT_COLOR = "#010101";

const STEP_SLUGS: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "dates",
  2: "guests",
  3: "extras",
  4: "details",
  5: "confirmation",
};

const SLUG_TO_STEP: Record<string, 1 | 2 | 3 | 4 | 5> = {
  dates: 1,
  guests: 2,
  extras: 3,
  details: 4,
  confirmation: 5,
};

export function BookingPage() {
  const cabin = mockCabin;
  useAccentColor(ACCENT_COLOR);
  const step = useBookingStore((s) => s.step);
  const setStep = useBookingStore((s) => s.setStep);
  const openBooking = useBookingStore((s) => s.openBooking);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // On mount: initialise booking, derive step from current path slug
  useEffect(() => {
    const promoId = searchParams.get("promo");
    const promo = promoId ? cabin.promos.find((p) => p.id === promoId) ?? null : null;
    openBooking(promo ?? undefined);
    const slug = location.pathname.split("/").pop() ?? "";
    const stepFromSlug = SLUG_TO_STEP[slug];
    if (stepFromSlug) setStep(stepFromSlug as 1 | 2 | 3 | 4 | 5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep URL in sync whenever step changes
  useEffect(() => {
    navigate(`/book/${STEP_SLUGS[step]}`, { replace: true });
  }, [step, navigate]);

  return (
    <BookingLayout cabin={cabin}>
      <motion.div
        key={step}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {step === 1 && <BookingStepDates cabin={cabin} />}
        {step === 2 && <BookingStepDetails cabin={cabin} />}
        {step === 3 && <BookingStepPayment cabin={cabin} />}
        {step === 4 && <BookingStepGuestDetails cabin={cabin} />}
        {step === 5 && <BookingStepConfirmation cabin={cabin} />}
      </motion.div>
    </BookingLayout>
  );
}
