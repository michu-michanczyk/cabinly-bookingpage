import { forwardRef, useEffect, useRef, useState } from "react";
import type { Cabin } from "../../types/cabin";

interface DescriptionProps {
  cabin: Cabin;
}

type SectionId = "our-cabin" | "rooms" | "amenities" | "host" | "special-offers" | "faq" | "calendar";

const DESCRIPTION_MENU_ITEMS: { id: SectionId; label: string }[] = [
  { id: "rooms", label: "Rooms" },
  { id: "amenities", label: "Amenities" },
  { id: "special-offers", label: "Special offers" },
  { id: "host", label: "Host" },
  { id: "faq", label: "FAQ" },
  { id: "calendar", label: "Calendar" },
];

const SECTION_DOM_TARGETS: Record<SectionId, string> = {
  "our-cabin": "overview",
  rooms: "rooms",
  amenities: "amenities",
  host: "host",
  "special-offers": "special-offers",
  faq: "faq",
  calendar: "calendar",
};

export function Description({ cabin }: DescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("our-cabin");
  const [navOnDark, setNavOnDark] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const descriptionText = `Browse the internet, play board games or PlayStation with your family, have fun with the dog, or take a nap in the hammock.
And after all that - relax in the jacuzzi or grill yourself a sausage.  Drugi Dom is a comfortable stay for up to 10 people, located
on the grounds of the old PKP railway resort in Załakowo.

We equipped Drugi Dom with everything you need in a home — and everything that makes your time here even more enjoyable.
The cabin is surrounded by beautiful Kashubian forests, perfect for hiking and cycling. Lake Gowidlińskie is just a 10-minute walk
away, and the charming town of Kartuzy is a short drive. Whether you're looking for adventure or relaxation,
this is the perfect getaway.`;

  // Detect if sticky nav is overlapping a dark section
  useEffect(() => {
    const checkNavBackground = () => {
      const nav = navRef.current;
      if (!nav) return;

      const navRect = nav.getBoundingClientRect();
      const navCenterY = navRect.top + navRect.height / 2;
      const navCenterX = navRect.left + navRect.width / 2;

      // Hide nav temporarily to sample element underneath
      nav.style.visibility = "hidden";
      const elBelow = document.elementFromPoint(navCenterX, navCenterY);
      nav.style.visibility = "";

      if (!elBelow) return;

      // Walk up the DOM to find a background color
      let el: Element | null = elBelow;
      let isDark = false;
      while (el && el !== document.body) {
        const bg = window.getComputedStyle(el).backgroundColor;
        const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (match) {
          const r = parseInt(match[1]);
          const g = parseInt(match[2]);
          const b = parseInt(match[3]);
          // Skip transparent
          if (!(r === 0 && g === 0 && b === 0 && bg.includes("0)"))) {
            // Relative luminance
            const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            isDark = luminance < 100;
            break;
          }
        }
        el = el.parentElement;
      }

      setNavOnDark(isDark);
    };

    window.addEventListener("scroll", checkNavBackground, { passive: true });
    checkNavBackground();
    return () => window.removeEventListener("scroll", checkNavBackground);
  }, []);

  // Scroll-based active section tracker
  useEffect(() => {
    const sectionEntries = Object.entries(SECTION_DOM_TARGETS) as [SectionId, string][];

    const getActiveSection = (): SectionId => {
      const triggerY = window.innerHeight * 0.35;
      let active: SectionId = "our-cabin";
      let closestDist = Infinity;

      for (const [sectionId, domId] of sectionEntries) {
        const el = document.getElementById(domId);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        // Section must have entered the top 35% of viewport
        if (top <= triggerY) {
          const dist = triggerY - top;
          if (dist < closestDist) {
            closestDist = dist;
            active = sectionId;
          }
        }
      }
      return active;
    };

    const onScroll = () => {
      setActiveSection(getActiveSection());
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle hash on load for deep links
  useEffect(() => {
    const hash = window.location.hash.replace("#", "") as SectionId;
    if (hash && SECTION_DOM_TARGETS[hash]) {
      const el = document.getElementById(SECTION_DOM_TARGETS[hash]);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
    }
  }, []);

  const handleMenuClick = (id: SectionId) => {
    const targetDomId = SECTION_DOM_TARGETS[id] ?? id;
    const el = document.getElementById(targetDomId);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", `#${id}`);
  };

  return (
    <div id="overview" className="pt-12 sm:pt-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-col lg:flex-row gap-4 lg:gap-8">
        {/* Sticky nav — spans full height of overview + rooms */}
        <DescriptionMenu
          ref={navRef}
          activeSection={activeSection}
          onSectionClick={handleMenuClick}
          onDark={navOnDark}
        />

        {/* Right column */}
        <div className="flex-1 min-w-0">
          {/* Overview content — white bg */}
          <div className="pb-10 sm:pb-14">
            <p className="text-2xl sm:text-3xl lg:text-5xl font-semibold leading-tight sm:leading-[48px] lg:leading-[56px]">
              <span className="text-text-primary">Listen to the birds singing while sipping freshly grounded coffee on our terrace overlooking the forest, just a meter from the stream.</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-6 lg:gap-y-8 mt-6 lg:mt-10 mb-6 lg:mb-10">
              <FeatureItem icon="/icons/users.svg" value={`${cabin.maxGuests} guests`} subtitle={`Up to ${cabin.maxGuests} people`} />
              <FeatureItem icon="/icons/bedroom.svg" value={`${cabin.bedrooms} bedrooms`} subtitle="10 single beds" />
              <FeatureItem icon="/icons/bathroom.svg" value={`${cabin.bathrooms} bathrooms`} subtitle="Bath & shower" />
              <FeatureItem icon="/icons/parking.svg" value="6 parking spots" subtitle="Up to 6 cars" />
              <FeatureItem icon="/icons/pets.svg" value="2 pets allowed" subtitle="Small cats & dogs" />
              <FeatureItem icon="/icons/home.svg" value="1 property" subtitle="One house on a plot" />
            </div>
            <div>
              <div className={`cabin-description text-base text-text-secondary leading-6 whitespace-pre-line transition-all duration-300 ease-in-out ${!expanded ? 'line-clamp-3' : ''}`}>
                {descriptionText}
              </div>
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-3 text-base font-medium text-text-primary underline underline-offset-2 hover:opacity-80 transition-opacity cursor-pointer"
              >
                {expanded ? "show less" : "show more"}
              </button>
            </div>
          </div>

          {/* Rooms — dark bg. The bg div is absolute and extends left into the nav column. */}
          {cabin.rooms && cabin.rooms.length > 0 && (
            <div id="rooms" className="relative py-12 sm:py-16">
              {/* Full-width dark background: extends left to cover nav column and beyond */}
              <div
                className="absolute inset-y-0 bg-[#0e0e0e] dark:bg-white"
                style={{ left: 'calc(-1 * (100vw))', right: '-9999px', zIndex: 0 }}
                aria-hidden="true"
              />
              {/* Content sits above the bg */}
              <div className="relative" style={{ zIndex: 1 }}>
                <h2 className="text-3xl sm:text-4xl font-bold text-white dark:text-[#010101] mb-8 sm:mb-10">
                  Place you'll stay in
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {cabin.rooms.map((room) => (
                    <div key={room.id} className="flex flex-col gap-3">
                      <div className="aspect-[4/3] overflow-hidden bg-white/10 dark:bg-black/10">
                        <img
                          src={room.image}
                          alt={room.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-white dark:text-[#010101] font-medium text-sm sm:text-base">{room.name}</div>
                        <div className="text-white/60 dark:text-[#010101]/60 text-xs sm:text-sm mt-0.5">{room.beds}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, value, subtitle }: { icon: string; value: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-3">
      <img src={icon} alt="" className="w-6 h-6 shrink-0 icon-adaptive" />
      <div>
        <div className="text-base font-medium text-text-primary">{value}</div>
        <div className="text-base text-text-secondary">{subtitle}</div>
      </div>
    </div>
  );
}

interface DescriptionMenuProps {
  activeSection: SectionId;
  onSectionClick: (id: SectionId) => void;
  onDark: boolean;
}

const DescriptionMenu = forwardRef<HTMLDivElement, DescriptionMenuProps>(
  ({ activeSection, onSectionClick, onDark }, ref) => {
  const allItems: { id: SectionId; label: string }[] = [
    { id: "our-cabin", label: "Our cabin" },
    ...DESCRIPTION_MENU_ITEMS,
  ];

  return (
    <div ref={ref} className="w-full lg:w-56 lg:shrink-0 lg:sticky lg:top-20 lg:self-start relative z-10 lg:pt-4">
      <nav className="flex flex-row gap-2 lg:flex-col lg:gap-2">
        {allItems.map((item) => {
          const isActive = item.id === activeSection;

          let textClass: string;
          if (onDark) {
            // nav over dark bg (light mode) or dark bg (dark mode) → need light text
            textClass = isActive
              ? "text-white"
              : "text-white/50 hover:text-white/80";
          } else {
            // nav over light bg (light mode) or white bg (dark mode) → need dark text
            textClass = isActive
              ? "text-[#010101] dark:text-[#010101]"
              : "text-[#010101]/40 dark:text-[#010101]/50 hover:text-[#010101]/70 dark:hover:text-[#010101]/80";
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSectionClick(item.id)}
              className={`flex items-center text-base font-medium transition-colors duration-300 text-left cursor-pointer ${textClass}`}
            >
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
});
DescriptionMenu.displayName = "DescriptionMenu";
