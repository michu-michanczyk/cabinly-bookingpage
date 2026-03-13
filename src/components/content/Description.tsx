import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { formatCurrency } from "../../lib/utils";
import type { Cabin } from "../../types/cabin";

// Stat card icons — outline style
function IconGuests() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7.99832" cy="8.50854" r="3.49145" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="17.0021" cy="9.49897" r="2.50104" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1.99582 20.0033V18.9859C1.99582 16.785 3.77956 15.0012 5.98048 15.0012H10.0162C12.2171 15.0012 14.0008 16.785 14.0008 18.9859V20.0033" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.0021 15.0012H18.1045C20.3055 15.0012 22.0892 16.785 22.0892 18.9859V20.0033" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconBedroom() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M20 12H4C2.895 12 2 12.895 2 14V16.933C2 17.485 2.448 17.933 3 17.933H21C21.552 17.933 22 17.485 22 16.933V14C22 12.895 21.105 12 20 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 12V6.93298C4 5.27598 5.343 3.93298 7 3.93298H17C18.657 3.93298 20 5.27598 20 6.93298V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 18V19.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 18V19.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 12V12C7.5 10.343 8.843 9 10.5 9H13.5C15.157 9 16.5 10.343 16.5 12V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconBathroom() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 13H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 13L20.4555 16.4852C20.1394 18.5085 18.3967 20 16.3489 20H7.65107C5.60328 20 3.86062 18.5085 3.54452 16.4852L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.13123 19.7073L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.8688 19.7073L19 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.8882 6H11.1118C12.1717 6 13.1127 6.67824 13.4479 7.68377C13.5496 7.98872 13.4984 8.32394 13.3105 8.58471C13.1225 8.84548 12.8207 9 12.4992 9H9.50078C9.17933 9 8.87748 8.84548 8.68953 8.58471C8.50158 8.32394 8.45044 7.98872 8.55209 7.68377C8.88727 6.67824 9.82827 6 10.8882 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11 6V6C11 4.34315 9.65685 3 8 3V3C6.34315 3 5 4.34315 5 6V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconParking() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.5 8V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.5 8H12.8375C13.7557 8 14.5 8.74433 14.5 9.6625C14.5 10.5807 13.7557 11.325 12.8375 11.325H10.5V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 17H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconPet() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 13.6674C11.7237 13.6674 11.4998 13.4434 11.4998 13.1672C11.4998 13.0751 11.5744 13.0004 11.6665 13.0004H12.3335C12.4256 13.0004 12.5002 13.0751 12.5002 13.1672C12.5002 13.4434 12.2763 13.6674 12 13.6674Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.0025 13.0005C18.0025 13.553 18.4504 14.0009 19.0029 14.0009C20.1079 14.0009 21.0037 13.1051 21.0037 12.0001V8.99881C21.0037 7.34126 19.66 5.99756 18.0025 5.99756H17.5854" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.0496 17.8488L6.99792 21.0038" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15.9504 17.8488L17.0021 21.0038" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.41467 5.99756H5.9975C4.33995 5.99756 2.99625 7.34126 2.99625 8.99881V12.0001C2.99625 13.1051 3.89205 14.0009 4.99708 14.0009C5.54959 14.0009 5.9975 13.553 5.9975 13.0005" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.0008 17.8315V18.5027C14.0008 19.3315 13.329 20.0034 12.5002 20.0034H11.4998C10.671 20.0034 9.99918 19.3315 9.99918 18.5027V17.8312" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 13.6673V15.0012C12 16.6588 10.6563 18.0025 8.99875 18.0025C7.3412 18.0025 5.9975 16.6588 5.9975 15.0012V7.9983C5.9975 5.23572 8.23701 2.99622 10.9996 2.99622H13.0004C15.763 2.99622 18.0025 5.23572 18.0025 7.9983V15.0012C18.0025 16.6588 16.6588 18.0025 15.0012 18.0025C13.3437 18.0025 12 16.6588 12 15.0012V13.6673Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.2509 9.49931C14.2507 9.63735 14.1388 9.74915 14.0007 9.74909C13.8627 9.74903 13.7508 9.63714 13.7507 9.49909C13.7507 9.36105 13.8625 9.24906 14.0005 9.24888C14.0669 9.2488 14.1307 9.27516 14.1777 9.32214C14.2247 9.36912 14.251 9.43287 14.2509 9.49931" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.2493 9.49931C10.2491 9.63735 10.1371 9.74915 9.99906 9.74909C9.86102 9.74903 9.74913 9.63714 9.74907 9.49909C9.74901 9.36105 9.86081 9.24906 9.99885 9.24888C10.0653 9.2488 10.129 9.27516 10.176 9.32214C10.223 9.36912 10.2494 9.43287 10.2493 9.49931" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

