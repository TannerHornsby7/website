import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        header: ["Schibsted Grotesk", "sans-serif"],
        body: ["var(--font-geist-sans)"],
        code: ["IBM Plex Mono", "monospace"],
      },
      colors: {
        light: "var(--color-light)",
        lightgray: "var(--color-lightgray)",
        gray: "var(--color-gray)",
        darkgray: "var(--color-darkgray)",
        dark: "var(--color-dark)",
        secondary: "var(--color-secondary)",
        tertiary: "var(--color-tertiary)",
        highlight: "var(--color-highlight)",
        "text-highlight": "var(--color-text-highlight)",
      },
    },
  },
  darkMode: ["class", '[saved-theme="dark"]'],
};

export default config;
