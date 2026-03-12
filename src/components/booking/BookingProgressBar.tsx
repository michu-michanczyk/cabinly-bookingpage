import { cn } from "../../lib/utils";

interface BookingProgressBarProps {
  step: 1 | 2 | 3 | 4;
}

const SEGMENTS = [
  { label: "Dates", step: 1 },
  { label: "Details", step: 2 },
  { label: "Payment", step: 3 },
];

export function BookingProgressBar({ step }: BookingProgressBarProps) {
  if (step === 4) return null;

  return (
    <div className="px-4 pt-4 pb-2">
      <div className="flex items-center gap-2 mb-2">
        {SEGMENTS.map((seg) => (
          <div key={seg.step} className="flex-1">
            <div
              className={cn(
                "h-1 rounded-full transition-colors",
                seg.step <= step ? "bg-accent" : "bg-bg-tertiary"
              )}
            />
          </div>
        ))}
      </div>
      <div className="hidden sm:flex justify-between">
        {SEGMENTS.map((seg) => (
          <span
            key={seg.step}
            className={cn(
              "text-[10px] transition-colors",
              seg.step <= step ? "text-text-primary font-semibold" : "text-text-tertiary"
            )}
          >
            {seg.label}
          </span>
        ))}
      </div>
    </div>
  );
}
