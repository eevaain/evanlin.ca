"use client";

import { useEffect } from "react";

// Fourteen evenly spaced hues, with lightness chosen for contrast on the site background.
const accentLightness = [36, 36, 30, 29, 30, 31, 30, 29, 36, 36, 36, 36, 36, 36];

export default function RandomAccent() {
  useEffect(() => {
    let index = Math.floor(Math.random() * accentLightness.length);

    try {
      const previous = sessionStorage.getItem("accent-color-index");
      if (previous !== null && index === Number(previous)) {
        index = (index + 1 + Math.floor(Math.random() * (accentLightness.length - 1))) % accentLightness.length;
      }
      sessionStorage.setItem("accent-color-index", String(index));
    } catch {
      // The color still works when browser storage is unavailable.
    }

    const hue = index * (360 / accentLightness.length);
    const lightness = accentLightness[index];
    const root = document.documentElement;

    root.style.setProperty("--color-red-800", `hsl(${hue} 55% ${lightness}%)`);
    root.style.setProperty("--color-red-900", `hsl(${hue} 55% ${lightness}%)`);
    root.style.setProperty("--color-red-950", `hsl(${hue} 55% ${lightness - 4}%)`);
    root.style.setProperty("--color-red-300", `hsl(${hue} 55% 72%)`);
    root.style.setProperty("--color-red-400", `hsl(${hue} 55% 62%)`);
  }, []);

  return null;
}
