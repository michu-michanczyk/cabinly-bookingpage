import type { Cabin, ChatMessage, ChatAction } from "../types/cabin";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || "";

function buildSystemPrompt(cabin: Cabin): string {
  const amenityList = cabin.amenities.map((a) => a.name).join(", ");
  const promoList = cabin.promos
    .map(
      (p) =>
        `${p.title}: ${p.dates.start} to ${p.dates.end}, was ${p.originalPrice} now ${p.dealPrice} ${cabin.pricing.currency}`
    )
    .join("; ");

  return `You are Leo, the AI assistant for "${cabin.title}" - a cabin booking page. You help potential guests learn about the property and book their stay.

Property details:
- Name: ${cabin.title}
- Location: ${cabin.location.address}, ${cabin.location.city}, ${cabin.location.country}
- Max guests: ${cabin.maxGuests}, Bedrooms: ${cabin.bedrooms}, Bathrooms: ${cabin.bathrooms}
- Base price: ${cabin.pricing.baseNight} ${cabin.pricing.currency}/night
- Rating: ${cabin.rating.score}/5 from ${cabin.rating.count} reviews on ${cabin.rating.source}
- Amenities: ${amenityList}
- Current promos: ${promoList}
- House rules: ${cabin.houseRules.join(", ")}
- Description: ${cabin.description}

Guidelines:
- Be friendly, concise, and helpful
- When users ask about availability or dates, suggest relevant promos
- If they want to book, include a booking action button in your response
- Answer amenity questions directly and accurately
- Keep responses under 150 words
- When suggesting dates, format as JSON action: {"type": "book", "label": "Book these dates", "payload": {"checkIn": "YYYY-MM-DD", "checkOut": "YYYY-MM-DD"}}

Respond in JSON format: {"message": "your response text", "actions": [{"type": "book|navigate|info", "label": "button text", "payload": {}}]}`;
}

export async function sendChatMessage(
  messages: ChatMessage[],
  cabin: Cabin
): Promise<{ message: string; actions: ChatAction[] }> {
  // If no API key, use mock responses with a realistic delay
  if (!OPENAI_API_KEY) {
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 1200));
    return getMockResponse(messages[messages.length - 1]?.content || "", cabin);
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: buildSystemPrompt(cabin) },
          ...messages.map((m) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          })),
        ],
        temperature: 0.7,
        max_tokens: 500,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      console.error("OpenAI API error:", response.status, await response.text());
      return getMockResponse(messages[messages.length - 1]?.content || "", cabin);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    if (!content) {
      return getMockResponse(messages[messages.length - 1]?.content || "", cabin);
    }

    try {
      // Strip markdown code fences if present
      const cleaned = content.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/i, "").trim();
      const parsed = JSON.parse(cleaned);
      return {
        message: parsed.message || content,
        actions: Array.isArray(parsed.actions) ? parsed.actions : [],
      };
    } catch {
      // If JSON parsing fails, use the raw content as the message
      return { message: content, actions: [] };
    }
  } catch (err) {
    console.error("Chat error:", err);
    return getMockResponse(messages[messages.length - 1]?.content || "", cabin);
  }
}

function getMockResponse(
  userMessage: string,
  cabin: Cabin
): { message: string; actions: ChatAction[] } {
  const lower = userMessage.toLowerCase();

  if (lower.includes("bbq") || lower.includes("grill")) {
    const hasBBQ = cabin.amenities.some(
      (a) => a.name.toLowerCase().includes("bbq") || a.name.toLowerCase().includes("grill")
    );
    return {
      message: hasBBQ
        ? "Yes! The cabin has a BBQ grill area in the garden. Perfect for evening cookouts surrounded by the forest."
        : "The cabin doesn't have a BBQ grill, but there are great restaurants nearby.",
      actions: [
        { type: "navigate", label: "View all amenities", payload: { section: "amenities" } },
      ],
    };
  }

  if (lower.includes("sauna")) {
    const hasSauna = cabin.amenities.some((a) =>
      a.name.toLowerCase().includes("sauna")
    );
    return {
      message: hasSauna
        ? "Yes, there's a sauna available! It's one of the most popular features."
        : "The cabin doesn't have a sauna, but there's a jacuzzi for relaxation.",
      actions: [
        { type: "navigate", label: "View all amenities", payload: { section: "amenities" } },
      ],
    };
  }

  if (lower.includes("weekend") || lower.includes("available") || lower.includes("book")) {
    const promo = cabin.promos[0];
    if (promo) {
      return {
        message: `Great news! We have a special ${promo.title} offer: ${promo.dates.start} to ${promo.dates.end} for just ${promo.dealPrice} ${cabin.pricing.currency} (normally ${promo.originalPrice}). That's a great deal!`,
        actions: [
          {
            type: "book",
            label: "Book this deal",
            payload: { promoId: promo.id },
          },
        ],
      };
    }
    return {
      message: `The cabin is available for booking! The base rate is ${cabin.pricing.baseNight} ${cabin.pricing.currency}/night. When would you like to come?`,
      actions: [{ type: "book", label: "Book a stay", payload: {} }],
    };
  }

  if (lower.includes("price") || lower.includes("cost") || lower.includes("how much")) {
    return {
      message: `The base rate is ${cabin.pricing.baseNight} ${cabin.pricing.currency}/night, plus a ${cabin.pricing.cleaningFee} ${cabin.pricing.currency} cleaning fee. We also have some great promotions running right now!`,
      actions: [
        { type: "navigate", label: "See special offers", payload: { section: "promos" } },
      ],
    };
  }

  if (lower.includes("review") || lower.includes("rating")) {
    return {
      message: `${cabin.title} has a ${cabin.rating.score}/5 rating from ${cabin.rating.count} reviews on ${cabin.rating.source}. Guests love the peaceful forest setting and cozy interiors.`,
      actions: [
        { type: "navigate", label: "Read reviews", payload: { section: "reviews" } },
      ],
    };
  }

  if (lower.includes("people") || lower.includes("guest") || lower.includes("how many")) {
    return {
      message: `The cabin accommodates up to ${cabin.maxGuests} guests across ${cabin.bedrooms} bedrooms with ${cabin.bathrooms} bathrooms. Perfect for families or groups of friends!`,
      actions: [{ type: "book", label: "Book a stay", payload: {} }],
    };
  }

  return {
    message: `Thanks for your interest in ${cabin.title}! It's a cozy ${cabin.bedrooms}-bedroom cabin in ${cabin.location.city} for up to ${cabin.maxGuests} guests. What would you like to know? I can help with amenities, pricing, availability, or booking.`,
    actions: [
      { type: "navigate", label: "View amenities", payload: { section: "amenities" } },
      { type: "book", label: "Book a stay", payload: {} },
    ],
  };
}
