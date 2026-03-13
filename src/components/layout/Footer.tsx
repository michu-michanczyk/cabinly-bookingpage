import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="w-full bg-accent">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-8 pb-16 md:pb-8 flex flex-col gap-6">
        {/* Top row: socials left, contact right */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Facebook" className="opacity-60 hover:opacity-100 transition-opacity">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="16" fill="#1877F2"/>
                <path d="M20 8H17.5C16.3065 8 15.1619 8.47411 14.318 9.31802C13.4741 10.1619 13 11.3065 13 12.5V15H10.5V18.5H13V26H16.5V18.5H19L20 15H16.5V12.5C16.5 12.2348 16.6054 11.9804 16.7929 11.7929C16.9804 11.6054 17.2348 11.5 17.5 11.5H20V8Z" fill="white"/>
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="opacity-60 hover:opacity-100 transition-opacity">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="16" fill="url(#ig-gradient)"/>
                <rect x="9" y="9" width="14" height="14" rx="4" stroke="white" strokeWidth="1.5"/>
                <circle cx="16" cy="16" r="3.5" stroke="white" strokeWidth="1.5"/>
                <circle cx="20.5" cy="11.5" r="1" fill="white"/>
                <defs>
                  <linearGradient id="ig-gradient" x1="0" y1="32" x2="32" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F9CE34"/>
                    <stop offset="0.4" stopColor="#EE2A7B"/>
                    <stop offset="1" stopColor="#6228D7"/>
                  </linearGradient>
                </defs>
              </svg>
            </a>
          </div>

          {/* Contact info */}
          <p className="text-sm sm:text-base">
            <span className="text-accent-fg font-medium">Contact us</span>
            <span className="mx-3 text-accent-fg opacity-30">-</span>
            <a href="mailto:magda@drugidom.co.pl" className="text-accent-fg opacity-60 hover:opacity-100 transition-opacity">
              magda@drugidom.co.pl
            </a>
            <span className="mx-3 text-accent-fg opacity-30">-</span>
            <a href="tel:+48509799278" className="text-accent-fg opacity-60 hover:opacity-100 transition-opacity">
              +48 509 799 278
            </a>
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px" style={{ backgroundColor: "color-mix(in srgb, var(--color-accent-fg) 15%, transparent)" }} />

        {/* Bottom row: copyright left, legal right */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-accent-fg opacity-40 text-sm sm:text-base">© 2026 All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link to="/terms" className="text-accent-fg opacity-60 hover:opacity-100 transition-opacity text-sm sm:text-base">
              Terms &amp; Conditions
            </Link>
            <Link to="/privacy" className="text-accent-fg opacity-60 hover:opacity-100 transition-opacity text-sm sm:text-base">
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
