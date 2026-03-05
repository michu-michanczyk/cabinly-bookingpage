import { useEffect } from "react";

/**
 * Parses a hex color string to RGB components.
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.trim().replace("#", "");
  if (clean.length === 3) {
    return {
      r: parseInt(clean[0] + clean[0], 16),
      g: parseInt(clean[1] + clean[1], 16),
      b: parseInt(clean[2] + clean[2], 16),
    };
  }
  if (clean.length === 6) {
    return {
      r: parseInt(clean.slice(0, 2), 16),
      g: parseInt(clean.slice(2, 4), 16),
      b: parseInt(clean.slice(4, 6), 16),
    };
  }
  return null;
}

/**
 * Returns relative luminance (0–1) per WCAG 2.x formula.
 */
function luminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Watches accent color and system color scheme. When in dark mode and the
 * accent color is too dark to be visible, flips it to white (and fg to the
 * original accent). When in light mode, restores the original values.
 *
 * Call once at app root. Pass `accentHex` whenever the user picks a new color.
 */
export function useAccentColor(accentHex: string) {
  useEffect(() => {
    const root = document.documentElement;
    const darkMq = window.matchMedia("(prefers-color-scheme: dark)");

    function apply() {
      const isDark = darkMq.matches;
      const rgb = hexToRgb(accentHex);

      // Always set the base accent
      root.style.setProperty("--color-accent", accentHex);

      if (isDark && rgb) {
        const lum = luminance(rgb.r, rgb.g, rgb.b);
        // Luminance < 0.15 → too dark to see on dark bg; flip to white
        if (lum < 0.15) {
          root.style.setProperty("--color-accent", "#ffffff");
          root.style.setProperty("--color-accent-fg", accentHex);
          return;
        }
      }

      // Default fg: white on dark accent, black on light accent
      if (rgb) {
        const lum = luminance(rgb.r, rgb.g, rgb.b);
        root.style.setProperty("--color-accent-fg", lum > 0.35 ? "#010101" : "#ffffff");
      }
    }

    apply();
    darkMq.addEventListener("change", apply);
    return () => darkMq.removeEventListener("change", apply);
  }, [accentHex]);
}
