import { lazy, Suspense, useState, useRef } from "react";
import { IconPlay, IconArrowRight } from "../icons";
import { cn } from "../../lib/utils";
import type { CabinImage } from "../../types/cabin";

const GalleryModal = lazy(() =>
  import("./GalleryModal").then((m) => ({ default: m.GalleryModal }))
);

interface GalleryProps {
  images: CabinImage[];
}

export function Gallery({ images }: GalleryProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleMobileScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const itemWidth = el.clientWidth * 0.85 + 8; // 85vw + gap-2 (8px)
    const index = Math.min(Math.round(el.scrollLeft / itemWidth), images.length - 1);
    setMobileIndex(index);
  };

  const openModal = (index: number) => {
    setActiveIndex(index);
    setModalOpen(true);
  };

  // Render different layouts based on image count (1-6 images, or 7+)
  const renderDesktopGallery = () => {
    const count = images.length;

    // 1 image: single large centered image
    if (count === 1) {
      return (
        <section className="hidden md:grid mt-4" style={{ height: "840px" }}>
          <div className="relative min-h-0">
            <GalleryImage image={images[0]} onClick={() => openModal(0)} className="h-full min-h-0" eager />
            {images[0].isVideo && (
              <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-text-primary px-2 py-1 rounded-full">
                <IconPlay size={14} className="text-text-tertiary" />
                <span className="text-xs text-text-tertiary">Video</span>
              </div>
            )}
          </div>
        </section>
      );
    }

    // 2 images: side by side
    if (count === 2) {
      return (
        <section className="hidden md:grid grid-cols-2 gap-2 mt-4" style={{ height: "840px" }}>
          <GalleryImage image={images[0]} onClick={() => openModal(0)} className="min-h-0" eager />
          <GalleryImage image={images[1]} onClick={() => openModal(1)} className="min-h-0" />
        </section>
      );
    }

    // 3 images: large left, 2 stacked right
    if (count === 3) {
      return (
        <section className="hidden md:grid grid-cols-2 gap-2 mt-4" style={{ height: "840px" }}>
          <GalleryImage image={images[0]} onClick={() => openModal(0)} className="min-h-0" eager />
          <div className="grid grid-rows-2 gap-2 min-h-0">
            <GalleryImage image={images[1]} onClick={() => openModal(1)} className="min-h-0" />
            <GalleryImage image={images[2]} onClick={() => openModal(2)} className="min-h-0" />
          </div>
        </section>
      );
    }

    // 4 images: 2x2 grid
    if (count === 4) {
      return (
        <section className="hidden md:grid grid-cols-2 gap-2 mt-4" style={{ height: "840px" }}>
          <div className="grid grid-rows-2 gap-2 min-h-0">
            <GalleryImage image={images[0]} onClick={() => openModal(0)} className="min-h-0" eager />
            <GalleryImage image={images[1]} onClick={() => openModal(1)} className="min-h-0" />
          </div>
          <div className="grid grid-rows-2 gap-2 min-h-0">
            <GalleryImage image={images[2]} onClick={() => openModal(2)} className="min-h-0" />
            <GalleryImage image={images[3]} onClick={() => openModal(3)} className="min-h-0" />
          </div>
        </section>
      );
    }

    // 5 images: large left, 2 left bottom, 2 right
    if (count === 5) {
      return (
        <section className="hidden md:grid grid-cols-[1.4fr_1fr] gap-2 mt-4" style={{ height: "840px" }}>
          <div className="grid grid-rows-[1.8fr_1fr] gap-2 min-h-0">
            <GalleryImage image={images[0]} onClick={() => openModal(0)} className="min-h-0" eager />
            <div className="grid grid-cols-2 gap-2 min-h-0">
              <GalleryImage image={images[1]} onClick={() => openModal(1)} className="min-h-0" />
              <GalleryImage image={images[2]} onClick={() => openModal(2)} className="min-h-0" />
            </div>
          </div>
          <div className="grid grid-rows-2 gap-2 min-h-0">
            <GalleryImage image={images[3]} onClick={() => openModal(3)} className="min-h-0" />
            <GalleryImage image={images[4]} onClick={() => openModal(4)} className="min-h-0" />
          </div>
        </section>
      );
    }

    // 6 images: 3 columns, 2 rows each
    if (count === 6) {
      return (
        <section className="hidden md:grid grid-cols-3 gap-2 mt-4" style={{ height: "840px" }}>
          <div className="grid grid-rows-2 gap-2 min-h-0">
            <GalleryImage image={images[0]} onClick={() => openModal(0)} className="min-h-0" eager />
            <GalleryImage image={images[1]} onClick={() => openModal(1)} className="min-h-0" />
          </div>
          <div className="grid grid-rows-2 gap-2 min-h-0">
            <GalleryImage image={images[2]} onClick={() => openModal(2)} className="min-h-0" />
            <GalleryImage image={images[3]} onClick={() => openModal(3)} className="min-h-0" />
          </div>
          <div className="grid grid-rows-2 gap-2 min-h-0">
            <GalleryImage image={images[4]} onClick={() => openModal(4)} className="min-h-0" />
            <GalleryImage image={images[5]} onClick={() => openModal(5)} className="min-h-0" />
          </div>
        </section>
      );
    }

    // 7+ images: original full layout
    return (
      <section className="hidden md:grid grid-cols-[1fr_1.4fr_1fr] gap-2 mt-4" style={{ height: "840px" }}>
        <div className="grid grid-rows-2 gap-2 min-h-0">
          <GalleryImage image={images[1]} onClick={() => openModal(1)} className="min-h-0" />
          <GalleryImage image={images[6]} onClick={() => openModal(6)} className="min-h-0" />
        </div>
        <div className="grid grid-rows-[1.8fr_1fr] gap-2 min-h-0">
          <div className="relative min-h-0">
            <GalleryImage image={images[0]} onClick={() => openModal(0)} className="h-full" eager />
            {images[0].isVideo && (
              <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-text-primary px-2 py-1 rounded-full">
                <IconPlay size={14} className="text-text-tertiary" />
                <span className="text-xs text-text-tertiary">Video</span>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 min-h-0">
            <GalleryImage image={images[4]} onClick={() => openModal(4)} className="min-h-0" />
            <GalleryImage image={images[5]} onClick={() => openModal(5)} className="min-h-0" />
          </div>
        </div>
        <div className="grid grid-rows-2 gap-2 min-h-0">
          <div className="relative min-h-0">
            <GalleryImage image={images[3]} onClick={() => openModal(3)} className="h-full" />
            {images.length > 7 && (
              <button
                onClick={() => openModal(0)}
                className="group/btn absolute top-4 right-4 flex items-center gap-2 bg-bg-primary px-4 py-2.5 rounded-lg text-sm font-semibold text-text-primary shadow-lg hover:opacity-80 transition-opacity cursor-pointer"
              >
                Show all photos ({images.length})
                <IconArrowRight size={14} className="transition-transform group-hover/btn:animate-[bounceRight_1s_ease-in-out_infinite]" />
              </button>
            )}
          </div>
          <GalleryImage image={images[2]} onClick={() => openModal(2)} className="min-h-0" />
        </div>
      </section>
    );
  };

  return (
    <>
      {/* Desktop grid - dynamic based on image count */}
      {renderDesktopGallery()}

      {/* Mobile carousel */}
      <section className="md:hidden mt-4 -mx-4">
        <div ref={scrollRef} onScroll={handleMobileScroll} className="overflow-x-auto hide-scrollbar snap-x snap-mandatory flex gap-2 px-4">
          {images.map((image, i) => (
            <div
              key={i}
              className="snap-center shrink-0 w-[85vw] aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
              onClick={() => openModal(i)}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding={i === 0 ? "sync" : "async"}
              />
            </div>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {images.slice(0, 7).map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-colors",
                i === mobileIndex ? "bg-text-primary" : "bg-text-tertiary"
              )}
            />
          ))}
        </div>

        {/* Show all button - mobile */}
        <div className="flex justify-center mt-3 px-4">
          <button
            onClick={() => openModal(0)}
            className="flex items-center gap-2 text-sm font-semibold text-text-primary border border-border-light rounded-lg px-4 py-2 hover:opacity-80 transition-opacity cursor-pointer"
          >
            Show all photos ({images.length})
            <IconArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* Gallery Modal */}
      <Suspense fallback={null}>
        <GalleryModal
          images={images}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialIndex={activeIndex}
        />
      </Suspense>
    </>
  );
}

function GalleryImage({
  image,
  onClick,
  className,
  eager,
}: {
  image: CabinImage;
  onClick: () => void;
  className?: string;
  eager?: boolean;
}) {
  return (
    <div
      className={cn("overflow-hidden group relative", className)}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={image.url}
        alt={image.alt}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        style={{ cursor: 'pointer' }}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding={eager ? "sync" : "async"}
      />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" style={{ cursor: 'pointer' }} />
    </div>
  );
}
