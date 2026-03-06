import { useParams, Link } from "react-router-dom";
import { TopBar } from "../components/layout/TopBar";
import { Footer } from "../components/layout/Footer";
import { HeroSection } from "../components/hero/HeroSection";
import { Gallery } from "../components/gallery/Gallery";
import { Description } from "../components/content/Description";
import { LocationTicker } from "../components/content/LocationTicker";
import { BookingDrawer } from "../components/booking/BookingDrawer";
import { MobileBookingBar } from "../components/booking/MobileBookingBar";
import { useChat } from "../hooks/useChat";
import { useAccentColor } from "../hooks/useAccentColor";
import { useSeoMeta } from "../hooks/useSeoMeta";
import { mockCabin } from "../data/mock-cabin";

const ACCENT_COLOR = "#010101";

export function TestGallery() {
  const { count } = useParams();
  const imageCount = count ? parseInt(count) : 7;

  const cabin = {
    ...mockCabin,
    images: mockCabin.images.slice(0, imageCount),
  };

  const { send } = useChat(cabin);
  useAccentColor(ACCENT_COLOR);
  useSeoMeta(cabin);

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      {/* Test navigation bar */}
      <div className="bg-bg-secondary border-b border-border-light p-2 sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex gap-2 items-center justify-center flex-wrap">
          <span className="text-xs font-semibold text-text-secondary">Gallery Test ({imageCount} images):</span>
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <Link
              key={num}
              to={`/test/${num}`}
              className={`px-3 py-1 rounded text-xs font-semibold transition-opacity hover:opacity-70 ${
                num === imageCount
                  ? "bg-accent text-accent-fg"
                  : "bg-bg-tertiary text-text-primary"
              }`}
            >
              {num} img{num !== 1 ? "s" : ""}
            </Link>
          ))}
          <Link
            to="/"
            className="px-3 py-1 rounded text-xs font-semibold bg-bg-tertiary text-text-primary hover:opacity-70 transition-opacity ml-2"
          >
            ← Back to Main
          </Link>
        </div>
      </div>

      {/* Sticky TopBar with AI input */}
      <TopBar cabin={cabin} onSendMessage={send} />

      {/* Main content */}
      <main className="flex-1 pb-16 sm:pb-0">
        {/* Hero title + rating */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <HeroSection cabin={cabin} />
        </div>

        {/* Gallery */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <Gallery images={cabin.images} />
        </div>

        {/* Description */}
        <Description cabin={cabin} />
      </main>

      {/* Location Ticker */}
      <LocationTicker cabin={cabin} />

      {/* Footer */}
      <Footer />

      {/* Booking Drawer (side panel) */}
      <BookingDrawer cabin={cabin} />

      {/* Mobile sticky booking bar */}
      <MobileBookingBar cabin={cabin} />
    </div>
  );
}
