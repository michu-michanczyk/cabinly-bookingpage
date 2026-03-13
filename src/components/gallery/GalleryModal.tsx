import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconClose, IconArrowRight } from "../icons";
import type { CabinImage } from "../../types/cabin";

interface GalleryModalProps {
  images: CabinImage[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export function GalleryModal({ images, isOpen, onClose, initialIndex = 0 }: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex]);

  const next = () => setCurrentIndex((i) => (i + 1) % images.length);
  const prev = () => setCurrentIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 text-white">
            <span className="text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:opacity-80 transition-opacity"
              style={{ cursor: 'pointer' }}
            >
              <IconClose size={20} className="text-white" />
            </button>
          </div>

          {/* Main image */}
          <div className="flex-1 flex items-center justify-center px-4 relative min-h-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex].url}
                alt={images[currentIndex].alt}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </AnimatePresence>

            {/* Navigation arrows */}
            <button
              onClick={prev}
              className="absolute left-4 p-3 rounded-full bg-white/10 hover:opacity-80 transition-opacity"
              style={{ cursor: 'pointer' }}
            >
              <IconArrowRight size={24} className="text-white rotate-180" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 p-3 rounded-full bg-white/10 hover:opacity-80 transition-opacity"
              style={{ cursor: 'pointer' }}
            >
              <IconArrowRight size={24} className="text-white" />
            </button>
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-2 px-4 py-3 overflow-x-auto hide-scrollbar justify-center">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`shrink-0 w-16 h-12 rounded overflow-hidden transition-all ${
                  i === currentIndex
                    ? "ring-2 ring-white opacity-100"
                    : "opacity-40 hover:opacity-80"
                }`}
                style={{ cursor: 'pointer' }}
              >
                <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
