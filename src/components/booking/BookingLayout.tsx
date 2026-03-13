import { useNavigate } from "react-router-dom";
import { IconChevronLeft } from "../icons";
import { useBookingStore } from "../../stores/booking-store";
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
          <button onClick={() => navigate("/")} className="cursor-pointer">
            <img
              src={cabin.images[0].url}
              alt={cabin.images[0].alt}
              className="w-12 h-12 rounded-full object-cover"
            />
          </button>
        </div>
      </header>

      {/* Stepper row — outside/below the top bar, aligned to content width */}
      {showStepper && (
        <div className="bg-bg-primary px-4 sm:px-6">
          <div className="max-w-[520px] mx-auto w-full pt-8 pb-4 flex items-center gap-14">
            <button
              onClick={() => step > 1 ? setStep((step - 1) as 1 | 2 | 3 | 4) : navigate("/")}
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
        <div className="max-w-[520px] mx-auto w-full pt-4 pb-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 sm:px-6 py-5">
        <div className="max-w-[520px] mx-auto w-full flex items-center justify-center">
          <div className="flex items-center gap-1.5">
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
              <path d="M7.92675 0C9.97158 0 11.511 0.457909 13.1652 1.57963C10.1366 5.16654 10.1242 10.4113 13.1359 14.0124L13.2744 14.178C11.5053 15.4143 9.60402 15.9336 7.5362 15.842C3.0329 15.636 3.89762e-06 12.3852 0 7.78373C0 3.38826 3.44643 0 7.92675 0Z" fill="url(#booking-footer-grad)"/>
              <defs>
                <linearGradient id="booking-footer-grad" x1="6.63721" y1="0" x2="6.63721" y2="15.8523" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#34D399"/>
                  <stop offset="0.634615" stopColor="#3B82F6"/>
                  <stop offset="1" stopColor="#17179A"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="text-sm font-medium text-text-primary">Cabinly</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
