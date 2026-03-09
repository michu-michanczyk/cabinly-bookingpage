import { useEffect } from "react";
import type { Cabin } from "../types/cabin";

function setMeta(selector: string, attr: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    const [attrName, attrValue] = selector.replace(/[\[\]"]/g, "").split("=");
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function setJsonLd(id: string, data: object) {
  let el = document.head.querySelector<HTMLScriptElement>(`script[data-ld="${id}"]`);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-ld", id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function useSeoMeta(cabin: Cabin) {
  useEffect(() => {
    const siteUrl = window.location.origin;
    const pageUrl = `${siteUrl}/${cabin.slug}`;
    const ogImageUrl = `${siteUrl}/og/${cabin.slug}.png`;
    const locationStr = `${cabin.location.city}, ${cabin.location.country}`;

    // ── TITLE ────────────────────────────────────────────────────────────────
    document.title = `${cabin.title} — ${locationStr} | from $${cabin.pricing.baseNight}/night`;

    // ── BASIC META ───────────────────────────────────────────────────────────
    setMeta('[name="description"]', "content",
      `${cabin.description.slice(0, 155).trimEnd()}…`
    );
    setMeta('[name="keywords"]', "content",
      [
        cabin.title,
        "cabin rental",
        "holiday house",
        cabin.location.city,
        cabin.location.country,
        "forest cabin",
        "Kashubia",
        "jacuzzi",
        "pet friendly",
        "family cabin",
        `${cabin.bedrooms} bedrooms`,
        `${cabin.maxGuests} guests`,
      ].join(", ")
    );
    setMeta('[name="robots"]', "content", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    setMeta('[name="author"]', "content", cabin.owner.name);
    setMeta('[name="theme-color"]', "content", "#ffffff");

    // ── CANONICAL ────────────────────────────────────────────────────────────
    setLink("canonical", pageUrl);

    // ── GEO / LOCATION META ──────────────────────────────────────────────────
    setMeta('[name="geo.region"]', "content", "PL");
    setMeta('[name="geo.placename"]', "content", locationStr);
    setMeta('[name="geo.position"]', "content", `${cabin.location.lat};${cabin.location.lng}`);
    setMeta('[name="ICBM"]', "content", `${cabin.location.lat}, ${cabin.location.lng}`);

    // ── OPEN GRAPH ───────────────────────────────────────────────────────────
    setMeta('[property="og:type"]', "content", "website");
    setMeta('[property="og:site_name"]', "content", "Cabinly");
    setMeta('[property="og:title"]', "content", `${cabin.title} — ${locationStr}`);
    setMeta('[property="og:description"]', "content",
      `${cabin.description.slice(0, 200).trimEnd()}…`
    );
    setMeta('[property="og:url"]', "content", pageUrl);
    setMeta('[property="og:image"]', "content", ogImageUrl);
    setMeta('[property="og:image:width"]', "content", "1200");
    setMeta('[property="og:image:height"]', "content", "630");
    setMeta('[property="og:image:alt"]', "content", cabin.images[0].alt);
    setMeta('[property="og:locale"]', "content", "en_US");
    setMeta('[property="og:latitude"]', "content", String(cabin.location.lat));
    setMeta('[property="og:longitude"]', "content", String(cabin.location.lng));

    // ── TWITTER CARD ─────────────────────────────────────────────────────────
    setMeta('[name="twitter:card"]', "content", "summary_large_image");
    setMeta('[name="twitter:title"]', "content", `${cabin.title} — ${locationStr}`);
    setMeta('[name="twitter:description"]', "content",
      `${cabin.description.slice(0, 200).trimEnd()}…`
    );
    setMeta('[name="twitter:image"]', "content", ogImageUrl);
    setMeta('[name="twitter:image:alt"]', "content", cabin.images[0].alt);

    // ── SCHEMA.ORG: LodgingBusiness ──────────────────────────────────────────
    setJsonLd("lodging", {
      "@context": "https://schema.org",
      "@type": ["LodgingBusiness", "VacationRental"],
      "@id": pageUrl,
      additionalType: [
        "https://www.wikidata.org/wiki/Q975405",   // vacation rental
        "https://www.wikidata.org/wiki/Q2475635",  // log cabin
      ],
      name: cabin.title,
      alternateName: ["Drugi Dom Załakowo", "Second Home Kashubia"],
      description: cabin.description,
      url: pageUrl,
      image: cabin.images.slice(0, 5).map((img) => ({
        "@type": "ImageObject",
        url: `${siteUrl}${img.url}`,
        description: img.alt,
      })),
      address: {
        "@type": "PostalAddress",
        streetAddress: cabin.location.address,
        addressLocality: cabin.location.city,
        addressRegion: "Pomeranian Voivodeship",
        addressCountry: "PL",
        postalCode: "83-400",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: cabin.location.lat,
        longitude: cabin.location.lng,
      },
      containedInPlace: {
        "@type": "Place",
        name: "Kashubia",
        description: "A historic region in northern Poland, known for its forests, lakes, and unique cultural heritage.",
        geo: {
          "@type": "GeoCoordinates",
          latitude: 54.2861,
          longitude: 18.0753,
        },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: cabin.rating.score,
        reviewCount: cabin.rating.count,
        bestRating: 5,
        worstRating: 1,
      },
      review: cabin.reviews.slice(0, 3).map((r) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.author },
        reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
        reviewBody: r.text,
        datePublished: r.date,
      })),
      amenityFeature: cabin.amenities.map((a) => ({
        "@type": "LocationFeatureSpecification",
        name: a.name,
        value: true,
      })),
      numberOfRooms: cabin.bedrooms,
      numberOfBathroomsTotal: cabin.bathrooms,
      occupancy: {
        "@type": "QuantitativeValue",
        maxValue: cabin.maxGuests,
        unitText: "guests",
      },
      floorSize: {
        "@type": "QuantitativeValue",
        value: 150,
        unitCode: "MTK",
      },
      priceRange: `From $${cabin.pricing.baseNight}/night`,
      petsAllowed: cabin.amenities.some((a) => a.name.toLowerCase().includes("pet")),
      checkinTime: "15:00",
      checkoutTime: "11:00",
      tourBookingPage: pageUrl,
      makesOffer: {
        "@type": "Offer",
        price: cabin.pricing.baseNight,
        priceCurrency: cabin.pricing.currency,
        availability: "https://schema.org/InStock",
        validFrom: new Date().toISOString().split("T")[0],
        description: `Nightly rate from $${cabin.pricing.baseNight}. Cleaning fee $${cabin.pricing.cleaningFee}. Sleeps up to ${cabin.maxGuests} guests.`,
      },
      isAccessibleForFree: false,
      about: [
        {
          "@type": "Thing",
          name: "Forest cabin rental in Poland",
          description: "A family-friendly forest cabin with jacuzzi, BBQ, and pet-friendly policy near Lake Gowidlińskie in Kashubia.",
        },
        {
          "@type": "Place",
          name: "Kashubian Forest",
          description: "Forested region surrounding the cabin, ideal for hiking and cycling.",
        },
      ],
      keywords: [
        "cabin rental Poland",
        "Kashubia cabin",
        "jacuzzi cabin",
        "forest house rental",
        "pet friendly cabin Poland",
        "cabin 10 people Poland",
        "Załakowo accommodation",
        "weekend cabin Poland",
        "cabin with BBQ Poland",
      ].join(", "),
      owner: {
        "@type": "Person",
        name: cabin.owner.name,
      },
    });

    // ── SCHEMA.ORG: BreadcrumbList ───────────────────────────────────────────
    setJsonLd("breadcrumb", {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Cabins", item: `${siteUrl}/cabins` },
        { "@type": "ListItem", position: 3, name: cabin.title, item: pageUrl },
      ],
    });

    // ── SCHEMA.ORG: FAQPage (from house rules) ───────────────────────────────
    const hasPets = cabin.amenities.some((a) => a.name.toLowerCase().includes("pet"));
    const hasParking = cabin.amenities.some((a) => a.name.toLowerCase().includes("parking"));
    const hasWifi = cabin.amenities.some((a) => a.name.toLowerCase().includes("wi-fi") || a.name.toLowerCase().includes("wifi"));
    const hasJacuzzi = cabin.amenities.some((a) => a.name.toLowerCase().includes("jacuzzi"));
    const hasBBQ = cabin.amenities.some((a) => a.name.toLowerCase().includes("bbq") || a.name.toLowerCase().includes("grill"));

    const faqs = [
      { q: "What is the check-in time?", a: "Check-in is at 3:00 PM (15:00). Early check-in may be available on request." },
      { q: "What is the checkout time?", a: "Checkout is at 11:00 AM. Late checkout may be arranged subject to availability." },
      { q: "Are pets allowed?", a: hasPets ? "Yes, pets are welcome — up to 2 small cats or dogs. Please inform the host in advance." : "No pets allowed." },
      { q: "How many guests can stay at the cabin?", a: `The cabin sleeps up to ${cabin.maxGuests} guests across ${cabin.bedrooms} bedrooms and ${cabin.bathrooms} bathrooms.` },
      { q: "Is free parking available?", a: hasParking ? "Yes, free private parking is available on site with space for multiple cars." : "Please contact the host about parking options." },
      { q: "Is Wi-Fi included?", a: hasWifi ? "Yes, free high-speed Wi-Fi is included throughout the cabin." : "Please contact the host about internet access." },
      { q: "Does the cabin have a jacuzzi?", a: hasJacuzzi ? "Yes, the cabin features an outdoor jacuzzi, perfect for relaxing evenings under the stars." : "There is no jacuzzi at this cabin." },
      { q: "Is there a BBQ area?", a: hasBBQ ? "Yes, there is a dedicated BBQ grill area outside, ideal for outdoor cooking and gatherings." : "There is no BBQ area at this cabin." },
      { q: "How much does it cost per night?", a: `Nightly rates start from $${cabin.pricing.baseNight}. A one-time cleaning fee of $${cabin.pricing.cleaningFee} and service fee of $${cabin.pricing.serviceFee} apply. Prices may vary by season and availability.` },
      { q: "Where is the cabin located?", a: `The cabin is located at ${cabin.location.address}, ${cabin.location.city}, Poland, in the Kashubian Forest region. Lake Gowidlińskie is a 10-minute walk away, and the town of Kartuzy is a short drive.` },
      { q: "What activities are available nearby?", a: "The cabin is surrounded by Kashubian forests with trails for hiking and cycling. Lake Gowidlińskie is nearby for swimming and water sports. The cultural town of Kartuzy offers local attractions and restaurants." },
      { q: "Is the cabin suitable for families with children?", a: "Yes, the cabin is very family-friendly. It has a PlayStation 5, board games, a large garden, hammock, and outdoor BBQ area. The forest setting and nearby lake provide plenty of activities for children." },
      { q: "Can I book the cabin for a large group?", a: `Yes, the cabin can accommodate up to ${cabin.maxGuests} guests and is ideal for group getaways, family reunions, or corporate retreats. The spacious common areas and outdoor space are perfect for larger groups.` },
      { q: "Is smoking allowed?", a: "Smoking is not allowed indoors. Guests may smoke in the outdoor areas." },
      { q: "What is the cancellation policy?", a: "Please contact the host directly or check the booking platform for the most current cancellation policy details." },
    ];

    setJsonLd("faq", {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    });

    // ── SCHEMA.ORG: Offer (pricing) ───────────────────────────────────────────
    setJsonLd("offer", {
      "@context": "https://schema.org",
      "@type": "Offer",
      name: `Stay at ${cabin.title}`,
      description: `From $${cabin.pricing.baseNight} per night. Sleeps up to ${cabin.maxGuests} guests.`,
      price: cabin.pricing.baseNight,
      priceCurrency: cabin.pricing.currency,
      url: pageUrl,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Person", name: cabin.owner.name },
    });

    // ── SCHEMA.ORG: WebPage with Speakable (for Google SGE / AI Overviews) ────
    setJsonLd("webpage", {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: document.title,
      description: `${cabin.description.slice(0, 300).trimEnd()}…`,
      inLanguage: "en-US",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "Cabinly",
        url: siteUrl,
        description: "Direct booking pages for unique cabin rentals. No middlemen, no platform fees.",
        publisher: {
          "@type": "Organization",
          name: "Cabinly",
          url: siteUrl,
        },
      },
      about: {
        "@id": pageUrl,
      },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [
          "h1",
          ".cabin-description",
          "#overview",
          "#amenities",
        ],
      },
      dateModified: new Date().toISOString(),
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: ogImageUrl,
        width: 1200,
        height: 630,
      },
    });
  }, [cabin]);
}
