import { TopBar } from "./components/layout/TopBar";
import { Footer } from "./components/layout/Footer";
import { CabinlyFooter } from "./components/layout/CabinlyFooter";
import { HeroSection } from "./components/hero/HeroSection";
import { Gallery } from "./components/gallery/Gallery";
import { LocationTicker } from "./components/content/LocationTicker";
import { Description } from "./components/content/Description";
import { CtaSection } from "./components/content/CtaSection";
import { TrustBar } from "./components/content/TrustBar";
import { MobileBookingBar } from "./components/booking/MobileBookingBar";
import { useChat } from "./hooks/useChat";
import { useAccentColor } from "./hooks/useAccentColor";
import { useSeoMeta } from "./hooks/useSeoMeta";
import { mockCabin } from "./data/mock-cabin";

// Accent color for this cabin page — change this to customize
const ACCENT_COLOR = "#010101";

function App() {
  const cabin = mockCabin;
  const { send } = useChat(cabin);
  useAccentColor(ACCENT_COLOR);
  useSeoMeta(cabin);

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

        {/* Trust bar */}
        <TrustBar />

        {/* Description */}
        <Description cabin={cabin} />

      </main>

      {/* Location Ticker */}
      <LocationTicker cabin={cabin} />

      {/* CTA section */}
      <CtaSection cabin={cabin} />

      {/* Footer */}
      <Footer />

      {/* Cabinly branding footer */}
      <CabinlyFooter />

      {/* Mobile sticky booking bar */}
      <MobileBookingBar cabin={cabin} />
    </div>
  );
}

export default App
