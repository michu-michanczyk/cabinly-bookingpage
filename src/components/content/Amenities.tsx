import { useState } from "react";
import {
  IconWifi, IconParking, IconFire, IconKitchen, IconSun,
  IconHotTub, IconTV, IconPet, IconBedroom, IconBathroom,
  IconTick, IconEye, IconAward,
} from "../icons";
import type { Amenity, AmenityCategory } from "../../types/cabin";

interface AmenitiesProps {
  amenities: Amenity[];
}

const categoryLabels: Record<AmenityCategory, string> = {
  essentials: "Essentials",
  kitchen: "Kitchen & Dining",
  outdoor: "Outdoor & Garden",
  entertainment: "Entertainment",
  safety: "Safety",
  bathroom: "Bathroom",
  bedroom: "Bedroom",
};

const categoryOrder: AmenityCategory[] = [
  "essentials", "outdoor", "kitchen", "entertainment", "bedroom", "bathroom", "safety",
];

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  wifi: IconWifi,
  parking: IconParking,
  fire: IconFire,
  kitchen: IconKitchen,
  sun: IconSun,
  hottub: IconHotTub,
  tv: IconTV,
  pet: IconPet,
  bedroom: IconBedroom,
  bathroom: IconBathroom,
  tick: IconTick,
  eye: IconEye,
  award: IconAward,
};

const INITIAL_SHOW = 8;

export function Amenities({ amenities }: AmenitiesProps) {
  const [showAll, setShowAll] = useState(false);

  // Group amenities by category
  const grouped = categoryOrder.reduce<Record<string, Amenity[]>>((acc, cat) => {
    const items = amenities.filter((a) => a.category === cat);
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {});

  const displayedAmenities = showAll ? amenities : amenities.slice(0, INITIAL_SHOW);
  const hasMore = amenities.length > INITIAL_SHOW;

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 sm:py-14 border-t border-border-light">
      {showAll ? (
        // Full view - grouped by category
        <div className="space-y-8">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-text-secondary mb-3">
                {categoryLabels[category as AmenityCategory]}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {items.map((amenity) => (
                  <AmenityItem key={amenity.id} amenity={amenity} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Compact view - flat grid
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {displayedAmenities.map((amenity) => (
            <AmenityItem key={amenity.id} amenity={amenity} />
          ))}
        </div>
      )}

      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-6 text-sm font-semibold text-text-primary border border-border-dark rounded-lg px-6 py-2.5 hover:opacity-80 transition-opacity"
        >
          {showAll ? "Show less" : `Show all ${amenities.length} amenities`}
        </button>
      )}
    </section>
  );
}

function AmenityItem({ amenity }: { amenity: Amenity }) {
  const IconComponent = iconMap[amenity.icon] || IconTick;

  return (
    <div className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:opacity-80 transition-opacity">
      <IconComponent size={20} className="text-text-secondary shrink-0" />
      <span className="text-sm text-text-primary">{amenity.name}</span>
    </div>
  );
}
