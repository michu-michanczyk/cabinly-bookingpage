export interface Cabin {
  id: string;
  slug: string;
  title: string;
  description: string;
  location: {
    address: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
  };
  owner: {
    name: string;
    avatar: string;
  };
  rating: {
    score: number;
    count: number;
    source: string;
  };
  images: CabinImage[];
  amenities: Amenity[];
  reviews: Review[];
  pricing: Pricing;
  promos: Promo[];
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  houseRules: string[];
}

export interface CabinImage {
  url: string;
  alt: string;
  isVideo?: boolean;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  category: AmenityCategory;
}

export type AmenityCategory =
  | "essentials"
  | "kitchen"
  | "outdoor"
  | "entertainment"
  | "safety"
  | "bathroom"
  | "bedroom";

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  text: string;
  date: string;
  source: "booking.com" | "google" | "airbnb" | "direct";
}

export interface Pricing {
  baseNight: number;
  cleaningFee: number;
  serviceFee: number;
  currency: string;
}

export interface Promo {
  id: string;
  type: "last-minute" | "2+1" | "weekend-deal";
  title: string;
  description: string;
  dates: {
    start: string;
    end: string;
  };
  originalPrice: number;
  dealPrice: number;
  badge: string;
  expiresAt?: string;
}

export interface BookingState {
  step: 1 | 2 | 3 | 4;
  isOpen: boolean;
  dates: {
    checkIn: string | null;
    checkOut: string | null;
  };
  guests: {
    adults: number;
    children: number;
  };
  guestDetails: {
    name: string;
    email: string;
    phone: string;
    requests: string;
  };
  selectedPromo: Promo | null;
  pricing: PriceBreakdown | null;
}

export interface PriceBreakdown {
  nights: number;
  subtotal: number;
  cleaningFee: number;
  serviceFee: number;
  discount: number;
  total: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  actions?: ChatAction[];
}

export interface ChatAction {
  label: string;
  type: "book" | "navigate" | "info";
  payload?: Record<string, unknown>;
}
