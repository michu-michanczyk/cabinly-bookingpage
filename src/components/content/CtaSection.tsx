import { useNavigate } from "react-router-dom";
import type { Cabin } from "../../types/cabin";

interface CtaSectionProps {
  cabin: Cabin;
}

export function CtaSection({ cabin }: CtaSectionProps) {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-accent">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 flex flex-col gap-10">
        {/* Main content: centered */}
        <div
          className="flex flex-col items-center justify-center gap-6 rounded-2xl"
          style={{ minHeight: "clamp(300px, 50vw, 500px)", padding: "clamp(40px, 8vw, 80px) clamp(16px, 5vw, 40px)" }}
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
            style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)", lineHeight: "1.2" }}
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
            onClick={() => navigate("/book")}
            className="h-12 px-6 rounded-lg bg-accent-fg text-accent text-base font-semibold hover:opacity-80 transition-opacity cursor-pointer"
          >
            Book a stay
          </button>
        </div>

      </div>
    </section>
  );
}
