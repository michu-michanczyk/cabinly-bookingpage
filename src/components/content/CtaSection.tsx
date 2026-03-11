import { Link } from "react-router-dom";
import type { Cabin } from "../../types/cabin";
import { useBookingStore } from "../../stores/booking-store";

interface CtaSectionProps {
  cabin: Cabin;
}

export function CtaSection({ cabin }: CtaSectionProps) {
  const openBooking = useBookingStore((s) => s.openBooking);

  return (
    <section className="w-full bg-accent" style={{ padding: "40px" }}>
      <div className="max-w-[1440px] mx-auto flex flex-col gap-10">
        {/* Main content: centered */}
        <div
          className="flex flex-col items-center justify-center gap-6 rounded-2xl"
          style={{ minHeight: "500px", padding: "80px 40px" }}
        >
          {/* AI sparkle icons */}
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.45411 0.649849C7.63419 0.21445 8.3057 0.199515 8.50786 0.627418C9.10674 1.89509 10.1251 3.80759 11.2667 4.91499C12.3684 5.98372 14.242 6.93999 15.4388 7.48633C15.8491 7.67367 15.8655 8.2905 15.4655 8.49453C14.2155 9.13223 12.1922 10.2719 11.0334 11.4913C10.0175 12.5601 9.05411 14.3339 8.49504 15.4656C8.29882 15.8629 7.69686 15.8594 7.50031 15.46C6.94153 14.3245 5.9791 12.5465 4.96225 11.4732C3.81631 10.2636 1.82956 9.13434 0.563003 8.48487C0.150852 8.27352 0.17701 7.62892 0.603596 7.45391C1.87284 6.9332 3.82937 6.01146 4.94261 4.89611C6.02867 3.80799 6.9304 1.91615 7.45411 0.649849Z" fill="currentColor" className="text-accent-fg opacity-60"/>
              </svg>
            ))}
          </div>

          {/* Heading */}
          <h2
            className="font-medium text-accent-fg text-center"
            style={{ fontSize: "48px", lineHeight: "56px" }}
          >
            Reserve your<br />magic time now
          </h2>

          {/* Subtext */}
          <p
            className="text-accent-fg text-center font-normal opacity-60"
            style={{ fontSize: "16px", lineHeight: "28px", maxWidth: "440px" }}
          >
            Booking with {cabin.title} means more than just selecting dates — it's about tailoring every detail to suit your stay.
          </p>

          {/* Button */}
          <button
            onClick={() => openBooking()}
            className="h-12 px-6 rounded-lg bg-accent-fg text-accent text-base font-semibold hover:opacity-80 transition-opacity cursor-pointer"
          >
            Book a stay
          </button>
        </div>

        {/* Footer rows */}
        <div className="flex flex-col gap-6 pt-6" style={{ borderTop: "1px solid color-mix(in srgb, var(--color-accent-fg) 15%, transparent)" }}>
          {/* Contact row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Instagram" className="text-accent-fg opacity-40 hover:opacity-100 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="text-accent-fg opacity-40 hover:opacity-100 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            <p className="text-accent-fg opacity-60" style={{ fontSize: "16px", lineHeight: "28px" }}>
              Contact us&nbsp;&nbsp;—&nbsp;&nbsp;
              <a href="mailto:magda@drugidom.co.pl" className="opacity-100 hover:opacity-80 transition-opacity">
                magda@drugidom.co.pl
              </a>
              &nbsp;&nbsp;—&nbsp;&nbsp;
              <a href="tel:+48509799278" className="opacity-100 hover:opacity-80 transition-opacity">
                +48 509 799 278
              </a>
            </p>
          </div>

          {/* Copyright row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span className="text-accent-fg opacity-60" style={{ fontSize: "16px", lineHeight: "28px" }}>
              © 2026 All rights reserved.
            </span>
            <div className="flex items-center gap-6">
              <Link to="/terms" className="text-accent-fg opacity-60 hover:opacity-100 transition-opacity" style={{ fontSize: "16px", lineHeight: "28px" }}>
                Terms &amp; Conditions
              </Link>
              <Link to="/privacy" className="text-accent-fg opacity-60 hover:opacity-100 transition-opacity" style={{ fontSize: "16px", lineHeight: "28px" }}>
                Privacy policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
