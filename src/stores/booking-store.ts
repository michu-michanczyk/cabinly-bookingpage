import { create } from "zustand";
import type { BookingState, Promo, PriceBreakdown } from "../types/cabin";
import { getNights } from "../lib/utils";

interface BookingStore extends BookingState {
  openBooking: (promo?: Promo | null) => void;
  closeBooking: () => void;
  setStep: (step: 1 | 2 | 3 | 4) => void;
  setDates: (checkIn: string | null, checkOut: string | null) => void;
  setGuests: (adults: number, children: number) => void;
  setGuestDetails: (details: Partial<BookingState["guestDetails"]>) => void;
  calculatePricing: (baseNight: number, cleaningFee: number, serviceFee: number) => void;
  reset: () => void;
}

const initialState: BookingState = {
  step: 1,
  isOpen: false,
  dates: { checkIn: null, checkOut: null },
  guests: { adults: 2, children: 0 },
  guestDetails: { name: "", email: "", phone: "", requests: "" },
  selectedPromo: null,
  pricing: null,
};

export const useBookingStore = create<BookingStore>((set, get) => ({
  ...initialState,

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

  setGuests: (adults, children) => set({ guests: { adults, children } }),

  setGuestDetails: (details) =>
    set((state) => ({
      guestDetails: { ...state.guestDetails, ...details },
    })),

  calculatePricing: (baseNight, cleaningFee, serviceFee) => {
    const { dates, selectedPromo } = get();
    if (!dates.checkIn || !dates.checkOut) return;

    const nights = getNights(dates.checkIn, dates.checkOut);
    const subtotal = baseNight * nights;
    const discount = selectedPromo
      ? subtotal - selectedPromo.dealPrice
      : 0;
    const total = subtotal - discount + cleaningFee + serviceFee;

    const pricing: PriceBreakdown = {
      nights,
      subtotal,
      cleaningFee,
      serviceFee,
      discount,
      total,
    };

    set({ pricing });
  },

  reset: () => set(initialState),
}));