interface DescriptionProps {
  cabin: Cabin;
}

type SectionId = "our-cabin" | "rooms" | "amenities" | "host" | "special-offers" | "faq" | "location";

const DESCRIPTION_MENU_ITEMS: { id: SectionId; label: string }[] = [
  { id: "rooms", label: "Rooms" },
  { id: "amenities", label: "Amenities" },
  { id: "special-offers", label: "Special offers" },
  { id: "host", label: "Host" },
  { id: "faq", label: "FAQ" },
  { id: "location", label: "Location" },
];

const SECTION_DOM_TARGETS: Record<SectionId, string> = {
  "our-cabin": "overview",
  rooms: "rooms",
  amenities: "amenities",
  host: "host",
  "special-offers": "special-offers",
  faq: "faq",
  location: "location",
};

export function Description({ cabin }: DescriptionProps) {
  const [activeSection, setActiveSection] = useState<SectionId>("our-cabin");
  const [navOnDark, setNavOnDark] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

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

    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(checkNavBackground);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    checkNavBackground();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Scroll-based active section tracker
  useEffect(() => {
    const sectionEntries = Object.entries(SECTION_DOM_TARGETS) as [SectionId, string][];

    const getActiveSection = (): SectionId => {
      // If scrolled to bottom of page, last section wins
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 50;
      if (atBottom) {
        const lastEntry = sectionEntries[sectionEntries.length - 1];
        return lastEntry[0];
      }

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

    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setActiveSection(getActiveSection());
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
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

    setActiveSection(id);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", `#${id}`);
  };

  return (
    <div id="overview" className="pt-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-col lg:flex-row gap-4 lg:gap-8 pb-20">
        {/* Sticky nav — spans full height of overview + rooms */}
        <DescriptionMenu
          ref={navRef}
          activeSection={activeSection}
          onSectionClick={handleMenuClick}
          onDark={navOnDark}
        />

        {/* Right column */}
        <div className="flex-1 min-w-0">
          <OurCabinSection cabin={cabin} />
          <RoomsSection cabin={cabin} />
          <AmenitiesSection cabin={cabin} />
          <SpecialOffersSection cabin={cabin} />
          <HostSection cabin={cabin} />
          <FAQSection />
          <LocationSection cabin={cabin} />
        </div>
      </div>
    </div>
  );
}


function getCabinStats(cabin: Cabin) {
  return [
    { icon: <IconGuests />, value: cabin.maxGuests, label: "Guests" },
    { icon: <IconBedroom />, value: cabin.bedrooms, label: "Bedrooms" },
    { icon: <IconBathroom />, value: cabin.bathrooms, label: "Bathrooms" },
    { icon: <IconParking />, value: 6, label: "Parking spots" },
    { icon: <IconPet />, value: 2, label: "Pets allowed" },
  ];
}

function OurCabinSection({ cabin }: { cabin: Cabin }) {
  const [expanded, setExpanded] = useState(false);

  const descriptionText = cabin.description;

  const STATS = useMemo(() => getCabinStats(cabin), [cabin]);

  return (
    <section id="our-cabin-section" className="flex flex-col gap-10">
      {/* Badge */}
      <div className="inline-flex">
        <span className="inline-flex items-center px-3 py-1 rounded-full border border-border-light text-base font-medium text-text-primary">
          Our cabin
        </span>
      </div>

      {/* Headline + text block */}
      <div className="flex flex-col gap-4">
        <h2
          className="font-medium text-text-primary leading-[1.2]"
          style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
        >
          Listen to the birds singing while sipping freshly grounded coffee on our terrace overlooking the forest, just a meter from the stream.
        </h2>

        {/* Description text */}
        <div className="flex flex-col gap-4">
          <div
            className={`text-base font-normal text-text-secondary leading-7 whitespace-pre-line transition-all duration-300 ${!expanded ? "line-clamp-3" : ""}`}
            style={{ lineHeight: "28px" }}
          >
            {descriptionText}
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-base font-medium text-text-primary underline underline-offset-4 text-left cursor-pointer hover:opacity-70 transition-opacity w-fit"
          >
            {expanded ? "show less" : "show more"}
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col justify-between bg-bg-secondary rounded-2xl p-5 sm:p-6"
            style={{ minHeight: "clamp(140px, 25vw, 210px)" }}
          >
            <span className="text-text-primary">{stat.icon}</span>
            <div className="flex flex-col gap-1">
              <span className="font-medium text-text-primary leading-none" style={{ fontSize: "clamp(40px, 8vw, 64px)" }}>{stat.value}</span>
              <span className="text-base text-text-secondary">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function RoomsSection({ cabin }: { cabin: Cabin }) {
  const rooms = cabin.rooms ?? [];

  return (
    <section id="rooms" className="pt-16 sm:pt-32 flex flex-col gap-12">
      {/* Badge */}
      <div className="inline-flex">
        <span className="inline-flex items-center px-3 py-1 rounded-full border border-border-light text-base font-medium text-text-primary">
          Rooms
        </span>
      </div>

      {/* Heading */}
      <h2
        className="font-medium text-text-primary"
        style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: "1.2" }}
      >
        You'll stay in here
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <div key={room.id} className="flex flex-col gap-4">
            <div className="rounded-2xl overflow-hidden" style={{ height: "clamp(180px, 30vw, 252px)" }}>
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-full object-cover"
                loading="lazy"
                width={400}
                height={252}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-medium text-text-primary" style={{ lineHeight: "21px" }}>{room.name}</span>
              <span className="text-base font-normal text-text-secondary" style={{ lineHeight: "28px" }}>{room.beds}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AmenityIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "wifi":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 18.5C12.8284 18.5 13.5 17.8284 13.5 17C13.5 16.1716 12.8284 15.5 12 15.5C11.1716 15.5 10.5 16.1716 10.5 17C10.5 17.8284 11.1716 18.5 12 18.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.5 14C9.5 12.9 10.7 12.2 12 12.2C13.3 12.2 14.5 12.9 15.5 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 10.5C7 8.4 9.4 7.2 12 7.2C14.6 7.2 17 8.4 19 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 7C4.9 3.9 8.2 2 12 2C15.8 2 19.1 3.9 22 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "parking":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.5 8V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M10.5 8H12.8375C13.7557 8 14.5 8.74433 14.5 9.6625C14.5 10.5807 13.7557 11.325 12.8375 11.325H10.5V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 17H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "fire":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C16.4183 22 20 18.4183 20 14C20 11.3 18.6 9 17 7C17 9 16 10.5 14.5 11.5C14.5 9.5 13.5 7 11 5C11 7.5 9.5 9.5 8 11C6.8 12.2 6 13.9 6 14C6 18.4183 7.58172 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "kitchen":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 9H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 21V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "sun":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 2V4M12 20V22M2 12H4M20 12H22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "hottub":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 12V16C20 18.209 18.209 20 16 20H8C5.791 20 4 18.209 4 16V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 8C6 8 7 7 7 6C7 5 6 4 6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 8C10 8 11 7 11 6C11 5 10 4 10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 8C14 8 15 7 15 6C15 5 14 4 14 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "tv":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="4" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 21H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 18V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "award":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.21 13.89L7 22L12 19L17 22L15.79 13.88" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "eye":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "pet":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 13.6673V15.0012C12 16.6588 10.6563 18.0025 8.99875 18.0025C7.3412 18.0025 5.9975 16.6588 5.9975 15.0012V7.9983C5.9975 5.23572 8.23701 2.99622 10.9996 2.99622H13.0004C15.763 2.99622 18.0025 5.23572 18.0025 7.9983V15.0012C18.0025 16.6588 16.6588 18.0025 15.0012 18.0025C13.3437 18.0025 12 16.6588 12 15.0012V13.6673Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.0496 17.8488L6.99792 21.0038" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15.9504 17.8488L17.0021 21.0038" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "bedroom":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M20 12H4C2.895 12 2 12.895 2 14V16.933C2 17.485 2.448 17.933 3 17.933H21C21.552 17.933 22 17.485 22 16.933V14C22 12.895 21.105 12 20 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 12V6.93298C4 5.27598 5.343 3.93298 7 3.93298H17C18.657 3.93298 20 5.27598 20 6.93298V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7.5 12C7.5 10.343 8.843 9 10.5 9H13.5C15.157 9 16.5 10.343 16.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "bathroom":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 13H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 13L20.4555 16.4852C20.1394 18.5085 18.3967 20 16.3489 20H7.65107C5.60328 20 3.86062 18.5085 3.54452 16.4852L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 6C11 4.34315 9.65685 3 8 3C6.34315 3 5 4.34315 5 6V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "tick":
    default:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
  }
}

function AmenitiesSection({ cabin }: { cabin: Cabin }) {
  const [showAll, setShowAll] = useState(false);
  const VISIBLE_COUNT = 12;
  const displayed = showAll ? cabin.amenities : cabin.amenities.slice(0, VISIBLE_COUNT);

  return (
    <section id="amenities" className="pt-16 sm:pt-32 flex flex-col gap-12">
      {/* Badge */}
      <div className="inline-flex">
        <span className="inline-flex items-center px-3 py-1 rounded-full border border-border-light text-base font-medium text-text-primary">
          Amenities
        </span>
      </div>

      {/* Heading */}
      <h2
        className="font-medium text-text-primary"
        style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: "1.2" }}
      >
        See what we offer and what makes<br />your stay comfortable
      </h2>

      {/* List */}
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayed.map((amenity) => (
            <div
              key={amenity.id}
              className="flex items-center justify-between px-6 py-6 rounded-2xl border border-border-light"
              style={{ minHeight: "72px" }}
            >
              <span className="text-base font-medium text-text-primary">{amenity.name}</span>
              <span className="text-text-primary shrink-0 ml-2">
                <AmenityIcon icon={amenity.icon} />
              </span>
            </div>
          ))}
        </div>

        {/* Show more / less */}
        {cabin.amenities.length > VISIBLE_COUNT && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-base font-medium text-text-primary underline underline-offset-4 text-left cursor-pointer hover:opacity-70 transition-opacity w-fit pt-2"
          >
            {showAll ? "show less" : "show more"}
          </button>
        )}
      </div>
    </section>
  );
}

