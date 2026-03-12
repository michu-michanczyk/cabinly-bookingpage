import { useBookingStore } from "../../stores/booking-store";
import { formatCurrency } from "../../lib/utils";
import { format, parseISO } from "date-fns";
import type { Promo } from "../../types/cabin";

interface PromoStaysProps {
  promos: Promo[];
  currency: string;
}

function IconFlashSvg({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.05999 8.85333H6.11999V13.6533C6.11999 14.7733 6.72665 15 7.46665 14.16L12.5133 8.42666C13.1333 7.72666 12.8733 7.14666 11.9333 7.14666H9.87332V2.34666C9.87332 1.22666 9.26665 0.999998 8.52665 1.84L3.47999 7.57333C2.86665 8.28 3.12665 8.85333 4.05999 8.85333Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PromoStays({ promos, currency }: PromoStaysProps) {
  const openBooking = useBookingStore((s) => s.openBooking);

  if (promos.length === 0) return null;

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 sm:py-14 border-t border-border-light">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-text-primary"><IconFlashSvg size={16} /></span>
        <span className="text-base font-medium text-text-primary">Special offers</span>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-2">
        {promos.map((promo) => (
          <PromoCard
            key={promo.id}
            promo={promo}
            currency={currency}
            onBook={() => openBooking(promo)}
          />
        ))}
      </div>
    </section>
  );
}

function PromoCard({
  promo,
  currency,
  onBook,
}: {
  promo: Promo;
  currency: string;
  onBook: () => void;
}) {
  const nights = Math.round(
    (new Date(promo.dates.end).getTime() - new Date(promo.dates.start).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const perNight = Math.round(promo.dealPrice / nights);

  return (
    <button
      onClick={onBook}
      style={{ borderColor: "var(--color-border-default)" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-border-dark)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-border-default)"; }}
      className="w-full text-left rounded-xl px-4 py-4 flex flex-col justify-center transition-all cursor-pointer border bg-bg-primary"
    >
      {/* Top row: date + badge | strikethrough price */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-sm font-medium text-text-primary whitespace-nowrap">
            {format(parseISO(promo.dates.start), "d MMM")} - {format(parseISO(promo.dates.end), "d MMM")}
          </span>
          <span className="shrink-0"><PromoBadge badge={promo.badge} /></span>
        </div>
        <span className="text-sm text-text-secondary line-through shrink-0">
          {formatCurrency(promo.originalPrice, currency)}
        </span>
      </div>

      {/* Middle row: title · N nights | deal price/night */}
      <div className="flex items-center justify-between gap-4 mt-1">
        <span className="text-sm text-text-secondary truncate [text-overflow:clip]">
          {promo.title} · {nights} night{nights !== 1 ? "s" : ""}
        </span>
        <span className="text-sm font-medium text-text-primary shrink-0">
          {formatCurrency(perNight, currency)}
          <span className="font-medium text-text-primary"> / night</span>
        </span>
      </div>

      {/* Description row */}
      <p className="text-xs text-text-secondary mt-1.5 truncate [text-overflow:clip]">{promo.description}</p>
    </button>
  );
}

function PromoBadge({ badge }: { badge: string }) {
  const isPercent = badge.includes("%");
  const isFor = badge.toLowerCase().includes("for");
  const isSeasonal = badge.toLowerCase().includes("seasonal");

  if (isPercent) {
    return (
      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[12px] font-semibold" style={{ background: "#FFE4D0", color: "#FF8427" }}>
        {badge}
      </span>
    );
  }
  if (isFor) {
    return (
      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[12px] font-semibold" style={{ background: "#FFEDED", color: "#E53E3E" }}>
        {badge}
      </span>
    );
  }
  if (isSeasonal) {
    return (
      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[12px] font-semibold" style={{ background: "#E3EEFC", color: "#0C3B7C" }}>
        {badge}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[12px] font-semibold" style={{ background: "#FFE4D0", color: "#FF8427" }}>
      {badge}
    </span>
  );
}
