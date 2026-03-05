import { useEffect, useState } from "react";
import type { Cabin } from "../../types/cabin";

interface DescriptionProps {
  cabin: Cabin;
}

type SectionId = "our-cabin" | "amenities" | "host" | "special-offers" | "faq" | "calendar";

const DESCRIPTION_MENU_ITEMS: { id: SectionId; label: string }[] = [
  { id: "amenities", label: "Amenities" },
  { id: "special-offers", label: "Special offers" },
  { id: "host", label: "Host" },
  { id: "faq", label: "FAQ" },
  { id: "calendar", label: "Calendar" },
];

const SECTION_DOM_TARGETS: Record<SectionId, string> = {
  "our-cabin": "overview",
  amenities: "amenities",
  host: "host",
  "special-offers": "special-offers",
  faq: "faq",
  calendar: "calendar",
};

export function Description({ cabin }: DescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("our-cabin");

  const descriptionText = `Browse the internet, play board games or PlayStation with your family, have fun with the dog, or take a nap in the hammock.
And after all that - relax in the jacuzzi or grill yourself a sausage.  Drugi Dom is a comfortable stay for up to 10 people, located
on the grounds of the old PKP railway resort in Załakowo.

We equipped Drugi Dom with everything you need in a home — and everything that makes your time here even more enjoyable.
The cabin is surrounded by beautiful Kashubian forests, perfect for hiking and cycling. Lake Gowidlińskie is just a 10-minute walk
away, and the charming town of Kartuzy is a short drive. Whether you're looking for adventure or relaxation,
this is the perfect getaway.`;

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const domIdToSectionId = Object.entries(SECTION_DOM_TARGETS).reduce<
      Partial<Record<string, SectionId>>
    >((acc, [sectionId, domId]) => {
      acc[domId] = sectionId as SectionId;
      return acc;
    }, {});

    const uniqueDomIds = Array.from(new Set(Object.values(SECTION_DOM_TARGETS)));

    const elements = uniqueDomIds
      .map((domId) => document.getElementById(domId))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).getBoundingClientRect().top -
              (b.target as HTMLElement).getBoundingClientRect().top,
          );

        if (visible[0]) {
          const domId = (visible[0].target as HTMLElement).id;
          const sectionId = domIdToSectionId[domId];
          if (sectionId) {
            setActiveSection(sectionId);
          }
        }
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0.15,
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleMenuClick = (id: SectionId) => {
    const targetDomId = SECTION_DOM_TARGETS[id] ?? id;
    const el = document.getElementById(targetDomId);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  };

  return (
    <section
      id="overview"
      className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-12 sm:pt-20 pb-10 sm:pb-14"
    >
      {/* Two column layout: sticky nav left, all content right */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
        {/* Left nav - sticky */}
        <DescriptionMenu activeSection={activeSection} onSectionClick={handleMenuClick} />

        {/* Right column - all content stacked */}
        <div className="flex-1 flex flex-col">
          {/* Large intro paragraph */}
          <p className="text-2xl sm:text-3xl lg:text-5xl font-semibold leading-tight sm:leading-[48px] lg:leading-[56px]">
            <span className="text-text-primary">Listen to the birds singing while sipping </span>
            <span className="text-text-tertiary">freshly grounded coffee</span>
            <span className="text-text-primary"> on our terrace overlooking the forest, just a meter from the stream.</span>
          </p>

          {/* Features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-6 lg:gap-y-8 mt-6 lg:mt-10 mb-6 lg:mb-10">
            <FeatureItem icon="/icons/users.svg" value={`${cabin.maxGuests} guests`} subtitle={`Up to ${cabin.maxGuests} people`} />
            <FeatureItem icon="/icons/bedroom.svg" value={`${cabin.bedrooms} bedrooms`} subtitle="10 single beds" />
            <FeatureItem icon="/icons/bathroom.svg" value={`${cabin.bathrooms} bathrooms`} subtitle="Bath & shower" />
            <FeatureItem icon="/icons/parking.svg" value="6 parking spots" subtitle="Up to 6 cars" />
            <FeatureItem icon="/icons/pets.svg" value="2 pets allowed" subtitle="Small cats & dogs" />
            <FeatureItem icon="/icons/home.svg" value="1 property" subtitle="One house on a plot" />
          </div>

          {/* Description text */}
          <div className="flex-1">
          <div
            className={`text-base text-text-secondary leading-6 whitespace-pre-line transition-all duration-300 ease-in-out ${!expanded ? 'line-clamp-3' : ''}`}
          >
            {descriptionText}
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-base font-medium text-text-primary underline underline-offset-2 hover:opacity-80 transition-opacity"
            style={{ cursor: 'pointer' }}
          >
            {expanded ? "show less" : "show more"}
          </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureItem({ icon, value, subtitle }: { icon: string; value: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-3">
      <img src={icon} alt="" className="w-6 h-6 shrink-0" />
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
}

function DescriptionMenu({ activeSection, onSectionClick }: DescriptionMenuProps) {
  const allItems: { id: SectionId; label: string }[] = [
    { id: "our-cabin", label: "Our cabin" },
    ...DESCRIPTION_MENU_ITEMS,
  ];

  return (
    <div className="w-full lg:w-56 lg:shrink-0 lg:sticky lg:top-20 lg:self-start">
      <nav className="flex flex-row gap-2 lg:flex-col lg:gap-2">
        {allItems.map((item) => {
          const isActive = item.id === activeSection;
          const baseItemClasses =
            "flex items-center text-base font-medium transition-colors duration-150 text-left cursor-pointer";
          const stateClasses = isActive
            ? "text-text-primary"
            : "text-text-tertiary hover:text-text-secondary";

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSectionClick(item.id)}
              className={`group ${baseItemClasses} ${stateClasses}`}
            >
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
