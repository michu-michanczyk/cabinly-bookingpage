import { useParams, Link } from "react-router-dom";
import { TopBar } from "../components/layout/TopBar";
import { Footer } from "../components/layout/Footer";
import { HeroSection } from "../components/hero/HeroSection";
import { Gallery } from "../components/gallery/Gallery";
import { Description } from "../components/content/Description";
import { Amenities } from "../components/content/Amenities";
import { PromoStays } from "../components/content/PromoStays";
import { Reviews } from "../components/content/Reviews";
import { BookingDrawer } from "../components/booking/BookingDrawer";
import { MobileBookingBar } from "../components/booking/MobileBookingBar";
import { useChat } from "../hooks/useChat";
import { mockCabin } from "../data/mock-cabin";

export function TestGallery() {
  const { count } = useParams();
  const imageCount = count ? parseInt(count) : 7;

  // Slice images based on count
  const cabin = {
    ...mockCabin,
    images: mockCabin.images.slice(0, imageCount)
  };

  const { send } = useChat(cabin);

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      {/* Test navigation */}
      <div className="bg-yellow-100 border-b-2 border-yellow-400 p-2 sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex gap-2 items-center justify-center flex-wrap">
          <span className="text-xs font-semibold">Gallery Test ({imageCount} images):</span>
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <Link
              key={num}
              to={`/test/${num}`}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                num === imageCount
                  ? "bg-text-primary text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {num} img{num !== 1 ? 's' : ''}
            </Link>
          ))}
          <Link
            to="/"
            className="px-3 py-1 rounded text-xs font-semibold bg-blue-500 text-white hover:bg-blue-600 ml-2"
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

        {/* Description + Owner */}
        <Description cabin={cabin} />

        {/* Amenities */}
        <div id="amenities">
          <Amenities amenities={cabin.amenities} />
        </div>

        {/* Promo Stays - HIGH CONVERSION */}
        <div id="promos">
          <PromoStays promos={cabin.promos} currency={cabin.pricing.currency} />
        </div>

        {/* Reviews */}
        <div id="reviews">
          <Reviews reviews={cabin.reviews} rating={cabin.rating} />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Booking Drawer (side panel) */}
      <BookingDrawer cabin={cabin} />

      {/* Mobile sticky booking bar */}
      <MobileBookingBar cabin={cabin} />
    </div>
  );
}
