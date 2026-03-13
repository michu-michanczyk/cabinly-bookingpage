import { create } from "zustand";
import { format, parseISO, eachDayOfInterval } from "date-fns";
import type { BookingState, Promo } from "../types/cabin";
import { getNights } from "../lib/utils";

interface BookingStore extends BookingState {
  agreedToTerms: boolean;
  selectedExtras: string[];
  setAgreedToTerms: (agreed: boolean) => void;
  toggleExtra: (id: string) => void;
  openBooking: (promo?: Promo | null) => void;
  closeBooking: () => void;
  setStep: (step: 1 | 2 | 3 | 4) => void;
  setDates: (checkIn: string | null, checkOut: string | null) => void;
  setGuests: (partial: Partial<BookingState["guests"]>) => void;
  setGuestDetails: (details: Partial<BookingState["guestDetails"]>) => void;
  calculatePricing: (baseNight: number, cleaningFee: number, serviceFee: number, nightlyPrices?: Record<string, number>) => void;
  setPaymentOption: (option: 'full' | 'split') => void;
  setSelectedPromo: (promo: Promo | null) => void;
  reset: () => void;
}

const initialState: BookingState = {
  step: 1,
  isOpen: false,
  dates: { checkIn: null, checkOut: null },
  guests: { adults: 2, children: 0, babies: 0, pets: 0 },
  guestDetails: { name: "", email: "", phone: "", requests: "" },
  selectedPromo: null,
  pricing: null,
  paymentOption: 'full',
};

export const useBookingStore = create<BookingStore>((set, get) => ({
  ...initialState,
  agreedToTerms: false,
  selectedExtras: [],
  setAgreedToTerms: (agreed) => set({ agreedToTerms: agreed }),
  toggleExtra: (id) => set((state) => ({
    selectedExtras: state.selectedExtras.includes(id)
      ? state.selectedExtras.filter((e) => e !== id)
      : [...state.selectedExtras, id],
  })),

  openBooking: (promo = null) => {
    if (promo) {
      set({
        isOpen: true,
        step: 1,
        selectedPromo: promo,
        dates: { checkIn: promo.dates.start, checkOut: promo.dates.end },
      });
    } else {
      set({ isOpen: true, step: 1, selectedPromo: null });
    }
  },

  closeBooking: () => set({ isOpen: false }),

  setStep: (step) => set({ step }),

  setDates: (checkIn, checkOut) => set({ dates: { checkIn, checkOut } }),

  setGuests: (partial) => set((state) => ({ guests: { ...state.guests, ...partial } })),

  setGuestDetails: (details) =>
    set((state) => ({
      guestDetails: { ...state.guestDetails, ...details },
    })),

  calculatePricing: (baseNight, cleaningFee, serviceFee, nightlyPrices) => {
    const { dates, selectedPromo } = get();
    if (!dates.checkIn || !dates.checkOut) return;

    const nights = getNights(dates.checkIn, dates.checkOut);
    // Sum actual nightly prices for each night of the stay (checkout day is not a night)
    const stayNights = eachDayOfInterval({ start: parseISO(dates.checkIn), end: parseISO(dates.checkOut) }).slice(0, -1);
    const subtotal = nightlyPrices
      ? stayNights.reduce((sum, day) => sum + (nightlyPrices[format(day, "yyyy-MM-dd")] ?? baseNight), 0)
      : baseNight * nights;
    const discount = selectedPromo
      ? subtotal - selectedPromo.dealPrice
      : 0;
    const total = subtotal - discount + cleaningFee + serviceFee;

    const existing = get().pricing;
    if (
      existing &&
      existing.nights === nights &&
      existing.subtotal === subtotal &&
      existing.discount === discount &&
      existing.total === total
    ) return;

    set({ pricing: { nights, subtotal, cleaningFee, serviceFee, discount, total } });
  },

  setPaymentOption: (option) => set({ paymentOption: option }),

  setSelectedPromo: (promo) => set({ selectedPromo: promo }),

  reset: () => set({ ...initialState, agreedToTerms: false, selectedExtras: [] }),
}));
