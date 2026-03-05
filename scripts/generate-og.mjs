/**
 * Build-time OG image generator.
 * Reads cabin data, takes the hero image, composites a gradient overlay
 * and SVG text, and writes a 1200×630 PNG to public/og/<slug>.png
 *
 * Run: node scripts/generate-og.mjs
 * Or automatically via: npm run build (see package.json)
 */

import sharp from "sharp";
import { readFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// ── Read cabin data (import the TS source as plain text, parse the values) ──
// Since this is a build script we keep it simple and duplicate the key values
// rather than transpiling TypeScript. When cabin data comes from an API or DB
// this script would fetch it instead.
const cabins = [
  {
    slug: "second-home-kashubian-forest",
    title: "Second Home in\nKashubian Forest",
    location: "Załakowo, Poland",
    rating: "4.80",
    reviewCount: 13,
    pricePerNight: 450,
    heroImage: join(root, "public/images/IMG_2832.webp"),
  },
];

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

async function generateOg(cabin) {
  const outDir = join(root, "public/og");
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, `${cabin.slug}.png`);

  // Gradient overlay SVG (dark bottom-to-top so text is legible)
  const gradient = Buffer.from(`
    <svg width="${OG_WIDTH}" height="${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#000000" stop-opacity="0.15"/>
          <stop offset="50%" stop-color="#000000" stop-opacity="0.45"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.82"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
    </svg>
  `);

  // Text overlay SVG
  const lines = cabin.title.split("\n");
  const line1 = lines[0] ?? "";
  const line2 = lines[1] ?? "";

  const textSvg = Buffer.from(`
    <svg width="${OG_WIDTH}" height="${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <!-- Cabinly badge top-left -->
      <rect x="48" y="48" width="120" height="36" rx="8" fill="white" fill-opacity="0.15"/>
      <text x="108" y="72" font-family="Arial, sans-serif" font-size="16" font-weight="700"
        fill="white" text-anchor="middle" letter-spacing="1">CABINLY</text>

      <!-- Star + rating top-right -->
      <text x="${OG_WIDTH - 48}" y="76" font-family="Arial, sans-serif" font-size="18"
        fill="white" text-anchor="end">★ ${cabin.rating} · ${cabin.reviewCount} reviews</text>

      <!-- Title -->
      <text x="64" y="${OG_HEIGHT - 160}" font-family="Arial, sans-serif" font-size="72"
        font-weight="800" fill="white" letter-spacing="-1">${line1}</text>
      ${line2 ? `<text x="64" y="${OG_HEIGHT - 74}" font-family="Arial, sans-serif" font-size="72"
        font-weight="800" fill="white" letter-spacing="-1">${line2}</text>` : ""}

      <!-- Location + price pill bottom-right -->
      <text x="${OG_WIDTH - 64}" y="${OG_HEIGHT - 90}" font-family="Arial, sans-serif"
        font-size="22" fill="white" text-anchor="end" fill-opacity="0.85">${cabin.location}</text>
      <rect x="${OG_WIDTH - 250}" y="${OG_HEIGHT - 68}" width="186" height="44" rx="10"
        fill="white" fill-opacity="0.18"/>
      <text x="${OG_WIDTH - 64}" y="${OG_HEIGHT - 38}" font-family="Arial, sans-serif"
        font-size="20" font-weight="700" fill="white" text-anchor="end">
        from $${cabin.pricePerNight} / night
      </text>
    </svg>
  `);

  await sharp(cabin.heroImage)
    .resize(OG_WIDTH, OG_HEIGHT, { fit: "cover", position: "center" })
    .composite([
      { input: gradient, blend: "over" },
      { input: textSvg, blend: "over" },
    ])
    .png({ quality: 90 })
    .toFile(outPath);

  console.log(`✓ OG image → public/og/${cabin.slug}.png`);
}

for (const cabin of cabins) {
  await generateOg(cabin);
}
