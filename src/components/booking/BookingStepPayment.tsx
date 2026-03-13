import { useBookingStore } from "../../stores/booking-store";
import { formatCurrency, cn } from "../../lib/utils";
import { Button } from "../ui/Button";
import { StickyButtonWrapper } from "./StickyButtonWrapper";
import type { Cabin } from "../../types/cabin";

interface BookingStepPaymentProps {
  cabin: Cabin;
}

interface Extra {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  icon: React.ReactNode;
}

function IconSauna({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M15.5 13H8.5C7.395 13 6.5 12.105 6.5 11V9C6.5 7.895 7.395 7 8.5 7H15.5C16.605 7 17.5 7.895 17.5 9V11C17.5 12.105 16.605 13 15.5 13Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M18 21H6C4.343 21 3 19.657 3 18V6C3 4.343 4.343 3 6 3H18C19.657 3 21 4.343 21 6V18C21 19.657 19.657 21 18 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconJacuzzi({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M14.5268 9.12H11.4738C10.7908 9.12 10.3088 8.451 10.5248 7.804V7.804C10.8598 6.798 11.8008 6.12 12.8608 6.12H13.1388C14.1988 6.12 15.1398 6.798 15.4748 7.804V7.804C15.6908 8.451 15.2088 9.12 14.5268 9.12V9.12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.99278 13.263H3.99978C3.38578 13.263 2.91678 13.811 3.01178 14.417L3.35578 16.617C3.65978 18.565 5.33678 20 7.30778 20H16.6918C18.6628 20 20.3398 18.565 20.6438 16.618L20.9878 14.418C21.0828 13.812 20.6138 13.264 19.9998 13.264H12.2628" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 6.12V6C13 4.343 14.343 3 16 3V3C17.657 3 19 4.343 19 6V13.263" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.158 17.263H9.105C7.943 17.263 7 16.321 7 15.158V13.153C7 12.516 7.516 12 8.153 12H11.11C11.747 12 12.263 12.516 12.263 13.153V15.158C12.263 16.321 11.321 17.263 10.158 17.263Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.04 19.8L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 21L17.96 19.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconCheckout({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M7.99994 21V21C9.10794 21 10.0069 20.102 10.0079 18.994L10.0119 14.95C10.9759 14.528 11.8469 13.822 12.4229 12.716C13.3369 10.962 13.1619 8.758 11.9189 7.22C9.88894 4.709 6.09094 4.715 4.06994 7.238C2.83294 8.781 2.66394 10.986 3.58694 12.735C4.16494 13.831 5.03394 14.535 5.99594 14.954L5.99194 18.989C5.99094 20.099 6.88994 21 7.99994 21V21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.273 10.346C8.273 10.183 8.141 10.052 7.979 10.052C7.816 10.053 7.685 10.185 7.685 10.347C7.685 10.51 7.817 10.641 7.979 10.641C8.141 10.641 8.273 10.509 8.273 10.346" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.263 5.632C13.263 4.178 12.085 3 10.631 3V3C9.178 3 8 4.178 8 5.632V10.052" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.3979 6.666L11.8479 6.216C12.6289 5.435 13.8949 5.435 14.6759 6.216L20.4129 11.953C21.1939 12.734 21.1939 14 20.4129 14.781L17.7659 17.428C16.9849 18.209 15.7189 18.209 14.9379 17.428L11.4849 13.975" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconFireplace({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_fireplace)">
        <path d="M3 21V3H21V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 6.00001H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 3.00001H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17.5 21V11.1C13.98 9.63333 10.02 9.63333 6.5 11.1V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M10.1237 20.107V20.107C9.29211 19.1121 9.29211 17.6646 10.1237 16.6697L11.2328 15.3428C11.4228 15.1155 11.7038 14.9842 12 14.9842C12.2962 14.9842 12.5772 15.1155 12.7672 15.3428L13.8763 16.6697C14.7079 17.6646 14.7079 19.1121 13.8763 20.107V20.107C13.4117 20.6629 12.7245 20.9841 12 20.9841C11.2755 20.9841 10.5883 20.6629 10.1237 20.107Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 21H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip0_fireplace">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}

const EXTRAS: Extra[] = [
  {
    id: "sauna",
    title: "Private sauna",
    subtitle: "Exclusive use for your group",
    price: 280,
    icon: <IconSauna size={24} />,
  },
  {
    id: "hottub",
    title: "Hot tube on terrace",
    subtitle: "Heated outdoor hot tub",
    price: 200,
    icon: <IconJacuzzi size={24} />,
  },
  {
    id: "late-checkout",
    title: "Late check-out",
    subtitle: "Check out until 2 PM",
    price: 100,
    icon: <IconCheckout size={24} />,
  },
  {
    id: "firewood",
    title: "Additional fireplace wood",
    subtitle: "Extra bundle of firewood",
    price: 150,
    icon: <IconFireplace size={24} />,
  },
];

export function BookingStepPayment({ cabin }: BookingStepPaymentProps) {
  const pricing = useBookingStore((s) => s.pricing);
  const guests = useBookingStore((s) => s.guests);
  const selectedExtras = useBookingStore((s) => s.selectedExtras);
  const toggleExtra = useBookingStore((s) => s.toggleExtra);
  const setStep = useBookingStore((s) => s.setStep);

  const extrasTotal = EXTRAS.filter((e) => selectedExtras.includes(e.id)).reduce((sum, e) => sum + e.price, 0);
  const total = (pricing?.total ?? 0) + extrasTotal;
  const totalGuests = guests.adults + guests.children;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium text-text-primary">Additional services</h1>
        <span className="text-sm text-text-secondary">Improve your experience - optional</span>
      </div>

      <div className="space-y-2">
        {EXTRAS.map((extra) => {
          const isSelected = selectedExtras.includes(extra.id);
          return (
            <button
              key={extra.id}
              onClick={() => toggleExtra(extra.id)}
              style={{ minHeight: 75 }}
              className={cn(
                "w-full text-left rounded-2xl px-4 py-4 flex items-center gap-3 transition-colors cursor-pointer border overflow-hidden",
                isSelected
                  ? "bg-bg-secondary border-text-primary"
                  : "bg-bg-primary border-border-default hover:border-border-hover"
              )}
            >
              <span className="shrink-0 text-text-primary">{extra.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary">{extra.title}</p>
                <p className="text-sm text-text-secondary">{extra.subtitle}</p>
              </div>
              <span className="text-sm font-medium text-text-primary shrink-0">
                +{formatCurrency(extra.price, cabin.pricing.currency)}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-text-secondary">
          {pricing ? `${pricing.nights} night${pricing.nights !== 1 ? "s" : ""}` : "No dates selected"}
          {" · "}
          {totalGuests} guest{totalGuests !== 1 ? "s" : ""}
          {extrasTotal > 0 ? " + extras" : ""}
        </span>
        <span className="text-base font-medium text-text-primary">
          {formatCurrency(total, cabin.pricing.currency)}
        </span>
      </div>

      <StickyButtonWrapper>
        <Button variant="primary" size="lg" className="w-full" onClick={() => setStep(4)}>
          Continue
        </Button>
      </StickyButtonWrapper>
    </div>
  );
}
