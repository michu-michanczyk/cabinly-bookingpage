import { Link, useNavigate } from "react-router-dom";
import { IconChevronLeft } from "../icons";
import { useBookingStore } from "../../stores/booking-store";
import { CabinlyFooter } from "../layout/CabinlyFooter";
import type { Cabin } from "../../types/cabin";

const TOTAL_STEPS = 5;

interface BookingLayoutProps {
  cabin: Cabin;
  children: React.ReactNode;
}

export function BookingLayout({ cabin, children }: BookingLayoutProps) {
  const step = useBookingStore((s) => s.step);
  const setStep = useBookingStore((s) => s.setStep);
  const showStepper = step !== 4;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      {/* Top bar — avatar only, exactly 80px height, 16px top+bottom padding, 48px centered avatar */}
      <header className="bg-bg-primary border-b border-border-light">
        <div className="flex items-center justify-center" style={{ height: 64, paddingTop: 8, paddingBottom: 8 }}>
          <img
            src={cabin.images[0].url}
            alt={cabin.images[0].alt}
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
      </header>

      {/* Stepper row — outside/below the top bar, aligned to content width */}
      {showStepper && (
        <div className="bg-bg-primary px-4 sm:px-6">
          <div className="max-w-[520px] mx-auto w-full pt-8 pb-4 flex items-center gap-14">
            <button
              onClick={() => step > 1 ? setStep(step - 1) : navigate("/")}
              className="text-text-secondary hover:text-text-primary transition-colors shrink-0 cursor-pointer"
            >
              <IconChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2.5 flex-1">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-[4px] rounded-full transition-all duration-300"
                  style={{
                    background:
                      i < step
                        ? "var(--color-text-primary)"
                        : "var(--color-border-light)",
                  }}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-text-primary shrink-0 tabular-nums">
              {step} / {TOTAL_STEPS}
            </span>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 px-4 sm:px-6">
        <div className="max-w-[520px] mx-auto w-full pt-4 pb-6">
          {children}
        </div>
      </main>

      {/* Trust banner — always 24px above footer */}
      <div className="px-4 sm:px-6 pb-6">
        <div
          className="max-w-[520px] mx-auto flex items-center gap-3 px-4 rounded-xl"
          style={{
            height: 68,
            border: "1px solid #ADDFB2",
            background: "#DDFFE0",
          }}
        >
          <span className="shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2.78001 10.2L5.80001 13.22C7.04001 14.46 9.05334 14.46 10.3 13.22L13.2267 10.2934C14.4667 9.05337 14.4667 7.04003 13.2267 5.79337L10.2 2.78003C9.56668 2.1467 8.69334 1.8067 7.80001 1.85337L4.46668 2.01337C3.13334 2.07337 2.07334 3.13337 2.00668 4.46003L1.84668 7.79337C1.80668 8.69337 2.14668 9.5667 2.78001 10.2Z" stroke="#158820" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.33317 8.00002C7.25364 8.00002 7.99984 7.25383 7.99984 6.33335C7.99984 5.41288 7.25364 4.66669 6.33317 4.66669C5.4127 4.66669 4.6665 5.41288 4.6665 6.33335C4.6665 7.25383 5.4127 8.00002 6.33317 8.00002Z" stroke="#158820" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </span>
          <div>
            <p className="text-sm font-semibold leading-tight" style={{ color: "var(--color-alert-positive)" }}>
              You're booking directly · 0% commission
            </p>
            <p className="text-sm leading-tight mt-0.5" style={{ color: "#6FAE75" }}>
              Best price guaranteed. Cheaper than OTA.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <CabinlyFooter />
      </footer>
    </div>
  );
}
