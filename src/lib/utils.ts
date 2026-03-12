import { format, differenceInDays, parseISO, isAfter, isBefore } from "date-fns";
import type { Promo } from "../types/cabin";

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  return format(parseISO(dateStr), "MMM d, yyyy");
}

export function formatDateShort(dateStr: string): string {
  return format(parseISO(dateStr), "MMM d");
}

export function formatDateRange(start: string, end: string): string {
  return `${formatDateShort(start)} – ${formatDateShort(end)}`;
}

export function getNights(checkIn: string, checkOut: string): number {
  return differenceInDays(parseISO(checkOut), parseISO(checkIn));
}

export function calculateSavings(original: number, deal: number): number {
  return Math.round(((original - deal) / original) * 100);
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function getApplicablePromos(promos: Promo[], checkIn?: string | null, checkOut?: string | null): Promo[] {
  const now = new Date();
  return promos.filter((promo) => {
    // Filter out expired promos
    if (promo.expiresAt && !isAfter(new Date(promo.expiresAt), now)) return false;
    // If dates provided, filter by date overlap
    if (checkIn && checkOut) {
      const promoStart = parseISO(promo.dates.start);
      const promoEnd = parseISO(promo.dates.end);
      const stayStart = parseISO(checkIn);
      const stayEnd = parseISO(checkOut);
      // Overlap: promo start < stay end AND promo end > stay start
      return isBefore(promoStart, stayEnd) && isAfter(promoEnd, stayStart);
    }
    return true;
  });
}

export function getTimeRemaining(expiresAt: string): {
  hours: number;
  minutes: number;
  expired: boolean;
} {
  const diff = new Date(expiresAt).getTime() - Date.now();
  if (diff <= 0) return { hours: 0, minutes: 0, expired: true };
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return { hours, minutes, expired: false };
}
