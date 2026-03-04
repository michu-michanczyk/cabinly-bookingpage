import { TopBar } from "./components/layout/TopBar";
import { Footer } from "./components/layout/Footer";
import { HeroSection } from "./components/hero/HeroSection";
import { Gallery } from "./components/gallery/Gallery";
import { LocationTicker } from "./components/content/LocationTicker";
import { Description } from "./components/content/Description";
import { Amenities } from "./components/content/Amenities";
import { PromoStays } from "./components/content/PromoStays";
import { Reviews } from "./components/content/Reviews";
import { PromoBanner } from "./components/content/PromoBanner";
import { BookingDrawer } from "./components/booking/BookingDrawer";
import { MobileBookingBar } from "./components/booking/MobileBookingBar";
import { useChat } from "./hooks/useChat";
import { mockCabin } from "./data/mock-cabin";

function App() {
  const cabin = mockCabin;
  const { send } = useChat(cabin);

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
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

      {/* Promo Banner */}
      <PromoBanner cabin={cabin} />

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

export default App
