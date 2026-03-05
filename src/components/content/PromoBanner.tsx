import type { Cabin } from '../../types/cabin';

interface PromoBannerProps {
  cabin: Cabin;
  onBookClick?: () => void;
}

export function PromoBanner({ cabin, onBookClick }: PromoBannerProps) {
  // Show different images than the gallery (images 4-8)
  const bannerImages = cabin.images.slice(4, 8);

  return (
    <div className="w-full bg-bg-onSurface-secondary py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* Image strip */}
        <div className="flex gap-4 mb-8 overflow-hidden">
          {bannerImages.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[332px] h-[240px] overflow-hidden"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Pricing section */}
        <div className="text-center py-20">
          <h2 className="text-white text-[64px] font-medium leading-none mb-8">
            ${cabin.pricing.baseNight} / night
          </h2>
          <p className="text-white text-sm mb-8">
            Absolutely no hidden charges. All extra costs already included.
          </p>

          {/* CTA Button */}
          <button
            onClick={onBookClick}
            className="bg-white px-6 py-3 rounded-lg text-sm font-semibold text-text-primary shadow-lg hover:opacity-80 transition-opacity cursor-pointer"
          >
            Book a stay
          </button>
        </div>
      </div>
    </div>
  );
}
