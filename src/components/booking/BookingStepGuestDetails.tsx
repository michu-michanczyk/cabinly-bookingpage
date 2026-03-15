import { useState } from "react";
import { useBookingStore } from "../../stores/booking-store";
import { formatCurrency, cn } from "../../lib/utils";
import { calcExtrasTotal } from "../../data/extras";
import { Button } from "../ui/Button";
import { StickyButtonWrapper } from "./StickyButtonWrapper";
import type { Cabin } from "../../types/cabin";

interface BookingStepGuestDetailsProps {
  cabin: Cabin;
}

function IconLock({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6.66665V5.33331C4 3.12665 4.66667 1.33331 8 1.33331C11.3333 1.33331 12 3.12665 12 5.33331V6.66665" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 12.3333C8.92048 12.3333 9.66667 11.5871 9.66667 10.6667C9.66667 9.74619 8.92048 9 8 9C7.07953 9 6.33333 9.74619 6.33333 10.6667C6.33333 11.5871 7.07953 12.3333 8 12.3333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.3333 14.6667H4.66667C2 14.6667 1.33333 14 1.33333 11.3334V10C1.33333 7.33335 2 6.66669 4.66667 6.66669H11.3333C14 6.66669 14.6667 7.33335 14.6667 10V11.3334C14.6667 14 14 14.6667 11.3333 14.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function BookingStepGuestDetails({ cabin }: BookingStepGuestDetailsProps) {
  const guestDetails = useBookingStore((s) => s.guestDetails);
  const setGuestDetails = useBookingStore((s) => s.setGuestDetails);
  const pricing = useBookingStore((s) => s.pricing);
  const guests = useBookingStore((s) => s.guests);
  const selectedExtras = useBookingStore((s) => s.selectedExtras);
  const setStep = useBookingStore((s) => s.setStep);

  const [firstName, setFirstName] = useState(() => guestDetails.name.split(" ")[0] ?? "");
  const [lastName, setLastName] = useState(() => guestDetails.name.split(" ").slice(1).join(" "));

  const totalGuests = guests.adults + guests.children + guests.babies + guests.pets;
  const extrasTotal = calcExtrasTotal(selectedExtras);
  const canContinue = firstName.trim() && guestDetails.email.trim() && guestDetails.phone.trim();

  const inputClass = cn(
    "w-full h-9 rounded-lg border border-border-default px-3 text-sm text-text-primary placeholder:text-text-secondary outline-none transition-colors",
    "hover:border-border-hover focus:border-text-primary focus:ring-3 focus:ring-border-light"
  );

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-medium text-text-primary">Your personal details</h1>

      <div className="space-y-4">
        {/* Name + Last name row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setGuestDetails({ name: [e.target.value, lastName].filter(Boolean).join(" ") });
              }}
              placeholder="Jan"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Last name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setGuestDetails({ name: [firstName, e.target.value].filter(Boolean).join(" ") });
              }}
              placeholder="Kowalski"
              className={inputClass}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">Email</label>
          <input
            type="email"
            value={guestDetails.email}
            onChange={(e) => setGuestDetails({ email: e.target.value })}
            placeholder="jan@example.com"
            className={inputClass}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">Phone number</label>
          <input
            type="tel"
            value={guestDetails.phone}
            onChange={(e) => setGuestDetails({ phone: e.target.value })}
            placeholder="+48 123 456 789"
            className={inputClass}
          />
        </div>

        {/* Requests */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Requests to host <span className="text-text-secondary font-normal">(optional)</span>
          </label>
          <textarea
            value={guestDetails.requests}
            onChange={(e) => setGuestDetails({ requests: e.target.value })}
            placeholder="i.e. time of arrival, special wishes"
            rows={3}
            className={cn(inputClass, "h-auto py-2 resize-none")}
          />
        </div>
      </div>

      {/* Privacy note + divider */}
      <div>
        <div className="flex items-center justify-center gap-2 text-sm text-text-primary pb-6">
          <IconLock size={16} />
          <span>You data are safe and will not shared with third-parties.</span>
        </div>
        <div className="h-px bg-border-light" />
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-secondary">
          {pricing ? `${pricing.nights} night${pricing.nights !== 1 ? "s" : ""} · ` : ""}
          {totalGuests} guest{totalGuests !== 1 ? "s" : ""}{extrasTotal > 0 ? " + extras" : ""}
        </span>
        <span className="text-base font-medium text-text-primary">
          {pricing ? formatCurrency(pricing.total + extrasTotal, cabin.pricing.currency) : ""}
        </span>
      </div>

      <StickyButtonWrapper>
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          disabled={!canContinue}
          onClick={() => setStep(5)}
        >
          Continue
        </Button>
      </StickyButtonWrapper>
    </div>
  );
}
