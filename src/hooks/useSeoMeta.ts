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
      "@type": "LodgingBusiness",
      "@id": pageUrl,
      name: cabin.title,
      description: cabin.description.slice(0, 500),
      url: pageUrl,
      image: cabin.images.slice(0, 5).map((img) => `${siteUrl}${img.url}`),
      address: {
        "@type": "PostalAddress",
        streetAddress: cabin.location.address,
        addressLocality: cabin.location.city,
        addressCountry: cabin.location.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: cabin.location.lat,
        longitude: cabin.location.lng,
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
      occupancy: {
        "@type": "QuantitativeValue",
        maxValue: cabin.maxGuests,
      },
      priceRange: `From $${cabin.pricing.baseNight}/night`,
      petsAllowed: cabin.amenities.some((a) => a.name.toLowerCase().includes("pet")),
      checkinTime: "15:00",
      checkoutTime: "11:00",
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
    const faqs = [
      { q: "What is the check-in time?", a: "Check-in is at 3:00 PM." },
      { q: "What is the checkout time?", a: "Checkout is at 11:00 AM." },
      { q: "Are pets allowed?", a: cabin.amenities.some((a) => a.name.toLowerCase().includes("pet")) ? "Yes, pets are welcome (maximum 2 small cats or dogs)." : "No pets allowed." },
      { q: "How many guests can stay?", a: `Up to ${cabin.maxGuests} guests.` },
      { q: "Is parking available?", a: cabin.amenities.some((a) => a.name.toLowerCase().includes("parking")) ? "Yes, free parking is available on site." : "Please contact the host about parking." },
      { q: "Is Wi-Fi available?", a: cabin.amenities.some((a) => a.name.toLowerCase().includes("wi-fi") || a.name.toLowerCase().includes("wifi")) ? "Yes, free Wi-Fi is included." : "Please contact the host about internet access." },
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
  }, [cabin]);
}
