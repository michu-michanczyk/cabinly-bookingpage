import { Button } from "../ui/Button";
import { StickyButtonWrapper } from "./StickyButtonWrapper";
import { IconAdd, IconMinus } from "../icons";
import { useBookingStore } from "../../stores/booking-store";
import { formatCurrency, cn } from "../../lib/utils";
import type { Cabin } from "../../types/cabin";

interface BookingStepDetailsProps {
  cabin: Cabin;
}

function IconAdults() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7.99832" cy="8.50854" r="3.49145" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="17.0021" cy="9.49897" r="2.50104" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1.99582 20.0033V18.9859C1.99582 16.785 3.77956 15.0012 5.98048 15.0012H10.0162C12.2171 15.0012 14.0008 16.785 14.0008 18.9859V20.0033" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.0021 15.0012H18.1045C20.3055 15.0012 22.0892 16.785 22.0892 18.9859V20.0033" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconChildren() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.0802 8.58003V15.42C21.0802 16.54 20.4802 17.58 19.5102 18.15L13.5702 21.58C12.6002 22.14 11.4002 22.14 10.4202 21.58L4.48016 18.15C3.51016 17.59 2.91016 16.55 2.91016 15.42V8.58003C2.91016 7.46003 3.51016 6.41999 4.48016 5.84999L10.4202 2.42C11.3902 1.86 12.5902 1.86 13.5702 2.42L19.5102 5.84999C20.4802 6.41999 21.0802 7.45003 21.0802 8.58003Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.9999 11C13.2867 11 14.3299 9.95681 14.3299 8.66998C14.3299 7.38316 13.2867 6.34003 11.9999 6.34003C10.7131 6.34003 9.66992 7.38316 9.66992 8.66998C9.66992 9.95681 10.7131 11 11.9999 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 16.66C16 14.86 14.21 13.4 12 13.4C9.79 13.4 8 14.86 8 16.66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconBaby() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.8906 11.994C15.6113 12.3579 15.1818 12.5754 14.7231 12.5852C14.2654 12.5727 13.8374 12.3557 13.5566 11.994" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.4433 11.994C10.1642 12.3577 9.7352 12.5751 9.27686 12.5852C8.81882 12.5728 8.39042 12.3559 8.10938 11.994" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M11.9998 21.4779C15.7555 21.476 19.0457 18.9617 20.0341 15.3384C21.1539 15.2141 22.0011 14.2676 22.0011 13.141C22.0011 12.0143 21.1539 11.0679 20.0341 10.9436C19.0478 7.31873 15.7564 4.80326 11.9998 4.80326C8.24317 4.80326 4.95178 7.31873 3.96545 10.9436C2.8457 11.0679 1.99854 12.0143 1.99854 13.141C1.99854 14.2676 2.8457 15.2141 3.96545 15.3384C4.95387 18.9617 8.24408 21.476 11.9998 21.4779Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.2227 16.1487C12.949 17.2599 11.0505 17.2599 9.77686 16.1487" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.71777 2.52205C10.323 2.52205 10.9034 2.76247 11.3314 3.19042C11.7593 3.61837 11.9997 4.19879 11.9997 4.804" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 4.804C12 4.19879 12.2404 3.61837 12.6684 3.19042C13.0963 2.76247 13.6767 2.52205 14.282 2.52205" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconPets() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M11.9998 13.6674V13.6674C11.7235 13.6674 11.4996 13.4434 11.4996 13.1672V13.1672C11.4996 13.0751 11.5742 13.0004 11.6663 13.0004H12.3333C12.4254 13.0004 12.5 13.0751 12.5 13.1672V13.1672C12.5 13.4434 12.276 13.6674 11.9998 13.6674Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.0026 13.0004C18.0026 13.5529 18.4505 14.0008 19.003 14.0008V14.0008C20.108 14.0008 21.0038 13.105 21.0038 12V8.99875C21.0038 7.3412 19.6601 5.9975 18.0026 5.9975H17.5854" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.04924 17.8487L6.99756 21.0037" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15.9502 17.8487L17.0019 21.0037" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.41452 5.9975H5.99734C4.3398 5.9975 2.99609 7.3412 2.99609 8.99875V12C2.99609 13.105 3.8919 14.0008 4.99693 14.0008V14.0008C5.54944 14.0008 5.99734 13.5529 5.99734 13.0004" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.0007 17.8315V18.5027C14.0007 19.3315 13.3288 20.0033 12.5001 20.0033H11.4996C10.6709 20.0033 9.99902 19.3315 9.99902 18.5027V17.8311" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M12.0001 13.6674V15.0013C12.0001 16.6588 10.6564 18.0025 8.99881 18.0025V18.0025C7.34126 18.0025 5.99756 16.6588 5.99756 15.0013V7.99833C5.99756 5.23576 8.23707 2.99625 10.9996 2.99625H13.0005C15.763 2.99625 18.0026 5.23576 18.0026 7.99833V15.0013C18.0026 16.6588 16.6589 18.0025 15.0013 18.0025V18.0025C13.3438 18.0025 12.0001 16.6588 12.0001 15.0013V13.6674Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.2508 9.49928C14.2506 9.63732 14.1386 9.74912 14.0006 9.74906C13.8625 9.749 13.7507 9.63711 13.7506 9.49906C13.7505 9.36102 13.8623 9.24903 14.0004 9.24885C14.0668 9.24877 14.1306 9.27512 14.1775 9.32211C14.2245 9.36909 14.2509 9.43283 14.2508 9.49928" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.2493 9.49928C10.2492 9.63732 10.1372 9.74912 9.99913 9.74906C9.86108 9.749 9.74919 9.63711 9.74913 9.49906C9.74907 9.36102 9.86087 9.24903 9.99891 9.24885C10.0654 9.24877 10.1291 9.27512 10.1761 9.32211C10.2231 9.36909 10.2494 9.43283 10.2493 9.49928" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function BookingStepDetails({ cabin }: BookingStepDetailsProps) {
  const guests = useBookingStore((s) => s.guests);
  const pricing = useBookingStore((s) => s.pricing);
  const setGuests = useBookingStore((s) => s.setGuests);
  const setStep = useBookingStore((s) => s.setStep);

  const totalGuests = guests.adults + guests.children + guests.babies;

  return (
    <div className="space-y-6">

      {/* Who's going */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-medium text-text-primary">Who's going?</h1>
          <span className="text-sm text-text-secondary">Max. {cabin.maxGuests} guests, {cabin.maxPets} pets</span>
        </div>

        <div className="rounded-2xl overflow-hidden">
          {/* Adults */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <span className="text-text-primary"><IconAdults /></span>
              <div>
                <p className="text-sm font-medium text-text-primary">Adults</p>
                <p className="text-xs text-text-secondary">13 years old and more</p>
              </div>
            </div>
            <GuestCounter
              value={guests.adults}
              min={1}
              max={cabin.maxGuests - guests.children - guests.babies}
              onChange={(v) => setGuests({ adults: v })}
            />
          </div>

          <div className="h-px bg-border-light" />

          {/* Children */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <span className="text-text-primary"><IconChildren /></span>
              <div>
                <p className="text-sm font-medium text-text-primary">Children</p>
                <p className="text-xs text-text-secondary">2 – 12 years old</p>
              </div>
            </div>
            <GuestCounter
              value={guests.children}
              min={0}
              max={cabin.maxGuests - guests.adults - guests.babies}
              onChange={(v) => setGuests({ children: v })}
            />
          </div>

          <div className="h-px bg-border-light" />

          {/* Baby */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <span className="text-text-primary"><IconBaby /></span>
              <div>
                <p className="text-sm font-medium text-text-primary">Baby</p>
                <p className="text-xs text-text-secondary">Less than 2 years</p>
              </div>
            </div>
            <GuestCounter
              value={guests.babies}
              min={0}
              max={cabin.maxGuests - guests.adults - guests.children}
              onChange={(v) => setGuests({ babies: v })}
            />
          </div>

          <div className="h-px bg-border-light" />

          {/* Pets */}
          <div className="flex items-center justify-between py-4 border-b border-border-light">
            <div className="flex items-center gap-3">
              <span className="text-text-primary"><IconPets /></span>
              <div>
                <p className="text-sm font-medium text-text-primary">Pets</p>
                <p className="text-xs text-text-secondary">Dogs, cats</p>
              </div>
            </div>
            <GuestCounter
              value={guests.pets}
              min={0}
              max={cabin.maxPets}
              onChange={(v) => setGuests({ pets: v })}
            />
          </div>
        </div>

      </div>

      {/* Summary row */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-secondary">
          {pricing ? `${pricing.nights} night${pricing.nights !== 1 ? "s" : ""} · ` : ""}{totalGuests} guest{totalGuests !== 1 ? "s" : ""}
        </span>
        <span className="text-base font-medium text-text-primary">
          {pricing ? formatCurrency(pricing.subtotal - pricing.discount, cabin.pricing.currency) : ""}
        </span>
      </div>
      <StickyButtonWrapper>
        <Button variant="primary" size="lg" className="w-full" onClick={() => setStep(3)}>
          Continue
        </Button>
      </StickyButtonWrapper>
    </div>
  );
}

function GuestCounter({
  value,
  min,
  max,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-3 shrink-0">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={cn(
          "w-8 h-8 rounded-full border flex items-center justify-center transition-opacity",
          value <= min
            ? "border-border-light text-text-tertiary cursor-not-allowed"
            : "border-border-dark text-text-primary hover:opacity-70 cursor-pointer"
        )}
      >
        <IconMinus size={12} />
      </button>
      <span className="text-sm font-semibold text-text-primary w-4 text-center tabular-nums">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={cn(
          "w-8 h-8 rounded-full border flex items-center justify-center transition-opacity",
          value >= max
            ? "border-border-light text-text-tertiary cursor-not-allowed"
            : "border-border-dark text-text-primary hover:opacity-70 cursor-pointer"
        )}
      >
        <IconAdd size={12} />
      </button>
    </div>
  );
}