function PromoBadge({ badge }: { badge: string }) {
  const isPercent = badge.includes("%");
  const isFor = badge.toLowerCase().includes("for");
  const isSeasonal = badge.toLowerCase().includes("seasonal");
  if (isPercent) return <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[12px] font-semibold" style={{ background: "#FFE4D0", color: "#FF8427" }}>{badge}</span>;
  if (isFor) return <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[12px] font-semibold" style={{ background: "#FFEDED", color: "#E53E3E" }}>{badge}</span>;
  if (isSeasonal) return <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[12px] font-semibold" style={{ background: "#E3EEFC", color: "#0C3B7C" }}>{badge}</span>;
  return <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[12px] font-semibold" style={{ background: "#FFE4D0", color: "#FF8427" }}>{badge}</span>;
}

function SpecialOffersSection({ cabin }: { cabin: Cabin }) {
  const navigate = useNavigate();
  if (!cabin.promos || cabin.promos.length === 0) return null;

  return (
    <section id="special-offers" className="pt-16 sm:pt-32 flex flex-col gap-12">
      {/* Badge */}
      <div className="inline-flex">
        <span className="inline-flex items-center px-3 py-1 rounded-full border border-border-light text-base font-medium text-text-primary">
          Special offers
        </span>
      </div>

      {/* Heading */}
      <h2 className="font-medium text-text-primary" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: "1.2" }}>
        Book a stay with best deal
      </h2>

      {/* Promo cards */}
      <div className="flex flex-col gap-4">
        {cabin.promos.map((promo) => {
          const nights = Math.round(
            (new Date(promo.dates.end).getTime() - new Date(promo.dates.start).getTime()) /
              (1000 * 60 * 60 * 24)
          );
          const perNight = Math.round(promo.dealPrice / nights);
          return (
            <button
              key={promo.id}
              onClick={() => navigate("/book?promo=" + promo.id)}
              className="w-full text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 py-4 sm:px-8 sm:py-8 rounded-2xl border border-border-default transition-colors cursor-pointer hover:border-border-hover overflow-hidden"
            >
              {/* Left: text */}
              <div className="flex flex-col gap-1 min-w-0 flex-1">
                {/* Date + badge */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base font-medium text-text-primary">
                    {format(parseISO(promo.dates.start), "d MMM")} – {format(parseISO(promo.dates.end), "d MMM")}
                  </span>
                  <PromoBadge badge={promo.badge} />
                </div>
                {/* Nights + description */}
                <span className="text-base font-normal text-text-secondary" style={{ lineHeight: "20px" }}>
                  {nights} night{nights !== 1 ? "s" : ""} · {promo.description}
                </span>
                {/* Prices */}
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-base font-semibold text-text-primary">{formatCurrency(perNight, cabin.pricing.currency)} / night</span>
                  <span className="text-base font-normal text-text-secondary line-through">{formatCurrency(promo.originalPrice, cabin.pricing.currency)}</span>
                </div>
              </div>
              <span className="shrink-0 h-12 px-6 rounded-lg border border-text-primary text-base font-semibold text-text-primary flex items-center whitespace-nowrap">
                Book now
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function HostSection({ cabin }: { cabin: Cabin }) {
  return (
    <section id="host" className="pt-16 sm:pt-32">
      {/* Badge */}
      <div className="inline-flex mb-12">
        <span className="inline-flex items-center px-3 py-1 rounded-full border border-border-light text-base font-medium text-text-primary">
          Host
        </span>
      </div>

      {/* Accent card */}
      <div
        className="bg-accent rounded-2xl overflow-hidden flex flex-col justify-end"
        style={{ padding: "clamp(20px, 5vw, 40px)", minHeight: "clamp(320px, 60vh, 560px)" }}
      >
        {/* Quote */}
        <p
          className="text-accent-fg font-medium flex-1 flex items-end mb-8 sm:mb-20"
          style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: "1.2" }}
        >
          "Nestled in the heart of Kashubia, surrounded by forests and lakes, it's a peaceful retreat where you can relax, reconnect with nature, and enjoy your own second home away from the city."
        </p>

        {/* Host row */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <img
            src={cabin.owner.avatar}
            alt={cabin.owner.name}
            className="w-12 h-12 rounded-full object-cover shrink-0"
            width={48}
            height={48}
          />
          {/* Name + label */}
          <div className="flex flex-col">
            <span className="text-base font-medium text-accent-fg" style={{ lineHeight: "21px" }}>
              {cabin.owner.name}
            </span>
            <span className="text-base font-normal text-accent-fg opacity-60" style={{ lineHeight: "20px" }}>
              Your host
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function LocationSection({ cabin }: { cabin: Cabin }) {
  const { address, city, country } = cabin.location;
  const addressQuery = encodeURIComponent(`${address}, ${city}, ${country}`);
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${addressQuery}&z=14&output=embed`;

  const [mapVisible, setMapVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="location" className="pt-16 sm:pt-32 flex flex-col gap-12">
      {/* Badge */}
      <div className="inline-flex">
        <span className="inline-flex items-center px-3 py-1 rounded-full border border-border-light text-base font-medium text-text-primary">
          Location
        </span>
      </div>

      {/* Map container */}
      <div
        ref={containerRef}
        className="relative rounded-2xl overflow-hidden"
        style={{ height: "clamp(280px, 55vw, 560px)" }}
      >
        {mapVisible ? (
          <iframe
            title="Cabin location"
            src={mapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-bg-secondary" />
        )}

        {/* Info card overlay commented out — address already shown by Google Maps embed
        <div className="absolute bottom-10 left-10 right-10 flex items-center gap-4 bg-bg-primary border border-border-light rounded-2xl px-4 py-4" style={{ minHeight: "80px" }}>
          <img src={cabin.images[0].url} alt={cabin.images[0].alt} className="w-12 h-12 rounded-full object-cover shrink-0" />
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-base font-medium text-text-primary truncate">{address}</span>
            <span className="text-base font-normal text-text-secondary truncate">{city}, {country}</span>
          </div>
          <a href={mapsOpenUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 w-12 h-12 flex items-center justify-center rounded-lg border border-text-primary text-text-primary hover:opacity-70 transition-opacity" aria-label="Open in Google Maps">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 3H21V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 14L21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
        */}
      </div>
    </section>
  );
}

const FAQ_ITEMS = [
  {
    question: "What are the check-in and check-out times?",
    answer:
      "Check-in is from 3:00 PM onwards and check-out is by 11:00 AM. If you need an early check-in or late check-out, please contact us in advance and we'll do our best to accommodate you depending on availability.",
  },
  {
    question: "Are pets allowed at the cabin?",
    answer:
      "Yes, we welcome up to 2 well-behaved pets! We ask that you keep pets off the furniture and clean up after them in the garden. A small pet fee may apply — please mention your furry companions when booking.",
  },
  {
    question: "Is parking available on-site?",
    answer:
      "Absolutely. We have 6 parking spots directly on the property, so you'll never need to worry about finding a place to park — even if you're arriving with multiple vehicles or a larger group.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Cancellations made more than 7 days before check-in receive a full refund. Cancellations within 7 days of arrival are eligible for a 50% refund. In the case of a special offer booking, the deal price is non-refundable within 48 hours of check-in.",
  },
  {
    question: "Is the cabin suitable for families with children?",
    answer:
      "Yes, the cabin is family-friendly and accommodates up to 10 guests. The property is fully fenced, surrounded by nature, and includes plenty of outdoor space for kids to explore. The stream and forest nearby make it a magical setting for little adventurers.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="pt-16 sm:pt-32 flex flex-col gap-12">
      {/* Badge */}
      <div className="inline-flex">
        <span className="inline-flex items-center px-3 py-1 rounded-full border border-border-light text-base font-medium text-text-primary">
          FAQ
        </span>
      </div>

      {/* Heading */}
      <h2
        className="font-medium text-text-primary"
        style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: "1.2" }}
      >
        Check-in and Check-out<br />rules and many more
      </h2>

      {/* Accordion list */}
      <div className="flex flex-col gap-4">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-border-default overflow-hidden transition-colors hover:border-border-hover"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 text-left cursor-pointer group"
              >
                <span className="text-base font-medium text-text-primary pr-4">
                  {item.question}
                </span>
                <span
                  className={`shrink-0 w-6 h-6 flex items-center justify-center text-text-primary transition-transform duration-300 group-hover:opacity-70 ${
                    isOpen ? "rotate-45" : "rotate-0"
                  }`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-4 pb-4 sm:px-6 sm:pb-6 text-base font-normal text-text-secondary" style={{ lineHeight: "28px" }}>
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
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
    <div ref={ref} className="hidden lg:block lg:w-56 lg:shrink-0 lg:sticky lg:top-24 lg:self-start relative z-10">
      <nav className="flex flex-col gap-2">
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
